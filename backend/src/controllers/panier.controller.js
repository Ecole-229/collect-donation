const Cart = require('../models/panier.model');
const Project = require('../models/Projects.model');
const Donation = require('../models/don.model');

exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate('items.project', 'title goalAmount status');
        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du panier.' });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { projectId, amount } = req.body;
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.project.toString() === projectId);

        if (itemIndex > -1) {
            cart.items[itemIndex].amount += Number(amount);
        } else {
            // Ajout du nouveau projet
            cart.items.push({ project: projectId, amount: Number(amount) });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout au panier." });
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Panier introuvable.' });

        cart.items = cart.items.filter(item => item.project.toString() !== req.params.projectId);
        await cart.save();
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression.' });
    }
};

exports.checkoutCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Votre panier est vide.' });
        }

        for (let item of cart.items) {
            const project = await Project.findById(item.project);

            if (!project || project.status !== 'EN_COURS') {
                continue; 
            }

            const donation = new Donation({
                user: req.user.id,
                project: project._id,
                amount: item.amount
            });
            await donation.save();

            project.collectedAmount += item.amount;
            
            if (project.collectedAmount >= project.goalAmount) {
                project.status = 'FINANCE';
            }
            
            await project.save();
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({ message: 'Paiement validé avec succès !' });

    } catch (error) {
        console.error("Erreur Checkout :", error);
        res.status(500).json({ message: 'Erreur lors de la validation du panier.' });
    }
};