import Top from '../components/Top'
import { getSession, useSession, signIn, signOut } from 'next-auth/react'
import Features, {TopPart} from '../components/Home'
import { Fragment } from 'react'
import Head from 'next/head'


function HomeP(props) {
    const { data: session } = useSession()
    if (session instanceof Object && 'accessToken' in session) {
            return  <Fragment>
                <Head>
                    <title>AMGX Dashboard</title>
                    <meta name="description" content='AMGX is a powerful moderation discord bot that features automod, logging, auto kick/ban, and autopunish'></meta>
                </Head>
                <div style={{height: 500, backgroundImage: 'url(/background.png)'}}>
            <div style={{position: 'relative', top: 110}}>
         <TopPart loggedIn={true} signin={() => signIn('discord','https://www.amgx-bot.com/api/auth/callback/discord')}/>
         <div style={{height: 50}}></div>
         <Features />
         </div>
         </div>
         </Fragment>
    } else {
        return <Fragment >
        <Head>
            <title>AMGX Dashboard</title>
            <meta name="description" content='AMGX is a powerful moderation discord bot that features automod, logging, auto kick/ban, and autopunish'></meta>
            <link rel="icon" href="/boticon.ico" />
        </Head><div style={{height: 500, backgroundImage: 'url(/background.png)'}}>
            <div style={{position: 'relative', top: 110}}>
            <TopPart loggedIn={false} signin={() => signIn('discord','https://www.amgx-bot.com/api/auth/callback/discord')}/>
            <div style={{height: 50}}></div>
            <Features/>
            </div>
            </div>
            </Fragment>
    }
}


export default HomeP