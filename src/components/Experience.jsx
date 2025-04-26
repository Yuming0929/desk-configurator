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
            
             // 设置初始相机位置 - 较远的位置
             setTimeout(() => {
                if (cameraControlsRef.current) {
                    cameraControlsRef.current.setLookAt(
                        8, 5, 8,      // 远离物体的相机位置
                        0, 0.5, 0,    // 目标位置（桌子中心）
                        true         // 不使用动画，直接设置
                    );
                }
            }, 100);
        }
        return () => {
            deskConfig.setCameraControls(null);
        };
    }, [cameraControlsRef]);

    return (
        <>
            <color attach="background" args={['#e5e5e5']} />
            {/* <ambientLight intensity={1} /> */}
            <Stage environment={"apartment"} intensity={1}  
            shadows={false} 
            preset="portrait" 
            adjustCamera={false}     // 禁用初始动画
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
                minDistance={7}
                >
            </CameraControls>
        </>

    )
};

export default Experience