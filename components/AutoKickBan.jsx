import React, { useState, useRef, useEffect } from "react";
import { Typography,Box,IconButton,Divider, Tabs, Tab,TextField,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import GavelIcon from '@material-ui/icons/Gavel';
import ListIcon from '@material-ui/icons/List';
import SecurityIcon from '@material-ui/icons/Security';
import SettingsIcon from '@material-ui/icons/Settings';
import PolicyIcon from '@material-ui/icons/Policy';
import AddIcon from '@material-ui/icons/Add';

import CloseIcon from '@material-ui/icons/Close'
import classes from './AutoKickBan.module.css'
import { Autocomplete } from '@material-ui/lab'
const icons = {"General Settings": <SettingsIcon />, "Automod": <SecurityIcon />, "Logging":<ListIcon />, "Autopunish": <GavelIcon />, "Auto Kick/Ban":<PolicyIcon />}
const noBan = 'There are no auto ban rules, click "Add rule" to add one!'
const noKick = 'There are no auto kick rules, click "Add rule" to add one!'

const AutoKickBan = (props) => {
    
    const [kickRules, setKickRules] = useState(props.kickRules)
    const [banRules, setBanRules] = useState(props.banRules)
    const kickGrid = useRef()
    const banGrid = useRef()
    useEffect(() => {

        kickRules.forEach(rule => {
            const value = rule.type
            const index = kickRules.indexOf(rule)

            if (value == 'accountAge') {
                Array.from(kickGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'block'
                Array.from(kickGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
                Array.from(kickGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
            }
            else if (value == 'username') {
                Array.from(kickGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
                Array.from(kickGrid.current.getElementsByClassName('username'))[index].style.display = 'block'
                Array.from(kickGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
            }
            else if (value == 'status') {
                Array.from(kickGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
                Array.from(kickGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
                Array.from(kickGrid.current.getElementsByClassName('status'))[index].style.display = 'block'
            } else {
                Array.from(kickGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
                Array.from(kickGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
                Array.from(kickGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
            }
        })
        banRules.forEach(rule => {
            const value = rule.type
            const index = banRules.indexOf(rule)
            if (value == 'accountAge') {
                Array.from(banGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'block'
                Array.from(banGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
                Array.from(banGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
            }
            else if (value == 'username') {
                Array.from(banGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
                Array.from(banGrid.current.getElementsByClassName('username'))[index].style.display = 'block'
                Array.from(banGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
            }
            else if (value == 'status') {
                Array.from(banGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
                Array.from(banGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
                Array.from(banGrid.current.getElementsByClassName('status'))[index].style.display = 'block'
            } else {
                Array.from(banGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
                Array.from(banGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
                Array.from(banGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
            }
        })
        
    },[])

    const createKickRule = () => {
        let kick = kickRules
        const newCat = {type: 'accountAge', timeVal: 24, timeUnit: 'hours', usernames: {}, statuses: {}}
        kick.push(newCat)
        setKickRules([...kick])
    }

    const typeKickChange = (e) => {
        const index = Array.from(kickGrid.current.getElementsByClassName('typeSelect')).indexOf(e.target)
        const value = e.target.value
        let kickRuleInfo = kickRules
        if (value == 'accountAge') {
            Array.from(kickGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'block'
            Array.from(kickGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
            Array.from(kickGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
        }
        else if (value == 'username') {
            Array.from(kickGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
            Array.from(kickGrid.current.getElementsByClassName('username'))[index].style.display = 'block'
            Array.from(kickGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
        }
        else if (value == 'status') {
            Array.from(kickGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
            Array.from(kickGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
            Array.from(kickGrid.current.getElementsByClassName('status'))[index].style.display = 'block'
        } else {
            Array.from(kickGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
            Array.from(kickGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
            Array.from(kickGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
        }

        kickRuleInfo[index].type = value
        setKickRules([...kickRuleInfo])
        
    }

    const timeKickChange = (e) => {
        const index = Array.from(kickGrid.current.getElementsByClassName('ageThreshold')).indexOf(e.target.parentElement)
        const value = e.target.value
        let kickRuleInfo = kickRules
        kickRuleInfo[index].timeVal = parseInt(value)
        setKickRules([...kickRuleInfo])
        (kickRules)
    }

    const timeUnitKickChange = (e) => {
        const index = Array.from(kickGrid.current.getElementsByClassName('ageThreshold')).indexOf(e.target.parentElement)
        const value = e.target.value
        let kickRuleInfo = kickRules
        kickRuleInfo[index].timeUnit = value
        setKickRules([...kickRuleInfo])
        (kickRules)
    }

    const usernameKickChange = (e, values, reason, detail) => {
        const index = getKickIndex(e, 'inputUsername').index
        const checked = Array.from(kickGrid.current.getElementsByClassName('usernameSub'))[index].checked
        let kickRuleInfo = kickRules
        let usernames = kickRuleInfo[index].usernames
        var toExact = ""
        if ((reason === 'remove-option')) {
            delete usernames[String(detail.option)]
        }
        else if (reason === 'clear') {
            usernames = {}
        }
        else {
        if (checked){
            toExact = "Substring"
        } else {
            toExact = "NoSubstring"

            
        }
        usernames[String(Array.from(values)[Array.from(values).length - 1])] = toExact
        }
        kickRuleInfo[index].usernames = usernames
        setKickRules([...kickRuleInfo])
    }

    const statusKickChange = (e, values, reason, detail) => {
        const index = getKickIndex(e, 'inputStatus').index
        const checked = Array.from(kickGrid.current.getElementsByClassName('statusSub'))[index].checked
        let kickRuleInfo = kickRules
        let statuses = kickRuleInfo[index].statuses
        var toExact = ""
        if ((reason === 'remove-option')) {
            delete statuses[String(detail.option)]
        }
        else if (reason === 'clear') {
            statuses = {}
        }
        else {
        if (checked){
            toExact = "Substring"
        } else {
            toExact = "NoSubstring"

            
        }
        statuses[String(Array.from(values)[Array.from(values).length - 1])] = toExact
        }
        kickRuleInfo[index].statuses = statuses
        setKickRules([...kickRuleInfo])
    }

    const createBanRule = () => {
        let ban = banRules
        const newCat = {type: 'accountAge', timeVal: 24, timeUnit: 'hours', usernames: {}, statuses: {}}
        ban.push(newCat)
        setBanRules([...ban])
    }

    const typeBanChange = (e) => {
        const index = Array.from(banGrid.current.getElementsByClassName('typeSelect')).indexOf(e.target)
        const value = e.target.value
        let banRuleInfo = banRules
        if (value == 'accountAge') {
            Array.from(banGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'block'
            Array.from(banGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
            Array.from(banGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
        }
        else if (value == 'username') {
            Array.from(banGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
            Array.from(banGrid.current.getElementsByClassName('username'))[index].style.display = 'block'
            Array.from(banGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
        }
        else if (value == 'status') {
            Array.from(banGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
            Array.from(banGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
            Array.from(banGrid.current.getElementsByClassName('status'))[index].style.display = 'block'
        } else {
            Array.from(banGrid.current.getElementsByClassName('ageThreshold'))[index].style.display = 'none'
            Array.from(banGrid.current.getElementsByClassName('username'))[index].style.display = 'none'
            Array.from(banGrid.current.getElementsByClassName('status'))[index].style.display = 'none'
        }

        banRuleInfo[index].type = value
        setBanRules([...banRuleInfo])
        
    }

    const timeBanChange = (e) => {
        const index = Array.from(banGrid.current.getElementsByClassName('ageThreshold')).indexOf(e.target.parentElement)
        const value = e.target.value
        let banRuleInfo = banRules
        banRuleInfo[index].timeVal = parseInt(value)
        setBanRules([...banRuleInfo])
        (banRules)
    }

    const timeUnitBanChange = (e) => {
        const index = Array.from(kickGrid.current.getElementsByClassName('ageThreshold')).indexOf(e.target.parentElement)
        const value = e.target.value
        let kickRuleInfo = kickRules
        kickRuleInfo[index].timeUnit = value
        setKickRules([...kickRuleInfo])
        (kickRules)
    }

    const usernameBanChange = (e, values, reason, detail) => {
        const index = getBanIndex(e, 'inputUsername').index
        const checked = Array.from(banGrid.current.getElementsByClassName('usernameSub'))[index].checked
        let banRuleInfo = banRules
        let usernames = banRuleInfo[index].usernames
        var toExact = ""
        if ((reason === 'remove-option')) {
            delete usernames[String(detail.option)]
        }
        else if (reason === 'clear') {
            usernames = {}
        }
        else {
        if (checked){
            toExact = "Substring"
        } else {
            toExact = "NoSubstring"

            
        }
        usernames[String(Array.from(values)[Array.from(values).length - 1])] = toExact
        }
        banRuleInfo[index].usernames = usernames
        setBanRules([...banRuleInfo])
    }

    const statusBanChange = (e, values, reason, detail) => {
        const index = getBanIndex(e, 'inputStatus').index
        const checked = Array.from(banGrid.current.getElementsByClassName('statusSub'))[index].checked
        let banRuleInfo = banRules
        let statuses = banRuleInfo[index].statuses
        var toExact = ""
        if ((reason === 'remove-option')) {
            delete statuses[String(detail.option)]
        }
        else if (reason === 'clear') {
            statuses = {}
        }
        else {
        if (checked){
            toExact = "Substring"
        } else {
            toExact = "NoSubstring"

            
        }
        statuses[String(Array.from(values)[Array.from(values).length - 1])] = toExact
        }
        banRuleInfo[index].statuses = statuses
        setBanRules([...banRuleInfo])
    }

    const getKickIndex = (e, className) => {
        (e.target)
        if (e.target.tagName=='svg' && e.target.className.animVal=='MuiSvgIcon-root MuiSvgIcon-fontSizeSmall') {
          const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
          const index = Array.from(kickGrid.current.getElementsByClassName(className)).indexOf(target)
          return {index:index, whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement}
        }
        if (e.target.tagName=='svg' && e.target.className.animVal=='MuiSvgIcon-root MuiChip-deleteIcon') {
          const target = e.target.parentElement.parentElement.parentElement.parentElement
          const index = Array.from(kickGrid.current.getElementsByClassName(className)).indexOf(target)
          return {index:index,whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement}
    
        }
        if (e.target.tagName=='path') {
          if (e.target.outerHTML == '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>') {
            const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            const index = Array.from(kickGrid.current.getElementsByClassName(className)).indexOf(target)
            return {index:index,whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement}
    
          }
          if (e.target.outerHTML == '<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>') {
            const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
            const index = Array.from(kickGrid.current.getElementsByClassName(className)).indexOf(target)
            return {index:index, whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement}
    
          }
    
        }
        if (e.target.tagName=='BUTTON') {
          const target = e.target.parentElement.parentElement.parentElement.parentElement
          const index = Array.from(kickGrid.current.getElementsByClassName(className)).indexOf(target)
          return {index:index,whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement}
    
        }
        if (e.target.tagName=='INPUT'){
        
          const target = e.target.parentElement.parentElement.parentElement
          const index = Array.from(kickGrid.current.getElementsByClassName(className)).indexOf(target)
          return {index:index,whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement}
    
        }
    
    }

    const getBanIndex = (e, className) => {
        if (e.target.tagName=='svg' && e.target.className.animVal=='MuiSvgIcon-root MuiSvgIcon-fontSizeSmall') {
          const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
          const index = Array.from(banGrid.current.getElementsByClassName(className)).indexOf(target)
          return {index:index, whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement}
        }
        if (e.target.tagName=='svg' && e.target.className.animVal=='MuiSvgIcon-root MuiChip-deleteIcon') {
          const target = e.target.parentElement.parentElement.parentElement.parentElement
          const index = Array.from(kickGrid.current.getElementsByClassName(className)).indexOf(target)
          return {index:index,whole:e.banGrid.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement}
    
        }
        if (e.target.tagName=='path') {
          if (e.target.outerHTML == '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>') {
            const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            const index = Array.from(banGrid.current.getElementsByClassName(className)).indexOf(target)
            return {index:index,whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement}
    
          }
          if (e.target.outerHTML == '<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>') {
            const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
            const index = Array.from(banGrid.current.getElementsByClassName(className)).indexOf(target)
            return {index:index, whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement}
    
          }
    
        }
        if (e.target.tagName=='BUTTON') {
          const target = e.target.parentElement.parentElement.parentElement.parentElement
          const index = Array.from(banGrid.current.getElementsByClassName(className)).indexOf(target)
          return {index:index,whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement}
    
        }
        if (e.target.tagName=='INPUT'){
        
          const target = e.target.parentElement.parentElement.parentElement
          const index = Array.from(banGrid.current.getElementsByClassName(className)).indexOf(target)
          return {index:index,whole:e.target.parentElement.parentElement.parentElement.parentElement.parentElement}
    
        }
    
    }

    const saveKickData = () => {
        fetch('/api/send-autokickban', {
            method: 'POST',
            body: JSON.stringify({guild: props.server, rules: kickRules, ruleType: 'kick'}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
    }
    const saveBanData = () => {
        fetch('/api/send-autokickban', {
            method: 'POST',
            body: JSON.stringify({guild: props.server, rules: banRules, ruleType: 'ban'}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    
    const deleteKickRule = (e) => {
        if (e.target.tagName == 'path') {
            const target = e.target.parentElement.parentElement.parentElement
            const deletes = Array.from(kickGrid.current.getElementsByClassName('delete'))
            const index = deletes.indexOf(target)
            const kickRule = kickRules
            kickRule.splice(index, 1)
            setKickRules([...kickRule])
        }
        if (e.target.tagName == 'svg') {
            const target = e.target.parentElement.parentElement            
            const deletes = Array.from(kickGrid.current.getElementsByClassName('delete'))
            const index = deletes.indexOf(target)
            const kickRule = kickRules
            kickRule.splice(index, 1)
            setKickRules([...kickRule])
        }
        if (e.target.tagName == 'SPAN') {
            const target = e.target
            const deletes = Array.from(kickGrid.current.getElementsByClassName('delete'))
            const index = deletes.indexOf(target)
            const kickRule = kickRules
            kickRule.splice(index, 1)
            setKickRules([...kickRule])
        }
    }
    const deleteBanRule = (e) => {
        if (e.target.tagName == 'path') {
            const target = e.target.parentElement.parentElement.parentElement
            const deletes = Array.from(banGrid.current.getElementsByClassName('delete'))
            const index = deletes.indexOf(target)
            const banRule = banRules
            banRules.splice(index, 1)
            setBanRules([...banRule])
        }
        if (e.target.tagName == 'svg') {
            const target = e.target.parentElement.parentElement            
            const deletes = Array.from(banGrid.current.getElementsByClassName('delete'))
            const index = deletes.indexOf(target)
            const banRule = banRules
            banRules.splice(index, 1)
            setBanRules([...banRule])
        }
        if (e.target.tagName == 'SPAN') {
            const target = e.target
            const deletes = Array.from(banGrid.current.getElementsByClassName('delete'))
            const index = deletes.indexOf(target)
            const banRule = banRules
            banRules.splice(index, 1)
            setBanRules([...banRule])
        }
    }

    let krs;
    if (kickRules.length > 0) {
        krs = kickRules.map((rule) => {
            return <>
             <Grid style={{backgroundColor: 'lightgray', position: 'relative', left: 10, paddingTop: 15, paddingBottom: 15, margin: 0}} item xs={12}>
                <span style={{position: 'relative',left: 10, fontSize: 18, width: 'calc(100% - 20px)'}}>Rule type</span>
                <IconButton onClick={deleteKickRule} className={`delete ${kickRules.indexOf(rule)}`} style={{color: 'red', height: 35, width: 35, position: 'relative', left: 10}} component="span"> <CloseIcon /> </IconButton>
                <footer style={{padding: 5}}></footer>
                <select onChange={typeKickChange} defaultValue={rule.type} className={'typeSelect'}style={{position: 'relative',left: 10, height: 32, width: 150, fontSize: 16}}>
                    <option value={'accountAge'}>Account age</option>
                    <option value={'nsfwpfp'}>NSFW avatar</option>
                    <option value={'promoName'}>Invites in profile</option>
                    <option value={'username'}>Match username</option>
                    <option value={'status'}>Match status</option>
                </select>
                <div className={'ageThreshold'} style={{position: 'relative',left: 10, width: 'calc(100% - 20px)'}}>
                <footer style={{padding: 10}}></footer>
                <Typography style={{fontSize: 18}}>Age threshold</Typography>
                <input onInput={timeKickChange} defaultValue={rule.timeVal}type='number'style={{position: 'relative',height: 32, width: 50, fontSize: 16}}/>
                <select onChange={timeUnitKickChange} defaultValue={rule.timeUnit} style={{position: 'relative',left: 5, height: 32, width: 100, fontSize: 16}}>
                    <option value={'seconds'}>Seconds</option>
                    <option value={'minutes'}>Minutes</option>
                    <option value={'hours'}>Hours</option>
                    <option value={'days'}>Days</option>
                </select>
                <footer style={{padding: 10}}></footer>
                </div>
                <div className={'username'} style={{position: 'relative',left: 10, width: 'calc(100% - 20px)', display: 'none'}}>
                <footer style={{padding: 10}}></footer>
                <Typography style={{fontSize: 18}}>Enter usernames</Typography>
                <Autocomplete value={Object.keys(rule.usernames)}onChange={usernameKickChange} className={'inputUsername'} multiple options={[]} freeSolo style={{width: '100%'}} renderInput={(params) => <TextField {...params}/>}/>
                <footer style={{padding: 3}}></footer>
                <input className={'usernameSub'} type='checkbox' style={{width: 18, height: 18, margin: 0}}/><span style={{fontSize: 18, position: 'relative', left: 10, margin: 0, top: -2.5}}>Search for substrings</span>
                <footer style={{padding: 10}}></footer>
                </div>
                <div className={'status'} style={{position: 'relative',left: 10, width: 'calc(100% - 20px)', display: 'none'}}>
                <footer style={{padding: 10}}></footer>
                <Typography style={{fontSize: 18}}>Enter statuses</Typography>
                <Autocomplete onChange={statusKickChange} value={Object.keys(rule.statuses)} className={'inputStatus'} multiple options={[]} freeSolo style={{width: '100%'}} renderInput={(params) => <TextField {...params}/>}/>
                <footer style={{padding: 3}}></footer>
                <input className={'statusSub'} type='checkbox' style={{width: 18, height: 18, margin: 0}}/><span style={{fontSize: 18, position: 'relative', left: 10, margin: 0, top: -2.5}}>Search for substrings</span>
                <footer style={{padding: 10}}></footer>
                </div>
            </Grid>
            <footer style={{padding: 10}}></footer>
            </>
        })
    } else {
        krs = <Typography style={{ paddingRight: 5, fontSize: 16, position: 'relative', left: 10 }}>{noKick}</Typography>
    }

    let brs;
    if (banRules.length > 0) {
        brs = banRules.map((rule) => {
            return <>
             <Grid style={{backgroundColor: 'lightgray', position: 'relative', left: 10, paddingTop: 15, paddingBottom: 15, margin: 0}} item xs={12}>
             <span style={{position: 'relative',left: 10, fontSize: 18, width: 'calc(100% - 20px)'}}>Rule type</span>
                <IconButton onClick={deleteBanRule} className={`delete ${kickRules.indexOf(rule)}`} style={{color: 'red', height: 35, width: 35, position: 'relative', left: 10}} component="span"> <CloseIcon /> </IconButton>
                <footer style={{padding: 5}}></footer>
                <select onChange={typeBanChange} defaultValue={rule.type}className={'typeSelect'}style={{position: 'relative',left: 10, height: 32, width: 150, fontSize: 16}}>
                    <option value={'accountAge'}>Account age</option>
                    <option value={'nsfwpfp'}>NSFW avatar</option>
                    <option value={'promoName'}>Invites in profile</option>
                    <option value={'username'}>Match username</option>
                    <option value={'status'}>Match status</option>
                </select>
                <div className={'ageThreshold'} style={{position: 'relative',left: 10, width: 'calc(100% - 20px)'}}>
                <footer style={{padding: 10}}></footer>
                <Typography style={{fontSize: 18}}>Age threshold</Typography>
                <input onInput={timeBanChange} defaultValue={rule.timeVal}type='number'style={{position: 'relative',height: 32, width: 50, fontSize: 16}}/>
                <select onChange={timeUnitBanChange} defaultValue={rule.timeUnit} style={{position: 'relative',left: 5, height: 32, width: 100, fontSize: 16}}>
                    <option value={'seconds'}>Seconds</option>
                    <option value={'minutes'}>Minutes</option>
                    <option value={'hours'}>Hours</option>
                    <option value={'days'}>Days</option>
                </select>
                <footer style={{padding: 10}}></footer>
                </div>
                <div className={'username'} style={{position: 'relative',left: 10, width: 'calc(100% - 20px)', display: 'none'}}>
                <footer style={{padding: 10}}></footer>
                <Typography style={{fontSize: 18}}>Enter usernames</Typography>
                <Autocomplete defaultValue={Object.keys(rule.usernames)}onChange={usernameBanChange} className={'inputUsername'} multiple options={[]} freeSolo style={{width: '100%'}} renderInput={(params) => <TextField {...params}/>}/>
                <footer style={{padding: 3}}></footer>
                <input className={'usernameSub'} type='checkbox' style={{width: 18, height: 18, margin: 0}}/><span style={{fontSize: 18, position: 'relative', left: 10, margin: 0, top: -2.5}}>Search for substrings</span>
                <footer style={{padding: 10}}></footer>
                </div>
                <div className={'status'} style={{position: 'relative',left: 10, width: 'calc(100% - 20px)', display: 'none'}}>
                <footer style={{padding: 10}}></footer>
                <Typography style={{fontSize: 18}}>Enter statuses</Typography>
                <Autocomplete onChange={statusBanChange} defaultValue={Object.keys(rule.statuses)} className={'inputStatus'} multiple options={[]} freeSolo style={{width: '100%'}} renderInput={(params) => <TextField {...params}/>}/>
                <footer style={{padding: 3}}></footer>
                <input className={'statusSub'} type='checkbox' style={{width: 18, height: 18, margin: 0}}/><span style={{fontSize: 18, position: 'relative', left: 10, margin: 0, top: -2.5}}>Search for substrings</span>
                <footer style={{padding: 10}}></footer>
                </div>
            </Grid>
            <footer style={{padding: 10}}></footer>
            </>
        })
    } else {
        brs = <Typography style={{ paddingRight: 5, fontSize: 16, position: 'relative', left: 10 }}>{noBan}</Typography>
    }




    return (
        <>
    <CssBaseline/>

        <Container className={classes.cardGrid} maxWidth="xl">
            <Grid container spacing={4}>
            
            <Grid item xs={12} md={6} ref={kickGrid}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <span className={classes.cardTitle}>Auto Kick</span>
                        <footer className={classes.footerInBetween}></footer>
                        <Button onClick={createKickRule} style={{backgroundColor: "#00c45c", color: "white", left: 10}} className={classes.atbtn}><AddIcon className={classes.icon}/><Typography className={classes.menuButtonText}>Add rule</Typography></Button>
                        <footer className={classes.footerInBetween}></footer>
                        <Grid container maxWidth="xl" style={{width: 'calc(100% - 20px)'}} rowSpacing={4}>
                        {krs}
                        </Grid>
                    </CardContent>
                    <footer className={classes.NMLFooter}>
                    <Button onClick={saveKickData} style={{backgroundColor:"cornflowerblue", padding: "5px", position: "relative", left: 40, top:-9}}><Typography style={{fontSize: 18, textTransform: "initial", color: "white"}}>Save</Typography></Button>
                    </footer>
                </Card>
                </Grid>


                <Grid ref={banGrid} item xs={12} md={6}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <span className={classes.cardTitle}>Auto Ban</span>
                        <footer className={classes.footerInBetween}></footer>
                        <Button onClick={createBanRule} style={{backgroundColor: "#00c45c", color: "white", left: 10}} className={classes.atbtn}><AddIcon className={classes.icon}/><Typography className={classes.menuButtonText}>Add rule</Typography></Button>
                        <footer className={classes.footerInBetween}></footer>
                        <Grid container maxWidth="xl" style={{width: 'calc(100% - 20px)'}} rowSpacing={4}>
                        {brs}
                        </Grid>
                    </CardContent>
                    <footer className={classes.NMLFooter}>
                    <Button onClick={saveBanData} style={{backgroundColor:"cornflowerblue", padding: "5px", position: "relative", left: 40, top:-9}}><Typography style={{fontSize: 18, textTransform: "initial", color: "white"}}>Save</Typography></Button>
                    </footer>
                </Card>
                </Grid>
            </Grid>
            </Container>
    </>
    )
}

export default AutoKickBan
export {
    icons
}