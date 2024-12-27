import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    Stage,
    useGLTF,
    AccumulativeShadows,
    RandomizedLight
} from '@react-three/drei';

// 桌面组件
function TableTop() {
    const { nodes, materials } = useGLTF('/models/desk2.glb');
    console.log(nodes);
    return (
        <group>
            <mesh
                geometry={nodes.Panel.geometry}
                castShadow
                receiveShadow
            >
                {/* <meshStandardMaterial {...materials} /> */}
            </mesh>
            <mesh
                geometry={nodes.IStand.geometry}
                castShadow
                receiveShadow
            >
                {/* <meshStandardMaterial {...materials} /> */}
            </mesh>
            <mesh
                geometry={nodes.Electric.geometry}
                castShadow
                receiveShadow
            >
                {/* <meshStandardMaterial {...materials} /> */}
            </mesh>

        </group>

    );
}

// // 桌腿组件
// function TableLegs({ style, material }) {
//   const { nodes } = useGLTF(`/models/table-legs-${style}.glb`);

//   return (
//     <mesh
//       geometry={nodes.TableLegs.geometry}
//       castShadow
//       receiveShadow
//     >
//       <meshStandardMaterial {...material} />
//     </mesh>
//   );
// }

// // 配件组件
// function Accessory({ type, position }) {
//   const { nodes } = useGLTF(`/models/accessories/${type}.glb`);

//   return (
//     <mesh
//       geometry={nodes[type].geometry}
//       position={position}
//       castShadow
//     >
//       <meshStandardMaterial color="gray" />
//     </mesh>
//   );
// }

// 场景背景阴影
function Shadows() {
    return (
        <AccumulativeShadows
            temporal
            frames={60}
            alphaTest={0.85}
            scale={10}
            position={[0, 0, 0]}
        >
            <RandomizedLight
                amount={8}
                radius={10}
                intensity={0.8}
                ambient={0.25}
                position={[5, 5, -10]}
            />
        </AccumulativeShadows>
    );
}

// 主配置器组件
export default function TableConfigurator() {
    // 状态管理
    const [tableTopMaterial, setTableTopMaterial] = useState({
        color: '#8B4513',
        roughness: 0.7,
        metalness: 0.1
    });

    const [legStyle, setLegStyle] = useState('modern');
    const [legMaterial, setLegMaterial] = useState({
        color: '#303030',
        roughness: 0.3,
        metalness: 0.8
    });

    const [accessories, setAccessories] = useState([]);

    // 材质选项
    const woodMaterials = [
        { name: '橡木', color: '#8B4513' },
        { name: '枫木', color: '#DEB887' },
        { name: '胡桃木', color: '#654321' }
    ];

    // 支架样式
    const legStyles = [
        { name: '现代简约', id: 'modern' },
        { name: '工业风', id: 'industrial' },
        { name: '经典款', id: 'classic' }
    ];

    // 配件选项
    const accessoryTypes = [
        { name: '抽屉', id: 'drawer', position: [0, 0.6, 0] },
        { name: '理线器', id: 'cable-tray', position: [0, 0.3, -0.3] },
        { name: '显示器支架', id: 'monitor-stand', position: [0, 0.8, -0.2] }
    ];

    const toggleAccessory = (accessory) => {
        setAccessories(prev => {
            const exists = prev.find(a => a.id === accessory.id);
            if (exists) {
                return prev.filter(a => a.id !== accessory.id);
            } else {
                return [...prev, accessory];
            }
        });
    };

    return (
        <div className="fixed inset-0 flex flex-col md:flex-row">
            {/* 3D 预览区域 */}
            <div className="h-1/2 md:h-full md:flex-1 ">
                <Canvas shadows camera={{ position: [4, 4, 4], fov: 50 }}  className='w-full h-full'>
                    <color attach="background" args={['#f0f0f0']} />
                    <Suspense fallback={null}>
                        <Stage environment="city" intensity={0.5}>
                            <TableTop material={tableTopMaterial} />
                            {/* <TableLegs style={legStyle} material={legMaterial} />
              {accessories.map((acc) => (
                <Accessory key={acc.id} type={acc.id} position={acc.position} />
              ))} */}
                        </Stage>
                        <Shadows />
                    </Suspense>
                    <OrbitControls
                        makeDefault
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2}
                    />
                </Canvas>
            </div>

            {/* 配置面板 */}
            <div className="h-1/2 md:h-full md:w-96 border-t md:border-l md:border-t-0">
                {/* 桌面材质选择 */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">桌面材质</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {woodMaterials.map((wood) => (
                            <button
                                key={wood.color}
                                className="p-4 border rounded hover:bg-gray-50"
                                onClick={() => setTableTopMaterial({
                                    ...tableTopMaterial,
                                    color: wood.color
                                })}
                            >
                                <div
                                    className="w-full h-12 rounded mb-2"
                                    style={{ backgroundColor: wood.color }}
                                />
                                <span>{wood.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 支架样式选择 */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">支架样式</h2>
                    <div className="space-y-2">
                        {legStyles.map((style) => (
                            <button
                                key={style.id}
                                className={`w-full p-2 border rounded ${legStyle === style.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                                    }`}
                                onClick={() => setLegStyle(style.id)}
                            >
                                {style.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 配件选择 */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">配件选择</h2>
                    <div className="space-y-2">
                        {accessoryTypes.map((acc) => (
                            <button
                                key={acc.id}
                                className={`w-full p-2 border rounded ${accessories.find(a => a.id === acc.id)
                                        ? 'bg-blue-50 border-blue-500'
                                        : 'hover:bg-gray-50'
                                    }`}
                                onClick={() => toggleAccessory(acc)}
                            >
                                {acc.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// 预加载所有模型
useGLTF.preload('/models/desk2.glb');
// useGLTF.preload('/models/table-legs-modern.glb');
// useGLTF.preload('/models/table-legs-industrial.glb');
// useGLTF.preload('/models/table-legs-classic.glb');
// accessoryTypes.forEach(acc => {
//   useGLTF.preload(`/models/accessories/${acc.id}.glb`);
// });