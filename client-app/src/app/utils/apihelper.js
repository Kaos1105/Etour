import 'whatwg-fetch';
let fetch = window.fetch;

export default class APIHelper {
    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'get',
                })
                .then(resp => {
                    if (resp.ok || resp.status === 400)
                        return resp.json();
                    else
                        return new Promise((resolve, reject) => resolve({ errors: {} }))

                })
                .then(returnedValue => {
                    
                    resolve(returnedValue);
                })
                .catch(function(ex) {
                    if (ex) {
                        reject(ex);
                    }
                });
        })
    }
    static getWithBearer(url, jwt) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + jwt
                    },
                })
                .then(resp => {
                    if (resp.ok || resp.status === 400)
                        return resp.json();
                    else
                        return new Promise((resolve, reject) => resolve({ errors: {} }))

                })
                .then(returnedValue => {
                    resolve(returnedValue);
                })
                .catch(function(ex) {
                    if (ex) {
                        reject(ex);
                    }
                });
        })
    }


    static postWithBearer(url, data, jwt) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwt
                    },
                    body: JSON.stringify(data)
                })
                .then(resp => {
                    if (resp.ok || resp.status === 400)
                        return resp.json();
                    else
                        return new Promise((resolve, reject) => resolve({ errors: {} }))

                })
                .then(returnedValue => {
                    resolve(returnedValue);
                })
                .catch(function(ex) {
                    if (ex) {
                        reject(ex);
                    }
                });
        })
    }

    static delete(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'delete',
                })
                .then(resp => {
                    if (resp.ok || resp.status === 400)
                        return resp.json();
                    else
                        return new Promise((resolve, reject) => resolve({ errors: {} }))

                })
                .then(returnedValue => {
                    resolve(returnedValue);
                })
                .catch(function(ex) {
                    if (ex) {
                        reject(ex);
                    }
                });
        })

    }


    static post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(resp => {

                    if (resp.ok || resp.status === 400 || resp.status === 500)
                        return resp.json();
                    else
                        return new Promise((resolve, reject) => resolve({ errors: {} }))
                })
                .then(returnedValue => {
                    console.log("returnedValue", returnedValue)
                    resolve(returnedValue);
                })
                .catch(function(ex) {
                    console.log(ex);
                    if (ex) {
                        reject(ex);
                    }
                });
        })

    }

    static put(url, formData) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'put',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(resp => {
                    if (resp.ok || resp.status === 400)
                        return resp.json();
                    else
                        return new Promise((resolve, reject) => resolve({ errors: {} }))

                })
                .then(returnedValue => {
                    resolve(returnedValue);
                })
                .catch(function(ex) {
                    if (ex) {
                        reject(ex);
                    }
                });
        })

    }


}