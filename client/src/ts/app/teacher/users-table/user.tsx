import React, { useState } from "react";
import { IUser, ICourse } from "Ts/redux/state-interfaces";
import { useSelector } from "Ts/utils/typed-selector";
import Button from "Ts/components/button";

interface Props {
    user: IUser;
    onAdd: (courseId: string, userId: string) => void;
}

interface userForm {
    delete?: string;
    add?: string;
}

const UserRow: React.FC<Props> = ({
    user: { _id, username, email, firstname, lastname, courses: userCourses },
    onAdd
}) => {
    const { courses, teacherCourses } = useSelector(state => state.data);
    const [form, setForm] = useState<userForm>({
        delete: "",
        add: ""
    });
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <tr key={username}>
            <td>{username}</td>
            <td>{email}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>
                <select
                    key={username}
                    onChange={onChange}
                    name="delete"
                    value={form.delete}
                >
                    {!form.delete && <option value="">Выбери курс</option>}
                    {userCourses?.map((c: string) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
            </td>
            <td>
                <Button>-</Button>
            </td>
            <td>
                <select
                    key={username}
                    onChange={onChange}
                    name="add"
                    value={form.add}
                >
                    {!form.add && <option value="">Выбери курс</option>}
                    {teacherCourses?.map(tc => {
                        if (!userCourses?.find(c => tc === c)) {
                            return (
                                <option key={tc} value={tc}>
                                    {courses?.find(el => el._id === tc)?.title}
                                </option>
                            );
                        }
                        return null;
                    })}
                </select>
            </td>
            <td>
                <Button
                    onClick={() => {
                        if (form.add && _id) {
                            onAdd(form.add, _id);
                        }
                    }}
                >
                    +
                </Button>
            </td>
        </tr>
    );
};

export default UserRow;
