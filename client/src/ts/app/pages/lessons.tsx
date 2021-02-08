import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector } from "Utils/typed-selector";

interface Props {
    courseId?: string;
}

const Lessons: React.FC<Props> = ({ courseId }) => {
    // const isLogged = useSelector(state => state.user.isLoggedIn);
    // const userCourses = useSelector(state => state.user.courses);

    // if (!isLogged || !userCourses.includes(courseId)) {
    //     return <Redirect to="/" />;
    // }
    return <section>fLsadfdsa</section>;
};

const LessonsContainer: React.FC = () => {
    const { id } = useParams();
    return <Lessons courseId={id} />;
};

export default LessonsContainer;
