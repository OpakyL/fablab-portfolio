import React, { useEffect, useState } from "react";
import { ICourse } from "Ts/redux/state-interfaces";
import Button from "Ts/components/button";
import Modal from "Ts/components/modal";
import Portal from "Ts/components/portal";
import moment from "moment";

interface Props {
    course: ICourse;
    onClick: () => void;
    classes: string;
}

const CourseDetails: React.FC<Props> = ({
    course: { startDate, title, _id, longDescr },
    onClick,
    classes
}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={classes}>
            <Portal>
                <Modal show={showModal} setShow={setShowModal} />
            </Portal>
            <div className="courseDetails__text">
                <div className="courseDetails__subtitle">
                    <div className="courseDetails-mr20">{moment(startDate).format('dddd')}</div>
                    <div className="courseDetails-mr20">{moment(startDate).format('DD MMMM')}</div>
                    <div className="courseDetails-mr20">{title}</div>
                </div>
                <div className="courseDetails__info">
                    {longDescr.split("\n").map((i, p) => (
                        <p key={p}>{i}</p>
                    ))}
                </div>
                <div className="courseDetails__buttons">
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
                        onClick={onClick}
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
        </div>
    );
};

export default CourseDetails;
