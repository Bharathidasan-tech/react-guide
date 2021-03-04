import axios from 'axios';

const instance = axios.create({
    baseURL: "firebases URL"
});

export default instance;