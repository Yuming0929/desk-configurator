import { Center, Float, PresentationControls, Stage, MeshReflectorMaterial, OrbitControls } from "@react-three/drei"
import { useLoader } from '@react-three/fiber'
import { Suspense } from "react";

import Desk from "./Desk";

const Experience = () => {

    return (
        <>
            <color attach="background" args={['#e5e5e5']} />
            <ambientLight intensity={3} />
            <Stage environment={"city"} intensity={1} shadows={false}>
                {/* <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={"#e5e5e5"} />
                </mesh> */}
                <Suspense fallback={null}>

                    <Desk />
                </Suspense>
            </Stage>
            <OrbitControls
                speed={1.5}
                global
                zoom={0.5}
                minDistance={5}
                maxDistance={20}
                polar={[-0.1, Math.PI / 4]}>
            </OrbitControls>
        </>

    )
};

export default Experience