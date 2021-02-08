import React, { useState } from "react";
import { HandleChange } from "Ts/app/teacher/add-edit-course/course-form";
import Button from "../button";
import Input from "../input";
import "./modal.scss";
import cn from "classnames";

interface Props {
    values: {
        name: string;
        phone: string;
        email: string;
        comment: string;
    };
    errors: any;
    setShow?: (s: boolean) => void;
    handleChange: HandleChange;
    handleSubmit: () => void;
}

const Modal: React.FC<Props> = ({
    setShow = () => {},
    values: { name, phone, email, comment },
    handleChange,
    handleSubmit,
    errors
}) => {
    const [closing, setClosing] = useState(false);
    const onClose = () => {
        setClosing(true);
        setTimeout(() => {
            setShow(false);
        }, 490);
    };

    return (
        <>
            <div
                className={cn("modal-bg", { "modal-bg-close": closing })}
                onClick={() => {
                    onClose();
                }}
            />
            <form
                className={cn("modal", { "modal-close": closing })}
                onSubmit={handleSubmit}
            >
                <div
                    className="cross"
                    onClick={() => {
                        onClose();
                    }}
                />
                <div className="modal__subtitle">
                    Оставьте ваши контактные данные
                </div>
                <div className="modal__inputs">
                    <Input
                        name="name"
                        onChange={handleChange}
                        value={name}
                        className={cn("input-modal", {
                            "input-modal-error": errors.name
                        })}
                        placeholder="Имя"
                    />
                    {errors.name}
                    <Input
                        name="phone"
                        onChange={handleChange}
                        value={phone}
                        className={cn("input-modal", {
                            "input-modal-error": errors.contact
                        })}
                        placeholder="Номер телефона"
                    />
                    {errors.contact}
                    <Input
                        name="email"
                        onChange={handleChange}
                        value={email}
                        className={cn("input-modal", {
                            "input-modal-error": errors.contact
                        })}
                        placeholder="Электронная почта"
                    />
                    <textarea
                        name="comment"
                        onChange={handleChange}
                        value={comment}
                        rows={4}
                        className="input input-modal-textarea"
                        placeholder="Комментарий"
                    />
                </div>
                <Button type="submit" className="button-home">
                    Отправить
                </Button>
            </form>
        </>
    );
};

export default Modal;
