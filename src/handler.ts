import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { main } from './main';
import * as HTTP from 'http-status';
import { Captcha } from './util/Captcha';

export const emailContact: APIGatewayProxyHandler = async (event, _context): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            return {statusCode: HTTP.BAD_REQUEST, body: "{'message': 'missing request body'}"};
        }
        const payload = JSON.parse(event.body!);
        const captcha = new Captcha();
        return await main(payload, captcha) as APIGatewayProxyResult;
    } catch (error) {
        console.error(error);
        const result: APIGatewayProxyResult = {statusCode: HTTP.INTERNAL_SERVER_ERROR, body: "{'success':'false'}"}
        return result;
    }
}
