import ContactFormData from '../src/ContactFormData';
import { IEmailConfig } from '../src/util/IEmailConfig';
import { mockFields } from './fieldsMock';
import getEmailConfig from '../src/util/getEmailConfig';

describe("Contact Form Tests", () => {

    const emailConfig = getEmailConfig();
    
    emailConfig.forEach((emailConf: IEmailConfig) => {
        test("ContactFormData properly sets optional fields", async () => {
        // const emailConf = emailConfig[0];
            try{
                const contactData = new ContactFormData(emailConf.domain, emailConf.email, "hello world");
                const fields = mockFields();
                contactData.setFields(fields);

                await contactData.validate();
                
                console.log(contactData.phone);
                expect(contactData.phone).toBe(fields.phone);
                expect(contactData.name).toBe(fields.name);
                expect(contactData.subject).toBe(fields.subject);
                const emailContent = contactData.formatString();
                expect(emailContent).toContain(fields.phone);
                expect(emailContent).toContain(fields.name);
                expect(emailContent).toContain(fields.subject);
            } catch (error) {
                console.error(error);
                expect(error).toBeUndefined();
            }
        });

        test("ContactFormData returns properly fromatted email message content", async () => {
            try {
                
                const contactData = new ContactFormData(emailConf.domain, emailConf.email, "hello world");
                await contactData.validate();
                const emailContent = contactData.formatString();
                // console.info(emailContent);
                expect(emailContent).toContain(emailConf.email);
                expect(emailContent).toContain("hello world");
    
            } catch (error) {
                console.error(error);
                expect(error).toBeUndefined();
            }
        });

        test("ContactFormData sets required fields and validates", async () => {
            try {
                
                const contactData = new ContactFormData(emailConf.domain, emailConf.email, "hello world");

                await contactData.validate();
                
                expect(contactData.websiteUrl).toBe(emailConf.domain);
                expect(contactData.emailFrom).toBe(emailConf.email);
                expect(contactData.message).toBe("hello world");
    
            } catch (error) {
                console.error(error);
                expect(error).toBeUndefined();
            }
        });
    });
});
