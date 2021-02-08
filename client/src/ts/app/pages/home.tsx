import React, { useState, useEffect, useRef } from "react";
import Button from "Ts/components/button";
import cn from "classnames";

import Slider from "react-slick";
import Arrow from "Ts/components/arrow";
import Setting from "Utils/slider-settings";
import service from "Ts/services/service";
import moment from "moment";
import { useRequest } from "Ts/hooks/http-hook";
import Loader from "Ts/components/loader";

interface Props {}

const Page = () => (
    <div className="home__info__text">
        Мы являемся одной из немногих площадок в центре г. Санкт-Петербург, где
        каждый сможет не только развить свои навыки в технических областях, но и
        реализовать свой собственный проект. Мы оказываем консультационные
        услуги и помогаем развить проекты по следующим направлениям:
        <br />
        <br />
        - 3D моделирование
        <br />
        - 3D сканирование
        <br />
        - 3D печать
        <br />
        - Макетирование
        <br />
        - Робототехника
        <br />- Инжиниринг
    </div>
);

const Home: React.FC<Props> = () => {
    const ref = useRef<any>(null);
    const [paused, setPaused] = useState(false);
    const [closed, setClosed] = useState(true);
    const { loading, request } = useRequest(service.getNearestCourse);
    const [nearest, setNearest] = useState();
    const cl = cn("home__info", { "home__info-closed": closed });
    const bcl = cn("button-home button-ml15", {
        "button-home-gray": !closed
    });
    useEffect(() => {
        request().then((nearest: any) => setNearest(nearest));
        if (window.screen.width < 768) {
            setClosed(false);
        }
    }, []);

    const onClose = () => {
        setClosed(closed => !closed);
    };

    const settings = Setting({
        prevArrow: <Arrow direction="LEFT" indicator="prevHome" />,
        nextArrow: <Arrow direction="RIGHT" indicator="nextHome" />
    });

    return (
        <section className="home">
            {window.screen.width > 768 && (
                <video
                    className="home__video"
                    muted={true}
                    ref={ref}
                    autoPlay={true}
                    loop={true}
                    preload="metadata"
                >
                    <source src="/assets/video/bgvideo.mp4" />
                </video>
            )}
            <div className="home__wrapper">
                {window.screen.width > 768 && (
                    <Button
                        className={"button-play"}
                        onClick={() => {
                            if (paused) {
                                ref.current.play();
                            } else {
                                ref.current.pause();
                            }
                            setPaused(!paused);
                        }}
                    >
                        {paused ? (
                            <img
                                src="/assets/img/icons/play.svg"
                                alt=""
                                className="play-img"
                            />
                        ) : (
                            <div>
                                <span className="bar bar-1" />
                                <span className="bar bar-2" />
                            </div>
                        )}
                    </Button>
                )}
                <div className={cl}>
                    {window.screen.width > 768 && (
                        <div className="cross" onClick={onClose} />
                    )}
                    <div className="home__info__top">
                        <h1 className="title-home">
                            О НАС
                            <img src="/assets/img/icons/dash.svg" />
                        </h1>
                        {/* <Slider {...settings}> */}
                            <Page />
                            {/* <Page />
                            <Page />
                            <Page />
                            <Page />
                            <Page /> */}
                        {/* </Slider> */}
                    </div>
                    <div className="home__info__bottom">
                        <div className="home__info__closest">
                            {loading && <Loader height="20px" width="20px" />}
                            {nearest && (
                                <>
                                    <div className="home__info__closest__text">
                                        Ближайший курс
                                    </div>
                                    <div className="home__info__closest__date">
                                        {moment(nearest.startDate).format(
                                            "DD MMMM"
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="home__info__buttons">
                            <Button
                                className="button-home button-home-kostyl"
                                href="/courses"
                            >
                                Перейти в раздел курсы
                                <img
                                    className="button-arrow"
                                    src="/assets/img/icons/chevron-right.svg"
                                />
                            </Button>
                            {window.screen.width > 768 && (
                                <Button className={bcl} onClick={onClose}>
                                    О нас
                                    <img
                                        className="button-arrow rotating-arrow"
                                        src="/assets/img/icons/chevron-left.svg"
                                    />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
