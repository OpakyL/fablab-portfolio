import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IAuth } from "Ts/redux/state-interfaces";
import actions from "Ts/redux/actions";
import service from "Ts/services/service";
import { useSelector } from "Ts/utils/typed-selector";

const authLocalStorage = "userData";

export const useAuth = () => {
    const history = useHistory();

    const login = useCallback(async (body: IAuth) => {
        actions.setAuth(body);
        const { token, userId, role, refreshToken } = body;
        localStorage.setItem(
            authLocalStorage,
            JSON.stringify({ token, userId, role, refreshToken })
        );
        actions.fetchUserRequest(token);
        if (role === "TEACHER") {
            actions.fetchCoursesRequest(token);
        }
        // console.log(token);
    }, []);

    const { userId } = useSelector(s => s.auth);

    const logout = useCallback(async () => {
        // if (userId) {
        //     await service.deleteToken(userId);
        // }
        actions.resetState();
        localStorage.removeItem(authLocalStorage);
        history.push("/");
    }, [userId]);
    return { login, logout };
};

export const useInit = () => {
    const { login } = useAuth();
    const [ready, setReady] = useState<boolean>(false);
    useEffect(() => {
        let data: any = localStorage.getItem(authLocalStorage);
        if (data) {
            data = JSON.parse(data);
            login({ isAuthenticated: true, ...data });
        }
        setReady(true);
        // if (data) {
        //     const { userId, refreshToken } = data;
        //     service.refresh(userId, refreshToken).then(tokens => {
        //         login({ isAuthenticated: true, ...data, ...tokens });
        //     });
        // }

    }, []);
    return { ready };
};
