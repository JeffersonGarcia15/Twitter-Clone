import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function checkFollowApi(userId) {
    const url = `${API_HOST}/checkrelation?id=${userId}`;

    const params = {
        headers: {
            Authorization: `Bearer ${getTokenApi()}`,
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err;
        });
}

export function followUserApi(userId) {
    const url = `${API_HOST}/follow?id=${userId}`;

    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`,
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err;
        });
}

export function unfollowUserApi(userId) {
    const url = `${API_HOST}/unfollow?id=${userId}`;

    const params = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`,
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err;
        });
}

export function getFollowsApi(paramsUrl) {
    const url = `${API_HOST}/userList?${paramsUrl}`;

    const params = {
        headers: {
            Authorization: `Bearer ${getTokenApi()}`,
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err;
        });
}