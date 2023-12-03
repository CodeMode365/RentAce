export default function useAuthKey() {
  let authToken = ""

  if (window) {
    authToken = localStorage.getItem("token") as string
  }

  return authToken
}
