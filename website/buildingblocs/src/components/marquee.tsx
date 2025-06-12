"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// stefankudla.com/posts/how-to-create-a-marquee-with-framer-motion-and-react

const Marquee = ({
    children,
    gapBetween = 0,
    speed = 20,
    direction = "left",
}: {
    children: React.ReactNode | React.ReactNode[];
    gapBetween?: number;
    speed?: number;
    direction?: "left" | "right";
}) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [marqueeWidth, setMarqueeWidth] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && marqueeRef.current) {
            const updateWidth = () => {
                setMarqueeWidth(marqueeRef.current!.scrollWidth / 3);
            };

            updateWidth();
            window.addEventListener("resize", updateWidth);
            return () => window.removeEventListener("resize", updateWidth);
        }
    }, [isClient, children]);

    if (!isClient) {
        return null; // Prevent hydration mismatch
    }

    const duplicateChildren = new Array(3).fill(children);
    const animationDirection =
        direction === "left" ? [0, -marqueeWidth] : [-marqueeWidth, 0];

    return (
        <div className="overflow-hidden w-full">
            <motion.div
                ref={marqueeRef}
                animate={{
                    x: animationDirection,
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    duration: speed,
                }}
                className="flex items-center whitespace-nowrap"
                style={{
                    gap: `${gapBetween}px`,
                    minWidth: "max-content",
                }}
            >
                {duplicateChildren.map((child, index) => (
                    <div key={index} className="flex-shrink-0">
                        {child}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
