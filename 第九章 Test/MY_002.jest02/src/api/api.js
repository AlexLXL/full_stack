export function fetchData() {
    return new Promise((resolve) => {
        fetch('static/data.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                resolve(data)
            })
            .catch((e) => {console.log(e); });
    })
}

