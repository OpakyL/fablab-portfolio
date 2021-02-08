import React, { useState, useRef } from "react";
import { useSelector } from "Ts/utils/typed-selector";
import Portal from "Ts/components/portal";
import LoginForm from "../login-form";
import { useAuth } from "Ts/hooks/auth-hook";

interface Props {
    toggleOpen: () => void;
    isOpened: boolean;
}

const UserPanel: React.FC<Props> = ({ isOpened, toggleOpen }) => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const { logout } = useAuth();
    if (isAuthenticated) {
        return (
            <div className="userpanel">
                <div className="userpanel-item">
                    <img src="/assets/img/icons/user.svg" alt="userimg" />
                </div>
                <div className="userpanel-item">
                    Мои курсы
                    <img src="/assets/img/icons/edit.svg" alt="coursessimg" />
                </div>
                <div className="userpanel-item">
                    Настройки
                    <img
                        src="/assets/img/icons/settings.svg"
                        alt="settingsimg"
                    />
                </div>
                <div className="userpanel-item userpanel-exit" onClick={logout}>
                    Выход
                    <img src="/assets/img/icons/log-out.svg" alt="logoutimg" />
                </div>
            </div>
        );
    }
    return (
        <div className="userpanel">
            <div className="userpanel-login" onClick={toggleOpen}>
                <img src="/assets/img/icons/log-in.svg" alt="loginimg" />
            </div>
            {isOpened && <LoginForm />}
        </div>
    );
};

const UserContainer = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const wrapper = useRef(null);

    const toggleOpen = () => {
        setOpened(e => !e);
    };

    const closeForm = (e: React.MouseEvent<HTMLDivElement>) => {
        if (wrapper.current === e.target) {
            setOpened(false);
        }
    };
    return (
        <Portal>
            {opened && (
                <div
                    className="userpanel-layout"
                    onClick={closeForm}
                    ref={wrapper}
                />
            )}
            <UserPanel isOpened={opened} toggleOpen={toggleOpen} />
        </Portal>
    );
};

export default UserContainer;
