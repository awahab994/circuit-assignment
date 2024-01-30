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
                    {!isEnd && <DrawLine color />}

                    {!isStart ? (
                        !isTreeNode && <DrawLine type={"bottom-line"} color boxRatio />
                    ) : (
                        <>
                            <div
                                className="square"
                                style={{
                                    backgroundColor: color,
                                }}></div>
                            <DrawLine type={"curved-line"} color boxRatio />
                            {isRootNode && <DrawLine type={"horizonntal-line"} color boxRatio />}
                        </>
                    )}
                </div>
                <p className={`absolute top-1 left-1 text-xs text-gray-900`}>{boxNum}</p>
            </div>
        </td>
    );
};

export default TableCell;
