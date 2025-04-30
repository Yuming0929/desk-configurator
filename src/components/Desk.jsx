import React, { useEffect, useMemo, useState } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import textures from '../stores/detail';
import * as THREE from 'three';
import useConfigStore from '../stores/configStore';

// 预加载所有纹理
const textureKeys = Object.keys(textures);
textureKeys.forEach(key => {
    useTexture.preload(textures[key].texture.map);
});

const useTextureWithSettings = (textureConfig) => {
    const textureProps = useTexture({
        map: textureConfig.texture.map,
    })
    //设置纹理重复
    textureProps.map.repeat.set(4, 4)
    //设置纹理旋转
    textureProps.map.rotation = Math.PI / 2
    //设置纹理包裹模式 S为水平 T为垂直
    textureProps.map.wrapS = THREE.RepeatWrapping
    textureProps.map.wrapT = THREE.RepeatWrapping
    return textureProps
}

const Desk = (props) => {

    const { nodes, materials } = useGLTF('./models/desk.glb')
    const deskConfig = useConfigStore()

    const woodTextureProps = useTextureWithSettings(textures[deskConfig.topMaterial])


    const computedLength = useMemo(() => deskConfig.length / deskConfig.defaultLength, [deskConfig.length])

    const computedWidth = useMemo(() => deskConfig.width / deskConfig.defaultWidth, [deskConfig.width])
    

    const computeRelativePosition = useMemo(() => (position) => {
        return new THREE.Vector3(
            position.x * computedLength,
            position.y,
            position.z * computedWidth
        )
    }, [computedWidth, computedLength])


    return (
        <group {...props} dispose={null}>


            {/* 桌面 */}
            <mesh geometry={nodes.Top.geometry} scale={[computedLength, 1, computedWidth]} position={nodes.Top.position}  >
                <meshStandardMaterial {...woodTextureProps}/>

            </mesh>

            {/* 铁支架1&2 */}
            <mesh geometry={nodes.IStand1.geometry} position={computeRelativePosition(nodes.IStand1.position)} scale={[1, 1, 1]} visible={deskConfig.frameType !== "standard"}>
                <meshStandardMaterial color={deskConfig.frameColor} metalness={0.3} roughness={0} />
            </mesh>
            <mesh geometry={nodes.IStand2.geometry} position={computeRelativePosition(nodes.IStand2.position)} scale={[1, 1, 1]} visible={deskConfig.frameType !== "standard"}>
                <meshStandardMaterial color={deskConfig.frameColor} metalness={0.3} roughness={0} />
            </mesh>
            {/* 经典支架1&2 */}
            <mesh geometry={nodes.ClassicStand1.geometry} position={nodes.ClassicStand1.position} scale={[1, 1, 1]} visible={deskConfig.frameType === "standard"}>
                <meshStandardMaterial color={deskConfig.frameColor} metalness={0.3} roughness={0} />
            </mesh>
            <mesh geometry={nodes.ClassicStand2.geometry} position={nodes.ClassicStand2.position} scale={[1, 1, 1]} visible={deskConfig.frameType === "standard"}>
                <meshStandardMaterial color={deskConfig.frameColor} metalness={0.3} roughness={0} />
            </mesh>
            {/* 操控面板 */}
            <mesh geometry={nodes.Panel.geometry} position={computeRelativePosition(nodes.Panel.position)} visible={deskConfig.electric}>
                <meshStandardMaterial color={deskConfig.frameColor} metalness={0.7} roughness={0} />
            </mesh>
            {/* 电线 */}
            <mesh geometry={nodes.Wires.geometry} scale={[1, 1, computedWidth]} position={computeRelativePosition(nodes.Wires.position)} visible={deskConfig.electric}>
                <meshStandardMaterial color={"#000000"} metalness={0} roughness={0} />
            </mesh>
            {/* 横梁 */}
            <mesh geometry={nodes.CrossBeam.geometry} scale={[computedLength, 1, 1]} position={nodes.CrossBeam.position} visible={deskConfig.frameType !== "standard"}>
                <meshStandardMaterial color={deskConfig.frameColor} metalness={0.3} roughness={0} />
            </mesh>
        </group>
    )
}
useGLTF.preload('./models/desk.glb')
export default Desk;