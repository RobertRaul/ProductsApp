import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env'
import axios from 'axios'
import { Platform } from 'react-native'
import { MyStorageAdapter } from '../adapters/storage-adapter';

export const localIPURL = "http://192.168.2.3:3000/api"

export const API_URL = (STAGE === 'prod') ? PROD_URL :
    Platform.OS === 'ios' ? API_URL_IOS : API_URL_ANDROID;


const tesloAPI = axios.create({
    baseURL: localIPURL,
    headers: {
        'Content-Type': 'application/json',
    }

})


//TODO interceptors

tesloAPI.interceptors.request.use(
    async (config) => {
        const token = await MyStorageAdapter.getItemAdapter('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
)



export {
    tesloAPI
}