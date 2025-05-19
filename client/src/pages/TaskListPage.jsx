import React, { useEffect, useState } from "react";
import Badge from "../components/Badge";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import { showToast } from "../helper/showToast";

const TaskListPage = () => {
    const [refresh, setRefresh] = useState(false);
    const [tasks, setTasks] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setRefresh(false);
        const getTask = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/get-all-task`);
                const responseData = await response.json();
                setTasks(responseData);
            } catch (error) {
                showToast('error', 'Failed to fetch tasks');
            } finally {
                setIsLoading(false);
            }
        };
        getTask();
    }, [refresh]);

    const deleteTask = async (taskid) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/delete-task/${taskid}`, {
                method: 'DELETE'
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setRefresh(true);
            showToast('success', responseData.message);
        } catch (error) {
            showToast('error', error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
                <Link 
                    to="/add-task" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    Add New Task
                </Link>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            ) : tasks && tasks.status ? (
                <div className="space-y-4">
                    {tasks.taskData.length > 0 ? (
                        tasks.taskData.map((task) => (
                            <Task key={task._id} props={task} onDelete={deleteTask} />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <svg 
                                className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                                />
                            </svg>
                            <p className="text-gray-600 text-lg">No tasks found</p>
                            <Link 
                                to="/add-task" 
                                className="mt-4 inline-block text-blue-600 hover:text-blue-700"
                            >
                                Create your first task
                            </Link>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8 text-red-500">
                    Failed to load tasks. Please try again.
                </div>
            )}
        </div>
    );
};

export default TaskListPage;