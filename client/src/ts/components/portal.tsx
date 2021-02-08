import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export interface IPortal {
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: any) => void;
    ref?: any;
}

const Portal: React.FC<IPortal> = React.forwardRef(
    (
        { children, className = "", onClick = () => {} },
        ref:
            | string
            | ((instance: HTMLDivElement | null) => void)
            | React.RefObject<HTMLDivElement>
            | null
            | undefined
    ): React.ReactPortal => {
        const el: HTMLDivElement = document.createElement("div");
        useEffect(() => {
            document.body.appendChild(el);
            el.className += className;
            el.addEventListener("click", onClick);
            return () => {
                document.body.removeChild(el);
            };
        });

        return ReactDOM.createPortal(children, el);
    }
);

export default Portal;
