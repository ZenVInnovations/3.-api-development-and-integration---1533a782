import React, { useEffect, useState } from "react";
import { z, ZodError } from 'zod'
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";
import { useParams } from "react-router-dom";

const ShowTask = () => {
    const { taskid } = useParams()
    const [apiData, setApiData] = useState()
    const [formData, setFormData] = useState()
    const [err, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const taskSchema = z.object({
        title: z.string().min(3, { message: "Title must be at least 3 character long." }),
        description: z.string().min(3, { message: "Description must be at least 3 character long." }).max(500, { message: 'Length exceeded.' }),
        status: z.enum(['Pending', 'Running', 'Completed', 'Failed'])
    })

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        // Clear error when typing
        if (err && err[e.target.name]) {
            setError({...err, [e.target.name]: null})
        }
    }

    useEffect(() => {
        const getTask = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/show-task/${taskid}`)
                const responseData = await response.json()
                setApiData(responseData)
                setFormData(responseData.taskData)
            } catch (error) {
                showToast('error', "Failed to load task data")
            } finally {
                setIsLoading(false)
            }
        }
        getTask()
    }, [taskid])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const validatedData = taskSchema.parse(formData)
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/update-task/${taskid}`,
                {
                    method: "PUT",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(validatedData)
                })

            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
             
            showToast('success', responseData.message)
        } catch (error) {
            if (error instanceof ZodError) {
                const getError = getZodError(error.errors)
                setError(getError)
            }
            showToast('error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto pt-10 px-4 sm:px-6 text-center">
                <div className="animate-pulse bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <div className="h-8 bg-gray-200 rounded mb-6 w-1/3 mx-auto"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-24 bg-gray-200 rounded mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto pt-10 px-4 sm:px-6">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-indigo-600">Task Details</h1>
                    <p className="text-gray-500 mt-2">View and update task information</p>
                </div>

                {apiData && apiData.status ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Title
                            </label>
                            <input 
                                value={formData?.title || ''} 
                                onChange={handleInput} 
                                name="title"
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 
                                        transition-all duration-200"
                                placeholder="Task title"
                                required
                            />
                            {err && err.title && (
                                <span className="text-red-500 text-sm mt-1 block">{err.title}</span>
                            )}
                        </div>
                        
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Description
                            </label>
                            <textarea 
                                value={formData?.description || ''} 
                                onChange={handleInput} 
                                name="description"
                                rows="5"
                                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
                                          border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500
                                          transition-all duration-200 resize-none"
                                placeholder="Task description..."
                            ></textarea>
                            {err && err.description && (
                                <span className="text-red-500 text-sm mt-1 block">{err.description}</span>
                            )}
                            <div className="text-xs text-right mt-1 text-gray-500">
                                {formData?.description?.length || 0}/500 characters
                            </div>
                        </div>
                        
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Status
                            </label>
                            <select 
                                onChange={handleInput} 
                                name="status" 
                                value={formData?.status || ''} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                        focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3
                                        transition-all duration-200 appearance-none"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Running">Running</option>
                                <option value="Completed">Completed</option>
                                <option value="Failed">Failed</option>
                            </select>
                            {err && err.status && (
                                <span className="text-red-500 text-sm mt-1 block">{err.status}</span>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`text-white bg-gradient-to-r from-indigo-600 to-indigo-700 
                                         hover:from-indigo-700 hover:to-indigo-800 focus:ring-4 
                                         focus:outline-none focus:ring-indigo-300 font-medium rounded-lg 
                                         text-sm px-6 py-3 text-center transition-all duration-300
                                         shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Updating...' : 'Update Task'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-5 text-center bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-700">Task not found or has been deleted.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowTask