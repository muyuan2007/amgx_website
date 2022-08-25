import { icons, General,SpamAutomodSet,NABasedAutomodSet,TAAutomodSet,Selfbot,BlacklistBasedSet,CatProfileBasedSet,ProfileTAAutomodSet } from '../../../components/Automod'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { getSession, signIn } from 'next-auth/react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ListItem, ListItemIcon, ListItemText, Grid, Container, Divider, List, Box, Drawer, Toolbar } from '@material-ui/core'
import { DatabaseFails } from '../../../components/Fails'
import { Fragment } from 'react'
import Head from 'next/head'

const links = {"General Settings": 'botsettings', "Automod": 'automod', "Logging":'modlogs', "Autopunish": 'autopunish', "Auto Kick/Ban":'autokickban', "Weblogs": 'weblogs'}

const drawerWidth = 210
function Automod(props) {
    
    const [id, changeId] = useState(0)
    const router = useRouter()
    const guildid = router.query.guildid
    const inguild = props.inguild
    
    const getthesession = async () => {
        const getsession = await getSession();
        if (getsession == null) {
            signIn('discord','https://www.amgx-bot.com/api/auth/callback/discord')
        }
        return getsession
        
    }
    useEffect(async ()=>{
        getthesession()
        if (!localStorage.getItem("guilds").split(',').includes(guildid)) {
            router.push('https://www.amgx-bot.com')
        }
        else if (!inguild) {
            router.push(`https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=8&scope=bot`)
        }
    },[]);
    
    const roles = props.roles
    const channels = props.channels
    let channelinfo = []
    let roleinfo = []
    const roleobj = {}
    const channelobj = {}
    channels.forEach(channel => {channelinfo.push(`${channel.name}`); channelobj[`${channel.name}`]=channel.id})
    roles.forEach(role => {roleinfo.push(`${role.name}`); roleobj[`${role.name}`]=role.id})
    const colors = {'General Settings': 'white','Automod': 'lightgray','Logging': 'white','Autopunish': 'white','Auto Kick/Ban': 'white','Weblogs': 'white'}

    if (!props.erred) {
        return <>
        <Head>
            <title>Automod settings</title>
            <meta name='description' content='Auto moderation settings'></meta>
        </Head>

        <Box className={'uuu'}style={{ display: 'flex', position: 'relative', top:60 }}>
        
        <Drawer
        
            id="nav" style={{zIndex:2,backgroundColor: 'lightgray', height: '100vw',position: 'absolute', width: drawerWidth}}
            variant="permanent"
            anchor="left"
        >
            <div style={{height: 55}}/>
            <div style={{height: 55}}/>
                <List style={{position: 'relative'}}>
            {['General Settings', 'Automod', 'Logging', 'Autopunish','Auto Kick/Ban'].map((text, index) => (
                <Link href={`/dashboard/${guildid}/${links[text]}`} key={text}>
                <ListItem button key={text} style={{backgroundColor: colors[text]}}>
                <ListItemIcon>
                    {icons[text]}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
                </Link>
            ))}
            </List>
            </Drawer>
        <Box id={'settings'}
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default' } }
            style={{zIndex:1,width: `calc(100% - ${drawerWidth}px)`, position:'absolute', left: drawerWidth, top: 50}}
        >
            <Container style={{padding: '20px 0', width: 'calc(100% - 50px)'}} maxWidth="xl"> <Grid container spacing={4} >
        <General server={guildid} role_whitelists={props.generalInfo.role_whitelists} channel_whitelists={props.generalInfo.channel_whitelists} roles={roleinfo} channels={channelinfo} roleobj={roleobj} channelobj={channelobj}/>
        <SpamAutomodSet uid={id} table={'messagespam'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Message Spam" bottomoft="Messages" offUnit="Seconds" textWidth1={101.69} punishments={props.messageSpamInfo.punishments} maxes={props.messageSpamInfo.maxes} points={props.messageSpamInfo.points} duration={props.messageSpamInfo.duration} timeunit={props.messageSpamInfo.timeunit} timeval={props.messageSpamInfo.timeval} channel_whitelists={props.messageSpamInfo.channel_whitelists} role_whitelists={props.messageSpamInfo.role_whitelists}></SpamAutomodSet>
        <SpamAutomodSet uid={id} table={'emojispam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Emoji Spam' bottomoft={'Emojis'} offUnit='Seconds'textWidth1={76.23} punishments={props.emojiSpamInfo.punishments} maxes={props.emojiSpamInfo.maxes} points={props.emojiSpamInfo.points} duration={props.emojiSpamInfo.duration} timeunit={props.emojiSpamInfo.timeunit} timeval={props.emojiSpamInfo.timeval} channel_whitelists={props.emojiSpamInfo.channel_whitelists} role_whitelists={props.emojiSpamInfo.role_whitelists}/>
        <SpamAutomodSet uid={id} table={'mentionspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Mention Spam' bottomoft={'Mentions'} offUnit='Seconds'textWidth1={94.92} punishments={props.mentionSpamInfo.punishments} maxes={props.mentionSpamInfo.maxes} points={props.mentionSpamInfo.points} duration={props.mentionSpamInfo.duration} timeunit={props.mentionSpamInfo.timeunit} timeval={props.mentionSpamInfo.timeval} channel_whitelists={props.mentionSpamInfo.channel_whitelists} role_whitelists={props.mentionSpamInfo.role_whitelists}/>
        <SpamAutomodSet uid={id} table={'stickerspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Sticker Spam' bottomoft={'Stickers'} offUnit='Seconds'textWidth1={85.41} punishments={props.stickerSpamInfo.punishments} maxes={props.stickerSpamInfo.maxes} points={props.stickerSpamInfo.points} duration={props.stickerSpamInfo.duration} timeunit={props.stickerSpamInfo.timeunit} timeval={props.stickerSpamInfo.timeval} channel_whitelists={props.stickerSpamInfo.channel_whitelists} role_whitelists={props.stickerSpamInfo.role_whitelists} />
        <SpamAutomodSet uid={id} table={'attachmentspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Attachment Spam' bottomoft={'Attachments'} offUnit='Seconds'textWidth1={120.23} punishments={props.attachmentSpamInfo.punishments} maxes={props.attachmentSpamInfo.maxes} points={props.attachmentSpamInfo.points} duration={props.attachmentSpamInfo.duration} timeunit={props.attachmentSpamInfo.timeunit} timeval={props.attachmentSpamInfo.timeval} channel_whitelists={props.attachmentSpamInfo.channel_whitelists} role_whitelists={props.attachmentSpamInfo.role_whitelists}/>
        <SpamAutomodSet uid={id} table={'linkspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Link Spam' bottomoft={'Links'} offUnit='Seconds'textWidth1={65.56} punishments={props.linkSpamInfo.punishments} maxes={props.linkSpamInfo.maxes} points={props.linkSpamInfo.points} duration={props.linkSpamInfo.duration} timeunit={props.linkSpamInfo.timeunit} timeval={props.linkSpamInfo.timeval} channel_whitelists={props.linkSpamInfo.channel_whitelists} role_whitelists={props.linkSpamInfo.role_whitelists}/>
        <NABasedAutomodSet table={'linebreaks'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype={'Too Many Line Breaks'} oftdesc={'line breaks'} textWidth1={87.47} punishments={props.lineBreakInfo.punishments} top={props.lineBreakInfo.top} points={props.lineBreakInfo.points} duration={props.lineBreakInfo.duration} timeunit={props.lineBreakInfo.timeunit} timeval={props.lineBreakInfo.timeval} channel_whitelists={props.lineBreakInfo.channel_whitelists} role_whitelists={props.lineBreakInfo.role_whitelists}/>
        <NABasedAutomodSet table={'toomanycaps'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype={'Too Many Caps'} oftdesc={'% caps'} textWidth1={60.89} punishments={props.capInfo.punishments} top={props.capInfo.top} points={props.capInfo.points} duration={props.capInfo.duration} timeunit={props.capInfo.timeunit} timeval={props.capInfo.timeval} channel_whitelists={props.capInfo.channel_whitelists} role_whitelists={props.capInfo.role_whitelists}/>
        <NABasedAutomodSet table={'duplicatemessages'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype={'Duplicate Messages'} oftdesc={'repeated messages'} textWidth1={152.55} punishments={props.duplicateMsgInfo.punishments} top={props.duplicateMsgInfo.top} points={props.duplicateMsgInfo.points} duration={props.duplicateMsgInfo.duration} timeunit={props.duplicateMsgInfo.timeunit} timeval={props.duplicateMsgInfo.timeval} channel_whitelists={props.duplicateMsgInfo.channel_whitelists} role_whitelists={props.duplicateMsgInfo.role_whitelists}/>
        <NABasedAutomodSet table={'duplicatecharacters'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Duplicate Characters" oftdesc="repeated characters" textWidth1={154.88} punishments={props.duplicateCharInfo.punishments} top={props.duplicateCharInfo.top} points={props.duplicateCharInfo.points} duration={props.duplicateCharInfo.duration} timeunit={props.duplicateCharInfo.timeunit} timeval={props.duplicateCharInfo.timeval} channel_whitelists={props.duplicateCharInfo.channel_whitelists} role_whitelists={props.duplicateCharInfo.role_whitelists}></NABasedAutomodSet>
        <TAAutomodSet table={'invites'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Invites" punishments={props.inviteInfo.punishments} points={props.inviteInfo.points} duration={props.inviteInfo.duration} timeunit={props.inviteInfo.timeunit} timeval={props.inviteInfo.timeval} channel_whitelists={props.inviteInfo.channel_whitelists} role_whitelists={props.inviteInfo.role_whitelists}></TAAutomodSet>
        <TAAutomodSet table={'nsfwcontent'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="NSFW Content" punishments={props.nsfwInfo.punishments} points={props.nsfwInfo.points} duration={props.nsfwInfo.duration} timeunit={props.nsfwInfo.timeunit} timeval={props.nsfwInfo.timeval} channel_whitelists={props.nsfwInfo.channel_whitelists} role_whitelists={props.nsfwInfo.role_whitelists}></TAAutomodSet>
        <TAAutomodSet table={'hatespeech'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Hate Speech" punishments={props.hateSpeechInfo.punishments} points={props.hateSpeechInfo.points} duration={props.hateSpeechInfo.duration} timeunit={props.hateSpeechInfo.timeunit} timeval={props.hateSpeechInfo.timeval} channel_whitelists={props.hateSpeechInfo.channel_whitelists} role_whitelists={props.hateSpeechInfo.role_whitelists}></TAAutomodSet>
        <Selfbot server={guildid} roleobj={roleobj} roles={roleinfo} offtype="Selfbot Detection" punishments={props.selfbotInfo.punishments} points={props.selfbotInfo.points} duration={props.selfbotInfo.duration} timeunit={props.selfbotInfo.timeunit} timeval={props.selfbotInfo.timeval} role_whitelists={props.selfbotInfo.role_whitelists}/>
        <BlacklistBasedSet table={'badwords'} server={guildid} roles={roleinfo} channelobj={channelobj} roleobj={roleobj} channels={channelinfo} offtype="Bad Words" categoryName="Word categories" placehold="Press enter to add a word" categories={props.badWordInfo}></BlacklistBasedSet>
        <BlacklistBasedSet table={'badlinks'} server={guildid} roles={roleinfo} channelobj={channelobj} roleobj={roleobj} channels={channelinfo} offtype="Bad Links" categoryName="Link categories" placehold="Press enter to add a link" categories={props.badLinkInfo}></BlacklistBasedSet>
        <CatProfileBasedSet table={'badnicks'} server={guildid} roles={roleinfo} roleobj={roleobj} offtype="Bad Nicknames" categoryName="Nickname categories" placehold="Press enter to add a nickname" categories={props.badNickInfo}></CatProfileBasedSet>
        <CatProfileBasedSet table={'badnames'} server={guildid} roles={roleinfo} roleobj={roleobj} offtype="Bad Usernames" categoryName="Username categories" placehold="Press enter to add a username" categories={props.badNameInfo}></CatProfileBasedSet>
        <CatProfileBasedSet table={'badstatuses'} server={guildid} roles={roleinfo} roleobj={roleobj} offtype="Bad Custom Statuses" categoryName="Status categories" placehold="Press enter to add a status" categories={props.badStatusInfo}></CatProfileBasedSet>
        <ProfileTAAutomodSet table={'nsfwpfp'} roleobj={roleobj} server={guildid} roles={roleinfo} offtype="NSFW Avatars" punishments={props.nsfwPfpInfo.punishments} points={props.nsfwPfpInfo.points} duration={props.nsfwPfpInfo.duration} timeunit={props.nsfwPfpInfo.timeunit} timeval={props.nsfwPfpInfo.timeval} role_whitelists={props.nsfwPfpInfo.role_whitelists}></ProfileTAAutomodSet>
        </Grid></Container>
        </Box>
        </Box>
        
        </>
    } else {
        return <>
        <Head>
            <title>Failed to fetch server info</title>
        </Head>
        <DatabaseFails /></>
    }
}


export async function getServerSideProps(context) {
    const guildid = context.params.guildid
    const botToken = process.env.BOT_TOKEN
    let channels = []
    let roles = []
    let botobj = {}
    let erred = false 
    const { Pool, Client } = require('pg')
    const client = new Client({
        user:process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password:process.env.DB_PASS,
        port:process.env.DB_PORT
    })
    client.connect()

    await fetch(`https://discord.com/api/guilds/${guildid}/members/834072169507848273`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            }
        }).then(response => response.json()).then(data => {botobj = data})
    let inguild = 'mute' in botobj

    if (inguild) {
        await fetch(`https://discord.com/api/v8/guilds/${guildid}/channels`,{
            headers: {
                Authorization: `Bot ${botToken}`
              }
        }).then(response => {if (response.ok) {return response.json()} return Promise.reject()}).then(data => {data.forEach(channel => {if (channel.type === 0) {channels.push(channel);}})}).catch(error => {erred = true}) 
        await fetch(`https://discord.com/api/v8/guilds/${guildid}/roles`,{
            headers: {
                Authorization: `Bot ${botToken}`
              }
        }).then(response => {if (response.ok) {return response.json()} return Promise.reject()}).then(data => {data.forEach(role => 
            {const allowed = !(Array.from(Object.keys(role)).includes('tags') && Array.from(Object.keys(role.tags)).includes('bot_id')) && !(role.name == '@everyone')
                if (allowed){
                roles.push(role)
            }
        }
        )
    }
    ).catch(error => {erred = true}) 
        
    }
    let general = {channel_whitelists: {}, role_whitelists: {}}
    let messageSpamInfo = {punishments:['Delete message', 'Mute', 'Warn'],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 5, timeval: 40, timeunit: 'minutes'}
    let emojiSpamInfo = {punishments:['Delete message', 'Mute'],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 20, timeunit: 'minutes'}
    let mentionSpamInfo = {punishments:['Delete message', 'Mute', 'Warn'],maxes:[8,2],  channel_whitelists:{},role_whitelists:{}, points: 6, timeval: 3, timeunit: 'hours'}
    let stickerSpamInfo = {punishments:['Delete message', 'Mute'],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 2, timeunit: 'hours'}
    let attachmentSpamInfo = {punishments:['Delete message', 'Mute', 'Warn'],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 5, timeval: 3, timeunit: 'hours'}
    let linkSpamInfo = {punishments:['Delete message', 'Mute'],maxes:[6,2],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 2, timeunit: 'hours'}

    let lineBreakInfo = {punishments:['Delete message', 'Mute'],top:6,points:0,timeunit:'minutes',timeval:30,channel_whitelists:{},role_whitelists:{}}
    let capInfo = {punishments:['Delete message','Mute', 'Warn'],top:90,points:5,timeunit:'minutes',timeval:45,channel_whitelists:{},role_whitelists:{}}
    let duplicateMsgInfo = {punishments:['Delete message','Mute', 'Warn'],top:5,points: 4,timeunit:'hours',timeval:2,channel_whitelists:{},role_whitelists:{}}
    let duplicateCharInfo = {punishments:['Delete message', 'Mute', 'Warn'],top:10,points:5,timeunit:'minutes',timeval:45,channel_whitelists:{},role_whitelists:{}}

    let inviteInfo = {punishments: ['Delete message','Warn'], points: 5, timeunit: 'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    let nsfwInfo = {punishments: ['Delete message','Ban'], points: 0, timeunit: 'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    let hateSpeechInfo = {punishments: ['Delete message', 'Warn', 'Tempban'], points: 15, timeunit: 'days',timeval:3,channel_whitelists:{},role_whitelists:{}}
    let selfbotInfo = {punishments:['Delete message','Ban'], points:0, timeunit:'minutes',timeval:0,role_whitelists:{}}

    let badWordInfo = [{title: 'slurs', 
                        punishments: [ 'Delete message', 'Warn' ], 
                        availableOptions: ['Delete message', 'Mute','Warn'],
                        words: { 
                            nigger: 'Substring', 
                            fag: 'Substring', 
                            tranny: 'Substring', 
                            trannies: 'Substring', 
                            chingchong: 'Substring', 
                            'ching chang': 'Substring' }, 
                        points: 20, 
                        timeval: 0, 
                        timeunit: 'minutes', 
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0 },

                    ]
    let badLinkInfo = [{title: 'nsfw', 
                        punishments: ['Delete message', 'Ban'], 
                        availableOptions: ['Delete message', 'Ban'],
                        words: {
                            'pornhub': 'Substring', 
                            'xvideos': 'Substring', 
                            'spankbang': 'Substring',
                            'xnxx': 'Substring', 
                            'xhamster': 'Substring',
                            'chaturbate': 'Substring',
                            'youporn': 'Substring', 
                            'tnaflix': 'Substring',
                            'nuvid': 'Substring',
                            'drtuber': 'Substring',
                            'xxxbunker': 'Substring',
                            'xxxvideo': 'Substring',
                            'fapvidhd': 'Substring', 
                            'xxxvideos247': 'Substring', 
                            'pornhd': 'Substring', 
                            'redtube': 'Substring', 
                            'fapster': 'Substring', 
                            'tastyblacks': 'Substring',
                            'hclips': 'Substring', 
                            'tube8': 'Substring'
                            }, 
                        points: 0, 
                        timeval: 0, 
                        timeunit: 'minutes',
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0
                        },
                       {title: 'gory', 
                       punishments: ['Delete message', 'Ban'], 
                       availableOptions: ['Delete message', 'Ban'],
                       words: {
                            'bestgore': 'Substring', 
                            'theync': 'Substring',
                            'kaotic': 'Substring',
                            'goregrish': 'Substring', 
                            'crazyshit': 'Substring', 
                            'efukt': 'Substring',
                            'runthegauntlet': 'Substring', 
                            'ogrishforum': 'Substring'
                        }, 
                        points: 0, 
                        timeval: 0,
                        timeunit: 'minutes',
                        whitelistedRoles: {},
                        whitelistedChannels: {}, 
                        duration: 0}]
    let badNickInfo = [{title: 'triggering',
                        punishments: ['Ban'],
                        availableOptions: ['Ban'],
                        words: {
                            'hitler': 'Substring', 
                            'nazi': 'Substring', 
                            'adolf': 'Substring',
                            'holocaust': 'Substring', 
                            'auschwitz': 'Substring', 
                            'rapist': 'Substring', 
                            'porn': 'Substring', 
                            'molest': 'Substring', 
                            'traffick': 'Substring',
                            'rape': 'NoSubstring', 
                            'raping': 'NoSubstring',
                            'pedo': 'Substring', 
                            'paedo': 'Substring',
                            'sex': 'NoSubstring', 

                        },
                        points: 0, 
                        timeval: 0, 
                        timeunit: 'minutes', 
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0},
                        {title: 'slurs', 
                        punishments: [ 'Warn','Tempban' ],
                        availableOptions: ['Warn','Tempban'],

                        words: { 
                            nigger: 'Substring', 
                            fag: 'Substring', 
                            tranny: 'Substring', 
                            trannies: 'Substring', 
                            chingchong: 'Substring', 
                            'ching chang': 'Substring' }, 
                        points: 20, 
                        timeval: 3, 
                        timeunit: 'days', 
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0 }
                    ]
    let badNameInfo = [{title: 'triggering',
                        punishments: ['Ban'],
                        availableOptions: ['Ban'],
                        words: {
                            'hitler': 'Substring', 
                            'nazi': 'Substring', 
                            'adolf': 'Substring',
                            'holocaust': 'Substring', 
                            'auschwitz': 'Substring', 
                            'rapist': 'Substring', 
                            'porn': 'Substring', 
                            'molest': 'Substring', 
                            'traffick': 'Substring',
                            'rape': 'NoSubstring', 
                            'raping': 'NoSubstring',
                            'pedo': 'Substring', 
                            'paedo': 'Substring',
                            'sex': 'NoSubstring', 

                        },
                        points: 0, 
                        timeval: 0, 
                        timeunit: 'minutes', 
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0},
                        {title: 'slurs', 
                        punishments: [ 'Warn','Tempban' ], 
                        availableOptions: ['Warn','Tempban'],
                        words: { 
                            nigger: 'Substring', 
                            fag: 'Substring', 
                            tranny: 'Substring', 
                            trannies: 'Substring', 
                            chingchong: 'Substring', 
                            'ching chang': 'Substring' }, 
                        points: 20, 
                        timeval: 3, 
                        timeunit: 'days', 
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0 }
                    ]
    let badStatusInfo = [{title: 'triggering',
                        punishments: ['Ban'],
                        availableOptions: ['Ban'],

                        words: {
                            'hitler': 'Substring', 
                            'nazi': 'Substring', 
                            'adolf': 'Substring',
                            'holocaust': 'Substring', 
                            'auschwitz': 'Substring', 
                            'rapist': 'Substring', 
                            'porn': 'Substring', 
                            'molest': 'Substring', 
                            'traffick': 'Substring',
                            'rape': 'NoSubstring', 
                            'raping': 'NoSubstring',
                            'pedo': 'Substring', 
                            'paedo': 'Substring',
                            'sex': 'NoSubstring', 

                        },
                        points: 0, 
                        timeval: 0, 
                        timeunit: 'minutes', 
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0},
                        {title: 'slurs', 
                        punishments: [ 'Warn','Tempban' ], 
                        availableOptions: ['Warn','Tempban'],
                        words: { 
                            nigger: 'Substring', 
                            fag: 'Substring', 
                            tranny: 'Substring', 
                            trannies: 'Substring', 
                            chingchong: 'Substring', 
                            'ching chang': 'Substring' }, 
                        points: 20, 
                        timeval: 3, 
                        timeunit: 'days', 
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0 }
        ]
    let nsfwPfpInfo = {punishments: ['Ban'], points: 0, timeunit: 'minutes',timeval:0,role_whitelists:{}}

    function checkIfIdExists(table) {
        return new Promise((resolve, reject) => {
            client.query(`SELECT * FROM ${table} where guild_id=$1`, [guildid], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })

        })
    }

    await checkIfIdExists('automodgeneral').then(res => {
        if (res.rows.length > 0) {
            general = res.rows[0]
        }
    }  
    ).catch(error => {erred = true; 

    await checkIfIdExists('messagespam').then(res => {
        if (res.rows.length > 0) {
            messageSpamInfo = res.rows[0]
        }
    }  
    ).catch(error => {erred = true})

    await checkIfIdExists('emojispam').then(res => {
        if (res.rows.length > 0) {
            emojiSpamInfo = res.rows[0]
        }
    }  
    ).catch(error => {erred = true})

    await checkIfIdExists('mentionspam').then(res => {
        if (res.rows.length > 0) {
            mentionSpamInfo = res.rows[0]
        }
    }  
    ).catch(error => {erred = true})

    await checkIfIdExists('stickerspam').then(res => {
        if (res.rows.length > 0) {
            stickerSpamInfo = res.rows[0]
        }
    }  
    ).catch(error => {erred = true})

    await checkIfIdExists('attachmentspam').then(res => {
        if (res.rows.length > 0) {
            attachmentSpamInfo = res.rows[0]
        }
    }  
    ).catch(error => {erred = true})

    await checkIfIdExists('linkspam').then(res => {
        if (res.rows.length > 0) {
            linkSpamInfo = res.rows[0]
        }
    }  
    ).catch(error => {erred = true})

    await checkIfIdExists('linebreaks').then(res => {
        if (res.rows.length > 0) {
            lineBreakInfo = res.rows[0]
        }
    }  
    ).catch(error => {erred = true})

    await checkIfIdExists('toomanycaps').then(res => {
        if (res.rows.length > 0) {
            capInfo = res.rows[0]
        }
    }  
    ).catch(error => {erred = true})

    await checkIfIdExists('duplicatemessages').then(res => {
        if (res.rows.length > 0) {
            duplicateMsgInfo = res.rows[0]
        }
    }  
    ).catch(error => {erred = true})

    await checkIfIdExists('duplicatecharacters').then(res => {
        if (res.rows.length > 0) {
            duplicateCharInfo = res.rows[0]
        }
    }  
    ).catch(error => {erred = true})

    await checkIfIdExists('invites').then(res => {
        if (res.rows.length > 0) {
            inviteInfo = res.rows[0]
        }
    }).catch(error => {erred = true})

    await checkIfIdExists('nsfwcontent').then(res => {
        if (res.rows.length > 0) {
            nsfwInfo = res.rows[0]
        }
    }).catch(error => {erred = true})

    await checkIfIdExists('hatespeech').then(res => {
        if (res.rows.length > 0) {
            hateSpeechInfo = res.rows[0]
        }
    }).catch(error => {erred = true})

    await checkIfIdExists('selfbot').then(res => {
        if (res.rows.length > 0) {
            selfbotInfo = res.rows[0]
        }
    }).catch(error => {erred = true})

    await checkIfIdExists('badwords').then(res => {
        if (res.rows.length > 0) {
            badWordInfo = res.rows[0].categories
        }
    }).catch(error => {erred = true})

    await checkIfIdExists('badlinks').then(res => {
        if (res.rows.length > 0) {
            badLinkInfo = res.rows[0].categories
        }
    }).catch(error => {erred = true})

    await checkIfIdExists('badnicks').then(res => {
        if (res.rows.length > 0) {
            badNickInfo = res.rows[0].categories
        }
    }).catch(error => {erred = true})

    await checkIfIdExists('badnames').then(res => {
        if (res.rows.length > 0) {
            badNameInfo = res.rows[0].categories
        }
    }).catch(error => {erred = true})

    await checkIfIdExists('badstatuses').then(res => {
        if (res.rows.length > 0) {
            badStatusInfo = res.rows[0].categories
        }
    }).catch(error => {erred = true})

    await checkIfIdExists('nsfwpfp').then(res => {
        if (res.rows.length > 0) {
            nsfwPfpInfo = res.rows[0]
        }
    }).catch(error => {erred = true})
    
    client.end()
    return {
        props: {
            channels: channels,
            roles: roles,
            inguild: inguild,
            generalInfo: general,
            messageSpamInfo: messageSpamInfo,
            emojiSpamInfo: emojiSpamInfo, 
            mentionSpamInfo: mentionSpamInfo, 
            stickerSpamInfo: stickerSpamInfo, 
            attachmentSpamInfo: attachmentSpamInfo, 
            linkSpamInfo: linkSpamInfo,
            lineBreakInfo: lineBreakInfo,
            capInfo: capInfo,
            duplicateMsgInfo: duplicateMsgInfo,
            duplicateCharInfo: duplicateCharInfo,
            inviteInfo: inviteInfo,
            nsfwInfo: nsfwInfo,
            hateSpeechInfo: hateSpeechInfo,
            selfbotInfo: selfbotInfo,
            badWordInfo: badWordInfo,
            badLinkInfo: badLinkInfo,
            badNickInfo: badNickInfo,
            badNameInfo: badNameInfo,
            badStatusInfo: badStatusInfo,
            nsfwPfpInfo: nsfwPfpInfo,
            erred: erred
        }
    }
}

export default Automod