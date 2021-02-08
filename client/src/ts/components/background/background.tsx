import cn from "classnames";
import React from "react";
import Portal from "./../portal";
import "./background.scss";

interface Props {
    className?: string;
}

const Background: React.FC<Props> = React.memo(({ className }) => {
    const classes: string = cn("background", className);
    return <Portal className={classes} />;
});

export default Background;
