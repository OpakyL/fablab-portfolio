import React from "react";
import Button from "Ts/components/button";
import Input from "Ts/components/input";
import { FormikErrors } from "formik";

export type HandleChange = (
    eventOrPath: string | React.ChangeEvent<any>
) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);

export type SetFieldValue = (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
) => any;

interface Props {
    values: {
        title: string;
        shortDescr: string;
        longDescr: string;
        price: string;
        thumbnail: any;
        hide: boolean;
        startDate: string;
        endDate: string;
    };
    handleChange: HandleChange;
    handleSubmit: () => void;
    setFieldValue: SetFieldValue;
    errors: FormikErrors<{
        title: string;
        shortDescr: string;
        longDescr: string;
        price: string;
        thumbnail: string;
    }>;
    courseId: string | undefined;
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const CourseForm: React.FC<Props> = ({
    values: {
        price,
        longDescr,
        shortDescr,
        thumbnail,
        hide,
        title,
        endDate,
        startDate
    },
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    courseId
}) => {
    return (
        <div className="section">
            <div className="teacherForm__wrapper">
                <form className="teacherForm" onSubmit={handleSubmit}>
                    <label>
                        Заголовок
                        <br />
                        <Input
                            name="title"
                            onChange={handleChange}
                            value={title}
                            className="input-teacher"
                            placeholder="Заголовок"
                        />
                    </label>
                    {errors.title}
                    <br />
                    <label>
                        Короткое описание (не используется)
                        <Input
                            className="input-teacher"
                            placeholder="Короткое описание"
                            name="shortDescr"
                            onChange={handleChange}
                            value={shortDescr}
                        />
                    </label>
                    {errors.shortDescr}
                    <br />
                    <label>
                        Описание <br />
                        <textarea
                            rows={16}
                            value={longDescr}
                            name="longDescr"
                            className="input input-teacher"
                            placeholder="Описание"
                            onChange={handleChange}
                        />
                    </label>
                    {errors.longDescr}
                    <br />
                    <label>
                        Цена (не используется) <br />
                        <Input
                            name="price"
                            placeholder="Цена"
                            className="input-teacher"
                            onChange={handleChange}
                            value={price}
                        />
                    </label>
                    {errors.price}
                    <br />
                    <label>
                        Видимость <br />
                        <input
                            type="checkbox"
                            name="hide"
                            onChange={(e: InputEvent) => {
                                setFieldValue("hide", e.target.checked);
                            }}
                            checked={hide}
                        />
                        {hide ? "Скрыто" : "Не скрыто"}
                    </label>
                    <br />
                    <Input
                        name="thumbnail"
                        className="input-teacher"
                        type="file"
                        onChange={event => {
                            if (event.currentTarget.files) {
                                setFieldValue(
                                    "thumbnail",
                                    event.currentTarget.files[0]
                                );
                            }
                        }}
                    />
                    {errors.thumbnail}
                    {(thumbnail.size > 0 && (
                        <img
                            style={{ height: "250px", width: "250px" }}
                            src={URL.createObjectURL(thumbnail)}
                        />
                    )) ||
                        (courseId && (
                            <img
                                style={{ height: "250px", width: "250px" }}
                                src={thumbnail}
                            />
                        ))}
                    <br />
                    <label>
                        Дата начала
                        <br />
                        <input
                            type="date"
                            name="startDate"
                            className="input input-teacher"
                            onChange={handleChange}
                            value={startDate}
                        />
                    </label>
                    <br />
                    <label>
                        Дата конца
                        <br />
                        <input
                            type="date"
                            name="endDate"
                            className="input input-teacher"
                            onChange={handleChange}
                            value={endDate}
                        />
                    </label>
                    <br />
                    <Button type="submit" className="button-teacher">
                        {(courseId && "Edit") || "Add"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CourseForm;
