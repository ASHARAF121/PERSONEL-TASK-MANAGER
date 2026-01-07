import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

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

    return (
        <div className="w-full max-w-2xl mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Tasks</h3>
            {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks available.</p>
            ) : (
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li key={task._id} className="border-b pb-2">
                            <div className="font-semibold">{task.title}</div>
                            <div className="text-gray-700">{task.description}</div>
                            <div className="text-xs text-gray-400">User ID: {task.userId}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { TaskList };
