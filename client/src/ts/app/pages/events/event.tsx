import React, { useState, useEffect, useRef } from "react";
import { IEvent } from "Ts/redux/state-interfaces";

import moment from "moment";
import Button from "Ts/components/button";
import cn from "classnames";

interface Props {
    event: IEvent;
    open: (e: IEvent) => void;
}

moment.locale("ru");

const Event: React.FC<Props> = ({ event, open }) => {
    const { date, description, title, _id } = event;
    const [currentDate, setMoment] = useState(moment(date));

    return (
        <div className={"event-row"}>
            <div className="event-date">
                <div className="event-day">{currentDate.format("dddd")}</div>
                <div className="event-num">{currentDate.format("DD MMMM")}</div>
            </div>
            <div className="event-title">{title}</div>
            <div className="event-button">
                <Button
                    className="button-home button-event"
                    onClick={() => {
                        open(event);
                    }}
                >
                    Подробнее
                    <img src="/assets/img/icons/chevron-left.svg" alt="" />
                </Button>
            </div>
        </div>
    );
};

export default Event;
