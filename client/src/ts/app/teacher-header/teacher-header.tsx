import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import cn from "classnames";
import Burger from "./burger";
import Portal from "Ts/components/portal";

interface Props {}

const TeacherHeader: React.FC<any> = () => {
    const [closed, setClosed] = useState(true);
    const headerClasses = cn("header", { "header-close": closed });
    const toggleMenu = () => {
        setClosed(f => !f);
    };
    return (
        <>
            <Burger toggleMenu={toggleMenu} active={closed} />
            <div
                className="header"
                onMouseEnter={() => {
                    setClosed(false);
                }}
                onMouseLeave={() => {
                    setClosed(true);
                }}
            >
                <div className="header-wrapper">
                    <div className="header-logo">
                        <div className="fab">
                            <span className="f">Ф</span>
                            <span className="a">А</span>
                            <span className="b">Б</span>
                        </div>
                        <div className="lab">
                            <span className="l">Л</span>
                            <span className="a">А</span>
                            <span className="b">Б</span>
                        </div>
                    </div>
                    <Link
                        to="/home"
                        exact={true}
                        className="link-home header-link"
                    >
                        <div className="header-link-title ">Курсы</div>
                    </Link>
                    <Link
                        to="/add-course"
                        exact={true}
                        className="link-home header-link"
                    >
                        <div className="header-link-title ">Добавить курсы</div>
                    </Link>
                    <Link
                        to="/events"
                        exact={true}
                        className="link-home header-link"
                    >
                        <div className="header-link-title ">События</div>
                    </Link>
                    <Link
                        to="/event/add"
                        exact={true}
                        className="link-home header-link"
                    >
                        <div className="header-link-title ">
                            Добавить событие
                        </div>
                    </Link>
                    <Link
                        to="/contacts"
                        exact={true}
                        className="link-home header-link"
                    >
                        <div className="header-link-title ">Контакты</div>
                    </Link>
                </div>
            </div>
        </>
    );
};

const HeaderContainer = () => {
    return <TeacherHeader />;
};

export default HeaderContainer;
