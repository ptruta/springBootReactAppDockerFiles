import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

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

export function getGroceriesForCurrentlyLoggedInUser() {
   console.log("getGroceriesForCurrentlyLoggedInUser")
   return request({
        url: API_BASE_URL + "/groceries",
        method: 'GET'
    });
}

export function addNewGrocery(newGrocery) {
   console.log("addNewGrocery")
   console.log(newGrocery)
   return request({
        url: API_BASE_URL + "/addGrocery",
        method: 'POST',
        body: JSON.stringify(newGrocery)
    });
}

export function deleteGrocery(groceryId) {
   console.log("deleteGrocery")
   console.log(groceryId)
   return request({
        url: API_BASE_URL + "/deleteGrocery/" + groceryId,
        method: 'POST'
    });
}

export function getCountriesForCurrentlyLoggedInUser() {
    console.log("getCountriesForCurrentlyLoggedInUser")
    return request({
         url: API_BASE_URL + "/countries",
         method: 'GET'
     });
 }
 
 export function addNewCountry(newCountry) {
    console.log("addNewCountry")
    console.log(newCountry)
    return request({
         url: API_BASE_URL + "/addCountry",
         method: 'POST',
         body: JSON.stringify(newCountry)
     });
 }
 
 export function deleteCountry(countryId) {
    console.log("deleteCountry")
    console.log(countryId)
    return request({
         url: API_BASE_URL + "/deleteCountry/" + countryId,
         method: 'POST'
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
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}