import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ICaptchaResponse, ICaptchaRequest } from './interfaces';
import { OK } from 'http-status';

export class Captcha {
    public async verify(request: ICaptchaRequest): Promise<ICaptchaResponse>{
        const requestConfig: AxiosRequestConfig = {
            baseURL: "https://www.google.com"
            , headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    
        const response: AxiosResponse = await axios.post("/recaptcha/api/siteverify", request, requestConfig);
        if (response.status != OK) {
            console.error(response.data);
            throw new Error("Recaptcha request failed: " + response.data);
        }
        const cResponse: ICaptchaResponse = response.data as ICaptchaResponse
        return cResponse;
    }
}
