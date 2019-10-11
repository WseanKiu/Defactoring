
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

// this function for fetching data through controller
export async function fetchData2(url, content, m_type) {
    return fetch(url, {
        method: m_type,
        header: {
            Accept: "application/json",
            "Content-type": "applicantion/json"
        },
        body: content
    })
}