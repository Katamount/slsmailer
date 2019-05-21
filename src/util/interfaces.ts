export interface IFieldSet{
    phone: string | undefined;
    name: string;
    subject: string;
}

export interface IPayloadBody extends IFieldSet{
    websiteUrl: string;
    emailFrom: string;
    message: string;
}

export interface IEmailConfig{
    domain: string;
    email: string;
}