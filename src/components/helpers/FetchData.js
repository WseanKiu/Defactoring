
// this function for fetching data through controller
export function fetchData(url, content) {
    return fetch(url, {
        method: "post",
        header: {
            Accept: "application/json",
            "Content-type": "applicantion/json"
        },
        body: content
    })
}