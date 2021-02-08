import React from "react";
import { HandleChange } from "../add-edit-course/course-form";
import { FormikErrors } from "formik";
import Input from "Ts/components/input";
import Button from "Ts/components/button";

interface Props {
    values: {
        title: string;
        description: string;
        date: string;
        hide: boolean;
    };
    handleChange: HandleChange;
    handleSubmit: () => void;
    errors: FormikErrors<{}>;
}

const EventForm: React.FC<Props> = ({
    errors,
    handleChange,
    values: { title, description, date, hide },
    handleSubmit
}) => {
    return (
        <div className="section">
            <div className="teacherForm__wrapper">
                <form className="teacherForm" onSubmit={handleSubmit}>
                    <label>
                        Заголовок <br />
                        <Input
                            name="title"
                            className="input-teacher"
                            placeholder="Заголовок"
                            onChange={handleChange}
                            value={title}
                        />
                    </label>
                    <br />
                    <label>
                        Описание <br />
                        <textarea
                            className="input input-teacher"
                            rows={16}
                            name="description"
                            placeholder="description"
                            onChange={handleChange}
                            value={description}
                        />
                    </label>
                    <br />
                    <label>
                        Дата <br />
                        <input
                            className="input input-teacher"
                            onChange={handleChange}
                            name="date"
                            type="date"
                            value={date}
                        />
                    </label>
                    <br />

                    <label>
                        Видимость <br />
                        <input
                            type="checkbox"
                            name="hide"
                            checked={hide}
                            onChange={handleChange}
                        />
                        {hide ? "Скрыто" : "Не скрыто"}
                    </label>
                    <Button type="submit" className="button-teacher">Готово</Button>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
