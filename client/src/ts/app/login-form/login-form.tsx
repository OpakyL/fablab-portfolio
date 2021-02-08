import Button from "Components/button";
import Icon from "Components/icon";
import Input from "Components/input";
import React, { useState } from "react";
import service from "Services/service";
import { useAuth } from "Ts/hooks/auth-hook";
import { useRequest } from "Ts/hooks/http-hook";

const LoginForm: React.FC = () => {
    //вынести
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login } = useAuth();
    const { loading, error, request } = useRequest(service.login);
    const onSubmitHandler = async (event: any) => {
        event.preventDefault();
        const res = await request(username, password);
        if (res.error) {
            //TODO notify about wrong data
            return;
        }

        login({ ...res, isAuthenticated: true });
    };

    const onUsernameHandler = (event: any) => {
        setUsername(event.target.value.trim());
    };

    const onPasswordHandler = (event: any) => {
        setPassword(event.target.value.trim());
    };

    return (
        <form onSubmit={onSubmitHandler} className="loginForm">
            <div className="loginForm__wrapper">
                <div className="loginForm__row">
                    <Input
                        onChange={onUsernameHandler}
                        className="input-loginForm"
                        value={username}
                        placeholder="Телефон или логин"
                    />
                </div>
                <div className="loginForm__row">
                    <Input
                        onChange={onPasswordHandler}
                        className="input-loginForm"
                        value={password}
                        type="password"
                        placeholder="Пароль"
                    />
                </div>
                <div className="loginForm__row">
                    <Button className="button-loginForm">Войти</Button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
