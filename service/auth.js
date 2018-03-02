class Auth {
    constructor(axios) {
        this.axios = axios;
    }

    myFunction() {
        return Promise.resolve(5);
    }
}

export default Auth;