import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import * as THREE from 'three';
const useConfigStore = create(
  devtools(

    (set, get) => ({
      // 桌面配置
      defaultLength: 120,
      defaultWidth: 60,
      length: 120,
      width: 60,

      // 材质的名字
      topMaterial: "oak",

      // 支架配置
      frameType: "standard",
      //支架颜色
      frameColor: "#303030",
      //是否有电动升降
      electric: false,

      // cameraControlsRef
      // 用于存储相机控制器的引用
      cameraControls: null,

      // Actions
      setLength: (length) =>
        set({ length }),
      setWidth: (width) =>
        set({ width }),
      setTopMaterial: (topMaterial) =>
        set({ topMaterial }),
      setFrameType: (frameType) =>
        set({ frameType }),
      setFrameColor: (frameColor) =>
        set({ frameColor }),
      setElectric: (electric) =>
        set({ electric }),

      // 设置cameraControls引用的方法
      setCameraControls: (controls) => set({ cameraControls: controls }),

      // 移动相机到电动升降视角
      moveCameraToElectricView: () => {
        const { cameraControls } = get();
        if (cameraControls) {
          console.log("移动相机到电动升降视角");
          
          // 保存当前相机状态不需要手动处理，CameraControls会内部处理
          // 使用CameraControls的setLookAt方法
          // 参数: (eye.x, eye.y, eye.z, target.x, target.y, target.z, enableTransition)
          cameraControls.setLookAt(
            5, 1.5, 2.5,  // 相机位置 
            0, 0, 0,    // 目标位置
            true,         // 启用过渡动画
            0.5           // 过渡时间（秒）
          );
        }
      },
    })
  )
)

export default useConfigStore