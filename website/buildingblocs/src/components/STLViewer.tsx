"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { STLLoader } from "three-stdlib";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

// AI generated code for a 3D STL viewer component using React Three Fiber
// This component allows users to view STL files with options for wireframe mode and color selection.

function STLModel({
    url,
    color,
    wireframe,
}: {
    url: string;
    color?: string;
    wireframe?: boolean;
}) {
    const geometry = useLoader(STLLoader, url);
    const meshRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (meshRef.current && geometry) {
            // Center the geometry
            geometry.computeBoundingBox();
            const box = geometry.boundingBox;
            
            if (box) {
                const center = new THREE.Vector3();
                box.getCenter(center);
                geometry.translate(-center.x, -center.y, -center.z);
            }

            // Normalize the scale
            geometry.computeBoundingSphere();
            const sphere = geometry.boundingSphere;
            if (sphere) {
                const scale = 2 / sphere.radius; // Scale to fit in view
                meshRef.current.scale.setScalar(scale);
                meshRef.current.rotation.x = -Math.PI / 2 -0.5 ;
                meshRef.current.rotation.y = 0.1;
                meshRef.current.rotation.z = Math.PI/2;
            }
        }
    }, [geometry]);

    return (
        <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial
                color={color}
                metalness={0.1}
                roughness={0.1}
                wireframe={wireframe}
            />
        </mesh>
    );
}

function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="gray" transparent opacity={0.5} />
        </mesh>
    );
}

export default function EnhancedSTLViewer({ stlPath }: { stlPath: string }) {
    return (
        <div className="w-full">
            {/* 3D Viewer with viewport */}
            <div className="w-128 h-128 bg-gray-100 rounded-lg">
                <Canvas
                    camera={{
                        position: [3, 3, 3],
                        fov: 50,
                        near: 0.5,
                        far: 1000,
                    }}
                >
                    <Environment preset="studio" />
                    <ambientLight intensity={0.8} />
                    <directionalLight
                        position={[5, 5, 10]}
                        intensity={2}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />
                    <directionalLight position={[-3, 3, 8]} intensity={0.8} />
                    <pointLight
                        position={[0, 2, 8]}
                        intensity={1.5}
                        distance={20}
                    />
                    <pointLight
                        position={[4, 1, 6]}
                        intensity={0.8}
                        distance={15}
                    />

                    <Suspense fallback={<LoadingFallback />}>
                        <STLModel
                            url={stlPath}
                            color={"blue"}
                            wireframe={false}
                        />
                    </Suspense>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate
                        autoRotate={true}
                        autoRotateSpeed={1.5}
                        minDistance={1}
                        maxDistance={50}
                    />
                </Canvas>
            </div>
        </div>
    );
}