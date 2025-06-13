"use client";

import OpenStreetMap from "@/components/map";
import Form from "@/components/form";
import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function MapPage() {
    return (
        <>
            <div className="w-full h-fit min-h-screen">
                <OpenStreetMap />
            </div>
            <div className="flex flex-col md:p-16 sm:px-8 px-4 sm:pt-10 w-full h-fit bg-gray-50 shadow-md items-center justify-center gap-12">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl font-semibold text-gray-800 tracking-tight"
                >
                    Report a Hazard
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-gray-600 max-w-2xl text-center"
                >
                    Help us improve the community by reporting hazards near you!
                </motion.p>
                <Form />
                <p className="text-sm text-gray-500 max-w-2xl text-center w-screen px-4">
                    Your report helps keep our community safe and informed. All
                    submissions are anonymous and reviewed by our team before
                    being forwarded to the appropriate authorities for action.
                </p>
            </div>
            <Footer backgroundColor="gray-50" textColor="gray-800" />
        </>
    );
}
