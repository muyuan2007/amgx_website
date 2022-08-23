import React, { useEffect, useState } from "react";
import { Typography,IconButton,Box,Divider, MenuItem,Tabs, Tab,TextField,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import Link from "next/link"
import Image from 'next/image'

const fails = {guild: "Sorry, we ran into technical problems, and couldn't fetch your servers. Please try again later.", data: "Sorry, we ran into technical problems, and couldn't fetch your server settings. Please try again later.", fof: "Error 404", e: "what are you doing here? there isn't much to do on this page. if you were looking for this page, congrats! otherwise, click the blue button under this piece of text to go manage some servers!"}

const GuildFails = () => {
    return (<div style={{height: '100%', position: 'relative', left: 20, width: 'calc(100% - 40px)',top: 110}}>
            <Typography style={{fontSize: 25, fontWeight: 700, textAlign: "center"}}>{fails.guilds}</Typography>
            <Grid container justifyContent="center" style={{position: 'relative', top: 20}}>
            <Grid item xs={12} sm={6} md={4}>
            <img src="/fail.png" style={{width: '100%'}}/>
            </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{position: 'relative', top: 20}}>
            <Grid item xs={12} sm={4} md={3} lg={2} justifyContent={'center'}><Link href={'/'}><Button style={{width: '100%', backgroundColor: 'cornflowerblue'}}><Typography style={{textTransform:"initial", color: 'white'}}>Go to home page</Typography></Button></Link></Grid>
            </Grid>
        </div>)
}

const DatabaseFails = () => {
    return (<div style={{height: '100%', position: 'relative', left: 20, width: 'calc(100% - 40px)',top: 110}}>
            <Typography style={{fontSize: 25, fontWeight: 700, textAlign: "center"}}>{fails.data}</Typography>
            <Grid container justifyContent="center" style={{position: 'relative', top: 20}}>
            <Grid item xs={12} sm={6} md={4}>
            <img src="/fail.png" style={{width: '100%'}}/>
            </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{position: 'relative', top: 20}}>
            <Grid item xs={12} sm={4} md={3} lg={2} justifyContent={'center'}><Link href={'/'}><Button style={{width: '100%', backgroundColor: 'cornflowerblue'}}><Typography style={{textTransform:"initial", color: 'white'}}>Go to home page</Typography></Button></Link></Grid>
            </Grid>
        </div>)
}

const FourOhFour = () => {
    return (<div style={{height: '100%', position: 'relative', left: 20, width: 'calc(100% - 40px)',top: 110}}>
            <Typography style={{fontSize: 25, fontWeight: 700, textAlign: "center"}}>{fails.fof}</Typography>
            <Grid container justifyContent="center" style={{position: 'relative', top: 20}}>
            <Grid item xs={12} sm={6} md={4}>
            <Typography style={{fontSize: 15, fontWeight: 700, textAlign: "center"}}>{fails.e}</Typography>
            </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{position: 'relative', top: 20}}>
            <Grid item xs={12} sm={6} md={4}>
            <img src="/404.png" style={{width: '100%'}}/>
            </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{position: 'relative', top: 20}}>
            <Grid item xs={12} sm={4} md={3} lg={2} justifyContent={'center'}><Link href={'/servers'}><Button style={{width: '100%', backgroundColor: 'cornflowerblue'}}><Typography style={{textTransform:"initial", color: 'white'}}>Go to server selection</Typography></Button></Link></Grid>
            </Grid>
        </div>)
}

export {
    GuildFails,
    DatabaseFails,
    FourOhFour

}