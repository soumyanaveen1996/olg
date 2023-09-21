import { getAuthData } from "./StorageService";

const postToEdgeServer = async (route, payload) => {
    // let baseURL = Config.edgeURL;
    let auth = getAuthData();
    const url = `http://localhost:4001${route}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": auth?.token
            },
            body: JSON.stringify(payload),
        })
        return response.json()
    } catch (error) {
        console.error("error occured in api", error)
    }
}

export const register = async (payload) => {
    return postToEdgeServer("/register", payload)
}

export const verifyUser = async (payload) => {
    return postToEdgeServer("/verifyUser", payload)
}

export const forgotPin = async (payload) => {
    return postToEdgeServer("/forgotPin", payload)
}

export const login = async (payload) => {
    return postToEdgeServer("/login", payload)
}

export const fileService = async (payload) => {
    return postToEdgeServer("/FileService/Get", payload)
}
