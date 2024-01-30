import React from "react";
import DrawLine from "./line";

const TableCell = ({ boxRatio, boxNum, color, isStart, isEnd, isTreeNode, isRootNode, endNode }) => {
    return (
        <td className="border-4 relative">
            <div
                className={`flex flex-col items-center justify-center ${
                    boxRatio === "video" ? "min-w-28 min-h-20" : "min-w-20 min-h-20"
                }`}>
                <div
                    className={`w-2 h-2 rounded-full`}
                    style={{
                        backgroundColor: color,
                    }}>
                    {!isEnd && <DrawLine color={color} type={"line"} boxRatio={boxRatio} />}

                    {!isStart ? (
                        isTreeNode ? (
                            <DrawLine type={"curved-line"} color={color} boxRatio={boxRatio} />
                        ) : (
                            <DrawLine type={"bottom-line"} color={color} boxRatio={boxRatio} />
                        )
                    ) : (
                        <>
                            <div
                                className="square"
                                style={{
                                    backgroundColor: color,
                                }}></div>
                            <DrawLine type={"curved-line"} color={color} boxRatio={boxRatio} />
                            {isRootNode && <DrawLine type={"horizontal-line"} color={color} boxRatio={boxRatio} />}
                        </>
                    )}
                </div>
                <p className={`absolute top-1 left-1 text-xs text-gray-900`}>{boxNum}</p>
            </div>
        </td>
    );
};

export default TableCell;
