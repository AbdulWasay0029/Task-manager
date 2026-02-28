import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskItem = ({ task, isAssignedToUser }) => {
    const { _id, title, description, status, createdAt, assignedTo, createdBy } = task;
    const { deleteTask, toggleTaskStatus } = useContext(TaskContext);

    return (
        <div className={`bg-white rounded-lg shadow-md p-6 mb-4 ${status === 'completed' ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'} hover:shadow-lg transition duration-200`}>
            <div className="flex justify-between items-center mb-2">
                <h3 className={`text-lg font-semibold ${status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {title}
                </h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {status}
                </span>
            </div>

            <p className="text-gray-600 mb-4 text-sm">{description}</p>

            <div className="flex flex-col space-y-2 text-xs text-gray-500 mb-4">
                <span>Created: {new Date(createdAt).toLocaleString()}</span>

                {isAssignedToUser && createdBy && (
                    <span className="font-medium text-blue-600">Assigned by: {createdBy.name || 'Unknown'} ({createdBy.email})</span>
                )}

                {!isAssignedToUser && assignedTo && (
                    <span className="font-medium text-purple-600">Assigned to: {assignedTo.name || 'Unknown'} ({assignedTo.email})</span>
                )}
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    onClick={() => toggleTaskStatus(task)}
                    className={`px-3 py-1 rounded text-sm font-medium text-white transition-colors ${status === 'completed' ? 'bg-gray-400 hover:bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
                </button>

                {/* Only show delete for created tasks, not assigned ones (unless backend allows, but we restricted backend) */}
                {!isAssignedToUser && (
                    <button
                        onClick={() => deleteTask(_id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
