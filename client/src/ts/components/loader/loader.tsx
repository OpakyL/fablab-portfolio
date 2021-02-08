import React from "react";
import "./loader.scss";

interface Props {
    width?: string;
    height?: string;
}

const Loader: React.FC<Props> = ({ width = "100px", height = "100px" }) => {
    return (
        <div className="loader-wrapper">
            <div className="sk-circle-bounce" style={{ width, height }}>
                <div className="sk-child sk-circle-1" />
                <div className="sk-child sk-circle-2" />
                <div className="sk-child sk-circle-3" />
                <div className="sk-child sk-circle-4" />
                <div className="sk-child sk-circle-5" />
                <div className="sk-child sk-circle-6" />
                <div className="sk-child sk-circle-7" />
                <div className="sk-child sk-circle-8" />
                <div className="sk-child sk-circle-9" />
                <div className="sk-child sk-circle-10" />
                <div className="sk-child sk-circle-11" />
                <div className="sk-child sk-circle-12" />
            </div>
        </div>
    );
};

export default Loader;
