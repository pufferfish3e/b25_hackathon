"use client";

import ContentCard from "@/components/contentcard";
import ImageMarquee from "@/components/imagemarquee";
import EnhancedSTLViewer from "@/components/STLViewer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {
    return (
        <main>
            <section
                id="home"
                className="relative w-screen h-screen overflow-x-hidden"
            >
                <Image
                    src="/images/background.png"
                    alt="Background"
                    fill
                    className="object-cover w-full h-full absolute z-0 backdrop-blur-sm"
                />
                <div className="flex flex-col items-center justify-center w-screen min-h-screen relative bg-transparent">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-bold text-black font-sf-pro z-10 absolute top-8 
                        text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                        text-center w-full px-4
                        drop-shadow-2xl shadow-white/50
                        leading-tight tracking-tight
                        pt-20"
                    >
                        Meet Percepta.
                    </motion.h1>
                    <motion.div className="w-screen max-w-4xl px-4 flex justify-center items-center pb-20">
                        <EnhancedSTLViewer stlPath="/models/visual_aid_connector_v3.stl" />
                    </motion.div>
                    <div className="text-center mb-8">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-900 text-lg font-sf-pro z-10"
                        ></motion.p>
                    </div>
                </div>
            </section>
            <section
                id="about"
                className="relative w-screen h-screen overflow-hidden"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center justify-center w-screen min-h-screen relative gap-8 bg-gray-50"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <ImageMarquee />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="font-bold text-black font-sf-pro z-10 text-6xl tracking-tighter"
                    >
                        What is Percepta?
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-gray-900 text-lg font-sf-pro z-10 text-center max-w-200 "
                    >
                        Percepta is a smart, attachable camera that clips onto
                        your glasses. Inside, it runs a lightweight machine
                        learning model that continuously analyzes your
                        surroundings in real time, seamlessly connecting to a
                        companion app that collects data on nearby hazards.
                        Packed with powerful features like hazard detection and
                        audio feedback, Percepta is designed in mind to enhance
                        your awareness and transform the way you interact with
                        the world.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <ImageMarquee />
                    </motion.div>
                </motion.div>
            </section>
            <section className="relative w-screen h-fill overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center justify-center max-w-screen min-h-screen relative gap-8 bg-gradient-to-b from-gray-50 to-[#e8e8e9]"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-bold text-black font-sf-pro z-10 text-6xl tracking-tighter"
                    >
                        Why Percepta?
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full px-4 pt-10"
                    >
                        <ContentCard
                            title={
                                "Hazard Detection – See the Unseen Before It Happens"
                            }
                            description={
                                "Our device comes with an attachable clip  and a lightweight machine learning model that continuously analyzes the user's environment in real-time. The system is trained to recognize common walkway hazards—such as stairs, curbs, potholes, and uneven surfaces—by processing video frames using convolutional neural networks (CNNs). Once a potential hazard is detected, the system instantly flags it for further action, allowing for proactive support and risk mitigation for you."
                            }
                            icon={"🎯"}
                            delay={0.6}
                        />
                        <ContentCard
                            title={
                                "Audio Feedback – Your Environment, Spoken to You"
                            }
                            description={
                                "To ensure hands-free accessibility, the device delivers immediate and intuitive audio alerts, straight to you. The device will also send a notification to your phone that will be read out as another precaution too. These cues are context-aware—adjusting in urgency based on the severity or proximity of the detected hazard. This feature is designed to keep you informed without overwhelming you, allowing you to navigate your environment with confidence and ease."
                            }
                            icon={"⚡"}
                            delay={0.8}
                        />
                        <ContentCard
                            title={"Location Alerts – Know Where the Risks Are"}
                            description={
                                "Empowered navigation starts with knowledge. Every detected hazard is mapped and tagged via GPS, so you—and others—can get alerts before reaching problem areas. Imagine a map that evolves with your city, warning users in advance and helping people plan safer routes in real time, Because that’s exactly what we are making."
                            }
                            icon={"🌍"}
                            delay={1.0}
                        />
                        <ContentCard
                            title={
                                "Community Safety – Smarter Together, Safer Together"
                            }
                            description={
                                "One person’s alert helps everyone. Each detection is anonymously shared with a growing community of users and local authorities, straight back to a shared map on the app, creating a live hazard awareness network. From daily commutes to emergency response, this system transforms personal safety into collective intelligence."
                            }
                            icon={"👥"}
                            delay={1.2}
                        />
                    </motion.div>
                </motion.div>
            </section>
            <section className="relative w-screen h-screen overflow-x-hidden ">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center justify-center w-screen min-h-screen relative gap-8 bg-[#e8e8e9]"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-bold text-black font-sf-pro z-10 text-6xl tracking-tighter overflow-hidden text-center"
                    >
                        Who can benefit from Percepta?
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-gray-900 text-lg font-sf-pro z-10 text-center max-w-200"
                    >
                        Percepta is designed to empower blind and visually
                        impaired individuals with greater awareness and safety
                        in their surroundings. Whether you&apos;re navigating
                        busy streets, exploring unfamiliar areas, or managing
                        daily tasks, Percepta offers real-time support to help
                        you stay informed, confident, and independent.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Image
                            src="/images/demo.png"
                            alt="Percepta Demo"
                            width={400}
                            height={600}
                        />
                    </motion.div>
                </motion.div>
            </section>
            <section className="relative w-screen h-screen overflow-hidden ">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center justify-center w-screen min-h-screen relative gap-8 bg-gradient-to-b from-[#e8e8e9] to-black"
                >
                    <motion.div className="w-screen max-w-4xl px-4 flex justify-center items-center pb-20">
                        <EnhancedSTLViewer stlPath="/models/visual_aid_connector_v3.stl" />
                    </motion.div>
                    <motion.button
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-12 py-4 bg-neutral-300/20 hover:bg-neutral-300/30 text-neutral-600 backdrop-blur-md border border-neutral-400/20 rounded-xl shadow-lg overflow-hidden group"
                    >
                        <Link
                            href="/percepta"
                            className="bg-gradient-to-r text-white font-hack"
                        >
                            Try Percepta
                        </Link>
                    </motion.button>
                </motion.div>
            </section>
            <Footer backgroundColor="black" textColor="gray-50"/>
        </main>
    );
}
