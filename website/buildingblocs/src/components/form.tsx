import React from "react";
import FileUpload from "./fileupload";
import { motion } from "framer-motion";

export interface FormProps {
    onSubmit ?: (e: React.FormEvent) => void;
    className?: string;
}

function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    // Special case, only for buttons with id= "submit-button"
    if (!submitter || submitter.id!== "submit-button") {return;}
    const notification = document.createElement("div");
    notification.className =
        "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    notification.textContent = "Hazard reported successfully!";
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

export default function Form({}: FormProps) {
    return (
        <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`sm:w-full md:max-w-2xl bg-neutral-300/20 hover:bg-neutral-300/30 text-neutral-600 backdrop-blur-[1px] border border-neutral-400/20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-sf-pro font-medium text-lg flex flex-col gap-8 p-10`}
            onSubmit={handleSubmit}
        >
            <FileUpload onFileSelect={(file) => console.log(file.name)} />
            <motion.button
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                id="submit-button"
                type="submit"
                className="px-6 py-3 bg-neutral-300/20 hover:bg-neutral-300/30 text-neutral-600 backdrop-blur-[1px] border border-neutral-400/20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-sf-pro font-medium text-lg"
            >
                Submit
            </motion.button>
        </motion.form>
    );
}
