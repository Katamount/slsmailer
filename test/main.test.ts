import { config } from "dotenv";
config()
import { mockPayload } from "./mocks";
import { main } from "../src/main";
import { APIGatewayProxyResult } from 'aws-lambda';
import { Captcha } from '../src/util/Captcha';
import { ICaptchaRequest, ICaptchaResponse } from "../src/util/interfaces";




describe("main process", () => {
    
    test("Test main process returns 406", async (done) => {
        try {
            const captcha = new Captcha();
            captcha.verify = async (_request: ICaptchaRequest):Promise<ICaptchaResponse>=>{
                return {success: false, challenge_ts: "", hostname: ""};
            };
            const payload = mockPayload();
            payload.emailFrom = "";
            payload.phone = undefined!;

            const result: APIGatewayProxyResult = await main(payload, captcha) as APIGatewayProxyResult
                
            expect(result!.statusCode).toBe(406);
            done();
        } catch (error) {
            console.error(error);
            expect(error).toBeUndefined();
            done();
        }
    });

    test("Test the main process returns 200", async (done) =>{
        try {
            const captcha = new Captcha();
            captcha.verify = async (_request: ICaptchaRequest):Promise<ICaptchaResponse>=>{
                return {success: true, challenge_ts: "", hostname: ""};
            };
            const payload = mockPayload();
            console.log(payload);
            const result: APIGatewayProxyResult = await main(payload, captcha) as APIGatewayProxyResult
            expect(result!.statusCode).toBe(200);
            expect(result!.body).toBe("{'success':'true'}");
            done();
        } catch (error) {
           console.error(error);
           expect(error).toBeUndefined(); 
           done();
        }
    });

    test("Test main process returns 400", async (done) => {
        try {
            const captcha = new Captcha();
            captcha.verify = async (_request: ICaptchaRequest):Promise<ICaptchaResponse>=>{
                return {success: true, challenge_ts: "", hostname: ""};
            };
            const payload = mockPayload();
            payload.emailFrom = "";
            payload.phone = undefined!;

            const result: APIGatewayProxyResult = await main(payload, captcha) as APIGatewayProxyResult
                
            expect(result!.statusCode).toBe(400);
            done();
        } catch (error) {
            console.error(error);
            expect(error).toBeUndefined();
            done();
        }
    });

});