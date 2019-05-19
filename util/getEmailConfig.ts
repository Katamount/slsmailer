import { IEmailConfig } from "./IEmailConfig";
import { readFileSync } from "fs";

export default function getEmailConfig(){
    const emailConfig: IEmailConfig[] = JSON.parse(readFileSync(__dirname+"/../email.conf.json").toString()) as IEmailConfig[];
    return emailConfig;
}