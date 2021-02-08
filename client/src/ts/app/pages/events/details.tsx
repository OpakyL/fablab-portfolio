import React, { useState } from "react";
import { IEvent } from "Ts/redux/state-interfaces";
import moment from "moment";
import Button from "Ts/components/button";
import cn from "classnames";
import Portal from "Ts/components/portal";
import Modal from "Ts/components/modal";

interface Props {
    event: IEvent;
    close: () => void;
}

moment.locale("ru");

const EventDetails: React.FC<Props> = ({
    event: { date, description, title },
    close
}) => {
    const [showModal, setShowModal] = useState(false);
    const [currentDate, setMoment] = useState(moment(date));
    const [closing, setClosing] = useState<boolean>(false);

    const back = () => {
        setClosing(true);
        setTimeout(() => {
            close();
        }, 1000);
    };
    return (
        <div
            className={cn("event-details", {
                "event-details-closing": closing
            })}
        >
            <Portal>
                <Modal show={showModal} setShow={setShowModal} />
            </Portal>
            <div className="event-info">
                <div className="event-header">
                    <div className="event-date">
                        <div className="event-day">
                            {currentDate.format("dddd")}
                        </div>
                        <div className="event-num">
                            {currentDate.format("DD MMMM")}
                        </div>
                    </div>
                    <div className="event-title">{title}</div>
                </div>
                {description.split("\n").map((i, p) => (
                    <p key={p}>{i}</p>
                ))}
            </div>
            <div className="event-footer">
                <Button
                    className="button-home"
                    onClick={() => setShowModal(!showModal)}
                >
                    Записаться
                    <img
                        className="button-arrow"
                        src="/assets/img/icons/chevron-right.svg"
                        alt="arrow"
                    />
                </Button>
                <Button
                    className="button-home button-ml15 button-home-gray"
                    onClick={back}
                >
                    Назад
                    <img
                        className="button-arrow"
                        src="/assets/img/icons/chevron-left.svg"
                        alt="arrow"
                    />
                </Button>
            </div>
        </div>
    );
};

export default EventDetails;
