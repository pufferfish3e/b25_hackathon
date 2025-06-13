"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Form from "@/components/form";
import Image from "next/image";

// Integrates ElevenLabs Text-to-Speech API for client-side usage
// Has A fallback to browser speech synthesis if ElevenLabs API fails or is unavailable

export default function DemoPage() {
    const [text, setText] = useState(
        "Click the button to run the demo and see the result here."
    );
    const [isPlaying, setIsPlaying] = useState(false);
    const playTextToSpeech = async () => {
        try {
            setIsPlaying(true);
            const response = await fetch("/api/text-to-speech", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: text }),
            });

            if (response.ok) {
                const contentType = response.headers.get("content-type");

                if (contentType?.includes("audio")) {
                    const audioBlob = await response.blob();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    audio.onended = () => {
                        setIsPlaying(false);
                        URL.revokeObjectURL(audioUrl);
                    };
                    await audio.play();
                }
            }
        } catch (e) {
            // Use speech synthesis if cannot use ElevenLabs
            console.error("Error during ElevenLabs TTS:", e);
            if ("speechSynthesis" in window) {
                try {
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.rate = 0.8;
                    utterance.pitch = 1;
                    utterance.volume = 1;

                    utterance.onend = () => {
                        setIsPlaying(false);
                    };

                    speechSynthesis.speak(utterance);
                } catch (fallbackError) {
                    console.error(
                        "Fallback speech synthesis failed:",
                        fallbackError
                    );
                    setIsPlaying(false);
                }
            } else {
                setIsPlaying(false);
            }
        }
    };
    return (
        <main
            className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/images/background2.png')",
            }}
        >
            <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-sm"></div>
            <div className="relative z-10 w-screen text-center p-8 flex flex-col items-center justify-center min-h-screen gap-8">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-6xl font-bold text-gray-800 pt-20"
                >
                    Percepta Demo
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-gray-600"
                >
                    This is a demo page for the Percepta project. You can upload
                    files and run the demo to see how it works.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-screen flex justify-center items-center"
                >
                    <Form />
                </motion.div>
                <div className="w-screen flex flex-col items-center justify-center gap-8">
                    <div className="flex gap-4 w-full max-w-md">
                        <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            onClick={() => {
                                setTimeout(() => {
                                    setText("There is a hazard detected in front of you. Please be careful as there is a slippery hole near you.");
                                }, 2000);
                            }}
                            className="bg-neutral-300/20 hover:bg-neutral-300/30 text-neutral-600 backdrop-blur-[1px] border border-neutral-400/20 py-2 px-4 rounded flex-1 relative z-40"
                        >
                            Run Demo
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            onClick={playTextToSpeech}
                            disabled={isPlaying}
                            className={`${
                                isPlaying
                                    ? "bg-black text-white cursor-not-allowed"
                                    : "bg-neutral-300/20 hover:bg-neutral-300/30 text-neutral-600 backdrop-blur-[1px] border border-neutral-400/20"
                            } py-2 px-4 rounded flex-1 transition-colors`}
                        >
                            {isPlaying
                                ? "🔊 Playing..."
                                : "🔊 Test Notification"}
                        </motion.button>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        id="result"
                        className="w-screen max-w-md border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 relative z-40"
                    >
                        <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 w-full">
                            <div className="relative w-18 h-18 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
                                <Image
                                    src="/icons/android-chrome-512x512.png"
                                    alt="Icon"
                                    fill
                                    className="absolute max-w-18 max-h-18 object-cover rounded-full"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font bold text-gray-800 text-lg font-bold text-left pl-3">
                                    Percepta
                                </h3>
                                <p className="text-gray-600 text-sm text-left pl-3">
                                    {text}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
