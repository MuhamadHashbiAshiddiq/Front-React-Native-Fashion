import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { baseUrlAxios } from "../utils/api";

export const loginRequest = (data: string) => {
    return new Promise<any>(async (resolve, reject) => {

        await baseUrlAxios.post('login', data
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}