import cn from "classnames";
import React, { useState, useEffect } from "react";
import Background from "Ts/components/background";
import { useInit } from "Ts/hooks/auth-hook";
import { useRoutes } from "Ts/hooks/routes-hook";
import Header from "./header";
import UserPanel from "./user-panel";
import { useSelector } from "Ts/utils/typed-selector";
import { useHistory } from "react-router";
import Footer from "./footer/footer";
import TeacherHeader from "./teacher-header";

interface Props {}

const SECRET = "admin123";

const App: React.FC<Props> = () => {
    const { ready } = useInit();
    const { role } = useSelector(state => state.auth);
    const history = useHistory();
    const [done, setdone] = useState(false);
    const containerClasses = cn("container", {
        "container-none":
            history.location.pathname === "/" && window.screen.width > 768
    });

    const keypress = () => {
        let input = "";
        return (e: KeyboardEvent) => {
            const n = SECRET[input.length];
            if (n === e.key) {
                input += e.key;
            } else {
                input = "";
            }
            if (input === SECRET) {
                setdone(true);
            }
        };
    };

    useEffect(() => {
        window.addEventListener("keydown", keypress());
    }, []);

    return (
        <div className={containerClasses}>
            {(role === "TEACHER" && <TeacherHeader />) || <Header />}
            {ready && useRoutes(role)}
            {done && ready && <UserPanel />}
            {role === "TEACHER" || <Background className="bg-filter" />}
            {role === "TEACHER" || <Footer />}
        </div>
    );
};

export default App;
