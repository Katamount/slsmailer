import { config as conf } from 'dotenv';
conf()

import Mailer from '../src/Mailer';
import { config, SES } from 'aws-sdk';
config.update({ region: 'us-east-1' });
import { SendEmailResponse, SendEmailRequest } from 'aws-sdk/clients/ses';
import ContactFormData from '../src/ContactFormData';
import { IEmailConfig } from '../src/util/IEmailConfig';
import getEmailConfig from '../src/util/getEmailConfig';
import { mockFields } from './mocks';

describe("mailer tests", () => {
    
    test("Mailer constructs and configures incorrectly, throw error", () => {
        try {
            const ses = new SES();
            new Mailer("notavalidwebsite.com", emailConfig, ses);
        } catch (error) {
            // console.error(error);
            expect(error).toBeDefined();
            expect(error.message).toBe("website - email configuration not set");
        }
    });

    const emailConfig = getEmailConfig();
    emailConfig.forEach((emailConf: IEmailConfig) => {

        test("Mailer constructs and configures correctly", () => {
            try{
                const ses = new SES();
                
                const mail = new Mailer(emailConf.domain, emailConfig, ses);
                expect(mail.email).toBe(emailConf.email);
                
            } catch(error){
                console.error(error);
                expect(error).toBeUndefined();
            }



        });

    

        test("SES Params set correctly", () => {
            try {
                const ses = new SES();
                
                const mail = new Mailer(emailConf.domain, emailConfig, ses);
                const params: SendEmailRequest = mail.getSESParams(mail.email, "hello there");
                console.info(params);
                expect(params.Message.Body.Text).toBeDefined();
                expect(params.Message.Body.Text!.Data).toBe("hello there");
                expect(params.Destination.ToAddresses![0]).toBe(mail.email);
                expect(params.Source).toBe(process.env.SES_EMAIL_SOURCE);
                

            } catch (error) {
                console.error(error);
                expect(error).toBeUndefined();
            }
        });

        test("Mailer sends email to recipient", async (done) => {
            try {
                const ses = new SES();
                
                const formData = new ContactFormData(emailConf.domain, emailConf.email, "Mailer test");
                formData.setFields(mockFields());
                await formData.validate();
                const mail = new Mailer(formData.websiteUrl, emailConfig, ses);
                expect(mail.email).toBe(emailConf.email);

                mail.sendEmail(formData, (err: AWS.AWSError, data: SendEmailResponse) => {
                    if (err) {
                        throw err;
                    }
                    console.info(data);
                    expect(data).toBeDefined();
                    done();
                });
                

            } catch (error) {
                console.error(error);
                expect(error).toBeNull();
            }
        });
    });
});
