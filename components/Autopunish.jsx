import React, { useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom'
import { Typography, IconButton, TextField, CardActions,AppBar, Drawer,Button,ButtonGroup, Card, Cardedit, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add';
import classes from './Autopunish.module.css'
import CloseIcon from '@material-ui/icons/Close'
import GavelIcon from '@material-ui/icons/Gavel';
import ListIcon from '@material-ui/icons/List';
import SecurityIcon from '@material-ui/icons/Security';
import SettingsIcon from '@material-ui/icons/Settings';
import PolicyIcon from '@material-ui/icons/Policy';
const icons = {"General Settings": <SettingsIcon />, "Automod": <SecurityIcon />, "Logging":<ListIcon />, "Autopunish": <GavelIcon />, "Auto Kick/Ban":<PolicyIcon />}
const newC = 'There are no automated punishments, click "Add rule" to add one!'
class SaveButton extends React.Component {
    render() {
        return <Button style={{backgroundColor:"cornflowerblue", padding: "5px", position: "relative", top: 10, left: 30}}><span style={{fontSize: 18, textTransform: "initial", color: "white"}}>Save</span></Button>
    }
}

const Autopunish = (props) => {
    const [rules, setRules] = useState(props.rules)
    const sectionRefs = useRef([])
    const forRefs = useRef([])
    const timeRefs = useRef([])
    const betweenRefs = useRef([])
    const timeSelects = useRef([])
    const punishTypeRefs = useRef([])

    const addToSectionRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el)
        }
    }

    const addToForRefs = (el) => {
        if (el && !forRefs.current.includes(el)) {
            forRefs.current.push(el)
        }

    }

    const addToTimeRefs = (el) => {
        if (el && !timeRefs.current.includes(el)) {
            timeRefs.current.push(el)
        }
    }

    const addToBetweenRefs = (el) => {
        if (el && !betweenRefs.current.includes(el)) {
            betweenRefs.current.push(el)
        }
    }

    const addToSelectRefs = (el) => {
        if (el && !timeSelects.current.includes(el)) {
            timeSelects.current.push(el)
        }
    }

    const addToPunishRefs = (el) => {
        if (el && !punishTypeRefs.current.includes(el)) {
            punishTypeRefs.current.push(el)
        }
    }

    const addRule = (event) => {
        setRules([...rules, {type: 'kick', durationType: 'minutes', duration: 1, threshold: 20}])
    }
    const getWhichPunishSelect = (e, data) => {
        const target = e.target
        const value = e.target.value
        const whole = target.parentElement.parentElement.parentElement
        const index = Array.from(whole.getElementsByClassName('punishmentType')).indexOf(target)
        
        const fors = Array.from(whole.getElementsByClassName('for'))
        const betweens = Array.from(whole.getElementsByClassName('between'))
        const timesels = Array.from(whole.getElementsByClassName('timesel'))
        const timegrids = Array.from(whole.getElementsByClassName('timegrid'))
        
        if (value == 'mute' || value == 'tempban') {
            fors[index].style.display = 'block'
            betweens[index].style.display = 'block'
            timesels[index].style.display = 'block'
            timegrids[index].style.display = 'block'
        } else {
            fors[index].style.display = 'none'
            betweens[index].style.display = 'none'
            timesels[index].style.display = 'none'
            timegrids[index].style.display = 'none'
        }
        const punishRules = rules
        punishRules[index].type = value
        setRules(punishRules)
    }

    const getWhichDurationTypeSelect = (e, data) => {
        const target = e.target
        const value = e.target.value
        const index = Array.from(target.parentElement.parentElement.parentElement.getElementsByClassName('durationType')).indexOf(target)
        const punishRules = rules
        punishRules[index].durationType = value
        setRules(punishRules)
    }

    const deleteRule = (e) => {
        if (e.target.tagName == 'path') {
            const target = e.target.parentElement.parentElement.parentElement
            const whole = target.parentElement.parentElement
            const deletes = Array.from(whole.getElementsByClassName('delete'))
            const index = deletes.indexOf(target)
            const punishRules = rules
            punishRules.splice(index, 1)
            setRules([...punishRules])
        }
        if (e.target.tagName == 'svg') {
            const target = e.target.parentElement.parentElement            
            const whole = target.parentElement.parentElement
            const deletes = Array.from(whole.getElementsByClassName('delete'))
            const index = deletes.indexOf(target)
            const punishRules = rules
            punishRules.splice(index, 1)
            setRules([...punishRules])
        }
        if (e.target.tagName == 'SPAN') {
            const target = e.target
            const whole = target.parentElement.parentElement
            const deletes = Array.from(whole.getElementsByClassName('delete'))
            const index = deletes.indexOf(target)
            const punishRules = rules
            punishRules.splice(index, 1)
            setRules([...punishRules])
        }

        
       
       

    }

    const getWhichTime = (e, data) => {
        const target = e.target
        const value = e.target.value
        const index = Array.from(target.parentElement.parentElement.parentElement.getElementsByClassName('duration')).indexOf(target)
        const punishRules = rules
        punishRules[index].duration = parseInt(value)
        setRules(punishRules)
    }

    const getWhichThreshold = (e, data) => {
        const target = e.target
        const value = e.target.value
        const index = Array.from(target.parentElement.parentElement.parentElement.getElementsByClassName('threshold')).indexOf(target)
        const punishRules = rules
        punishRules[index].threshold = parseInt(value)
        setRules(punishRules)
    }



    const saveData = () => {
        const goAhead = fetch('/api/send-autopunish', {
            method: 'POST',
            body: JSON.stringify({guild: props.guildid, rules: rules}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    

    let rulesSection;

    if (rules.length > 0) {
        rulesSection = rules.map((rule) => {
            return <Grid ref={addToSectionRefs} container item style={{position: "relative", left:10, width: 'calc(100% - 20px)'}} key={rules.indexOf(rule)}>
        
        <Grid item style={{paddingTop: 5, paddingBottom:5}}>
        <select ref={addToPunishRefs} onChange={getWhichPunishSelect}className={'punishmentType'} defaultValue={rule.type}style={{width: 100, fontSize: 16,height: 27}}> 
            <option value={"mute"}>mute</option> <option value={"kick"}>kick</option> 
            <option value={"tempban"}>tempban</option> <option value={"ban"}>ban</option> 
        </select>
        </Grid>
        <Grid ref={addToForRefs} item style={{paddingTop: 5, paddingBottom: 5, display: 'none'}} className={'for'}><Typography style={{paddingLeft: 5, paddingRight: 5, fontSize: 18}}>for</Typography></Grid>
        <Grid ref={addToTimeRefs} item style={{paddingTop: 5, paddingBottom: 5, display: 'none'}} className={'timegrid'}><input onInput={getWhichTime} className={'duration'} defaultValue={rule.duration} type='number' style={{width: 70, height: 27, fontSize: 16}}/></Grid>
        <Grid ref={addToBetweenRefs} item style={{paddingTop: 5, paddingBottom: 5, display: 'none'}} className={'between'}><div style={{width: 5}} /></Grid>
        <Grid ref={addToSelectRefs}  item style={{paddingTop: 5, paddingBottom: 5, display: 'none'}} className={'timesel'}>
        <select className={'durationType'}onChange={getWhichDurationTypeSelect} defaultValue={rule.durationType}style={{width: 100, fontSize: 16,height: 27}}>
            <option value={"seconds"}>seconds</option>
            <option value={"minutes"}>minutes</option>
            <option value={"hours"}>hours</option>
            <option value={"days"}>days</option>
        </select>
        </Grid>
        <Grid item style={{paddingTop: 5, paddingBottom: 5}}><div style={{width: 5}} /></Grid>
        <Grid item style={{paddingTop: 5, paddingBottom: 5}}><Typography style={{paddingRight: 5, fontSize: 18}}>once someone reaches</Typography></Grid>
        <Grid item style={{paddingTop: 5, paddingBottom: 5}}><input type='number'  onInput={getWhichThreshold} className={'threshold'} defaultValue={rule.threshold} style={{width: 70, height: 27, fontSize: 16}}/></Grid>
        <Grid item style={{paddingTop: 5, paddingBottom: 5}}><div style={{width: 5}} /></Grid>
        <Grid item style={{paddingTop: 5, paddingBottom: 5}}><Typography style={{paddingRight: 5, fontSize: 18}}>infraction points</Typography></Grid>
        <IconButton onClick={deleteRule} className={`delete ${rules.indexOf(rule)}`} style={{color: 'red', height: 35, width: 35, position: 'relative', top: 'calc(100% - 17.5px)'}} component="span"> <CloseIcon /> </IconButton>
    </Grid>
    
        })
    } else {
        rulesSection = <Typography style={{paddingLeft: 5, paddingRight: 5, fontSize: 18}}>{newC}</Typography>
    }

    return (
        <><Grid  maxWidth="xl" item  xs={12}>
        <Card style={{height: 'auto', display: 'flex', flexDirection: 'column'}}>
            <CardContent style={{flexGrow: 1, left:15, position: "relative", width: "calc(100% - 30px)"}}>
            <span style={{position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)"}}>Automated Punishments</span>
            <footer className={classes.footerInBetween}></footer>
            <Button onClick={addRule} style={{backgroundColor: "#00c45c", color: "white", left: 10}} className={classes.atbtn}><AddIcon className={classes.icon}/><Typography className={classes.menuButtonText}>Add rule</Typography></Button>
            <footer className={classes.footerInBetween}></footer>
            {rulesSection}

                
                
            </CardContent>
            <footer className={classes.cardFooter}>
            <CardActions>
            <div onClick={saveData}><SaveButton/></div>
            </CardActions>
            </footer></Card></Grid></> 
    )
}

export default Autopunish

export {
    icons
}