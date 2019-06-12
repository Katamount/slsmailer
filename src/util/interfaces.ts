export interface IFieldSet{
    phone: string | undefined;
    name: string;
    subject: string;
}

export interface IPayloadBody extends IFieldSet{
    websiteUrl: string;
    emailFrom: string;
    message: string;
    captcha: ICaptchaRequest;
}

export interface IEmailConfig{
    domain: string;
    email: string;
}

export interface ICaptchaResponse{
    "success": true|false;
    "challenge_ts": string;  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    "hostname": string;         // the hostname of the site where the reCAPTCHA was solved
    "error-codes"?: []        // optional
}

export interface ICaptchaRequest{
    secret: string;
    response: string;
    remoteip?: string;
}