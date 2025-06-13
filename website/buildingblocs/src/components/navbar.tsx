"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <nav className="w-screen flex items-center justify-center h-30 bg-transparent absolute z-50">
            <motion.ul
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="fixed font-sf-pro flex flex-row justify-center items-center gap-6 w-fit h-12 bg-neutral-300/20 hover:bg-neutral-300/30 text-neutral-600 backdrop-blur-md border border-neutral-400/20 px-8 py-3 rounded-full shadow-lg"
            >
                <motion.li
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="hover:text-neutral-800 transition-colors duration-200"
                >
                    <Link
                        href="/#home"
                        className="px-3 py-2 rounded-md hover:bg-white/20 transition-all"
                    >
                        Home
                    </Link>
                </motion.li>
                <motion.li
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="hover:text-neutral-800 transition-colors duration-200"
                >
                    <Link
                        href="/#about"
                        className="px-3 py-2 rounded-md hover:bg-white/20 transition-all"
                    >
                        About
                    </Link>
                </motion.li>
                <motion.li
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="hover:text-neutral-800 transition-colors duration-200"
                >
                    <Link
                        href="/map"
                        className="px-3 py-2 rounded-md hover:bg-white/20 transition-all"
                    >
                        Map
                    </Link>
                </motion.li>
                <motion.li
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="hover:text-neutral-800 transition-colors duration-200"
                >
                    <Link
                        href="/percepta"
                        className="px-3 py-2 rounded-md hover:bg-white/20 transition-all"
                    >
                        Demo
                    </Link>
                </motion.li>
            </motion.ul>
        </nav>
    );
}

// for cards: bg-neutral-300/20 hover:bg-neutral-300/30 text-neutral-600 backdrop-blur-[1px] border border-neutral-400/20
