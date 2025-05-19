import React, { useEffect, useState } from 'react'
import Badge from './Badge'
import { Link } from 'react-router-dom'

const Task = ({ props, onDelete }) => {
    const [badgecolor, setBadgecolor] = useState()
    useEffect(() => {
        if (props.status === 'Pending') {
            setBadgecolor('blue')
        }
        else if (props.status === 'Running') {
            setBadgecolor('yellow')
        }
        else if (props.status === 'Completed') {
            setBadgecolor('green')
        }
        else if (props.status === 'Failed') {
            setBadgecolor('red')
        }
    }, [props.status])

    const handleDelete = async () => {
        await onDelete(props._id)
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5 mb-5">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 flex-1 mr-3">
                    {props.title}
                </h3>
                <Badge props={{ color: badgecolor, text: props.status }} />
            </div>
            
            <p className="text-gray-600 line-clamp-2 mb-4 text-sm">
                {props.description}
            </p>
            
            <div className="flex gap-3 items-center justify-end mt-2">
                <Link 
                    to={`/show-task/${props._id}`} 
                    className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 
                              font-medium rounded-lg text-sm text-center inline-flex items-center p-2.5
                              transition-all duration-200"
                    title="View Task"
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                        />
                        <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    <span className="sr-only">View Task</span>
                </Link>
                
                <button 
                    onClick={handleDelete} 
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none 
                             focus:ring-red-300 font-medium rounded-lg text-sm text-center 
                             inline-flex items-center p-2.5 transition-all duration-200"
                    title="Delete Task"
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                    </svg>
                    <span className="sr-only">Delete Task</span>
                </button>
            </div>
        </div>
    )
}

export default Task