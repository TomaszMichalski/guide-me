import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getAllCategories() {
    return request({
        url: API_BASE_URL + "/api/categories",
        method: 'GET',
    });
}

export function getUserCategories(userId) {
    return request({
        url: API_BASE_URL + "/api/users/" + userId + "/categories",
        method: 'GET',
    });
}
export function getUserStartingPoints(userId) {
    return request({
        url: API_BASE_URL + "/api/users/" + userId + "/starting-points",
        method: 'GET',
    });
}

export function postUserCategory(userCategoryRequest) {
    console.log(userCategoryRequest);
    return request({
        url: API_BASE_URL + "/api/users/" + userCategoryRequest.userId + "/categories",
        method: 'POST',
        body: JSON.stringify(userCategoryRequest)
    });
}
export function postUserStartingPoint(userStartingPointRequest) {
    console.log(userStartingPointRequest);
    return request({
        url: API_BASE_URL + "/api/users/" + userStartingPointRequest.userId + "/starting-points",
        method: 'POST',
        body: JSON.stringify(userStartingPointRequest)
    });
}
export function deleteUserCategory(userCategoryRequest) {
    console.log(userCategoryRequest);
    return request({
        url: API_BASE_URL + "/api/users/" + userCategoryRequest.userId + "/categories",
        method: 'DELETE',
        body: JSON.stringify(userCategoryRequest)
    });
}

export function getDistance(placeId, userId) {
    return request({
        url: API_BASE_URL + "/api/distance/" + placeId + "/" + userId,
        method: 'GET',
    });
}


export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url   : API_BASE_URL + "/auth/signup",
        method: 'POST',
        body  : JSON.stringify(signupRequest)
    });
}