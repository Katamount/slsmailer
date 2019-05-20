import AWS, { SES } from "aws-sdk";
AWS.config.update({region: 'us-east-1'});
import { SendEmailResponse } from "aws-sdk/clients/ses";
import { APIGatewayProxyResult, APIGatewayProxyCallback } from "aws-lambda";

import Mailer from "./Mailer";
import ContactFormData from "./ContactFormData";
import { IEmailConfig } from "./util/IEmailConfig";
import getEmailConfig from "./util/getEmailConfig";
import { IPayloadBody } from "./util/interfaces";


export function main(payload: IPayloadBody, callback: APIGatewayProxyCallback) {
    const cf = new ContactFormData(payload.websiteUrl, payload.emailFrom, payload.message);
    cf.setFields(payload);
    cf.validate().then(() => {
        const emailConfig: IEmailConfig[] = getEmailConfig();
        const ses = new SES();
        const mail = new Mailer(cf.websiteUrl, emailConfig, ses);
        try {
            mail.sendEmail(cf, (err: AWS.AWSError, data: SendEmailResponse) => {
                if (err) {
                    throw err;
                }
                console.info(data);
                const result: APIGatewayProxyResult = { statusCode: 200, body: "{'success':'true'}" }
                callback(null, result);
            });
        } catch (error) {
            callback(error)
        }

    }).catch((error) => {
        console.error(error);
        callback(error, { statusCode: 400, body: error.message });
    });
}