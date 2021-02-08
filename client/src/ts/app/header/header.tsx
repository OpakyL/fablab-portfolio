import React, { useState } from "react";
import { NavLink as Link, Link as Logo } from "react-router-dom";
import cn from "classnames";
import Burger from "./burger";
import Portal from "Ts/components/portal";

interface Props {}

const Header: React.FC<any> = () => {
    const [closed, setClosed] = useState(true);
    const headerClasses = cn("header", { "header-close": closed });
    const toggleMenu = () => {
        setClosed(f => !f);
    };

    const onlink = () => {
        if (window.screen.width < 768) {
            setClosed(true);
        }
    };

    return (
        <>
            <Burger toggleMenu={toggleMenu} active={closed} />
            <div
                className={headerClasses}
                onMouseEnter={() => {
                    setClosed(false);
                }}
                onMouseLeave={() => {
                    setClosed(true);
                }}
            >
                <div className="header-wrapper">
                    <Logo to="/" className="header-logo">
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
                    </Logo>
                    <div className="header-links">
                        <Link
                            onClick={onlink}
                            to="/"
                            exact={true}
                            className="link-home header-link"
                        >
                            <div className="header-link-title ">О нас</div>
                            <img src="/assets/img/icons/home.svg" alt="О нас" />
                        </Link>
                        <Link
                            to="/courses"
                            onClick={onlink}
                            className="header-link"
                        >
                            <div className="header-link-title ">Курсы</div>
                            <img
                                src="/assets/img/icons/book-open.svg"
                                alt="Курсы"
                            />
                        </Link>
                        <Link
                            to="/events"
                            onClick={onlink}
                            className="header-link"
                        >
                            <div className="header-link-title ">События</div>
                            <img
                                src="/assets/img/icons/calendar.svg"
                                alt="События"
                            />
                        </Link>
                        {/* <Link
                            to="/workshop"
                            onClick={onlink}
                            className="header-link"
                        >
                            <div className="header-link-title ">Мастерская</div>
                            <img
                                src="/assets/img/icons/tool.svg"
                                alt="Мастерская"
                            />
                        </Link> */}
                    </div>
                    <Link
                        onClick={onlink}
                        to="/contacts"
                        className="header-location header-link"
                    >
                        <div className="header-link-title ">Контакты</div>
                        <img
                            src="/assets/img/icons/map-pin.svg"
                            alt="Контакты"
                        />
                    </Link>
                </div>
            </div>
        </>
    );
};

const HeaderContainer = () => {
    return <Header />;
};

export default HeaderContainer;
