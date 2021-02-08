import React from "react";
import Arrow from "Ts/components/arrow";

const Settings = (options?: any) => {
    return {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <Arrow direction="LEFT" />,
        nextArrow: <Arrow direction="RIGHT" />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ],
        ...options
    };
};

export default Settings;
