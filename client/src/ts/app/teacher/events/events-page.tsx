import React, { useEffect, useState } from "react";
import service from "Ts/services/service";
import { useSelector } from "Ts/utils/typed-selector";
import { IEvent } from "Ts/redux/state-interfaces";
import Button from "Ts/components/button";
import Event from "./event";

interface Props {}

const Events: React.FC<Props> = () => {
    const { token } = useSelector(state => state.auth);
    const [events, setEvents] = useState<IEvent[]>([]);
    useEffect(() => {
        service.getEvents(token).then(res => setEvents(res.events));
    }, []);
    return (
        <div className="section">
            <table className="table">
                <thead>
                    <tr>
                        <th>Удалить</th>
                        <th>Изменить</th>
                        <th>Заголовок</th>
                        <th>Дата</th>
                        <th>Описание</th>
                        <th>Видимость</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <Event
                            event={event}
                            key={event._id}
                            onDelete={async (_id: string) => {
                                const res = await service.deleteEvent(
                                    _id,
                                    token
                                );
                                if (res.done) {
                                    setEvents(e =>
                                        e.filter(el => el._id !== _id)
                                    );
                                }
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Events;
