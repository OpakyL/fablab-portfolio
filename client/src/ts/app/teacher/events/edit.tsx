import React, { useEffect, useState } from "react";
import { useSelector } from "Ts/utils/typed-selector";
import { useFormik } from "formik";
import { formatDate } from "Ts/utils/format-date";
import service from "Ts/services/service";
import EventForm from "./form";
import { useParams } from "react-router";

interface Props {}

const Edit: React.FC<Props> = () => {
    const { token } = useSelector(state => state.auth);
    const { eventId } = useParams();
    const [event, setEvent] = useState({
        title: "",
        description: "",
        date: formatDate(new Date()),
        hide: true
    });

    useEffect(() => {
        if (eventId) {
            service.getEvent(eventId, token).then(event => {
                event.date = formatDate(new Date(event.date));
                setEvent(event);
            });
        }
    }, []);
    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: event,
        validateOnChange: false,
        onSubmit: async ({ title, description, date, hide }) => {
            service
                .updateEvent(
                    { _id: eventId, title, description, date, hide },
                    token
                )
        },
        validate: values => {
            const errors: any = {};
            return errors;
        },
        enableReinitialize: true
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

export default Edit;
