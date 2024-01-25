'use server'


const endpoint = `${process.env.SERVER_URL}/auth`

interface iData {
    username?: String;
    email: String;
    password: String;
    isLogin: boolean;
}

export const Auth = async (data: iData) => {
    const { username, email, password, isLogin } = data;
    const path = isLogin ? "login" : "register";
    const url = `${endpoint}/${path}`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
        cache: "no-cache"
    });

    const response = await res.json()
    if (!res.ok) {
        throw new Error(response.message)
    }

    return response;
}


export const GetMyInfo = async (token: string) => {
    const res = await fetch(`${endpoint}/my-info`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })

    const response = await res.json()
    if (!res.ok) {
        throw new Error(response.message)
    }

    console.log("MY info", res)
    return response
}

export const getAuthToken = async () => {
    const res = await fetch(`${endpoint}/authToken`, { cache: "no-cache" })
    const response = await res.json()

    if (!res.ok) {
        throw new Error(response.message)
    }
    return response
}

export const updateMyPassword = async (oldPassword: string, newPassword: string) => {
    const token = await getAuthToken()
    const res = await fetch(`${endpoint}/updatePassword`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            oldPassword,
            newPassword
        }),
        cache: "no-cache"
    })
    const response = await res.json()
    if (!res.ok) {
        throw new Error(response.message)
    }
    return response
}