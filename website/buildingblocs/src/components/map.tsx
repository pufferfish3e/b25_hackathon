"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";

// Used AI to generate the code for a map component using OpenStreetMap and Leaflet
// This component displays a map with user location and hazard markers.

interface LocationData {
    lat: number;
    lng: number;
    loaded: boolean;
    error: string | null;
}

// Type for Leaflet library
type LeafletType = typeof import("leaflet");

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);

const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);

const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false,
});

const OpenStreetMap = () => {
    const [isClient, setIsClient] = useState(false);
    const [L, setL] = useState<LeafletType | null>(null);

    // Fix for default markers in Next.js - this runs on client side only
    useEffect(() => {
        setIsClient(true);

        // Import Leaflet only on client side
        import("leaflet").then((leaflet) => {
            setL(leaflet.default);

            // Fix default marker icons
            if (typeof window !== "undefined") {
                // @ts-expect-error - Leaflet icon fix requires prototype manipulation
                delete leaflet.default.Icon.Default.prototype._getIconUrl;
                leaflet.default.Icon.Default.mergeOptions({
                    iconRetinaUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
                    iconUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                    shadowUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                });
            }
        });
    }, []);

    const [center, setCenter] = useState<[number, number]>([
        1.29027, 103.851959,
    ]); // Default center (Singapore)
    // State to hold user's location
    const [userLocation, setUserLocation] = useState<LocationData>({
        lat: 0,
        lng: 0,
        loaded: false,
        error: null,
    });

    // Preloading random hazards for demo purposes
    // In a real application, this data would come from a backend service or API.
    const hazards = [
        { id: 1, lat: 1.3413, lng: 103.9636, type: "pothole" },
        { id: 2, lat: 1.3425, lng: 103.9649, type: "obstacle" },
        { id: 3, lat: 1.3404, lng: 103.9629, type: "stairs" },
        { id: 4, lat: 1.3435, lng: 103.9652, type: "slippery_hole" },
        { id: 5, lat: 1.3409, lng: 103.9641, type: "pothole" },
        { id: 6, lat: 1.3418, lng: 103.9638, type: "obstacle" },
        { id: 7, lat: 1.3423, lng: 103.9648, type: "stairs" },
        { id: 8, lat: 1.3395, lng: 103.9628, type: "slippery_hole" },
        { id: 9, lat: 1.3447, lng: 103.9658, type: "pothole" },
        { id: 10, lat: 1.3405, lng: 103.9638, type: "obstacle" },
        { id: 11, lat: 1.3426, lng: 103.9643, type: "stairs" },
        { id: 12, lat: 1.3398, lng: 103.9621, type: "slippery_hole" },
        { id: 13, lat: 1.3431, lng: 103.9651, type: "pothole" },
        { id: 14, lat: 1.3418, lng: 103.9638, type: "obstacle" },
        { id: 15, lat: 1.3426, lng: 103.9646, type: "stairs" },
        { id: 16, lat: 1.3388, lng: 103.962, type: "slippery_hole" },
        { id: 17, lat: 1.3437, lng: 103.9655, type: "pothole" },
        { id: 18, lat: 1.3406, lng: 103.9635, type: "obstacle" },
        { id: 19, lat: 1.3423, lng: 103.9648, type: "stairs" },
        { id: 20, lat: 1.3397, lng: 103.9628, type: "slippery_hole" },
        { id: 21, lat: 1.3434, lng: 103.9653, type: "pothole" },
        { id: 22, lat: 1.3415, lng: 103.9635, type: "obstacle" },
        { id: 23, lat: 1.3429, lng: 103.9649, type: "stairs" },
        { id: 24, lat: 1.3401, lng: 103.9631, type: "slippery_hole" },
        { id: 25, lat: 1.3417, lng: 103.9657, type: "pothole" },
        { id: 26, lat: 1.3409, lng: 103.9636, type: "obstacle" },
        { id: 27, lat: 1.3425, lng: 103.9644, type: "stairs" },
        { id: 28, lat: 1.3393, lng: 103.9626, type: "slippery_hole" },
        { id: 29, lat: 1.3432, lng: 103.9656, type: "pothole" },
        { id: 30, lat: 1.3416, lng: 103.964, type: "obstacle" },
        { id: 31, lat: 1.3427, lng: 103.9647, type: "stairs" },
        { id: 32, lat: 1.3396, lng: 103.9628, type: "slippery_hole" },
        { id: 33, lat: 1.3441, lng: 103.9657, type: "pothole" },
        { id: 34, lat: 1.3404, lng: 103.9633, type: "obstacle" },
        { id: 35, lat: 1.3423, lng: 103.9646, type: "stairs" },
        { id: 36, lat: 1.3389, lng: 103.9625, type: "slippery_hole" },
        { id: 37, lat: 1.3436, lng: 103.9657, type: "pothole" },
        { id: 38, lat: 1.3411, lng: 103.9637, type: "obstacle" },
        { id: 39, lat: 1.3425, lng: 103.9645, type: "stairs" },
        { id: 40, lat: 1.3394, lng: 103.9627, type: "slippery_hole" },
        { id: 41, lat: 1.3435, lng: 103.9658, type: "pothole" },
        { id: 42, lat: 1.3406, lng: 103.9634, type: "obstacle" },
        { id: 43, lat: 1.3422, lng: 103.9642, type: "stairs" },
        { id: 44, lat: 1.3393, lng: 103.9628, type: "slippery_hole" },
        { id: 45, lat: 1.3433, lng: 103.9652, type: "pothole" },
        { id: 46, lat: 1.3416, lng: 103.9639, type: "obstacle" },
        { id: 47, lat: 1.343, lng: 103.9648, type: "stairs" },
        { id: 48, lat: 1.34, lng: 103.963, type: "slippery_hole" },
        { id: 49, lat: 1.344, lng: 103.9656, type: "pothole" },
        { id: 50, lat: 1.3408, lng: 103.9635, type: "obstacle" },
    ];
    const ZOOM_LEVEL = 13;

    useEffect(() => {
        // Get user's current location
        if (
            isClient &&
            typeof navigator !== "undefined" &&
            navigator.geolocation
        ) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation({
                        lat,
                        lng,
                        loaded: true,
                        error: null,
                    });
                    setCenter([lat, lng]);
                },
                (error) => {
                    setUserLocation((prev) => ({
                        ...prev,
                        error: error.message,
                        loaded: true,
                    }));
                }
            );
        }
    }, [isClient]);
    if (!isClient) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gray-50 py-8"
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8 pt-18"
                    >
                        <motion.h1
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-4xl font-bold font-sf-pro text-black mb-4"
                        >
                            🗺️ Percepta Hazard Map
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 font-sf-pro"
                        >
                            Loading interactive safety map...
                        </motion.p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="h-96 md:h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                            <div className="text-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"
                                />
                                <motion.p
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    className="text-gray-600"
                                >
                                    🌍 Loading map components...
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    if (!L) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Leaflet...</p>
                </div>
            </div>
        );
    }

    // Custom icon for hazards
    const hazardIcon = L.divIcon({
        className: "custom-hazard-marker",
        html: '<div style="background-color: #ff4444; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-gray-50 py-8"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-center mb-8 pt-18"
                >
                    <motion.h1
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.3,
                        }}
                        className="text-4xl font-bold font-sf-pro text-black mb-4"
                    >
                        🗺️ Percepta Hazard Map
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-600 font-sf-pro"
                    >
                        Real-time hazard detection and community safety mapping
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                        type: "spring",
                        stiffness: 100,
                    }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    whileHover={{
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        transition: { duration: 0.3 },
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="h-96 md:h-[600px] relative overflow-hidden"
                    >
                        <motion.div
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.8 }}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <MapContainer
                                center={center}
                                zoom={ZOOM_LEVEL}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    zIndex: 1,
                                }}
                                className="z-0 rounded-lg"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {/* User location marker with animation */}
                                <AnimatePresence>
                                    {userLocation.loaded &&
                                        !userLocation.error && (
                                            <motion.div
                                                initial={{
                                                    scale: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    scale: 1,
                                                    opacity: 1,
                                                }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    delay: 1.2,
                                                }}
                                            >
                                                <Marker
                                                    position={[
                                                        userLocation.lat,
                                                        userLocation.lng,
                                                    ]}
                                                >
                                                    <Popup>
                                                        <motion.div
                                                            initial={{
                                                                y: 30,
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                y: 0,
                                                                opacity: 1,
                                                            }}
                                                            className="text-center"
                                                        >
                                                            <h3 className="font-semibold flex items-center gap-1">
                                                                📍 Your Location
                                                            </h3>
                                                            <p className="text-sm text-gray-600">
                                                                Current position
                                                            </p>
                                                        </motion.div>
                                                    </Popup>
                                                </Marker>
                                            </motion.div>
                                        )}
                                </AnimatePresence>

                                {/* Hazard markers with staggered animation */}
                                {hazards.map((hazard, index) => (
                                    <motion.div
                                        key={hazard.id}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            delay: 1.5 + index * 0.02,
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25,
                                        }}
                                    >
                                        <Marker
                                            position={[hazard.lat, hazard.lng]}
                                            icon={hazardIcon}
                                        >
                                            <Popup>
                                                <motion.div
                                                    initial={{
                                                        y: 30,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        y: 0,
                                                        opacity: 1,
                                                    }}
                                                    transition={{ delay: 0.1 }}
                                                    className="text-center"
                                                >
                                                    <h3 className="font-semibold capitalize flex items-center gap-1">
                                                        ⚠️
                                                        {hazard.type.replace(
                                                            "_",
                                                            " "
                                                        )}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Detected hazard
                                                    </p>
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{
                                                            delay: 0.2,
                                                        }}
                                                        className="text-xs text-gray-500 mt-1"
                                                    >
                                                        👥 Reported by Percepta
                                                        users
                                                    </motion.p>
                                                </motion.div>
                                            </Popup>
                                        </Marker>
                                    </motion.div>
                                ))}
                            </MapContainer>
                        </motion.div>
                    </motion.div>
                    {/* Map Legend with animation */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.6 }}
                        className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t"
                    >
                        <motion.h3
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="font-semibold mb-3 font-sf-pro flex items-center gap-2"
                        >
                            🗂️ Map Legend
                        </motion.h3>
                        <div className="flex flex-wrap gap-6 text-sm">
                            <motion.div
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 2.1 }}
                                className="flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 0 0 rgba(59, 130, 246, 0.4)",
                                            "0 0 0 8px rgba(59, 130, 246, 0)",
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"
                                />
                                <span>📍 Your Location</span>
                            </motion.div>
                            <motion.div
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 2.2 }}
                                className="flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 0 0 rgba(239, 68, 68, 0.4)",
                                            "0 0 0 6px rgba(239, 68, 68, 0)",
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: 0.5,
                                    }}
                                    className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow"
                                />
                                <span>⚠️ Detected Hazards</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Error message with animation */}
                <AnimatePresence>
                    {userLocation.error && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.9 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                            className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-md"
                        >
                            <motion.div
                                initial={{ x: 30 }}
                                animate={{ x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <motion.span
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                >
                                    📍
                                </motion.span>
                                <div>
                                    <p className="font-medium">
                                        Location Error: {userLocation.error}
                                    </p>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-sm mt-1"
                                    >
                                        🌏 Using default location (Singapore)
                                        instead.
                                    </motion.p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default OpenStreetMap;
