const Project = require('../models/Projects.model');

// Create a new project

exports.createProject = async (req, res) => {
    try {
        const { title, description, goalAmount } = req.body;

        if (!title || !description || !goalAmount)
            return res.status(400).json({ message: "All fields are required!" });
        
        const adminID = req.user.id;
        const project = await Project.create({
            title,
            description,
            goalAmount,
            createdBy: adminID
        })
        return res.status(201).json({message: "Project created successfully!", project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            status: {$in: ["EN_COURS", "FINANCE", "TERMINE"]}
        }).populate("createdBy", "name");

        return res.status(200).json({projects});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}