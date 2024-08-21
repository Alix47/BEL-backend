// index.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// CRUD operations for Projects

// Create a new project
app.post('/projects', async (req, res) => {
    const { projectName, description, startDate, endDate, status, estimatedValue, teamMembers, technologies, category } = req.body;
    try {
        const project = await prisma.project.create({
            data: {
                projectName,
                description,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                status,
                estimatedValue,
                teamMembers,
                technologies,
                category
            }
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Error creating project' });
    }
});

// Read all projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching projects' });
    }
});

// Read a single project by ID
app.get('/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const project = await prisma.project.findUnique({
            where: { id: parseInt(id) },
            include: { tasks: true }
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching project' });
    }
});

// Update a project
app.put('/projects/:id', async (req, res) => {
    const { id } = req.params;
    const {
        projectName,
        description,
        startDate,
        endDate,
        status,
        estimatedValue,
        teamMembers,
        technologies,
        category
    } = req.body;

    try {
        const project = await prisma.project.update({
            where: { id: parseInt(id) },
            data: {
                projectName,
                description,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                status,
                estimatedValue: estimatedValue ? parseFloat(estimatedValue) : null,
                teamMembers,
                technologies,
                category
            }
        });
        res.json(project);
    } catch (error) {
        console.error('Error updating project:', error);  // Log error for debugging
        res.status(500).json({ error: 'Error updating project' });
    }
});

// Delete a project
app.delete('/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.project.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting project' });
    }
});

// CRUD operations for Tasks

// Create a new task
app.post('/tasks', async (req, res) => {
    const { projectId, taskName, description, status, assignedTo } = req.body;
    try {
        const task = await prisma.task.create({
            data: {
                projectId,
                taskName,
                description,
                status,
                assignedTo
            }
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

// Read all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Read a single task by ID
app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) },
            include: { project: true }
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task' });
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { projectId, taskName, description, status, assignedTo } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id: parseInt(id) },
            data: {
                projectId,
                taskName,
                description,
                status,
                assignedTo
            }
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
