
import { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { toast } from 'react-toastify';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedToEmail, setAssignedToEmail] = useState('');
    const [isAssigning, setIsAssigning] = useState(false);

    const { createTask } = useContext(TaskContext);

    const onSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            assignedToEmail: isAssigning ? assignedToEmail : null,
        };

        const success = await createTask(taskData);
        if (success) {
            setTitle('');
            setDescription('');
            setAssignedToEmail('');
            setIsAssigning(false);
            toast.success('Task created successfully!');
        }
    };

    return (
        <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Task</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        className="form-checkbox text-blue-600 h-5 w-5"
                        checked={isAssigning}
                        onChange={() => setIsAssigning(!isAssigning)}
                    />
                    <span className="text-gray-700 font-medium">Assign to another User?</span>
                </label>
            </div>

            {isAssigning && (
                <div className="mb-6 animate-fade-in-down">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedToEmail">
                        Assignee Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="assignedToEmail"
                        type="email"
                        placeholder="user@example.com"
                        value={assignedToEmail}
                        onChange={(e) => setAssignedToEmail(e.target.value)}
                        required={isAssigning}
                    />
                </div>
            )}

            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out w-full"
                type="submit"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
