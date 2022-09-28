import AutoKickBan from '../../../components/AutoKickBan'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { ListItem, ListItemIcon, ListItemText, Grid, Container, Divider, List, Box, Drawer, Toolbar } from '@material-ui/core'
import Link from 'next/link'
import { icons } from '../../../components/Automod'
import { DatabaseFails } from '../../../components/Fails'
import { Fragment } from 'react'
import Head from 'next/head'

const drawerWidth = 210
const links = {"General Settings": 'botsettings', "Automod": 'automod', "Logging":'modlogs', "Autopunish": 'autopunish', "Auto Kick/Ban":'autokickban', "Weblogs": 'weblogs'}

function AutoKicker(props) {
    const router = useRouter()
    const guildid = router.query.guildid
    const inguild = props.inguild
    const getthesession = async () => {
        const getsession = await getSession();
        if (getsession == null) {
            signIn('discord','https://www.amgx-bot.com/api/auth/callback/discord')
        }
    }
    useEffect(async ()=>{
        getthesession()
        
        if (!localStorage.getItem("guilds").split(',').includes(guildid)) {
            router.push('https://www.amgx-bot.com')
        }
        else if (!inguild && !props.erred) {
            router.push(`https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=8&scope=bot`)
        }
    },[]);
    const colors = {'General Settings': 'white','Automod': 'white','Logging': 'white','Autopunish': 'white','Auto Kick/Ban': 'lightgray','Weblogs': 'white'}
    if (!props.erred) {
    return <Fragment>
        <Head>
            <title>Auto kick/ban settings</title>
            <meta name='description' content='Auto kick/ban settings'></meta>
        </Head>
    <Box className={'uuu'}style={{ display: 'flex', position: 'relative', top:60 }}>
    
    <Drawer
    
        id="nav" style={{zIndex:2,backgroundColor: 'lightgray', height: 'calc(100vh - 60px)',position: 'absolute', width: drawerWidth}}
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
    <AutoKickBan server={guildid} kickRules={props.kickRules} banRules={props.banRules} usrn={'Press enter to add a username'} stsn={'Press enter to add a status'}/>
    </Box></Box>
    </Fragment>
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
    let erred = false
    let botobj = {}
    const { Pool, Client } = require('pg')
    const client = new Client({
        user:process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password:process.env.DB_PASS,
        port:process.env.DB_PORT
    })
    client.connect()

    await fetch(`https://discord.com/api/guilds/${guildid}/channels`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            }
        }).then(response => response.json()).then(data => {botobj = data})
    
    let inguild = botobj instanceof Array
    const badProfiles = { 'hitler': 'Substring', 'nazi': 'Substring', 'adolf': 'Substring', 'holocaust': 'Substring', 'auschwitz': 'Substring', 'rapist': 'Substring', 'porn': 'Substring', 'molest': 'Substring', 'traffick': 'Substring', 'rape': 'NoSubstring', 'raping': 'NoSubstring', 'pedo': 'Substring', 'paedo': 'Substring', 'sex': 'NoSubstring'}
    let kickRules = [{"type": "accountAge", "timeVal": 7, "timeUnit": "days", "usernames": {}, "statuses": {}},{"type": "promoName", "timeVal": 24, "timeUnit": "hours", "usernames": {}, "statuses": {}}]
    let banRules = [{"type": "nsfwpfp", "timeVal": 24, "timeUnit": "hours", "usernames": {}, "statuses": {}},{"type": "username", "timeVal": 24, "timeUnit": "hours", "usernames": badProfiles, "statuses": {}},{"type": "status", "timeVal": 24, "timeUnit": "hours", "usernames": {}, "statuses": badProfiles}]
    
    function checkIfIdExists() {
        return new Promise((resolve, reject) => {
            client.query(`SELECT * FROM autokickban where guild_id=$1`, [guildid], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })

        })
    }

    await checkIfIdExists().then(res => {
        if (res.rows.length > 0) {
            const { kickrules, banrules } = res.rows[0]
            if (kickrules !== null) {
                kickRules = kickrules
            }
            if (banrules !== null) {
                banRules = banrules
            }
        }
    }).catch(error => {erred = true})

    client.end()

    return {
        props: {
            inguild: inguild,
            kickRules: kickRules,
            banRules: banRules,
            erred: erred
        }
    }

}

export default AutoKicker