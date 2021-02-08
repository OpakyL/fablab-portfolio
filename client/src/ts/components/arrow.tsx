import React from "react";

const Arrow: React.FC<any> = ({ direction, indicator, onClick }) => {
    let styles: any = {
        position: "absolute",
        top: "50%",
        cursor: "pointer",
        width: "50px",
        height: "50px"
    };
    if (direction === "LEFT") {
        styles.transform = "translateY(-50%)";
        styles.left = "-50px";
    }
    if (direction === "RIGHT") {
        styles.transform = "translateY(-50%) rotate(180deg)";
        styles.right = "-50px";
    }
    if (indicator === "prevHome") {
        styles.left = "-15px";
        styles["zIndex"] = 1;
    }
    if (indicator === "nextHome") {
        styles.right = "0";
    }
    return (
        <img
            src="/assets/img/icons/chevron-left.svg"
            onClick={onClick}
            style={styles}
            alt=""
        />
    );
};

export default Arrow;
