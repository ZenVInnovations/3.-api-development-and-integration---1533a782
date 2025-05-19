import React, { useState } from "react";
import { z, ZodError } from 'zod'
import { getZodError } from "../helper/getZodError";
import { showToast } from "../helper/showToast";

const HomePage = () => {
    const [formData, setFormData] = useState({})
    const [err, setError] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const taskSchema = z.object({
        title: z.string().min(3, { message: "Title must be at least 3 character long." }),
        description: z.string().min(3, { message: "Description must be at least 3 character long." }).max(500, { message: 'Length exceeded.' })
    })

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        // Clear error when typing
        if (err && err[e.target.name]) {
            setError({...err, [e.target.name]: null})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const validatedData = taskSchema.parse(formData)
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/create-task`,
                {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(validatedData)
                })

            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            setFormData({})
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

    return (
        <div className="max-w-2xl mx-auto pt-10 px-4 sm:px-6">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-indigo-600">Add New Task</h1>
                    <p className="text-gray-500 mt-2">Enter the details for your new task below</p>
                </div>
                
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
                            placeholder="Enter task title"
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
                            placeholder="What needs to be done..."
                        ></textarea>
                        {err && err.description && (
                            <span className="text-red-500 text-sm mt-1 block">{err.description}</span>
                        )}
                        <div className="text-xs text-right mt-1 text-gray-500">
                            {formData?.description?.length || 0}/500 characters
                        </div>
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
                            {isSubmitting ? 'Creating...' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HomePage;