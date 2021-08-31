import axios from 'axios';

const instance = axios.create({
    baseURL: "http://192.168.0.12:4001",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default instance;