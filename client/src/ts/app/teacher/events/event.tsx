import React from "react";
import { IEvent } from "Ts/redux/state-interfaces";
import Button from "Ts/components/button";

interface Props {
    onDelete: (_id: string) => void;
    event: IEvent;
}

const Event: React.FC<Props> = ({
    onDelete,
    event: { title, date, description, hide, _id }
}) => {
    return (
        <tr className="row-event">
            <td>
                <Button
                    className="button-teacher"
                    onClick={() => {
                        if (_id) {
                            onDelete(_id);
                        }
                    }}
                >
                    delete
                </Button>
            </td>
            <td>
                <Button href={`/event/edit/${_id}`} className="button-teacher">
                    edit
                </Button>
            </td>
            <td>{title}</td>
            <td>{date}</td>
            <td>{description}</td>
            <td>{hide ? "скрыто" : "не скрыто"}</td>
        </tr>
    );
};

export default Event;
