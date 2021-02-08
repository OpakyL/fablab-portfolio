import React, { useState, ButtonHTMLAttributes } from "react";
import { ICourse } from "Ts/redux/state-interfaces";
import { base } from "Ts/services/service";
import Button from "Ts/components/button";
import cn from "classnames";
import moment from "moment";

interface Props {
    course: ICourse;
    onClick: (id: string) => void;
}

const Course: React.FC<Props> = ({
    course: { _id, thumbnail, title, startDate, endDate },
    onClick
}) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const onMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.type === "mouseenter") {
            setHovered(true);
        }
        if (e.type === "mouseleave") {
            setHovered(false);
        }
    };
    const btnClasses = cn("button-home button-course", {
        "button-home-gray": !hovered
    });
    const arrowClasses = cn("button-arrow button-arrow-courses", {
        "button-arrow-animated": hovered
    });

    return (
        <div
            className="section course"
            onMouseEnter={onMouse}
            onMouseLeave={onMouse}
        >
            <div className="course__wrapper">
                <img className="course__thumbnail" src={base + thumbnail.url} />
                <div className="course__text">
                    <div className="course__title">{title}</div>
                    <div className="course__date">
                        {moment(startDate).format("DD MMMM")} - {moment(endDate).format("DD MMMM")}
                    </div>
                </div>
                <Button
                    className={btnClasses}
                    onClick={() => {
                        if (_id) {
                            onClick(_id);
                        }
                    }}
                >
                    Подробнее
                    <img
                        className={arrowClasses}
                        src="/assets/img/icons/chevron-right.svg"
                        alt="arrow"
                    />
                </Button>
            </div>
        </div>
    );
};

export default Course;
