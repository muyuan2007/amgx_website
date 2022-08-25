import '../styles/globals.css'
import Top from '../components/Top'
import { useEffect, componentDidMount, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Grid } from '@material-ui/core'
import { SessionProvider, getSession,signIn }from "next-auth/react"
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

    const [session, setSession] = useState({})
    let loggedIn = false
    const getthesession = async () => {
        const getsession = await getSession();
        if (getsession !== null) {
            loggedIn = true
        } else {
            return getsession
        }
    }
    
    

    useEffect(async () => {
        await fetch('https://www.amgx-bot.com/api/auth/session').then(response => response.json()).then(data => setSession(data)).catch(error => console.log(error))

    },[])
    const id = useRouter().query.guildid
    pageProps.session = session

    if (Object.keys(session).length == 4) {
        if (id != undefined) {
            return (<><noscript>you need to enable javascript to run this app</noscript>
            <Head>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <SessionProvider session={pageProps.session}>
                <Top loggedIn={true} partOfGuild={true} pfp={session.user.image} name={session.user.name} signin={() => signIn('discord','https://www.amgx-bot.com/api/auth/callback/discord')}/>
                
              <Component {...pageProps} /></SessionProvider></>
              )
        } else {
            return (<><noscript>you need to enable javascript to run this app</noscript><SessionProvider session={pageProps.session}>
                 <Head>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Top loggedIn={true} partOfGuild={false} pfp={session.user.image} name={session.user.name} signin={() => signIn('discord','https://www.amgx-bot.com/api/auth/callback/discord')}/>
              <Component {...pageProps} /></SessionProvider></>
              )
        }
        
    }
    else {

        return (<SessionProvider session={pageProps.session}>
            <Head>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Top loggedIn={false} signin={() => signIn('discord','https://www.amgx-bot.com/api/auth/callback/discord')}/>
          <Component {...pageProps} /></SessionProvider>
          )
    }
  
}

export default MyApp
