import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { main } from './main';


export const emailContact: APIGatewayProxyHandler = (event, _context, callback) => {
    try {
        if (!event.body) {
            callback("bad request", {statusCode: 400, body: "{'message': 'missing request body'}"});
        }
        const payload = JSON.parse(event.body!);
        main(payload, callback);
    } catch (error) {
        console.error(error);
        const result: APIGatewayProxyResult = {statusCode: 500, body: "{'success':'false'}"}
        callback(error, result);
    }
}
