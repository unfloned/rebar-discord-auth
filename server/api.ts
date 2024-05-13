import alt from "alt-server";
import {useRebar} from "@Server/index.js";
import {Account} from "@Shared/types/index.js";

type PlayerCallback = (player: alt.Player, account: Account) => void;

const Rebar = useRebar();
const loginCallbacks: Array<PlayerCallback> = [];

export function invokeLogin(player: alt.Player, account: Account) {
    for ( const cb of loginCallbacks ) {
        cb(player, account);
    }
}


export function useDiscordAuth() {
    function onLogin(callback: (player: alt.Player) => void) {
        loginCallbacks.push(callback);
    }

    return {
        onLogin,
    };
}

declare global {
    export interface ServerPlugin {
        ['discord-auth-api']: ReturnType<typeof useDiscordAuth>;
    }
}

Rebar.useApi().register('discord-auth-api', useDiscordAuth());