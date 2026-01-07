import { useState, useEffect } from 'react';
import axios from 'axios';

const DashBoard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/task/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description, userId };

        try {
            if (editingId) {
                await axios.put(`http://localhost:3000/task/tasks/${editingId}`, taskData);
                setEditingId(null);
            } else {
                await axios.post('http://localhost:3000/task/tasks', taskData);
            }
            setTitle('');
            setDescription('');
            setUserId('');
            fetchTasks();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setUserId(task.userId);
        setEditingId(task.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/task/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Task Dashboard</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter task title"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter task description"
                            rows={4}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">User ID</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your user ID"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {editingId ? 'Update Task' : 'Add Task'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setTitle('');
                                    setDescription('');
                                    setUserId('');
                                }}
                                className="flex-1 bg-gray-400 text-white font-bold py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Tasks</h3>
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h4 className="font-bold text-lg text-gray-800">{task.title}</h4>
                                <p className="text-gray-600 mt-2">{task.description}</p>
                                <p className="text-sm text-gray-500 mt-2">User ID: {task.userId}</p>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
