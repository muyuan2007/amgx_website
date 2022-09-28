import React from "react";
import { Typography, TextField, CardActions,AppBar, Drawer,Button,ButtonGroup, Card, Cardedit, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import classes from './Modlog.module.css'
import GavelIcon from '@material-ui/icons/Gavel';
import ListIcon from '@material-ui/icons/List';
import SecurityIcon from '@material-ui/icons/Security';
import SettingsIcon from '@material-ui/icons/Settings';
import PolicyIcon from '@material-ui/icons/Policy';
import { equals } from './Automod'
const icons = {"General Settings": <SettingsIcon />, "Automod": <SecurityIcon />, "Logging":<ListIcon />, "Autopunish": <GavelIcon />, "Auto Kick/Ban":<PolicyIcon />}

const logactions = {"Message Events":["Message Deleted", "Message Edited", "Message Bulk Deletion"], "Member Events":[
    "Username Changed","Avatar Changed", "Nickname Changed", "Roles Changed", "Member Joined", 
    "Member Left"], "Moderation Events":["Member Warned", "Infraction Removed", "Member Muted","Member Unmuted", "Member Kicked", "Member Tempbanned", 
    "Member Banned","Member Unbanned"], "Server Changes":["Emoji Added","Emoji Updated","Emoji Deleted","Channel Created","Channel Updated","Channel Deleted"
    , "Role Created","Role Updated","Role Deleted","Server Name Changed","Server Icon Changed","Discovery Splash Changed","AFK Channel Changed","System Channel Changed","Default Notifications Changed","AFK Timeout Changed","Bot Added",
    "Bot Removed", "Invite Splash Changed","Banner Changed","Explicit Filter Changed",
    "Verification Level Changed","Invite Created","Invite Deleted","MFA Changed","Server Owner Changed"], "Voice Channel Events":["Member Joined VC",
    "Member Left VC","Member Moved"]}

const drawerWidth = 250;

class CheckButton extends React.Component {

    constructor(props) {
        super(props);
        this.toggleCheck = this.toggleCheck.bind(this);
        this.checkBoxRef = React.createRef();
    }
    
    toggleCheck() {
        const node = this.checkBoxRef.current;
        if (node.checked) {
            node.checked = false
        } else{
            node.checked = true
        }

    
    }

   

    render() {
        return <Button style={{backgroundColor:"lightgray", width: "100%", position: "relative", display: "flex", flexDirection: "column", padding: "10px 0"}} onClick={this.toggleCheck}><input onChange={this.haha} checked={this.props.checked} type="checkbox" onClick={this.toggleCheck} style={{width: 18, height: 18}} ref={this.checkBoxRef}/><span variant="h6" htmlFor={this.props.eventtype} style={{textTransform: "initial",fontSize: 18, position: "relative",left: 10, width: 'calc(100% - 60px)'}}>{this.props.eventtype}</span></Button>
    }
}

class SaveButton extends React.Component {
    render() {
        return <Button style={{backgroundColor:"cornflowerblue", padding: "5px", position: "relative", top: 10, left: 30}}><span style={{fontSize: 18, textTransform: "initial", color: "white"}}>Save</span></Button>
    }
}

class MessageActions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {actions:this.props.actions, channel: this.props.channel}
        this.addAndRemoveElement = this.addAndRemoveElement.bind(this)
        this.saveData = this.saveData.bind(this)
        this.changeChannel = this.changeChannel.bind(this)
    }

    saveData() {
        fetch('/api/send-modlog', {
            method: 'POST',
            body: JSON.stringify({guild: String(this.props.server), actions: this.state.actions, channel: String(this.props.channelobj[this.state.channel]), type: 'message'}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    changeChannel = (event, values) => {
        this.setState({channel: values})
    }

    addAndRemoveElement(str) {
        if (!this.state.actions.includes(str)) {
            let actions = [...this.state.actions]
            actions.push(str)
            this.setState({actions:  actions})
        } else {
            let actions = [...this.state.actions]
            const index = actions.indexOf(str)
            actions.splice(index,1)
            this.setState({actions:  actions})
        }
    }


    render() {
        return <Grid maxWidth="xl" item  xs={12}>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <span className={classes.cardTitle}>Message Events</span>
                <Grid container>
                <Grid item className={classes.selectGrid} xs={12} sm={6}  lg={4}>
                    <span variant="subtitle1" className={classes.channelSelectHeader}>Select Channel</span>
                <Autocomplete value={this.state.channel}onChange={this.changeChannel}renderInput={(params) => <TextField {...params}/>} options={this.props.channels} className={classes.select}></Autocomplete>
                </Grid>
                </Grid>
            </CardContent>
            <Container maxWidth="xl">
                <Grid style={{position: "relative", top: 25, width: "calc(100% - 20px)",left:15}} container spacing={2}>
                {logactions["Message Events"].map((eventType) => (
                    <Grid item key={eventType} xs={12} sm={6} md={4} lg={4} xl={4}>
                    <div onClick={()=>this.addAndRemoveElement(eventType)}><CheckButton checked={this.state.actions.includes(eventType)} eventtype={eventType} id={eventType} className={classes.button}></CheckButton></div>
                    </Grid>
                ))}
                </Grid>

            </Container>
            <footer className={classes.cardFooter}>
                <CardActions>
                    <div onClick={this.saveData}><SaveButton></SaveButton></div>
                </CardActions>
            </footer>
        </Card>
        
        
    </Grid> 
    }
}

class MemberActions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {actions:this.props.actions, channel: this.props.channel, currentStuff: {}}
        this.addAndRemoveElement = this.addAndRemoveElement.bind(this)
        this.saveData = this.saveData.bind(this)
        this.changeChannel = this.changeChannel.bind(this)
    }
    saveData() {
        fetch('/api/send-modlog', {
            method: 'POST',
            body: JSON.stringify({guild: String(this.props.server), actions: this.state.actions, channel: String(this.props.channelobj[this.state.channel]), type: 'member'}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    changeChannel = (event, values) => {
        this.setState({channel: values})
    }
    addAndRemoveElement(str) {
        if (!this.state.actions.includes(str)) {
            let actions = [...this.state.actions]
            actions.push(str)
            this.setState({actions:  actions})
        } else {
            let actions = [...this.state.actions]
            const index = actions.indexOf(str)
            actions.splice(index,1)
            this.setState({actions:  actions})
        }
        
    }
    render() {
        return <Grid maxWidth="xl" item  xs={12}>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <span className={classes.cardTitle}>Member Events</span>
                <Grid container>
                <Grid item className={classes.selectGrid} xs={12} sm={6}  lg={4}>
                    <span variant="subtitle1" className={classes.channelSelectHeader}>Select Channel</span>
                    <Autocomplete value={this.state.channel}onChange={this.changeChannel}renderInput={(params) => <TextField {...params}/>} options={this.props.channels} className={classes.select}></Autocomplete>
                </Grid>
                </Grid>
            </CardContent>
            <Container maxWidth="xl">
                <Grid style={{position: "relative", top: 25, width: "calc(100% - 20px)",left:15}} container spacing={2}>
                {logactions["Member Events"].map((eventType) => (
                    <Grid item key={eventType} xs={12} sm={6} md={4} lg={4} xl={4}>
                    <div onClick={()=>this.addAndRemoveElement(eventType)}><CheckButton checked={this.state.actions.includes(eventType)} eventtype={eventType} id={eventType} className={classes.button}></CheckButton></div>
                    </Grid>
                ))}
                </Grid>

            </Container>
            <footer className={classes.cardFooter}>
                <CardActions>
                <div onClick={this.saveData}><SaveButton></SaveButton></div>
                </CardActions>
            </footer>
        </Card>
        
        
    </Grid> 
    }
}

class Moderations extends React.Component {
    constructor(props) {
        super(props)

        this.state = {actions:this.props.actions, channel: this.props.channel}
        this.addAndRemoveElement = this.addAndRemoveElement.bind(this)
        this.saveData = this.saveData.bind(this)
        this.changeChannel = this.changeChannel.bind(this)
    }
    saveData() {
        fetch('/api/send-modlog', {
            method: 'POST',
            body: JSON.stringify({guild: String(this.props.server), actions: this.state.actions, channel: String(this.props.channelobj[this.state.channel]), type: 'moderation'}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    changeChannel = (event, values) => {
        this.setState({channel: values})
    }
    addAndRemoveElement(str) {
        if (!this.state.actions.includes(str)) {
            let actions = [...this.state.actions]
            actions.push(str)
            this.setState({actions:  actions})
        } else {
            let actions = [...this.state.actions]
            const index = actions.indexOf(str)
            actions.splice(index,1)
            this.setState({actions:  actions})
        }
        
    }
    
    render() {
        return <Grid maxWidth="xl" item  xs={12}>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <span className={classes.cardTitle}>Moderations</span>
                <Grid container>
                <Grid item className={classes.selectGrid} xs={12} sm={6}  lg={4}>
                    <span variant="subtitle1" className={classes.channelSelectHeader}>Select Channel</span>
                    <Autocomplete value={this.state.channel}onChange={this.changeChannel}renderInput={(params) => <TextField {...params}/>} options={this.props.channels} className={classes.select}></Autocomplete>
                </Grid>
                </Grid>
            </CardContent>
            <Container maxWidth="xl">
                <Grid style={{position: "relative", top: 25, width: "calc(100% - 20px)",left:15}} container spacing={2}>
                {logactions["Moderation Events"].map((eventType) => (
                    <Grid item key={eventType} xs={12} sm={6} md={4} lg={4} xl={4}>
                    <div onClick={()=>this.addAndRemoveElement(eventType)}><CheckButton checked={this.state.actions.includes(eventType)} eventtype={eventType} id={eventType} className={classes.button}></CheckButton></div>
                    </Grid>
                ))}
                </Grid>

            </Container>
            <footer className={classes.cardFooter}>
                <CardActions>
                <div onClick={this.saveData}><SaveButton></SaveButton></div>
                </CardActions>
            </footer>
        </Card>
        
        
    </Grid> 
    }
}

class ServerActions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {actions:this.props.actions, channel: this.props.channel}
        this.addAndRemoveElement = this.addAndRemoveElement.bind(this)
        this.saveData = this.saveData.bind(this)
        this.changeChannel = this.changeChannel.bind(this)
    }
    saveData() {
        fetch('/api/send-modlog', {
            method: 'POST',
            body: JSON.stringify({guild: String(this.props.server), actions: this.state.actions, channel: String(this.props.channelobj[this.state.channel]), type: 'server'}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    changeChannel = (event, values) => {
        this.setState({channel: values})
    }
    addAndRemoveElement(str) {
        if (!this.state.actions.includes(str)) {
            let actions = [...this.state.actions]
            actions.push(str)
            this.setState({actions:  actions})
        } else {
            let actions = [...this.state.actions]
            const index = actions.indexOf(str)
            actions.splice(index,1)
            this.setState({actions:  actions})
        }
        
    }
    
    render() {
        return <Grid maxWidth="xl" item  xs={12}>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <span className={classes.cardTitle}>Server Events</span>
                <Grid container>
                <Grid item className={classes.selectGrid} xs={12} sm={6}  lg={4}>
                    <span variant="subtitle1" className={classes.channelSelectHeader}>Select Channel</span>
                    <Autocomplete value={this.state.channel}onChange={this.changeChannel}renderInput={(params) => <TextField {...params}/>} options={this.props.channels} className={classes.select}></Autocomplete>
                </Grid>
                </Grid>
            </CardContent>
            <Container maxWidth="xl">
                <Grid style={{position: "relative", top: 25, width: "calc(100% - 20px)",left:15}} container spacing={2}>
                {logactions["Server Changes"].map((eventType) => (
                    <Grid item key={eventType} xs={12} sm={6} md={4} lg={4} xl={4}>
                    <div onClick={()=>this.addAndRemoveElement(eventType)}><CheckButton checked={this.state.actions.includes(eventType)} eventtype={eventType} id={eventType} className={classes.button}></CheckButton></div>
                    </Grid>
                ))}
                </Grid>

            </Container>
            <footer className={classes.cardFooter}>
                <CardActions>
                <div onClick={this.saveData}><SaveButton></SaveButton></div>
                </CardActions>
            </footer>
        </Card>
        
        
    </Grid> 
    }
}

class VCActions extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {actions:this.props.actions, channel: this.props.channel}
        this.addAndRemoveElement = this.addAndRemoveElement.bind(this)
        this.saveData = this.saveData.bind(this)
        this.changeChannel = this.changeChannel.bind(this)
    }
    saveData() {
        fetch('/api/send-modlog', {
            method: 'POST',
            body: JSON.stringify({guild: String(this.props.server), actions: this.state.actions, channel: String(this.props.channelobj[this.state.channel]), type: 'vc'}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    componentDidMount() {
    }
    changeChannel = (event, values) => {
        this.setState({channel: values})
    }
    addAndRemoveElement(str) {
        if (!this.state.actions.includes(str)) {
            let actions = [...this.state.actions]
            actions.push(str)
            this.setState({actions:  actions})
        } else {
            let actions = [...this.state.actions]
            const index = actions.indexOf(str)
            actions.splice(index,1)
            this.setState({actions:  actions})
        }
        
    }
    
    render() {
        return <Grid maxWidth="xl" item  xs={12}>
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <span className={classes.cardTitle}>Voice State Change</span>
                <Grid container>
                <Grid item className={classes.selectGrid} xs={12} sm={6}  lg={4}>
                    <span variant="subtitle1" className={classes.channelSelectHeader}>Select Channel</span>
                    <Autocomplete value={this.state.channel}onChange={this.changeChannel}renderInput={(params) => <TextField {...params}/>} options={this.props.channels} className={classes.select}></Autocomplete>
                </Grid>
                </Grid>
            </CardContent>
            <Container maxWidth="xl">
                <Grid style={{position: "relative", top: 25, width: "calc(100% - 20px)",left:15}} container spacing={2}>
                {logactions["Voice Channel Events"].map((eventType) => (
                    <Grid item key={eventType} xs={12} sm={6} md={4} lg={4} xl={4}>
                    <div onClick={()=>this.addAndRemoveElement(eventType)}><CheckButton checked={this.state.actions.includes(eventType)} eventtype={eventType} id={eventType} className={classes.button}></CheckButton></div>
                    </Grid>
                ))}
                </Grid>

            </Container>
            <footer className={classes.cardFooter}>
                <CardActions>
                <div onClick={this.saveData}><SaveButton></SaveButton></div>
                </CardActions>
            </footer>
        </Card>
        
        
    </Grid> 
    }
}


export {
    MessageActions,
    MemberActions,
    Moderations,
    ServerActions,
    VCActions,
    icons
}