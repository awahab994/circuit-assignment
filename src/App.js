import { useState } from "react";
import "./App.css";

const Box = ({ boxRatio, boxNum, color, isStart, isEnd }) => {
    return (
        <td className="border relative">
            <div
                className={`flex flex-col items-center justify-center ${
                    boxRatio === "video" ? "min-w-28 min-h-20" : "min-w-20 min-h-20"
                }`}>
                {/* Arrow with curve */}

                {/* Circle in the center of the cell */}
                <div
                    className={`w-2 h-2 rounded-full`}
                    style={{
                        backgroundColor: color,
                    }}>
                    {!isEnd && (
                        <div
                            className="line"
                            style={{
                                backgroundColor: color,
                            }}></div>
                    )}
                    {!isStart ? (
                        <div
                            className="bottom-line"
                            style={{
                                background: color,
                            }}></div>
                    ) : (
                        <>
                            <div
                                className="square"
                                style={{
                                    backgroundColor: color,
                                }}></div>
                            <div
                                className="curve-line"
                                style={{
                                    width: boxRatio === "square" ? "40px" : "55px",
                                    borderColor: `transparent ${color} ${color} transparent`,
                                }}></div>
                        </>
                    )}
                </div>
                <p className={`absolute top-1 left-1 text-xs text-gray-900`}>{boxNum}</p>
            </div>
        </td>
    );
};

function App() {
    const [rows, setRows] = useState(5);
    const [columns, setColumns] = useState(5);
    const [noCabinates, setNoCabinets] = useState(6);
    const [boxRatio, setBoxRatio] = useState("square");

    const handleRowChange = e => {
        setRows(parseInt(e.target.value, 10) || 0);
    };

    const handleColumnChange = e => {
        setColumns(parseInt(e.target.value, 10) || 0);
    };
    const handleNoCabinatesChange = e => {
        setNoCabinets(parseInt(e.target.value, 10) || 0);
    };

    const handleBoxRatioChange = e => {
        setBoxRatio(e.target.value);
    };

    const getRandomColor = () => {
        const letters = "0123456789abcdef";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const getDataStructue = () => {
        let cabinetWide = columns;
        let cabinetTall = rows;
        let noOfCabinat = noCabinates;

        let array2D = Array(rows)
            .fill()
            .map(() => Array(columns));
        let color = getRandomColor();

        let remainingCabinets = noOfCabinat;
        let socket = "s";
        let maxSocket = 4;
        let remainingMaxSocket = maxSocket;
        let isSocketTall = cabinetTall > 2 ? true : false;

        for (let col = 0; col < cabinetWide; col++) {
            if (remainingCabinets < cabinetTall) {
                remainingCabinets = noOfCabinat;
                remainingMaxSocket = maxSocket;
                color = getRandomColor();
            }
            if (remainingMaxSocket === 0) remainingMaxSocket = maxSocket;
            for (let row = cabinetTall - 1; row >= 0; row--) {
                array2D[row][col] = {
                    number: col * cabinetTall + (cabinetTall - row),
                    color: color,
                    isStart: row === cabinetTall - 1,
                    isEnd: row === 0,
                };
                let str = array2D[row][col] + color + "\t";
                if (row === cabinetTall - 1) {
                    if (isSocketTall) str = socket + " : " + str;
                    else if (remainingMaxSocket === maxSocket) str = socket + " : " + str;
                }
                remainingCabinets--;
                remainingMaxSocket--;
            }
        }

        return array2D;
    };

    const arr = getDataStructue();

    return (
        <div className="flex items-center flex-col">
            <div className="bg-white w-3/4 h-full p-8 m-8 rounded overflow-auto flex flex-col gap-y-5 ">
                <h1 className="text-2xl overflow-auto font-bold mb-4">Micro LED Configuration Tool</h1>

                <div className="flex flex-col ml-4 gap-y-2 ">
                    <label className="mr-4 flex flex-col  gap-y-2">
                        Number of Cabinets Wide:
                        <input
                            type="number"
                            min="0"
                            value={columns}
                            onChange={handleColumnChange}
                            className="ml-2 p-1 border border-gray-400"
                        />
                    </label>

                    <label className="mr-4 flex flex-col  gap-y-2">
                        Number of Cabinets Tall:
                        <input
                            type="number"
                            min="0"
                            value={rows}
                            onChange={handleRowChange}
                            className="ml-2 p-1 border border-gray-400"
                        />
                    </label>

                    <label className="mr-4 flex flex-col  gap-y-2">
                        Number of Cabinets per Circuit:
                        <input
                            type="number"
                            min="0"
                            value={noCabinates}
                            onChange={handleNoCabinatesChange}
                            className="ml-2  p-1 border border-gray-400"
                        />
                    </label>

                    <label className="mr-4 flex flex-col  gap-y-2">
                        Size of the box in Ratio:
                        <select
                            value={boxRatio}
                            onChange={handleBoxRatioChange}
                            className="ml-2 max-w-32 p-1 border border-gray-400">
                            <option value="square">1:1</option>
                            <option value="video">19:6</option>
                        </select>
                    </label>
                </div>

                <div className="flex justify-center">
                    <table className="table-fixed border-collapse border border-stone-900">
                        <tbody>
                            {arr.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((element, colIndex) => {
                                        return (
                                            <Box
                                                key={colIndex}
                                                boxRatio={boxRatio}
                                                boxNum={element.number}
                                                color={element.color}
                                                isStart={element.isStart}
                                                isEnd={element.isEnd}
                                            />
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
