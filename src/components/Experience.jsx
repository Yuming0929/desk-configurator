import { Center, Float, PresentationControls, Stage, MeshReflectorMaterial, OrbitControls, CameraControls } from "@react-three/drei"
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import Desk from "./Desk";
import useConfigStore from "../stores/configStore";

const Experience = () => {

    //实现点击移动摄像机
    const cameraControlsRef = useRef(null);
    const deskConfig = useConfigStore()

    useEffect(() => {
        if (cameraControlsRef.current) {
            deskConfig.setCameraControls(cameraControlsRef.current);
            if (cameraControlsRef.current) {
                cameraControlsRef.current.setLookAt(
                    5, 4, 5,      // 远离物体的相机位置
                    0, 0.5, 0,    // 目标位置（桌子中心）
                    true         // 不使用动画，直接设置
                );
            }
             // 设置初始相机位置 - 较远的位置

        }
        return () => {
            deskConfig.setCameraControls(null);
        };
    }, [cameraControlsRef]);

    return (
        <>
            <color attach="background" args={['#e5e5e5']} />
            {/* <ambientLight intensity={1} /> */}
            <Stage 
            environment={"apartment"} 
            intensity={1}  
            shadows={false} 
            adjustCamera={false}     
            
            >
                {/* <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={"#e5e5e5"} />
                </mesh> */}
                <Desk />
            </Stage>

            <CameraControls
                //实现点击移动摄像机
                ref={cameraControlsRef}
                minDistance={4}
                maxDistance={7}
                >
            </CameraControls>
        </>

    )
};

export default Experience