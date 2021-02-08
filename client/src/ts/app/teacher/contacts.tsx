import React, { useState, useEffect } from "react";
import { useRequest } from "Ts/hooks/http-hook";
import service, { IContact } from "Ts/services/service";
import { useSelector } from "Ts/utils/typed-selector";
import Loader from "Ts/components/loader";

interface Props {}

const Contacts: React.FC<Props> = () => {
    const { token } = useSelector(state => state.auth);
    const [contacts, setContacts] = useState([]);
    const { request, loading } = useRequest(service.getContacts);
    useEffect(() => {
        request(token).then((res: any) => {
            setContacts(res);
        });
    }, []);
    return (
        <div className="section">
            {loading && <Loader />}
            <table className="table">
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Телефон</th>
                        <th>Email</th>
                        <th>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((e: IContact, i) => (
                        <tr key={i}>
                            <td>{e.name}</td>
                            <td>{e.phone}</td>
                            <td>{e.email}</td>
                            <td>{e.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Contacts;
