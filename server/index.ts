import * as alt from 'alt-server';
import { DiscordAuthConfig } from './config.js';
import { DiscordAuthEvents } from '../shared/events.js';
import { useRebar } from '@Server/index.js';
import { Account } from '@Shared/types/index.js';
import {getCurrentUser, getUserGuildMember, requestInit} from "./requests.js";
import {DiscordInfo, DiscordSession} from "../shared/discordAuth.js";
import {useTranslate} from "@Shared/translate.js";

import '../translate/index.js';

import * as Plugin from './api.js';


const Rebar = useRebar();
const db = Rebar.database.useDatabase();
const translate = useTranslate();

const sessions: Array<DiscordSession> = [];

requestInit();

function handleConnect(player: alt.Player) {
    const playerWorld = Rebar.player.useWorld(player);

    player.dimension = player.id + 1;
    playerWorld.setScreenFade(0);

    sessions.push({
        id: player.id,
        expiration: Date.now() + 60000 * DiscordAuthConfig.SESSION_EXPIRE_TIME_IN_MINUTES
    });

    const view = Rebar.player.useWebview(player);
    view.show("DiscordAuth", "page");

    player.emit(DiscordAuthEvents.toClient.requestToken, DiscordAuthConfig.APPLICATION_ID);
}

async function handleToken(player: alt.Player, token: string) {
    if (!player || !player.valid) return;
    alt.log(`${player.name} needs to be authenticated.`);

    setSessionFinish(player);

    if (!token) {
        player.kick(translate.t("discord.auth.token.failed"));
        return;
    }

    const currentUser = await getCurrentUser(token) as DiscordInfo | undefined;
    if ( !currentUser ) {
        player.kick(translate.t("discord.auth.request.failed"));
        return;
    }

    let account = await db.get<Account>(
        { discord: currentUser.id },
        Rebar.database.CollectionNames.Accounts
    );

    if ( !account ) {
        const _id = await db.create<Partial<Account>>(
            {
                discord: currentUser.id
            },
            Rebar.database.CollectionNames.Accounts
        );
        account = await db.get<Account>({ _id }, Rebar.database.CollectionNames.Accounts);
    }

    if (!account) {
        player.kick(translate.t("discord.auth.account.failed"));
        return;
    }

    if (account.banned) {
        player.kick(account.reason || translate.t("discord.auth.banned.no.reason"));
        return;
    }

    if ( DiscordAuthConfig.SERVER_ID && DiscordAuthConfig.SERVER_ID.length !== 0 ) {
        const guildMember = await getUserGuildMember(currentUser.id);
        if ( !guildMember ) {
            player.kick(translate.t("discord.auth.guild.no.member"));
            return;
        }

        if ( DiscordAuthConfig.WHITELIST_ROLE_ID && DiscordAuthConfig.WHITELIST_ROLE_ID.length !== 0 ) {
            const role = guildMember.roles.cache.get(DiscordAuthConfig.WHITELIST_ROLE_ID);
            if ( !role ) {
                player.kick(translate.t("discord.auth.guild.no.whitelist"));
                return;
            }
        }
    }

    alt.log(`${currentUser.username} has authenticated.`);
    setAccount(player, account);
}

function cleanupSessions() {
    let count = 0;
    for (let i = sessions.length - 1; i >= 0; i--) {
        if (sessions[i].expiration > Date.now() && !sessions[i].finished) {
            continue;
        }

        const player = alt.Player.all.find((x) => x.id === sessions[i].id);
        if (player && player.valid && !sessions[i].finished) {
            alt.log(`Kicked ${player.name} for waiting too long to login.`);
            player.kick(translate.t("discord.auth.expired.session"));
        }

        count += 1;
        sessions.splice(i, 1);
        break;
    }

    if (count >= 1) {
        alt.log(`Cleaned Sessions for Authorization: ${count} `);
    }
}

function setSessionFinish(player: alt.Player) {
    const sessionIndex = sessions.findIndex((x) => x.id === player.id);
    if (sessionIndex <= -1) {
        player.kick(translate.t("discord.auth.no.session"));
        return;
    }

    if (sessions[sessionIndex].finished) {
        player.kick(translate.t("discord.auth.already.complete"));
        return;
    }

    sessions[sessionIndex].finished = true;


    if (Date.now() > sessions[sessionIndex].expiration) {
        player.kick(translate.t("discord.auth.expired.session"));
        return;
    }

}

function setAccount(player: alt.Player, account: Account) {
    Rebar.document.account.useAccountBinder(player).bind(account);
    const playerWorld = Rebar.player.useWorld(player);
    const view = Rebar.player.useWebview(player);

    playerWorld.clearScreenFade(500);
    view.hide("DiscordAuth");

    Plugin.invokeLogin(player, account);
}


alt.on('playerConnect', handleConnect);
alt.onClient(DiscordAuthEvents.toServer.pushToken, handleToken);
alt.setInterval(cleanupSessions, 5000);