import { useState } from "react";
import "./App.css";
import TableCell from "./components/tableCell";
import { getDataRecursively } from "./utils/helper";

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

    const arr = getDataRecursively(rows, columns, noCabinates, 1);

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
                    <table className="table-fixed border-collapse border-2 border-neutral-950">
                        <tbody>
                            {arr.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((element, colIndex) => {
                                        return (
                                            <TableCell
                                                key={colIndex}
                                                boxRatio={boxRatio}
                                                boxNum={element.number}
                                                color={element.color}
                                                isStart={element.isStart}
                                                isEnd={element.isEnd}
                                                isTreeNode={element.isTreeNode}
                                                isRootNode={element.isRootNode}
                                                endNode={rows * columns}
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
