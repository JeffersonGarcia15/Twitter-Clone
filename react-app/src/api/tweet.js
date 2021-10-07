import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function addTweetApi(message) {
    const url = `${API_HOST}/tweet`;
    const data = {
        body: message,
    };

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`,
        },
        body: JSON.stringify(data),
    };

    return fetch(url, params)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return { code: response.status, message: "Tweet Sent." };
            }
            return { code: 500, message: "An error from the server occurred." };
        })
        .catch((err) => {
            return err;
        });
}

export function getUserTweetsApi(userId, page) {
    const url = `${API_HOST}/gettweet?id=${userId}&pagination=${page}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`,
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return err;
        });
}

export function getTweetsFollowersApi(page = 1) {
    const url = `${API_HOST}/readFollowersTweets?page=${page}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`,
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return err;
        });
}