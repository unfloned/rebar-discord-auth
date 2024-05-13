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
    }
})