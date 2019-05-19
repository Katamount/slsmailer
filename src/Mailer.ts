import * as AWS from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import ContactFormData from './ContactFormData';
import { IEmailConfig } from './util/IEmailConfig';


export default class Mailer {
    public email: string;
    private ses: AWS.SES;

    constructor(originWebsite: string, emailConfig: any, ses: AWS.SES,) {
        this.email = this.getEmailAddress(originWebsite, emailConfig);
        this.ses = ses;
    }

    public sendEmail(formData: ContactFormData, callback: any): void {
        if (!formData.emailFrom) {
            throw new Error("Email not set");
        }

        const params: SendEmailRequest = this.getSESParams(this.email, formData.formatString());
        console.log(params);
        this.ses.sendEmail(params, callback);
    }

    private getEmailAddress(originWebsite: string, emailConfig: IEmailConfig[]): string {
        let email: string = "";
        emailConfig.forEach((conf: IEmailConfig) => {
            if (conf.domain === originWebsite){
                email = conf.email;
            }
        });
        
        if (email === "") {
            throw new Error("website - email configuration not set")
        }
        return email;
    }

    public getSESParams(toEmail: string, data: string): SendEmailRequest{
        return {
            Destination: {
                ToAddresses: [
                    toEmail
                ]
            },
            Message: {
                Body: {
                    Text: {
                        Data: data,
                        Charset: 'UTF-8'
                    }
                },
                Subject: {
                    Data: 'Website Referral Form Submission',
                    Charset: 'UTF-8'
                }
            },
            Source: `${process.env.SES_EMAIL_SOURCE}`
        };
    }
}
