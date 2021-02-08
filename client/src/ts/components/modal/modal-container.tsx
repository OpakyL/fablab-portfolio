import React from "react";

import Modal from "./modal";
import { useFormik } from "formik";
import service from "Ts/services/service";

interface Props {
    show?: boolean;
    setShow?: (s: boolean) => void;
}

const ModalContainer: React.FC<Props> = ({
    show = false,
    setShow = () => {}
}) => {
    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            comment: ""
        },
        validateOnChange: false,
        onSubmit: async data => {
            await service.postContact(data);
            setShow(false);
        },
        validate: () => {
            const errors: any = {};
            if (values.name.length === 0) {
                errors.name = "Введите ваше имя!";
            }
            if (values.phone.length === 0 && values.email.length === 0) {
                errors.contact =
                    "Должен быть введен хотя бы один способ связи!";
            }
            return errors;
        }
    });

    return (
        <>
            {show && (
                <Modal
                    setShow={setShow}
                    values={values}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            )}
        </>
    );
};

export default ModalContainer;
