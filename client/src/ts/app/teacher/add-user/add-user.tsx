import React from "react";
import { useFormik } from "formik";
import Button from "Ts/components/button";
import Input from "Ts/components/input";
import service from "Ts/services/service";
import { useSelector } from "Ts/utils/typed-selector";

interface Props {}

const AddUser: React.FC<Props> = () => {
    const { token } = useSelector(state => state.auth);
    const {
        handleSubmit,
        errors,
        handleChange,
        values: {
            username,
            email,
            password,
            confirmPassword,
            firstname,
            lastname,
            courses
        }
    } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstname: "",
            lastname: "",
            courses: []
        },
        validateOnChange: false,
        onSubmit: async ({
            username,
            email,
            password,
            firstname,
            lastname
        }) => {
            const res = await service.addUsers(
                {
                    username,
                    email,
                    password,
                    firstname,
                    lastname
                },
                token
            );

            if (res.error) {
                //TODO notify error message
            }
        },
        validate: values => {
            const errors: any = {};
            if (values.username.length === 0) {
                errors.username = "У пользователя должно быть имя!";
            }
            if (values.email.length === 0) {
                errors.email = "Адрес электронной почты не может быть пустым!";
            }
            if (values.password.length === 0) {
                errors.password = "Пароль не может быть пустым!";
            }
            if (values.password != values.confirmPassword) {
                errors.confirmPassword = "Пароли не совпадают!";
            }
            return errors;
        }
    });

    return (
        <div className="section">
            <div className="teacherForm__wrapper">
                <form className="teacherForm" onSubmit={handleSubmit}>
                    <Input
                        name="username"
                        onChange={handleChange}
                        value={username}
                        placeholder="Username"
                    />
                    {errors.username}
                    <br />
                    <Input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={email}
                        placeholder="Email"
                    />
                    {errors.email}
                    <br />
                    <Input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={password}
                        placeholder="Password"
                    />
                    {errors.password}
                    <br />
                    <Input
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                        value={confirmPassword}
                        placeholder="Confirm password"
                    />
                    {errors.confirmPassword}
                    <br />
                    <Input
                        name="firstname"
                        onChange={handleChange}
                        value={firstname}
                        placeholder="Firstname"
                    />
                    {errors.firstname}
                    <br />
                    <Input
                        name="lastname"
                        onChange={handleChange}
                        value={lastname}
                        placeholder="Lastname"
                    />
                    {errors.lastname}
                    <br />

                    <Button type="submit">Add</Button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
