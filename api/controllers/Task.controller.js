import TaskModel from "../models/Task.model.js"

export const createTask = async (req, res) => {
    try {
        console.log("Received create task request:", req.body);
        const { title, description } = req.body
        const newTask = new TaskModel({
            title, description
        })
        await newTask.save()
        console.log("Task created successfully:", newTask);

        res.status(200).json({
            status: true,
            message: 'Task created successfully.'
        })
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
export const getAllTask = async (req, res) => {
    try {
        const taskData = await TaskModel.find().sort({ createdAt: -1 }).lean().exec()

        res.status(200).json({
            status: true,
            taskData
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
export const showTask = async (req, res) => {
    try {
        const { taskid } = req.params
        const taskData = await TaskModel.findById(taskid).lean().exec()

        res.status(200).json({
            status: true,
            taskData
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
export const updateTask = async (req, res) => {
    try {
        const { taskid } = req.params
        const { title, description, status } = req.body

        const taskData = await TaskModel.findByIdAndUpdate(taskid, { title, description, status }, { new: true })


        res.status(200).json({
            status: true,
            message: 'Task updated successfully.',
            taskData
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
export const deleteTask = async (req, res) => {
    try {
        const { taskid } = req.params

        await TaskModel.findByIdAndDelete(taskid)

        res.status(200).json({
            status: true,
            message: 'Task deleted successfully.',

        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}