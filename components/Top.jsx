import React, { Fragment } from "react";
import ReactDOM from 'react-dom'
import { Divider, TextField,AppBar,Switch, Drawer,Menu,MenuItem,Button,Typography,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home'
import QuestionMarkIcon from '@material-ui/icons/QuestionAnswer';
import BuildIcon from '@material-ui/icons/Build';
import PanToolIcon from '@material-ui/icons/PanTool';
import classes from './Bot.module.css'
import { signIn, signOut } from 'next-auth/react'
import { Avatar } from "@material-ui/core";
import Link from 'next/link'
import Image from 'next/image'

const top = 1750/52

function Top(props) {
    const appBar = React.useRef();
    const loggedIn = props.loggedIn;
    const avatarSection = React.useRef();
    let topright;
    let menu = <></>
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
  
    if (loggedIn) {
        topright = <><Avatar  src={props.pfp} style={{position: 'absolute', top: 'calc(50% - 15px)', left: -50, width: 30, height: 30}}/><Typography aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} style={{marginLeft: 5, textTransform: "initial", fontSize: 15, color: "white", position: 'relative', left: -10}}>{props.name}</Typography><Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href="/servers"><MenuItem onClick={handleClose}>My servers</MenuItem></Link>
        <MenuItem onClick={() => {signOut()}}>Logout</MenuItem>
      </Menu></>
    } else {
        topright = <><Button style={{background: "#ff867d", color: "white"}}><Typography style={{marginLeft: 2.5, textTransform: "initial", fontSize: 16, color: "white"}} onClick={props.signin}>Login</Typography></Button></>
    }

    

    const openAndClose = (event) => {
      const nav = document.getElementById('nav')
      const settings = document.getElementById('settings')
      const screenWidth = appBar.current.clientWidth
      if (nav != null && settings != null) {
        if (screenWidth >= 500) {
          if (nav.style.display != 'none') {
            nav.style.display = 'none'
            settings.style.width = '100%'
            settings.style.left = '0px'
          } else {
            nav.style.display = 'block'
            settings.style.width = 'calc(100% - 210px)'
            settings.style.left = '210px'
          }
        } else {
          if (nav.style.display != 'none') {
            nav.style.display = 'none'
            settings.style.width = '100%'
            
          } else {
            nav.style.display = 'block'
            
          }
        }
        
      }

    }

    const [style, setStyle] = React.useState({})
    React.useEffect(() => {
      if (loggedIn) {
        setStyle({
          width: `calc(100% - ${avatarSection.current.clientWidth + 26}px)`,
        })
      } else {
        setStyle({
          width: `calc(100% - 94px)`,
        })
      }
      
    }, [avatarSection.current])
    
    if (props.partOfGuild) {
      menu = <Button onClick={openAndClose} id="showhidemenu" style={{width: 30, background: "transparent", color: "white"}}><MenuIcon style={{fontSize: 30, color: "white"}}/></Button>
    }
    return (
        <Fragment  >
        <CssBaseline />
        <AppBar position="fixed"id="bar"ref={appBar}  style={{width: '100vw', zIndex: 3}}>
            <Toolbar>
                
<Link href="/"><img className={classes.homeImg} src="/amgxlogo.png" width="150" /></Link>

{menu}
<Grid id="buttons" style={{position: 'relative', width: style.width}} container>
<button className={classes.normallyInvis} style={{background: "transparent", color: "white", border: 'none'}}><HomeIcon style={{color: "white", width: 21, lineHeight: 52}}/></button>
<Link href="https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=8&scope=bot">
<button style={{background: "transparent", color: "white", border: 'none'}}><AddIcon style={{color: "white", width: 21, lineHeight: 52}}/><span style={{marginLeft: 5, textTransform: "initial", fontSize: 15, color: "white", verticalAlign: `${top}%`}} className={classes.menuButtonText}>Invite</span></button>
</Link>
<Link href="https://discord.gg/bbqBzpmt6A" >
  <button style={{background: "transparent", color: "white", border: 'none'}}><GroupIcon style={{color: "white", width: 21}}/><span style={{marginLeft: 5, textTransform: "initial", fontSize: 15, color: "white", verticalAlign: `${top}%`}} className={classes.menuButtonText}>Discord</span></button>
</Link>
<Link href="https://discord.gg/NQcfMgRa7W">
<button style={{background: "transparent", color: "white", border: 'none'}}><QuestionMarkIcon style={{color: "white", width: 21}}/><span style={{marginLeft: 5, textTransform: "initial", fontSize: 15, color: "white", verticalAlign: `${top}%`}} className={classes.menuButtonText}>Support</span></button>
</Link>
<Link href="/commands">
<button  style={{background: "transparent", color: "white", border: 'none'}}><BuildIcon style={{color: "white", width: 21}}/><span style={{marginLeft: 5, textTransform: "initial", fontSize: 15, color: "white", verticalAlign: `${top}%`}} className={classes.menuButtonText}>Commands</span></button>
</Link>
</Grid>
<div ref={avatarSection} style={{position: 'absolute', right: 10, display: 'inline-block'}} item>{topright}</div>
                </Toolbar>
        </AppBar>
        </Fragment>
    )
}

export default Top