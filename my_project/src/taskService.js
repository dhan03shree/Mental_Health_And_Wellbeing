import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

// Fetch all tasks
export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

// Save a new task
export const saveTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data;
    } catch (error) {
        console.error("Error saving task:", error);
        throw error;
    }
};

// Update an existing task
export const updateTask = async (taskId, task) => {
    try {
        const response = await axios.put(`${API_URL}/${taskId}`, task);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

// Delete a task
export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${API_URL}/${taskId}`);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};
