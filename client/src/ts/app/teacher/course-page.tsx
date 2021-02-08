import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import service, { base, ILesson } from "Ts/services/service";
import { ICourse } from "Ts/redux/state-interfaces";
import { useSelector } from "Utils/typed-selector";
import Button from "Ts/components/button";
import actions from "Ts/redux/actions";

interface Props {}

const CoursePage: React.FC<Props> = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState<ICourse>();
    const { token, userId } = useSelector(state => state.auth);
    const history = useHistory();
    const stateCourse = useSelector(state =>
        state.data.courses?.find(el => el._id === courseId)
    );

    useEffect(() => {
        if (stateCourse) {
            setCourse(stateCourse);
        }
    }, [stateCourse]);

    if (course === undefined) {
        return <div className="loading">loading</div>;
    }

    const deleteC = () => {
        if (course._id) {
            actions.deleteCoursesRequest(token, course._id);
            history.push("/");
        }
    };

    return (
        <div className="section">
            <div>
                Заголовок: <br />
                {course.title}
                <br />
                <br />
            </div>
            <img
                style={{ height: "100px" }}
                src={base + course.thumbnail.url}
            />
            <div>
                Короткое описание (не используется):
                <br /> {course.shortDescr}
                <br />
                <br />
            </div>
            <div>
                Описание:
                <br />
                {course.longDescr.split("\n").map((i, p) => (
                    <p key={p}>{i}</p>
                ))}
                <br />
                <br />
            </div>
            <div>
                Цена (не используется): <br />
                {course.price}
                <br />
                <br />
            </div>
            <div>{(course.hide && "СКРЫТ") || "НЕ СКРЫТ"}</div>
            {userId === course.teacherId && (
                <>
                    <Button
                        href={`/edit-course/${course._id}`}
                        className="button-teacher"
                    >
                        Edit
                    </Button>
                    {"\t"}
                    <Button onClick={deleteC} className="button-teacher">
                        Delete
                    </Button>
                </>
            )}
            <br />
            Дата начала {course.startDate}
            <br />
            Дата конца {course.endDate}
            <br />
        </div>
    );
};

export default CoursePage;
