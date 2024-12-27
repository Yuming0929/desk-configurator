import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useConfigStore = create(
  devtools(

    (set) => ({
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
    })


  )
)

export default useConfigStore