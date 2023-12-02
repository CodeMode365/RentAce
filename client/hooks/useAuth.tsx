interface iData {
  username?: String;
  email: String;
  password: String;
  isLogin: boolean;
}

export default function useAuth() {
  return async (data: iData) => {
    console.log("loggin in");
    const { username, email, password, isLogin } = data;
    const path = isLogin ? "login" : "register";
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${path}`;
    console.log(url)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = JSON.parse(await response.text());
      throw new Error(error.message);
    }

    const val = await response.json();
    localStorage.setItem("token", val.token);
    localStorage.setItem("isAuthorized", JSON.stringify(true));
    return val;
  };
}
