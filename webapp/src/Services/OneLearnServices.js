import { getAuthData } from "./StorageService";
import { toast } from "react-toastify";

const postToEdgeServer = async (route, payload, method = "POST") => {
    // let baseURL = Config.edgeURL;
    let auth = getAuthData();
    const url = `http://cdh.onelearn.global:4001${route}`;
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "token": auth?.token
            },
            body: JSON.stringify(payload),
        })
        return response.json()
    } catch (error) {
        toast["error"]("Error occured in API. Error :" + error);
        console.error("Error occured in API", error);
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
export const getEdgeConfig = async (payload) => {
    return postToEdgeServer("/AdminService/getEdgeConfig", payload, "GET")
}

export const updateEdgeConfig = async (payload) => {
    return postToEdgeServer("/AdminService/updateEdgeConfig", payload)
}

export const fileService = async (payload) => {
    return postToEdgeServer("/FileService/Get", payload)
}
