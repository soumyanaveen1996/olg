import { toast } from "react-toastify";


export const registerOneLearnUser = (payload) => {
    // let baseURL = Config.edgeURL;
    const url = `http://localhost:4001/register`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then(function (response) {
            return response.json();
        })
        .catch((error) => {
            // toast("error")(error.message)
            console.error("error occured in api", error)
        })
}