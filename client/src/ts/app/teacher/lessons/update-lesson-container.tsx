import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router";
import LessonForm from "./lesson-form";
import service, { ILesson } from "Ts/services/service";
import { useSelector } from "Ts/utils/typed-selector";
import actions from "Ts/redux/actions";

interface Props {}

const UpdateLessonContainer: React.FC<Props> = () => {
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
    const { token } = useSelector(state => state.auth);

    if (!lesson) {
        return <div className="error">kostyl</div>;
    }

    const {
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        errors
    } = useFormik({
        initialValues: {
            id: lesson._id,
            courseId: lesson.courseId,
            title: lesson.title,
            videoUrl: lesson.videoUrl,
            text: lesson.text,
            files: []
        },
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: async ({ title, videoUrl, text, files, id, courseId }) => {},
        validate: values => {
            const errors: any = {};

            return errors;
        }
    });

    return (
        <LessonForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setFieldValue={setFieldValue}
            values={values}
            errors={errors}
        />
    );
};

export default UpdateLessonContainer;
