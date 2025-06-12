"use client";

import { motion } from "framer-motion";

export default function ContentCard({
    title,
    description,
    icon,
    delay = 0,
}: {
    title: string;
    description: string;
    icon?: string | React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2 },
            }}
            className="
                font-sf-pro flex flex-col justify-center items-center gap-4 
                bg-neutral-300/20 hover:bg-neutral-300/30 
                text-neutral-600 backdrop-blur-md 
                border border-neutral-400/20 
                rounded-2xl shadow-lg hover:shadow-xl
                transition-all duration-300 cursor-pointer
                group min-w-90 h-140 p-6
            "
        >
            {icon && (
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                    {icon}
                    </div>
            )}
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{duration: 0.5, delay }} className="text-2xl font-semibold text-center text-neutral-800 group-hover:text-neutral-900">
                {title}
            </motion.h2>
            <motion.p className="text-neutral-700 text-center text-md leading-relaxed">
                {description}
            </motion.p>
        </motion.div>
    );
}
