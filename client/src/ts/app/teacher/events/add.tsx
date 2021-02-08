import React from "react";
import { useSelector } from "Ts/utils/typed-selector";
import { useFormik } from "formik";
import EventForm from "./form";
import { formatDate } from "Ts/utils/format-date";
import service from "Ts/services/service";

interface Props {}

const AddEvent: React.FC<Props> = () => {
    // const { courseId } = useParams();
    const { token } = useSelector(state => state.auth);
    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            title: "",
            description: "",
            date: formatDate(new Date()),
            hide: true
        },
        validateOnChange: false,
        onSubmit: async ({ title, description, date, hide }) => {
            service
                .addEvent({ title, date, description, hide }, token)
        },
        validate: values => {
            const errors: any = {};
            return errors;
        }
    });
    return (
        <EventForm
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
        />
    );
};

export default AddEvent;
