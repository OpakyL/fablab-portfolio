import React from "react";
import Courses from "./courses";

interface Props {}

const CoursesContainer: React.FC<Props> = () => {
    return (
        <div className="section courses">
            <div className="title title-home">
                Наши курсы <img src="/assets/img/icons/dash.svg" alt="dash" />
            </div>
            <Courses />
        </div>
    );
};

export default CoursesContainer;
