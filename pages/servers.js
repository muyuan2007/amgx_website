import { useRouter, Router } from 'next/router'
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useEffect, componentDidMount, useState } from 'react'
import Guild from '../components/Guild'
import { GuildFails } from '../components/Fails'
import { Fragment } from 'react'
import Head from 'next/head'


function Guilds(props) {
    const [guilds, setGuilds] = useState([])
    const [e, setE] = useState(false)
    let loggedIn = false
    const getthesession = async () => {
        const getsession = await getSession();
        if (getsession == null) {
            signIn('discord','https://www.amgx-bot.com/api/auth/callback/discord')
        } else {
            loggedIn = true
        }
    }

    useEffect(async () => {
        getthesession()
        let token = ''
        var fetchUser = fetch('https://www.amgx-bot.com/api/auth/session').then(response => response.json()).then((data) => data.accessToken).then((data) => { return data })
        await fetchUser.then(data => { token = data })
        
        await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status !== 200) { setE(true); return }
            response.json().then(function (data) { let guildInfo = Array.from(data).filter(guild => {return String(guild['permissions']&32)=='32'});setGuilds(guildInfo);
            if (guilds.length > 0) {
                const ids = guilds.map(guild => guild.id)
                localStorage.setItem('guilds', ids)
    
            }
            
        })
        })
       
    }, [])
    if (!e) {
        return <Fragment>
        <Head>
            <title>My servers</title>
            <meta name="description" content='AMGX is a powerful moderation discord bot that features automod, logging, auto kick/ban, and autopunish'></meta>
        </Head><div id={'blah'} style={{position: 'relative', top: 0}}>
            <Guild guilds={guilds} />
        </div>
        </Fragment>
    } else {
        return  <Fragment>
        <Head>
            <title>Failed to fetch servers</title>
            <meta name="description" content='AMGX is a powerful moderation discord bot that features automod, logging, auto kick/ban, and autopunish'></meta>
        </Head><div>
            <GuildFails />
        </div>
        </Fragment>
    }



    }


export default Guilds