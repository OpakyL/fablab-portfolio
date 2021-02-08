import cn from "classnames";
import React from "react";

interface IconProps {
    name: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Icon: React.FC<IconProps> = ({ name, className, onClick = () => {} }) => {
    const classes: string = cn(`icon-${name}`, className);
    return <span className={classes} onClick={onClick} />;
};

export default Icon;
