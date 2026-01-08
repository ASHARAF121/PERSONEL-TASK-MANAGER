import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description };

        try {
            if (editingId) {
                await axios.put(`http://localhost:3000/api/tasks/${editingId}`, taskData);
                setEditingId(null);
            } else {
                await axios.post('http://localhost:3000/api/tasks', taskData);
            }
            setTitle('');
            setDescription('');
            fetchTasks();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setEditingId(task._id || task.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setTitle('');
        setDescription('');
    };

    const handleLogout = () => {
        
        localStorage.removeItem('token');  
        

        
        navigate('/login');  
    };


    return (
        <div className="min-h-screen bg-linear-to-br from-blue-100 to-purple-200 flex flex-col items-center py-10">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Task Dashboard</h2>
                
                 {/* Logout Button */}
                <div className="mb-6 text-center">
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Description"
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
                                onClick={handleCancel}
                                className="flex-1 bg-gray-400 text-white font-bold py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Tasks</h3>
                    <div className="grid gap-4">
                        {tasks.length === 0 && (
                            <div className="text-center text-gray-500">No tasks found.</div>
                        )}
                        {tasks.map((task) => (
                            <div
                                key={task._id || task.id}
                                className="bg-white p-6 rounded-lg border border-gray-200 shadow flex flex-col md:flex-row md:items-center md:justify-between"
                            >
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">{task.title}</h4>
                                    <p className="text-gray-600">{task.description}</p>
                                </div>
                                <div className="flex gap-2 mt-4 md:mt-0">
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task._id || task.id)}
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
