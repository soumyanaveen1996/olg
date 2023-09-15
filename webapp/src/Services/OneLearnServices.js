
const postToEdgeServer = async (route, payload) => {
    // let baseURL = Config.edgeURL;
    const url = `http://localhost:4001${route}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

export const forgotPin = async (payload) => {
    return postToEdgeServer("/forgotPin", payload)
}

export const login = async (payload) => {
    return postToEdgeServer("/login", payload)
}
