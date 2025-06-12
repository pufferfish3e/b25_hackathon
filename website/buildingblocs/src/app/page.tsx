"use client";

import EnhancedSTLViewer from "@/components/STLViewer";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
            <div className="text-center mb-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-gray-800 mb-4"
                >
                    Building Blocs
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-gray-600 text-lg"
                >
                    3D STL Viewer and Design Platform
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full max-w-4xl px-4"
            >
                <EnhancedSTLViewer stlPath="/models/visual_aid_connector_v3.stl" />
            </motion.div>
        </div>
    );
}
