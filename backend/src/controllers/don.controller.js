const Donation = require('../models/don.model');
const Project = require('../models/Projects.model');

exports.createDonation = async (req, res) => {
    try {
        const { amount, message, projectId } = req.body;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found"});
        }
        
        if(project.status !== 'EN_COURS') {
            return res.status(400).json({ message: "Project is not active"});
        }

        const donation = Donation.create({
            amount,
            message,
            project: projectId,
            user: req.user.id
        })

        project.amount += amount;

        await project.save();

        res.status(201).json({
            message: 'Merci pour votre don !',
            donation: donation,
            projectUpdated: {
                collectedAmount: project.collectedAmount,
                status: project.status
            }
        });
        
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}