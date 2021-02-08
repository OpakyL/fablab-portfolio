import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { IEvent } from "Ts/redux/state-interfaces";
import service from "Ts/services/service";
import { divideArr } from "Ts/utils/divide-arr";
import Settings from "Ts/utils/slider-settings";
import { useSelector } from "Ts/utils/typed-selector";
import EventDetails from "./details";
import Event from "./event";
import cn from "classnames";

interface Props {}

const initEvent: IEvent = {
    date: "",
    description: "",
    title: ""
};

const Events: React.FC<Props> = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const [closingClasses, setclosingClasses] = useState<boolean>(false);
    const [openingClasses, setopeningClasses] = useState<boolean>(false);
    const [openedEvent, setOpenedEvent] = useState<IEvent>(initEvent);
    const settings = Settings({
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    const { token } = useSelector(state => state.auth);
    const [events, setEvents] = useState<any[]>([]);
    const open = (e: IEvent) => {
        setopeningClasses(true);
        setOpenedEvent(e);
        setTimeout(() => {
            setOpened(true);
        }, 1000);
    };

    const close = () => {
        setOpened(false);
        setopeningClasses(false);
        setclosingClasses(true);
        setTimeout(() => {
            setclosingClasses(false);
        }, 1000);
    };
    useEffect(() => {
        service
            .getEvents(token)
            .then(res => setEvents(divideArr(res.events, 7)));
    }, []);

    const ref = useRef<any>(null);

    return (
        <div className="section events">
            <div className="title title-home">
                События <img src="/assets/img/icons/dash.svg" alt="dash" />
            </div>
            {opened ? (
                <EventDetails close={close} event={openedEvent} />
            ) : (
                <div
                    ref={ref}
                    className={cn("events-slider", {
                        "events-close": openingClasses,
                        "events-open": closingClasses
                    })}
                >
                    <Slider {...settings}>
                        {events.map((e, i) => (
                            <div key={i}>
                                {e.map((event: IEvent) => (
                                    <Event
                                        key={event._id}
                                        event={event}
                                        open={open}
                                    />
                                ))}
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default Events;
