# SLSMailer (Serverless Mailer)
A Contact form emailer for multiple websites. This handles the contact form submission and emails it to the correct email recipient depending on the domain name set in the request.

## Technologies used
- [AWS SES](https://aws.amazon.com/ses/)
- [Serverless Framework](https://serverless.com/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS API Gateway](https://aws.amazon.com/api-gateway/)
- [TypeScript](https://www.typescriptlang.org/)

## Setting up AWS SES
AWS SES needs to be set up to be able to do an End-to-End unit test. Running mailer test will send an test email to the emails in the config that are locally set. Follow AWS's instruction to set up AWS SES: https://aws.amazon.com/ses/getting-started/

## Local Installation
1. Clone repo
1. Run `npm install`
1. Set up `.env` file according to `sample.env`
    ```
    AWS_PROFILE=default
    SES_EMAIL_SOURCE=youremailaddress@gmail.com
    ```
1. Set up `email.conf.json` file according to `sample_email.conf.json`. Emails must be confirmed in AWS SES.
    ```
    [
        {
            "domain": "domainname.com"
            , "email": "emailaddress@domainname.com"
        }
        , {
            "domain": "otherdomain.com"
            , "email": "otherdomain@gmail.com"
        }
    ]
    ```
1. Run `npm test`

## Running in production
TODO