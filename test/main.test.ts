import { config } from "dotenv";
config()
import { mockPayload } from "./mocks";
import { main } from "../src/main";
import { APIGatewayProxyResult } from 'aws-lambda';



describe("main process", () => {
    test("Test the main process returns 200", async (done) =>{
        try {
            const payload = mockPayload();
            console.log(payload);
            main(payload, (error: string | null | Error | undefined, result: APIGatewayProxyResult | undefined) => {
                expect(error).toBeFalsy();
                expect(result!.statusCode).toBe(200);
                expect(result!.body).toBe("{'success':'true'}");
                done();
            });
        } catch (error) {
           console.error(error);
           expect(error).toBeUndefined(); 
           done();
        }
    });

    test("Test main process returns 400", async (done) => {
        try {
            const payload = mockPayload();
            payload.emailFrom = "";
            payload.phone = undefined!;

            main(payload, (error: string | null | Error | undefined, result: APIGatewayProxyResult | undefined) => {
                expect(error).toBeDefined();
                expect(result!.statusCode).toBe(400);
                done();
            });
        } catch (error) {
            console.error(error);
            expect(error).toBeUndefined();
            done();
        }
    });

});