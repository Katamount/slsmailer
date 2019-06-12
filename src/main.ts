import AWS, { SES } from "aws-sdk";
AWS.config.update({region: 'us-east-1'});
import { SendEmailResponse } from "aws-sdk/clients/ses";
import { APIGatewayProxyResult } from "aws-lambda";

import Mailer from "./Mailer";
import ContactFormData from "./ContactFormData";
import { IEmailConfig } from "./util/IEmailConfig";
import getEmailConfig from "./util/getEmailConfig";
import { IPayloadBody, ICaptchaResponse } from "./util/interfaces";
import {Captcha} from "./util/Captcha";
import * as HTTP from 'http-status';

export async function main(payload: IPayloadBody, captcha: Captcha): Promise<APIGatewayProxyResult> {

    const captchaResult: ICaptchaResponse = await captcha.verify(payload.captcha);
    if(!captchaResult.success){
        return { statusCode: HTTP.NOT_ACCEPTABLE, body: "Captcha Not Valid" };
    }

    const cf = new ContactFormData(payload.websiteUrl, payload.emailFrom, payload.message);
    cf.setFields(payload);
    
    try {
        await cf.validate();
    } catch (error) {
        console.error(error);
        return { statusCode: HTTP.BAD_REQUEST, body: error.message };
    }

    const emailConfig: IEmailConfig[] = getEmailConfig();
    const ses = new SES();
    const mail = new Mailer(cf.websiteUrl, emailConfig, ses);
    try {
        await mail.sendEmail(cf, (err: AWS.AWSError, data: SendEmailResponse) => {
            if (err) {
                throw err;
            }
            console.info(data);
            const result: APIGatewayProxyResult = { statusCode: HTTP.OK, body: "{'success':'true'}" }
            return result;
        });
        return { statusCode: HTTP.OK, body: "{'success':'true'}" };
    } catch (error) {
        return { statusCode: HTTP.INTERNAL_SERVER_ERROR, body: error.message };
    }
}