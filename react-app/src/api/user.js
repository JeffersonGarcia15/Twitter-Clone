import { API_HOST } from '../utils/constants'
import { getTokenApi } from './auth'

export function getUserApi(id) {
    const url = `${API_HOST}/profile?id=${id}`

    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getTokenApi()}`,
        }
    }
    return fetch(url, params).then(response => {
        if(response.status >= 400) throw null
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}

export function uploadBannerApi(file) {
    const url = `${API_HOST}/uploadBanner`;

    const formData = new FormData();
    formData.append("banner", file);

    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: formData
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function uploadAvatarApi(file) {
    const url = `${API_HOST}/uploadAvatar`;

    const formData = new FormData();
    formData.append("avatar", file);

    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: formData
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function updateInfoApi(data) {
    const url = `${API_HOST}/editprofile`;

    const params = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then(response => {
            return response;
        })
        .catch(err => {
            return err;
        });
}
