import {DiscordAuthConfig} from "./config.js";
import {useRebar} from "@Server/index.js";
import {Client} from "discord.js";
import {DiscordInfo} from "../shared/discordAuth.js";
import * as https from "node:https";

let client: Client = undefined;

const Rebar = useRebar();

export async function requestInit() {
    if ( !DiscordAuthConfig.SERVER_ID || DiscordAuthConfig.SERVER_ID.length <= 3 ) {
        return;
    }

    try {
        const discordAPI = await Rebar.useApi().getAsync("discord-api");
        if ( !discordAPI ) {
            throw new Error( "no discord api found" );
        }

        client = discordAPI.client();
        if ( !client ) {
            throw new Error( "no discord client found" );
        }
    } catch ( error ) {
        console.log('cannot get discord-api, please install.');
    }
}


export async function getCurrentUser(token: string): Promise<DiscordInfo | undefined> {
    return new Promise<DiscordInfo | undefined>((resolve, reject) => {
        https.get("https://discord.com/api/users/@me", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`,
            }
        }, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`HTTP Error: ${res.statusCode}`));
                res.resume(); // Consume response data to free up memory
                return;
            }

            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data) as DiscordInfo;
                    resolve(parsedData);
                } catch (e) {
                    reject(new Error("Failed to parse response"));
                }
            });
        }).on('error', (e) => {
            reject(new Error(`Request Error: ${e.message}`));
        });
    });
}

export async function getUserGuildMember(userId: string) {
    if ( !client ) return undefined;

    const guild = await client.guilds.fetch(DiscordAuthConfig.SERVER_ID);
    if ( !guild ) return undefined;
    
    return guild.members.fetch(userId);
}