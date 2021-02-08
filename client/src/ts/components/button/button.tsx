import cn from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
import "./button.scss";

export interface IButton {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    href?: string;
    outside?: boolean;
    children?: React.ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<IButton> = React.memo(
    ({
        children = "Button",
        onClick = () => {},
        className = "",
        href = "",
        outside = false,
        disabled = false,
        type = undefined,
        ...attrs
    }) => {
        const classes: string = cn("button", className, disabled);
        if (href) {
            if (outside) {
                return (
                    <a
                        href={href}
                        className={classes}
                        {...attrs}
                        target="_blank"
                    >
                        {children}
                    </a>
                );
            }
            return (
                <NavLink to={href} className={classes} {...attrs}>
                    {children}
                </NavLink>
            );
        }
        return (
            <button
                onClick={onClick}
                {...attrs}
                className={classes}
                type={type}
            >
                {children}
            </button>
        );
    }
);

export default Button;
