export function post(credentials, url) {
    return new Promise(function (resolve, reject) {
        axios.post(url, credentials).then((response) => {
            resolve(response.data)
        }).catch((err) => {
            reject(err.response.data.error)
        })
    });
}