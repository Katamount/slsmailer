import { IsEmail, validate, IsDefined, IsUrl, IsString, IsPhoneNumber, IsOptional } from 'class-validator';

export default class ContactFormData {
    @IsUrl()
    public websiteUrl: string;

    @IsDefined()
    @IsEmail()
    public emailFrom: string;

    @IsString()
    public message: string;

    @IsOptional()
    @IsPhoneNumber('US')
    public phone: string | undefined;

    @IsOptional()
    @IsString()
    public subject: string | undefined;

    @IsOptional()
    @IsString()
    public name: string | undefined;

    constructor(websiteUrl: string, emailFrom: string, message: string) {
        this.websiteUrl = websiteUrl;
        this.emailFrom = emailFrom;
        this.message = message;
    }

    public setFields(fields: any) {
        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {
                switch (key) {
                    case 'phone':
                        this.phone = fields[key];
                        break;
                    case 'subject':
                        this.subject = fields[key];
                        break;
                    case 'name':
                        this.name = fields[key];
                    default:
                        break;
                }
            }
        }
    }

    public formatString(): string {
        return `Email: ${this.emailFrom}
                Subject: ${this.subject}
                Message: ${this.message}
                Phone: ${this.phone}
                Name: ${this.name}`;
    }

    public async validate(): Promise<void> {
        const errors = await validate(this, { validationError: { target: false } });
        if (0 < errors.length) {
            let messages = "";

            errors.map((val) => {
                for (const key in val.constraints) {
                    if (val.constraints.hasOwnProperty(key)) {
                        messages += val.constraints[key];
                        messages += ", ";
                    }
                }
            });

            console.error(messages);

            throw new Error(messages);
        } 
    }
}
