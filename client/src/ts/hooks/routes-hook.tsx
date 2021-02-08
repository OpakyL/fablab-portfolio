import Calendar from "Pages/calendar";
import Courses from "Pages/courses/courses-container";
import Destination from "Pages/destination";
import Home from "Pages/home";
import Lessons from "Pages/lessons";
import Search from "Pages/search";
import UserPage from "Pages/userpage";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import CourseForm from "Ts/app/teacher/add-edit-course";
import CoursePage from "Ts/app/teacher/course-page";
import TeacherCourses from "Ts/app/teacher/courses";
import { Role } from "Ts/redux/state-interfaces";
import AddUser from "Ts/app/teacher/add-user/add-user";
import UsersTable from "Ts/app/teacher/users-table";
import {
    AddLessonContainer as AddLesson,
    UpdateLessonContainer as UpdateLesson,
    LessonPage
} from "Ts/app/teacher/lessons";
import EventsPage from "Ts/app/pages/events/events";
import Events from "Ts/app/teacher/events/events-page";
import AddEvent from "Ts/app/teacher/events/add";
import ContactsPage from "Ts/app/pages/contacts";
import Contacts from "Ts/app/teacher/contacts";
import EditEvent from "Ts/app/teacher/events/edit";

export const useRoutes = (role?: Role) => {
    const generalRoutes = (
        <Switch>
            <Route path="/search">
                <Search />
            </Route>
            <Route path="/calendar" exact={true}>
                <Calendar />
            </Route>
            <Route path="/map" exact={true}>
                <Destination />
            </Route>
            <Route path="/courses" exact={true}>
                <Courses />
            </Route>
            <Route path="/events" exact={true}>
                <EventsPage />
            </Route>
            <Route path="/workshop" exact={true}>
                <Home />
            </Route>
            <Route path="/contacts" exact={true}>
                <ContactsPage />
            </Route>
            <Route path="/" exact={true}>
                <Home />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
    switch (role) {
        case "ADMIN":
            return (
                <Switch>
                    <Route path="/" exact={true}>
                        <Home />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            );
        case "TEACHER":
            return (
                <Switch>
                    <Route path="/home">
                        <TeacherCourses />
                    </Route>
                    <Route path="/course/:courseId">
                        <CoursePage />
                    </Route>
                    <Route path="/add-course">
                        <CourseForm />
                    </Route>
                    <Route path="/edit-course/:courseId">
                        <CourseForm />
                    </Route>
                    <Route path="/add-user">
                        <AddUser />
                    </Route>
                    <Route path="/users-table">
                        <UsersTable />
                    </Route>
                    <Route path="/add-lesson/:courseId">
                        <AddLesson />
                    </Route>
                    <Route path="/update-lesson/:lessonId">
                        <UpdateLesson />
                    </Route>
                    <Route path="/lesson/:lessonId">
                        <LessonPage />
                    </Route>
                    <Route path="/events/">
                        <Events />
                    </Route>
                    <Route path="/event/add">
                        <AddEvent />
                    </Route>
                    <Route path="/event/edit/:eventId">
                        <EditEvent />
                    </Route>
                    <Route path="/contacts">
                        <Contacts />
                    </Route>
                    <Redirect to="/home" />
                </Switch>
            );
        case "STUDENT":
            return (
                <Switch>
                    <Route path="/profile" exact={true}>
                        <UserPage />
                    </Route>
                    <Route exact={true} path="/courses/:id/lessons">
                        <Lessons />
                    </Route>
                    {generalRoutes}
                </Switch>
            );
        default:
            return <Switch>{generalRoutes}</Switch>;
    }
};
