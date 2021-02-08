import React, { useState, useEffect } from "react";
import Button from "Ts/components/button";
import { useParams } from "react-router";
import { useSelector } from "Ts/utils/typed-selector";
import { ILesson } from "Ts/services/service";

interface Props {}

const LessonPage: React.FC<Props> = () => {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState<ILesson>();
    const courses = useSelector(state => state.data.courses);

    useEffect(() => {
        courses?.forEach(el => {
            const lesson = el.lessons?.filter(les => les._id === lessonId);
            if (lesson) {
                setLesson(lesson[0]);
            }
        });
    }, []);

    if (!lesson) {
        return <div className="error">kostyl</div>;
    }

    return (
        <div>
            <div>{lesson.title}</div>
            <div>{lesson.text}</div>
            <div>{lesson.videoUrl}</div>
            <Button href={`/edit-lesson/${lesson._id}`}>Edit lesson</Button>
        </div>
    );
};

export default LessonPage;
