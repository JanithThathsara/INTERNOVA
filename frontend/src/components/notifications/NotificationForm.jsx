import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function NotificationForm({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        type: "info",
        message: "",
        targetUser: "all"
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.length < 5) {
            newErrors.message = "Message must be at least 5 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);

            // Reset form
            setFormData({
                type: "info",
                message: "",
                targetUser: "all"
            });
            setErrors({});
            onClose();
        } catch (error) {
            console.error('Failed to create notification:', error);
            setErrors({ submit: 'Failed to create notification. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            type: "info",
            message: "",
            targetUser: "all"
        });
        setErrors({});
        onClose();
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'info':
                return (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'system':
                return (
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="w-full max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 17H9a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v10z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Create Notification</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Message */}
                    {errors.submit && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-700 text-sm">{errors.submit}</p>
                            </div>
                        </div>
                    )}

                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Notification Type *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { value: 'info', label: 'Information', color: 'blue' },
                                { value: 'warning', label: 'Warning', color: 'yellow' },
                                { value: 'error', label: 'Error', color: 'red' },
                                { value: 'system', label: 'System', color: 'indigo' }
                            ].map((type) => (
                                <label
                                    key={type.value}
                                    className={`relative flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${formData.type === type.value
                                            ? `border-${type.color}-500 bg-${type.color}-50`
                                            : 'border-gray-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="type"
                                        value={type.value}
                                        checked={formData.type === type.value}
                                        onChange={handleInputChange}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center space-x-2">
                                        {getTypeIcon(type.value)}
                                        <span className="text-sm font-medium text-gray-900">{type.label}</span>
                                    </div>
                                    {formData.type === type.value && (
                                        <div className="absolute top-2 right-2">
                                            <svg className={`w-4 h-4 text-${type.color}-600`} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Message Input */}
                    <Input
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        error={errors.message}
                        placeholder="Enter your notification message..."
                        required
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        }
                    />

                    {/* Target User Selection */}
                    <div>
                        <label htmlFor="targetUser" className="block text-sm font-medium text-gray-700 mb-2">
                            Target Audience
                        </label>
                        <select
                            id="targetUser"
                            name="targetUser"
                            value={formData.targetUser}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="all">All Users</option>
                            <option value="students">Students Only</option>
                            <option value="teachers">Teachers Only</option>
                            <option value="admin">Administrators Only</option>
                            <option value="staff">Staff Only</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            }
                        >
                            Create Notification
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
