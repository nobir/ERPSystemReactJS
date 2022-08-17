function useAuth() {
    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));

    const isAuth = token && token !== null && user && user !== null;

    return { isAuth, user, token };
}

export default useAuth;
