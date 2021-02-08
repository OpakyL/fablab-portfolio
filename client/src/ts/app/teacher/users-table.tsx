import React, { useEffect, useState, useRef } from "react";
import service from "Ts/services/service";
import { useSelector } from "Ts/utils/typed-selector";
import { IUser } from "Ts/redux/state-interfaces";
import Button from "Ts/components/button";
import UserRow from "./users-table/user";

interface Props {}

const UsersTable: React.FC<Props> = () => {
    const { token } = useSelector(state => state.auth);
    const { courses, teacherCourses } = useSelector(state => state.data);
    const [users, setUsers] = useState();
    const ref = useRef<any>(null);

    useEffect(() => {
        service.getUsers(token).then(({ students }) => {
            setUsers(students);
        });
    }, []);

    if (users === undefined) {
        return <div className="loading">loading</div>;
    }

    const onAdd = (courseId: string, userId: string) => {
    };

    return (
        <div className="section">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Имеющиеся</th>
                        <th>Удалить</th>
                        <th>Добавляемые</th>
                        <th>Добавить</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((el: IUser, i: number) => (
                        <UserRow onAdd={onAdd} user={el} key={el._id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
