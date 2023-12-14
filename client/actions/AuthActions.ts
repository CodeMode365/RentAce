'use server'


const endpoint = process.env.SERVER_URL

interface iData {
    username?: String;
    email: String;
    password: String;
    isLogin: boolean;
}

export const Auth = async (data: iData) => {
    const { username, email, password, isLogin } = data;
    const path = isLogin ? "login" : "register";
    const url = `${endpoint}/auth/${path}`;

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
