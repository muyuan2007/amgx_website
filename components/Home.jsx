import React, { useEffect, useState } from "react";
import { Typography,IconButton,Box,Divider, MenuItem,Tabs, Tab,TextField,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import classes from './Home.module.css'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

const features = {
    'Powerful automod': {
        reasons: ['Moderates spamming of messages, mentions, attachments, emojis, stickers, and links', 'Moderates repeated messages and repeated characters, as well as overuse of caps and line breaks', 'Moderates invite links, hate speech, NSFW content, and selfbotting', 'Moderates blacklisted links, words, nicknames, usernames, and custom statuses', 'Moderates NSFW avatars', 'Category-based moderation of blacklisted links, words, nicknames, usernames, and custom statuses to allow different punishments for different levels of one type of blacklist', 'Uses AI to detect variations of spellings in words, as well as to detect hate speech and NSFW content', 'Comes with default settings to reduce the workload when setting punishments', "Uses 'warn points' to let the bot give punishments that are proportional to the seriousness of rule being broken"],
        example: '/automod.png'
    },
    'Thorough logging': {
        reasons: ['Logs every type of event in a server', 'Message events: deleted, edited, and purged messages','Member events: username/avatar/custom status/nickname/role changes, members joining/leaving','Moderations events: warns, removing infraction points', 'Server changes: updates to channels, roles, adding and removing bots, changes to the server itself', 'VC events: Members joining and leaving VC, members switching VC, member being moved between VCs', 'Does its best to also log the moderator that took the action, unlike other bots'],
        example: '/modlog.png'
    },
    'Autopunish': {
        reasons: ['Automatically take action on users who reach a certain amount of warn points','This lets the bot take action on repeat offenders'],
        example: '/autopunish.png'
    },
    'Auto kick/ban': {
        reasons: ['Set rules to automatically kick/ban users upon joining based on certain usernames and custom statuses, invite links in name, account age, and inappropriate avatars',"This can let the bot filter certain users who break the server's rules"],
        example: '/autokb.png'

    }
}

const TopPart = (props) => {

    const [wid, setWid] = useState(552.16)
    const [loginBW, setLoginBW] = useState(270)

    useEffect(() => {
        const w = window.innerWidth

        if (w < 553) {
            setWid(w - 30)
        }
       
        if (w < 270) {
            setLoginBW(w - 30)
        }
        
        
        window.addEventListener('resize', function () {
            const width = window.innerWidth

            if (width < 553) {
                setWid(width - 30)
            } else {
                setWid(553)
            }
            if (width < 270) {
                setLoginBW(width - 30)
            } else {
                setLoginBW(270)
            }
        })
    })
    let section;
    if (props.loggedIn) {
        section = <Grid container style={{width:"100%"}} spacing={2} >
            <Grid item xs={12} sm={6}>
            <Link href="https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=8&scope=bot">
            <Button style={{backgroundColor: 'lightgray', height: 50, border: '3px solid black', width: "100%"}}><AddIcon /><span style={{textTransform: "initial",fontSize: 18, position: "relative",left: 10}}>Invite bot</span></Button>
            </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Link href="/servers">
            <Button style={{backgroundColor: 'lightgray', height: 50, border: '3px solid black', width: "100%"}}><SettingsIcon /><span style={{textTransform: "initial",fontSize: 18, position: "relative",left: 10}}>Manage</span></Button>
            </Link>
            </Grid>
            </Grid>
    } else {
        section = <div>
        <Button style={{backgroundColor: 'lightgray', width: loginBW, height: 50, position: 'relative', left: `calc(50% - ${loginBW/2}px)`, border: '3px solid black'}}><ExitToAppIcon /><span style={{textTransform: "initial",fontSize: 18, position: "relative",left: 10}} onClick={props.signin}>Log in with Discord</span></Button>
        </div>
    }


    return (
        <div style={{position: 'relative', left: `calc(50% - ${wid/2}px)`, width: wid}}>
        <img id="logo" src="/amgxlogo.png" style={{width: "100%"}} />
        <br />
        {section}
        </div>
        )
}

const Features = () => {

    
    useEffect(() => {
        const w = window.innerWidth

        const imgs = Array.from(document.getElementsByClassName("featureImg"))
        if (w < 585) {
            
            imgs.forEach(img => {img.style.width = `${w-240}px`; img.style.top = `calc(50% - ${img.offsetHeight/2}px)`; img.style.height = 'auto'})
        } else {
            imgs.forEach(img => {img.style.height = `180px`; img.style.top = `calc(50% - 90px)`; img.style.width = 'auto'})
        }
       
        
        
        
        window.addEventListener('resize', function () {
            const width = window.innerWidth

            if (width < 585) {
            
                imgs.forEach(img => {img.style.width = `${width-240}px`; img.style.top = `calc(50% - ${img.offsetHeight/2}px)`; img.style.height = 'auto'})
            } else {
                imgs.forEach(img => {img.style.height = `180px`; img.style.top = `calc(50% - 90px)`; img.style.width = 'auto'})
            }
        })
    })
    return (
        <div style={{backgroundColor: '#b6d7f7ff', height: 'calc(100%)'}}>
        <div style={{position: 'relative', width: 'calc(100% - 100px)', left: 50}}>
            <Typography style={{fontSize: 35, textAlign: "center", position: 'relative', top:30}}>Features</Typography>
            <div style={{height: 25}}></div>
            <div>
                {Object.keys(features).map((feature) => (
                    <>
                    <Grid key={feature} container style={{position: 'relative'}}>
                        <Grid item sm={12} md={6}>
                        <Typography style={{fontSize: 22, fontWeight: 600}}>{feature}</Typography>
                        <ul>
                            {features[feature].reasons.map((reason) => (
                                <li key={reason}>{reason}</li>
                        ))}
                        </ul>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <img className={'featureImg'} src={features[feature].example} height={180} style={{position: 'relative', left: 60,top: 'calc(50% - 90px)'}} />
                        </Grid>
                    </Grid>
                    <div style={{height: 25}}></div>
                    <Divider style={{opacity: 0.3}}/>
                    <div style={{height: 25}}></div>
                    </>
            ))}
        </div>
        </div>
        </div>
    )
}
export { TopPart }
export default Features