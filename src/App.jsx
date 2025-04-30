
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { Loader } from '@react-three/drei';
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
          <Canvas  className="w-full h-full select-none" >
            <Experience />
            
          </Canvas>
          <Loader />
          <a className="relative bottom-10 right-10 font-semibold text-xl underline flex justify-center" href='https://yuminghuang.xyz/' target='__blank'>@Yuming Huang</a>
        </div>
        
        {/* 配置区域 */}
        <div className='md:w-2/5 md:h-full w-full h-2/3 bg-white p-4'>
          <Configurator />
        </div>
        

        
        
      </div>

  );
}
