
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import "./App.css"
import Experience from './components/Experience'
import Configurator from './components/Configurator'
export default function App() {
  return (  
      <div className='fixed inset-0 h-full flex flex-col md:flex-row'>

        {/* 模拟返回按钮*/}
        <button className=' fixed top-4 left-4 bg-white p-3 px-4 rounded-full z-10'> ←  </button>

        {/* 展示区域 */}
        <div className='md:w-3/5 w-full h-1/3 md:h-full'>
        
          {/* select-none防止鼠标拖拽离开canvas激活其它元素的行为 */}
          <Canvas style={{height: '100%', width: '100%'}} className="w-full h-full select-none" >
            <Experience />
          </Canvas>
        </div>
        
        {/* 配置区域 */}
        <Configurator />

        
        
      </div>

  );
}
