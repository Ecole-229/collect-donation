const Project = require('../models/Projects.model');

createProject = async (req, res) => {
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


getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            status: {$in: ["EN_COURS", "FINANCE", "TERMINE"]}
        }).populate("createdBy", "name");

        return res.status(200).json({projects});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

getOneProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("createdBy", "name");
        return res.status(200).json({project});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

UpdateProjectStatus = async (req, res) => {
    try {
        const { id } = req.params.id;
        const { status } = req.body;

        if (!status)
            return res.status(400).json({ message: "All fields are required!" });
        
        const project = await Project.findByIdAndUpdate(id, {
            status
        }, { new: true });

        return res.status(200).json({message: "Project status updated successfully!", project});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

DeleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Project deleted successfully!"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProject,
    getAllProjects,
    UpdateProjectStatus,
    DeleteProject,
    getOneProject
};