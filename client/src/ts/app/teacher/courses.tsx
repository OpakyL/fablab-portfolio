import React, { useState, useEffect } from "react";
import { ICourse } from "Ts/redux/state-interfaces";
import { useSelector } from "Utils/typed-selector";
import Button from "Ts/components/button";

interface Props {}

const Courses: React.FC<Props> = () => {
    const [courses, setCourses] = useState();
    const stateCourses = useSelector(state => state.data.courses);
    const { loading } = useSelector(state => state.data);

    useEffect(() => {
        setCourses(stateCourses);
    }, [stateCourses]);

    if (courses === undefined || loading) {
        return <div className="loading">loading</div>;
    }

    return (
        <div className="section">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>link</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((el: ICourse, i: number) => (
                        <tr key={el._id}>
                            <td>{i + 1}</td>
                            <td>{el.title}</td>
                            <td>
                                <Button href={`/course/${el._id}`} className="button-teacher">
                                    Go to course
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Courses;
