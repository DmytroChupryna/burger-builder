import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-keks.firebaseio.com/'
});

export default instance;