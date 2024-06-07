import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    en: {
        'discord.auth.to.long': 'No session request found. Restart client.',
        'discord.auth.no.session': 'No session request found. Restart client.',
        'discord.auth.already.complete': 'Session request already completed. Restart client.',
        'discord.auth.expired.session': 'Authentication session expired. Restart client.',
        'discord.auth.token.failed': 'Failed to Authenticate with Discord. Restart client.',
        'discord.auth.request.failed': 'cannot get current your Discord user.',
        'discord.auth.account.failed': 'failed to get or create account',
        'discord.auth.guild.no.member': 'you arent in our discord server, please join before connect',
        'discord.auth.guild.no.whitelist': 'you are not whitelisted. Please check our whitelist policy',
        'discord.auth.success': 'has authenticated.',
        'discord.auth.banned.no.reason': 'without any reason',
        'discord.auth.title': 'Discord Authentication.',
        'discord.auth.subtile': 'wait until we know who you are.',
        'discord.auth.information': 'maybe you need to autorize our app in discord.',
    },
    hu: {
        'discord.auth.to.long': 'Nem található munkamenet. Indítsd újra a klienst.',
        'discord.auth.no.session': 'Nem található munkamenet. Indítsd újra a klienst.',
        'discord.auth.already.complete': 'A munkamenet már teljesítve. Indítsd újra a klienst.',
        'discord.auth.expired.session': 'A hitelesítési munkamenet lejárt. Indítsd újra a klienst.',
        'discord.auth.token.failed': 'Sikertelen hitelesítés a Discorddal. Indítsd újra a klienst.',
        'discord.auth.request.failed': 'Nem sikerült lekérni az aktuális Discord felhasználódat.',
        'discord.auth.account.failed': 'Nem sikerült létrehozni vagy lekérni a fiókodat.',
        'discord.auth.guild.no.member': 'Nem vagy tagja a Discord szerverünknek, kérlek csatlakozz mielőtt kapcsolódsz.',
        'discord.auth.guild.no.whitelist': 'Nem vagy a fehérlistán. Kérlek, ellenőrizd a whitelist szabályzatunkat.',
        'discord.auth.success': 'sikeresen hitelesítve.',
        'discord.auth.banned.no.reason': 'indoklás nélkül',
        'discord.auth.title': 'Discord Hitelesítés.',
        'discord.auth.subtile': 'várj, amíg megtudjuk, ki vagy.',
        'discord.auth.information': 'lehet, hogy engedélyezned kell az alkalmazásunkat a Discordon.'
    },
    de: {
        'discord.auth.to.long': 'Keine Sitzungsanforderung gefunden. Starten Sie den Client neu.',
        'discord.auth.no.session': 'Keine Sitzungsanforderung gefunden. Starten Sie den Client neu.',
        'discord.auth.already.complete': 'Sitzungsanforderung bereits abgeschlossen. Starten Sie den Client neu.',
        'discord.auth.expired.session': 'Authentifizierungssitzung abgelaufen. Starten Sie den Client neu.',
        'discord.auth.token.failed': 'Authentifizierung bei Discord fehlgeschlagen. Starten Sie den Client neu.',
        'discord.auth.request.failed': 'Aktuellen Discord-Benutzer abrufen nicht möglich.',
        'discord.auth.account.failed': 'Konto konnte nicht erstellt oder abgerufen werden.',
        'discord.auth.guild.no.member': 'Sie sind nicht Mitglied unseres Discord-Servers. Bitte treten Sie vor der Verbindung bei.',
        'discord.auth.guild.no.whitelist': 'Sie sind nicht auf der Whitelist. Bitte überprüfen Sie unsere Whitelist-Richtlinien.',
        'discord.auth.success': 'wurde authentifiziert.',
        'discord.auth.banned.no.reason': 'ohne jeglichen Grund',
        'discord.auth.title': 'Discord-Authentifizierung.',
        'discord.auth.subtile': 'warte, bis wir wissen, wer du bist.',
        'discord.auth.information': 'möglicherweise müssen Sie unsere App in Discord autorisieren.'
    }
})
