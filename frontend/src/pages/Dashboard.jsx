
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import TaskContext from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { tasks, assignedTasks, isLoading, getTasks, getAssignedTasks } = useContext(TaskContext);
    const [filter, setFilter] = useState('all'); // all, pending, completed

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        getTasks();
        getAssignedTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, navigate]);

    if (isLoading) {
        return <div className="text-center mt-20 text-blue-600">Loading Tasks...</div>;
    }

    const filterTasks = (taskList) => {
        if (filter === 'all') return taskList;
        return taskList.filter(task => task.status === filter);
    };

    const filteredMyTasks = filterTasks(tasks);
    const filteredAssignedTasks = filterTasks(assignedTasks);

    return (
        <section className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-md">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome, {user && user.name}
                        </h1>
                        <p className="text-gray-500 mt-2">Manage your tasks and collaborate.</p>
                    </div>

                    <div className="mt-4 sm:mt-0">
                        <label htmlFor="filter" className="mr-2 font-medium text-gray-700">Filter By:</label>
                        <select
                            id="filter"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Tasks</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </header>

                <TaskForm />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* My Tasks Column */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
                            My Created Tasks
                        </h2>
                        {filteredMyTasks.length > 0 ? (
                            <div className="space-y-4">
                                {filteredMyTasks.map((task) => (
                                    <TaskItem key={task._id} task={task} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic mt-4">You have no {filter !== 'all' ? filter : ''} tasks created.</p>
                        )}
                    </div>

                    {/* Assigned Tasks Column */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2 inline-block">
                            Tasks Assigned to Me
                        </h2>
                        {filteredAssignedTasks.length > 0 ? (
                            <div className="space-y-4">
                                {filteredAssignedTasks.map((task) => (
                                    <TaskItem key={task._id} task={task} isAssignedToUser={true} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic mt-4">You have no {filter !== 'all' ? filter : ''} tasks assigned to you.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
