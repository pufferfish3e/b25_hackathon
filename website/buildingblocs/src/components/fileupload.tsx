"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Used a bit of AI assistance to create a file upload component with drag-and-drop functionality, file validation, and preview, for drag and drop upload functionality (I didn't know how the logic worked before)

interface FileUploadProps {
    onFileSelect?: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (selectedFile: File): boolean => {
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError("File size exceeds 5MB limit.");
            return false;
        }

        // Check file type
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/bmp",
        ];
        if (!allowedTypes.includes(selectedFile.type)) {
            setError("Please upload a valid image file (JPG, PNG, GIF, BMP).");
            return false;
        }

        setError(null);
        return true;
    };

    const handleFileSelect = (selectedFile: File) => {
        if (validateFile(selectedFile)) {
            setFile(selectedFile);
            onFileSelect?.(selectedFile);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            {/* Header */}
            <div className="text-center mb-6">
                <h3 className="text-lg font-bold font-sf-pro text-gray-800 mb-2">
                    📷 Upload Image
                </h3>
                <p className="text-sm text-gray-600 font-sf-pro">
                    Select an image file to upload
                </p>
            </div>

            {/* Upload Area */}
            <motion.div
                className={`max-w-md relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
                    isDragOver
                        ? "border-blue-500 bg-blue-50"
                        : file
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={!file ? handleUploadClick : undefined}
                whileHover={{ scale: file ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.bmp"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {!file ? (
                    <div className="space-y-4">
                        <div className="text-4xl">📁</div>
                        <div>
                            <p className="text-gray-600 mb-3 font-sf-pro">
                                Drag & drop an image here, or
                            </p>
                            <motion.button
                                onClick={handleUploadClick}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-sf-pro font-medium hover:bg-blue-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Choose File
                            </motion.button>
                        </div>
                        <p className="text-xs text-gray-500 font-sf-pro">
                            JPG, PNG, GIF, BMP • Max 5MB
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Preview */}
                        {preview && (
                            <div className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <motion.button
                                    onClick={clearFile}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    ✕
                                </motion.button>
                            </div>
                        )}

                        <div className="text-sm text-gray-700 font-sf-pro">
                            <p className="font-medium">📎 {file.name}</p>
                            <p className="text-gray-500">
                                📏 {(file.size / 1024).toFixed(1)} KB
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-green-600">
                            <span>✓</span>
                            <span className="text-sm font-medium">
                                File uploaded successfully!
                            </span>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-sf-pro flex items-center gap-2"
                    >
                        <span>⚠️</span>
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
