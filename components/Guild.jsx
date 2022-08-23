import React, { useEffect, useState } from "react";
import { Typography,IconButton,Box,Divider, MenuItem,Tabs, Tab,TextField,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import Image from 'next/image'

function GetIcon(guild) {
    if (guild.icon == null) {
        return "/default.png"
    } else {
        return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.jpg`
    }
}

const Guild = (props) => {
    const icons = props.guilds.map(GetIcon)
    return (
        <div style={{height: '100%', position: 'relative', left: 20, width: 'calc(100% - 40px)',top: 110}}>
            <Typography style={{fontSize: 25, fontWeight: 700, textAlign: "center"}}>Please select a server</Typography>
            <Container maxWidth="xl" style={{position: 'relative', top: 30}}>
            <Grid container spacing={2} style={{paddingTop: 20, paddingBottom: 20, backgroundColor: "#ffffff", borderRadius: 5}}>
              {props.guilds.map((guild) => {
                  return <Grid item xs={12} sm={6} md={3}lg={2} key={guild.name} style={{alignContent: "center"}}>
                      <a key={guild.name} href={`/dashboard/${guild.id}/botsettings`}>
                      <img src={icons[props.guilds.indexOf(guild)]} height={150} style={{borderRadius: 75, border: '3px solid gray', position: "relative", left: "calc(50% - 75px)"}} />
                      <Typography style={{fontSize: 15, fontWeight: 700, textAlign: "center"}}>{guild.name}</Typography>
                      </a>
                  </Grid>
                  
              })}
          </Grid>
          </Container>
        </div>
    )
}

export default Guild