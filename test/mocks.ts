import getEmailConfig from "../src/util/getEmailConfig";
import { IFieldSet, IPayloadBody } from "../src/util/interfaces";

export function mockFields(): IFieldSet {
    return {name: "bob", phone: "4345555555", subject: "hi"};
}

export function mockPayload(): IPayloadBody {
    const payload = {
        websiteUrl: getEmailConfig()[0].domain
        , emailFrom: "testing@test.com"
        , message: "Testing email service"
        , phone: undefined
        , subject: "Tester Email"
        , name: "Anonymous"
        , captcha: {
            secret: "adlkajd1234",
            response: "200"
        }
    }

    return payload;
}
