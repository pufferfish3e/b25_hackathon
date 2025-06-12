"use client";

import Marquee from "@/components/marquee";
import Image from "next/image";
//stefankudla.com/posts/how-to-create-a-marquee-with-framer-motion-and-react#step-3-create-the-imagemarquee-component
const ImageMarquee = () => {
    const images = [
        {
            src: "/images/cone.jpg",
            alt: "cone",
            width: 300,
            height: 300,
        },
        {
            src: "/images/door.jpg",
            alt: "door",
            width: 300,
            height: 300,
        },
        {
            src: "/images/fence.jpg",
            alt: "fence",
            width: 300,
            height: 300,
        },
        {
            src: "/images/garbage.jpg",
            alt: "garbage",
            width: 300,
            height: 300,
        },
        {
            src: "/images/plant.jpg",
            alt: "plant",
            width: 300,
            height: 300,
        },
        {
            src: "/images/slipperyhole.jpeg",
            alt: "slippery hole",
            width: 300,
            height: 300,
        },
    ];

    return (
        <div className="w-full py-16 bg-gray-50">
            <Marquee speed={20} gapBetween={32}>
                <div className="flex gap-8">
                    {images.map((image, index) => (
                        <div key={index} className="flex-shrink-0">
                            <div className="relative w-80 h-60 bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">

                                <Image
                                    src={image.src}
                                    width={image.width}
                                    height={image.height}
                                    alt={image.alt}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default ImageMarquee;
