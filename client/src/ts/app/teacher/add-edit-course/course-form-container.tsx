import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Button from "Ts/components/button";
import Input from "Ts/components/input";
import { useSelector } from "Utils/typed-selector";
import service, { base } from "Ts/services/service";
import { useParams, useHistory } from "react-router";
import CourseForm from "./course-form";
import actions from "Ts/redux/actions";
import { formatDate } from "Ts/utils/format-date";

interface Props {}

interface Values {
    title: string;
    shortDescr: string;
    longDescr: string;
    price: string;
    hide: boolean;
    thumbnail: any;
    baseThumbnail: any;
    startDate: string;
    endDate: string;
}

const init: Values = {
    title: "",
    shortDescr: "",
    longDescr: "",
    price: "",
    hide: true,
    thumbnail: new Blob(),
    baseThumbnail: "",
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date())
};

const AddEditCourse: React.FC<Props> = () => {
    const { token } = useSelector(state => state.auth);
    const { courseId } = useParams();
    const [unmounted, setUnmounted] = useState<boolean>(false);
    const [initValues, setInitValues] = useState<Values>(init);
    const history = useHistory();

    useEffect(() => {
        if (courseId) {
            service.getCourse(courseId, token).then(({ course }) => {
                setInitValues({
                    ...course,
                    startDate: formatDate(new Date(course.startDate)),
                    endDate: formatDate(new Date(course.endDate)),
                    thumbnail: base + course.thumbnail.url,
                    baseThumbnail: course.thumbnail
                });
            });
        } else {
            setInitValues(init);
        }
        return () => {
            setUnmounted(true);
        };
    }, [courseId]);

    const {
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        errors
    } = useFormik({
        initialValues: initValues,
        enableReinitialize: true,
        validateOnChange: false,
        onSubmit: async ({
            longDescr,
            price,
            shortDescr,
            thumbnail: file,
            hide,
            title,
            startDate,
            endDate,
            baseThumbnail
        }) => {
            history.push("/");
            if (courseId) {
                let newFile;
                if (file === initValues.thumbnail) {
                    newFile = baseThumbnail;
                } else {
                    const { file: res } = await service.upload(file, token);
                    newFile = res;
                    if (!unmounted) {
                        setInitValues({
                            ...initValues,
                            thumbnail: base + newFile.url,
                            baseThumbnail: newFile
                        });
                    }
                }
                actions.updateCoursesRequest(token, {
                    _id: courseId,
                    title,
                    hide,
                    shortDescr,
                    longDescr,
                    endDate,
                    startDate,
                    price,
                    thumbnail: newFile
                });
            } else {
                const { file: newFile } = await service.upload(file, token);
                actions.addCoursesRequest(token, {
                    longDescr,
                    price,
                    shortDescr,
                    endDate,
                    startDate,
                    thumbnail: newFile,
                    hide,
                    title
                });
            }
        },
        validate: values => {
            const errors: any = {};
            if (values.title.length === 0) {
                errors.title = "Заголовок не может быть пустым!";
            }
            if (values.shortDescr.length === 0) {
                errors.shortDescr = "Краткое описание не может быть пустым!";
            }
            if (values.longDescr.length === 0) {
                errors.longDescr = "Длинное описание не может быть пустым!";
            }
            if (values.price.length === 0) {
                errors.price = "У курса должна быть цена!";
            }
            if (values.thumbnail.size === 0) {
                errors.thumbnail = "У курса должна быть картинка!";
            }
            return errors;
        }
    });

    return (
        <CourseForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setFieldValue={setFieldValue}
            values={values}
            errors={errors}
            courseId={courseId}
        />
    );
};

export default AddEditCourse;
