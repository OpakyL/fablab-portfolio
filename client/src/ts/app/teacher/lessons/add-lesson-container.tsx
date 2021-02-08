import React from "react";
import { useFormik } from "formik";
import { useParams } from "react-router";
import LessonForm from "./lesson-form";
import service from "Ts/services/service";
import { useSelector } from "Ts/utils/typed-selector";
import actions from "Ts/redux/actions";

interface Props {}

const AddLessonContainer: React.FC<Props> = () => {
    const { courseId } = useParams();
    const { token } = useSelector(state => state.auth);
    const {
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        errors
    } = useFormik({
        initialValues: {
            title: "",
            videoUrl: "",
            text: "",
            files: []
        },
        validateOnChange: false,
        onSubmit: async ({ title, videoUrl, text, files }) => {
            if (courseId) {
                const promises = files.map(file => service.upload(file, token));
                let res = await Promise.all(promises);
                res = res.map(({ file }) => file);
                actions.addLessonToCourseRequest(token, {
                    courseId,
                    title,
                    videoUrl,
                    text,
                    files: res
                });
            }
        },
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

export default AddLessonContainer;
