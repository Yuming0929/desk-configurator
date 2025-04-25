

import Slider from "./Slider";
import useConfigStore from "../stores/configStore";
import textures, { frameColors, frameTypes } from "../stores/detail";

const Configurator = () => {

    const deskConfig = useConfigStore()

    return (
        <div className="flex flex-col h-full">

            {/* 滚动容器 - 设置固定高度并启用滚动 */}
            <div className="h-full overflow-y-auto ">
                {/* 内容区域 */}
                <div className="space-y-4  rounded p-4">

                    <h2 className="font-semibold text-xl pl-2">面板选择</h2>
                    <hr />
                    <div className="flex flex-col">
                        {
                            Object.values(textures).map((item) => {
                                return (
                                    <div key={item.id}
                                        className={`
                                            flex
                                            items-center
                                            border-2
                                            space-x-2 
                                            w-full 
                                            hover:bg-zinc-300
                                            transition-all
                                            p-2 mt-4 
                                            rounded-full
                                            cursor-pointer
                                            ${deskConfig.topMaterial === item.id ? 'bg-zinc-300' : 'bg-zinc-100 '}
                                            `}

                                        id={item.id}
                                        onClick={() => deskConfig.setTopMaterial(item.id)}>
                                        <img src={item.texture.map} className="w-14 h-14 rounded-full" />
                                        <div className="font-semibold text-xl ">{item.name}</div>
                                    </div>
                                )

                            })
                        }
                    </div>

                    <h2 className="font-semibold text-xl pl-2">桌腿选择</h2>
                    <hr />
                    <div className="flex flex-row ">
                        {
                            frameTypes.map((item) => {
                                return (
                                    <div key={item.id}
                                        className={`
                                            flex
                                            items-center
                                            border-2
                                            space-x-2 
                                            w-full 
                                            hover:bg-zinc-300
                                            transition-all
                                            p-4 mt-4 
                                            rounded-full
                                            cursor-pointer
                                            ${deskConfig.frameType === item.id ? 'bg-zinc-300' : 'bg-zinc-100 '}
                                            `}
                                        id={item.id}
                                        onClick={() => {
                                            deskConfig.setFrameType(item.id)
                                            if (item.id === "standard") {
                                                deskConfig.setElectric(false)
                                            }
                                        }}

                                    >


                                        <div className="font-semibold text-xl ">{item.name}</div>
                                    </div>
                                )
                            })

                        }

                    </div>

                    <h2 className="font-semibold text-xl pl-2">桌腿颜色选择</h2>
                    <hr />
                    {
                        frameColors.map((item) => {
                            return (
                                <div key={item.id}
                                    className={`
                                        flex
                                        items-center
                                        border-2
                                        space-x-2 
                                        w-full 
                                        hover:bg-zinc-300
                                        transition-all
                                        p-4 mt-4 
                                        rounded-full
                                        cursor-pointer
                                        ${deskConfig.frameColor === item.id ? 'bg-zinc-300' : 'bg-zinc-100 '}
                                        `}
                                    id={item.id}
                                    onClick={() => deskConfig.setFrameColor(item.id)}>

                                    <div className="font-semibold text-xl ">{item.name}</div>
                                </div>
                            )
                        })
                    }
                    {deskConfig.frameType === "adjustable" &&
                        <>
                            <h2 className="font-semibold text-xl pl-2">电动升降功能(仅限可调节支架)</h2>
                            <hr />

                            <div className="flex flex-row ">
                                <div
                                    className={`
                                flex
                                items-center
                                border-2
                                space-x-2 
                                w-full 
                                hover:bg-zinc-300
                                transition-all
                                p-4 mt-4 
                                rounded-full
                                cursor-pointer
                                ${deskConfig.electric ? 'bg-zinc-300' : 'bg-zinc-100 '}
                                `}
                                    onClick={() => deskConfig.setElectric(!deskConfig.electric)}>

                                    <div className="font-semibold text-xl ">{deskConfig.electric ? "已配备" : "未配备"}</div>
                                </div>
                            </div>
                        </>}
                    <h2 className="font-semibold text-xl pl-2">桌面尺寸选择</h2>
                    <hr />

                    <Slider name="宽度" type="width" min={60} max={90} default={60} />
                    <Slider name="长度" type="length" min={120} max={160} default={120} />


                    {/* <div className="bg-gray-200 flex items-center justify-center h-[50rem]">
                        <span>更多内容...</span>
                    </div> */}

                    <button className="w-full bg-slate-800 text-white font-bold py-2 rounded">加入购物车</button>

                </div>
            </div>
        </div>
    );
};

export default Configurator;