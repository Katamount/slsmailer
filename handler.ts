import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { SES } from 'aws-sdk';
import Mailer from './Mailer';
import { SendEmailResponse } from 'aws-sdk/clients/ses';

import ContactFormData from './ContactFormData';
import getEmailConfig from './util/getEmailConfig';
import { IEmailConfig } from './util/IEmailConfig';


export const emailContact: APIGatewayProxyHandler = (event, _context, callback) => {
    try {
        if (!event.body) {
            throw new Error('event body not set');
        }
        const payload = JSON.parse(event.body);
        const cf = new ContactFormData(payload.websiteUrl, payload.emailFrom, payload.message);
        cf.setFields(payload);
        cf.validate().then(()=>{
            const emailConfig: IEmailConfig[] = getEmailConfig();
            const ses = new SES();
            const mail = new Mailer(cf.websiteUrl, emailConfig, ses);
            
            mail.sendEmail(cf, (err: AWS.AWSError, data: SendEmailResponse) => {
                if (err){
                    throw err;
                }
                console.info(data);
                const result: APIGatewayProxyResult = {statusCode: 200, body: "{'success':'true'}"}
                callback(null, result);
            });       
        }).catch((error) => {
            console.error(error);
            throw error;
        }); 
    } catch (error) {
        console.error(error);
        const result: APIGatewayProxyResult = {statusCode: 500, body: "{'success':'false'}"}
        callback(error, result);
    }
}
