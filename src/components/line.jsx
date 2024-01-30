import React from "react";

export default function DrawLine({ color, type, boxRatio }) {
    switch (type) {
        case "line":
            return (
                <div
                    className="line"
                    style={{
                        backgroundColor: color,
                    }}></div>
            );
        case "curved-line":
            return (
                <div
                    className="curve-line"
                    style={{
                        width: boxRatio === "square" ? "40px" : "55px",
                        borderColor: `transparent ${color} ${color} transparent`,
                    }}></div>
            );
        case "horizontal-line":
            return (
                <div
                    className="horizontal-line"
                    style={{
                        backgroundColor: color,
                    }}></div>
            );

        case "bottom-line":
            return (
                <div
                    className="bottom-line"
                    style={{
                        background: color,
                    }}></div>
            );
        default:
            return (
                <div
                    className="line"
                    style={{
                        backgroundColor: color,
                    }}></div>
            );
    }
}

