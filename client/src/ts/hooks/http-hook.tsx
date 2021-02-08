import { useState, useCallback } from "react";

interface IRequest {
    loading: boolean;
    error: boolean;
    request: Function;
    clearError: Function;
}

export const useRequest = (request: Function): IRequest => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const callback = useCallback(async (...params: any[]) => {
        setLoading(true);
        try {
            const response = await request(...params);
            setLoading(false);
            return response;
        } catch (e) {
            setLoading(false);
            setError(true);
        }
    }, []);

    const clearError = useCallback(() => setError(false), []);

    return { loading, request: callback, error, clearError };
};
