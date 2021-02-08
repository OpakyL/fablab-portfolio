import React from "react";

interface Props {
    children: React.ReactNode;
    hoverText: string;
}

const FooterElement: React.FC<Props> = ({ children, hoverText }) => {
    return <div className="footer-element">{children}</div>;
};

export default FooterElement;
