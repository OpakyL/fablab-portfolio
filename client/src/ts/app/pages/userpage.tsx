import Loader from "Components/loader";
import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "Utils/typed-selector";

interface Props {}

const UserPage: React.FC<Props> = () => {
    return <div className="lol">FETCHING HUI ZNAET CHTO</div>;
    // const user = useSelector(state => state.user);
    // const history = useHistory();
    // const GET_USERS_COURSES = gql`
    //     {
    //       courses(
    //         where: { _id: [${user.courses.map((el: any) => {
    //             return '"' + el + '"';
    //         })}] }
    //       ) {
    //         id
    //         Title
    //         createdAt
    //       }
    //     }
    //   `;

    // const { data, loading, error } = useQuery(GET_USERS_COURSES);

    // if (!user.isLoggedIn) {
    //     return <Redirect to="/" />;
    // }

    // if (loading || !data) {
    //     return <Loader />;
    // }

    // if (error) {
    //     return <div>ERRRRRRRR!</div>;
    // }
    // const { courses } = data;
    // return (
    //     <section className="userpage">
    //         <div className="userpage__name">{user.name}</div>
    //         <img src={`http://localhost:1337${user.picture}`} />
    //         <div className="userpage__email">{user.email}</div>
    //         <div className="userpage__courseList">
    //             Courses:
    //             <div className="userpage__wrapper">
    //                 {courses.map((c: any) => {
    //                     return (
    //                         <>
    //                             <div key={c.id} className="userpage__course">
    //                                 {c.Title}
    //                             </div>
    //                             <Link to={`/courses/${c.id}/lessons`}>
    //                                 Go to course
    //                             </Link>
    //                         </>
    //                     );
    //                 })}
    //             </div>
    //         </div>
    //     </section>
    // );
};

export default UserPage;
