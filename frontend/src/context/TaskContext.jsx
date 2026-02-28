
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const API_URL = "http://localhost:5000/api/tasks";

    // Get token helper
    const getToken = () => {
        const token = localStorage.getItem("token");
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    // Get user's created tasks
    const getTasks = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${API_URL}/my`, getToken());
            setTasks(data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching tasks");
        }
        setIsLoading(false);
    };

    // Get tasks assigned to user
    const getAssignedTasks = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${API_URL}/assigned`, getToken());
            setAssignedTasks(data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching assigned tasks");
        }
        setIsLoading(false);
    };

    // Create Task
    const createTask = async (taskData) => {
        setIsLoading(true);
        try {
            const { data } = await axios.post(`${API_URL}/create`, taskData, getToken());
            setTasks([...tasks, data]);
            toast.success("Task created successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating task");
            return false;
        }
        setIsLoading(false);
    };

    // Delete Task
    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await axios.delete(`${API_URL}/delete/${id}`, getToken());
            setTasks(tasks.filter((task) => task._id !== id));
            toast.success("Task deleted");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting task");
        }
    };

    // Toggle Task Status
    const toggleTaskStatus = async (task) => {
        try {
            const { data } = await axios.put(`${API_URL}/toggle/${task._id}`, {}, getToken());

            // Update in both lists if present
            setTasks(tasks.map((t) => (t._id === task._id ? data : t)));
            setAssignedTasks(assignedTasks.map((t) => (t._id === task._id ? data : t)));

        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating task");
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                assignedTasks,
                isLoading,
                getTasks,
                getAssignedTasks,
                createTask,
                deleteTask,
                toggleTaskStatus,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
