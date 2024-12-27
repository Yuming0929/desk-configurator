import React, { useState } from 'react';
import useConfigStore from '../stores/configStore';
// type SliderProps = {
//     name: string;
//     type: "width" | "length";
//     max: number;
//     min: number;
//     default: number;
// }

function Slider(props) {
    
    
    const deskConfig = useConfigStore();
    // console.log(deskConfig.width)
    return (
        <div className="p-4 space-y-4">
            {/* 宽度显示 */}
            <div className="flex justify-between items-center">
                <label className="text-lg font-semibold text-gray-700">
                    {props.name}
                </label>
                <span className="text-lg font-semibold">
                    {props.type === "width"? deskConfig.width : deskConfig.length} cm
                </span>
            </div>

            {/* 滑动条 */}
            <div className="relative">
                <input
                    type="range"
                    min={props.min}  // 最小宽度
                    max={props.max}  // 最大宽度
                    step="2"   // 步长
                    value={props.type === "width" ? deskConfig.width : deskConfig.length}
                    onChange={(e) => {
                        if (props.type === "width") {
                            console.log("setting width")    
                            deskConfig.setWidth(Number(e.target.value));
                            
                        } else {
                            deskConfig.setLength(Number(e.target.value));
                        }
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg  appearance-none cursor-pointer accent-slate-700"
                />

                {/* 刻度标记 */}
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{props.min}cm</span>
                    <span>{props.max}cm</span>
                </div>
            </div>

            {/* 手动输入 */}
            {/* <div className="flex items-center gap-2 mt-4">
                <input
                    type="number"
                    min="60"
                    max="200"
                    value={width}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 60 && value <= 200) {
                            setWidth(value);
                        }
                    }}
                    className="w-20 px-2 py-1 border rounded-md text-center"
                />
                <span className="text-gray-500">cm</span>
            </div> */}
        </div>
    );
}

export default Slider;