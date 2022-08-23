import React, { useEffect, useState } from "react";
import { Typography, IconButton, Box, Divider, MenuItem, Tabs, Tab, TextField, AppBar, Switch, Drawer, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import classes from './Automod.module.css'
import CloseIcon from '@material-ui/icons/Close'
import GavelIcon from '@material-ui/icons/Gavel';
import ListIcon from '@material-ui/icons/List';
import SecurityIcon from '@material-ui/icons/Security';
import SettingsIcon from '@material-ui/icons/Settings';
import PolicyIcon from '@material-ui/icons/Policy';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered'
import { findDOMNode } from 'react-dom'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'
const newC = 'There are no categories, click "CREATE NEW CATEGORY" to add one!'
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const icons = { "General Settings": <SettingsIcon />, "Automod": <SecurityIcon />, "Logging": <ListIcon />, "Autopunish": <GavelIcon />, "Auto Kick/Ban": <PolicyIcon />, "Weblogs": <FormatListNumbered /> }

const Gap = () => {
  return (
    <>
      <CssBaseline />
      <footer className={classes.footerInBetween}></footer>
      <Divider className={classes.divider1}></Divider>
      <footer className={classes.footerInBetween}></footer>
    </>

  )
}

class General extends React.Component {

  constructor(props) {
    super(props);
    this.state = { whitelistedRoles: this.props.role_whitelists, whitelistedChannels: this.props.channel_whitelists }

    this.onRoleChange = this.onRoleChange.bind(this);
    this.onChannelChange = this.onChannelChange.bind(this);
    this.saveData = this.saveData.bind(this)
  }


  onRoleChange = (event, values) => {
    const roleobj = this.props.roleobj
    let roles = {}
    values.forEach(value => { roles[value] = roleobj[value] })
    this.setState({
      whitelistedRoles: roles
    })
  }

  onChannelChange = (event, values) => {
    const channelobj = this.props.channelobj
    let channels = {}
    values.forEach(value => { channels[value] = channelobj[value] })
    this.setState({
      whitelistedChannels: channels
    })
  }



  saveData() {
    fetch('/api/send-automod', {
      method: 'POST',
      body: JSON.stringify({ guild: this.props.server, type: 'general', whitelistedRoles: this.state.whitelistedRoles, whitelistedChannels: this.state.whitelistedChannels }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
    return <Grid item xs={12} md={6}>
      <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent className={classes.cardContent}>
          <Typography style={{ position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)" }}>General Settings</Typography>
          <footer style={{ padding: "5px 0" }}></footer>
          <Grid xs={12} style={{ width: "calc(100% - 20px)", position: "relative", left: 10 }}>
            <Typography style={{ fontSize: 16, width: "100%", display: "block" }}>Whitelisted roles</Typography>
            <Autocomplete multiple options={this.props.roles} defaultValue={Object.keys(this.props.roleobj).filter(f => Object.values(this.props.role_whitelists).includes(this.props.roleobj[f]))} onChange={this.onRoleChange}
              renderInput={(params) => <TextField {...params} />}></Autocomplete>
            <footer className={classes.footerInBetween}></footer>
            <Typography style={{ fontSize: 16, width: "100%", display: "block" }}>Whitelisted channels</Typography>
            <Autocomplete defaultValue={Object.keys(this.props.channelobj).filter(f => Object.values(this.props.channel_whitelists).includes(this.props.channelobj[f]))} multiple options={Object.keys(this.props.channelobj)} onChange={this.onChannelChange} renderInput={(params) => <TextField {...params} />}></Autocomplete>
            <footer className={classes.footerInBetween}></footer>
          </Grid>
        </CardContent>
        <footer style={{ padding: "20px 0" }}>
          <Button style={{ backgroundColor: "cornflowerblue", padding: "5px", position: "relative", left: 40, top: -9 }} onClick={this.saveData}><Typography style={{ fontSize: 18, textTransform: "initial", color: "white" }}>Save</Typography></Button>
        </footer>

      </Card>
    </Grid>
  }
}

class SpamAutomodSet extends React.Component {
  constructor(props) {
    super(props);
    this.onPunishTagsChange = this.onPunishTagsChange.bind(this);
    this.onChannelWhitelistChange = this.onChannelWhitelistChange.bind(this);
    this.onRoleWhitelistChange = this.onRoleWhitelistChange.bind(this);
    this.state = { availableOptions: ["Delete message", "Mute", "Warn", "Kick", "Tempban", "Ban"], punishments: this.props.punishments, amountLimit: this.props.maxes[0], timeLimit: this.props.maxes[1], whitelistedChannels: this.props.channel_whitelists, whitelistedRoles: this.props.role_whitelists, points: this.props.points, timeValue: this.props.timeval, actualTime: this.props.timeunit, currentStuff: {} };
    this.time = React.createRef();
    this.amountLimit = React.createRef();
    this.timeLimit = React.createRef();
    this.timeAmount = React.createRef();
    this.pointRef = React.createRef();
    this.points = React.createRef();
    this.durationRef = React.createRef();
    this.saveData = this.saveData.bind(this)
    this.amountChange = this.amountChange.bind(this)
    this.onPointChange = this.onPointChange.bind(this)
    this.timeChange = this.timeChange.bind(this)
    this.timeAmountChange = this.timeAmountChange.bind(this)
    this.timeUnitChange = this.timeUnitChange.bind(this)
    this.changePunishSize = this.changePunishSize.bind(this)
  }

  onPunishTagsChange = (event, values, reason, detail) => {
    this.changePunishSize()
    const durationNode = this.durationRef.current;
    const pointNode = this.pointRef.current;

    var available = this.state.availableOptions;

    this.setState({
      punishments: values
    }, () => {
      const chosenOptions = Array.from(this.state.punishments)
      if (chosenOptions.includes("Mute") || chosenOptions.includes("Tempban")) {
        durationNode.style.display = "block"
      } else {
        durationNode.style.display = "none"

      }

      if (chosenOptions.includes("Warn")) {
        pointNode.style.display = "block"


      } else {
        pointNode.style.display = "none"

      }
    });



    var chosenOptions = Array.from(values)
    if (chosenOptions.includes("Mute")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Mute") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Warn")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Warn") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Kick")) {
      function ok(value) {
        return value != "Mute" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Kick") {
        if (!available.includes("Mute")) {
          available.push("Mute")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Tempban")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Mute"
      }
      const temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Tempban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Ban")) {
      function ok(value) {
        return value != "Mute" && value != "Kick" && value != "Tempban" && value != "Warn"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Ban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Warn")) {
          available.push("Warn")
        }
      }
    }

    if (reason === 'clear') {
      available = ['Delete message', 'Mute', 'Warn', 'Kick', 'Tempban', 'Ban']
    }


    this.setState({
      availableOptions: available
    })


  }

  onChannelWhitelistChange = (event, values) => {
    const channelobj = this.props.channelobj
    let channels = {}
    values.forEach(value => { channels[value] = channelobj[value] })
    this.setState({
      whitelistedChannels: channels
    })
  }

  onRoleWhitelistChange = (event, values) => {
    const roleobj = this.props.roleobj
    let roles = {}
    values.forEach(value => { roles[value] = roleobj[value] })
    this.setState({
      whitelistedRoles: roles
    })
  }

  saveData() {
    const timeval = this.time.current.value
    var logData = {}
    logData = { type: 'spam', table: this.props.table, guild: this.props.server, punishments: this.state.punishments, whitelistedChannels: this.state.whitelistedChannels, whitelistedRoles: this.state.whitelistedRoles, limit: [this.state.amountLimit, this.state.timeLimit], timeValue: this.state.timeValue, actualTime: this.state.actualTime, punishTime: 0, warnPoints: 0 }
    if (this.state.punishments.includes("Mute") || this.state.punishments.includes("Tempban")) {
      if (timeval == "seconds") {
        logData.punishTime = this.state.timeValue
      }
      if (timeval == "minutes") {
        logData.punishTime = 60 * this.state.timeValue
      }
      if (timeval == "hours") {
        logData.punishTime = 3600 * this.state.timeValue
      }
      if (timeval == "days") {
        logData.punishTime = 86400 * this.state.timeValue
      }
    }

    if (this.state.punishments.includes("Warn")) {
      logData.warnPoints = this.state.points
    }
    fetch('/api/send-automod', {
      method: 'POST',
      body: JSON.stringify(logData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    


    this.setState({ currentStuff: this.state })

  }

  amountChange() {
    const value = this.amountLimit.current.value;
    this.setState({ amountLimit: parseInt(value) })
  }

  onPointChange() {
    const value = parseInt(this.points.current.value)
    this.setState({ points: value })
  }

  timeChange() {
    const value = this.timeLimit.current.value;
    this.setState({ timeLimit: parseInt(value) })
  }

  timeAmountChange() {
    const value = this.timeAmount.current.value
    this.setState({ timeValue: parseInt(value) })
  }

  timeUnitChange(e) {
    this.setState({ actualTime: e.target.value })
  }

  changePunishSize = () => {
    const e = document.getElementById(`${this.props.table}punishselect`)
    e.parentElement.parentElement.parentElement.style.height = `${e.parentElement.offsetHeight}px`
  }

  componentDidMount() {

    const punishments = this.state.punishments
    if (punishments.includes('Mute')) {
      this.setState({ availableOptions: ['Delete message', 'Mute', 'Warn'] })
      this.durationRef.current.style.display = 'block'
    }
    if (punishments.includes('Warn')) {
      this.setState({ availableOptions: ['Delete message', 'Mute', 'Warn'] })
      this.pointRef.current.style.display = 'block'
    }
    if (punishments.includes('Kick')) {
      this.setState({ availableOptions: ['Delete message', 'Warn', 'Kick'] })
    }
    if (punishments.includes('Tempban')) {
      this.setState({ availableOptions: ['Delete message', 'Warn', 'Tempban'] })
      this.durationRef.current.style.display = 'block'
    }
    if (punishments.includes('Ban')) {
      this.setState({ availableOptions: ['Delete message', 'Ban'] })
    }
    let chwl = {}
    let rlwl = {}
    let ch_whitelists = Object.keys(this.props.channelobj).filter(f => Object.values(this.props.channel_whitelists).includes(this.props.channelobj[f]))
    let rl_whitelists = Object.keys(this.props.roleobj).filter(f => Object.values(this.props.role_whitelists).includes(this.props.roleobj[f]))
    ch_whitelists.forEach(ch => chwl[ch] = this.props.channelobj[ch])
    rl_whitelists.forEach(rl => rlwl[rl] = this.props.roleobj[rl])
    this.setState({ whitelistedChannels: chwl })
    this.setState({ whitelistedRoles: rlwl })
    this.setState({ currentStuff: this.state })
    this.changePunishSize()
    const s = new ResizeSensor(document.getElementById(`${this.props.table}punishselect`).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, this.changePunishSize)


  }


  render() {
    return <Grid item xs={12} md={6}>
      <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flexGrow: 1, left: 15, position: "relative", width: "calc(100% - 30px)" }}>
          <Typography style={{ position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)" }}>{this.props.offtype}</Typography>
          <footer style={{ padding: "5px 0" }}></footer>
          <Grid xs={12} style={{ width: "calc(100% - 20px)", position: "relative", left: 10 }}>
            <Grid container >
              <Grid item xs={12}>
                <Typography style={{ fontSize: 16, width: "100%", display: "block" }}>Actions to be taken</Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete id={`${this.props.table}punishselect`} value={this.state.punishments} onChange={this.onPunishTagsChange} multiple style={{ height: 32, width: "100%" }} options={this.state.availableOptions} renderInput={(params) => <TextField {...params} placeholder={this.props.placeholder} />} />
              </Grid>
            </Grid>
            <Grid xs={12} style={{ position: "relative" }} >
              <div ref={this.durationRef} style={{ display: "none", position: "relative" }}>
                <footer style={{ padding: "10px 0" }}></footer>
                <input ref={this.timeAmount} onInput={this.timeAmountChange} defaultValue={this.state.timeValue} style={{ height: 30, fontSize: 18, width: `calc(100% - 110px)` }} type="number" /><select defaultValue={this.state.actualTime} ref={this.time} onChange={this.timeUnitChange} style={{ width: 100, position: "absolute", fontSize: 16, height: 30, right: 0 }}><option value={"seconds"}>Seconds</option> <option value={"minutes"}>Minutes</option> <option value={"hours"}>Hours</option> <option value={"days"}>Days</option></select>
              </div>
              <div ref={this.pointRef} style={{ display: "none", position: "relative" }}>
                <footer style={{ padding: "10px 0" }}></footer>
                <input onInput={this.onPointChange} ref={this.points} defaultValue={this.state.points} style={{ height: 30, fontSize: 18, width: `calc(100% - 80px)` }} type="number" /><Typography style={{ width: 80, textAlign: "right", fontSize: 16, position: "absolute", right: 0, top: "calc(50% - 2px)" }}>Points</Typography>
              </div>
            </Grid>
            
            <Gap></Gap>
            <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Punish after</Typography>

            <Grid container spacing={4} style={{ position: "relative", top: 10 }}>

              <Grid item xs={12} md={6} style={{ position: "relative" }}><input ref={this.amountLimit} defaultValue={this.state.amountLimit} style={{ height: 30, fontSize: 18, width: `calc(100% - ${this.props.textWidth1}px)` }} onInput={this.amountChange} type="number" /><Typography style={{ width: this.props.textWidth1, display: "flex", fontSize: 16, padding: "3px 0", position: "absolute", right: 5, top: "calc(50% - 15px)" }}>{this.props.bottomoft} in</Typography></Grid>
              <Grid item xs={12} md={6} style={{ position: "relative" }}><input ref={this.timeLimit} defaultValue={this.state.timeLimit} style={{ height: 30, fontSize: 18, width: `calc(100% - 80px)` }} type="number" onInput={this.timeChange} /><Typography style={{ width: 80, display: "flex", fontSize: 16, padding: "3px 0", position: "absolute", right: 0, top: "calc(50% - 15px)" }}>{this.props.offUnit}</Typography></Grid>
            </Grid>
            <Gap></Gap>
            <Grid xs={12} style={{ position: "relative" }}>
              <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted channels</Typography>
              <Autocomplete onChange={this.onChannelWhitelistChange} value={Object.keys(this.state.whitelistedChannels)} multiple options={Object.keys(this.props.channelobj)} renderInput={(params) => <TextField {...params} />} />
            </Grid>
            <Gap />
            <Grid xs={12} style={{ position: "relative" }}>
              <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted roles</Typography>
              <Autocomplete onChange={this.onRoleWhitelistChange} value={Object.keys(this.state.whitelistedRoles)} multiple options={this.props.roles} renderInput={(params) => <TextField {...params} />} />
            </Grid>

          </Grid>
        </CardContent>
        <footer style={{ padding: "20px 0" }}>
          <Button onClick={this.saveData} style={{ backgroundColor: "cornflowerblue", padding: "5px", position: "relative", left: 40, top: -9 }}><Typography style={{ fontSize: 18, textTransform: "initial", color: "white" }}>Save</Typography></Button>
        </footer>

      </Card>
    </Grid>

  }





}

class NABasedAutomodSet extends React.Component {
  constructor(props) {
    super(props);
    this.onPunishTagsChange = this.onPunishTagsChange.bind(this);
    this.onChannelWhitelistChange = this.onChannelWhitelistChange.bind(this);
    this.onRoleWhitelistChange = this.onRoleWhitelistChange.bind(this);
    this.saveData = this.saveData.bind(this)
    this.amountChange = this.amountChange.bind(this)
    this.onPointChange = this.onPointChange.bind(this)
    this.onPunishTimeChange = this.onPunishTimeChange.bind(this)
    this.state = { punishments: this.props.punishments, amountLimit: this.props.top, availableOptions: ["Delete message", "Mute", "Warn", "Kick", "Tempban", "Ban"], whitelistedChannels: this.props.channel_whitelists, whitelistedRoles: this.props.role_whitelists, points: this.props.points, time: this.props.timeval, timeunit: this.props.timeunit };
    this.time = React.createRef();
    this.amountLimit = React.createRef();
    this.timeAmount = React.createRef();
    this.pointRef = React.createRef();
    this.points = React.createRef();
    this.durationRef = React.createRef();
    this.timeUnitChange = this.timeUnitChange.bind(this)
    this.changePunishSize = this.changePunishSize.bind(this)

  }

  changePunishSize = () => {
    const e = document.getElementById(`${this.props.table}punishselect`)
    e.parentElement.parentElement.parentElement.style.height = `${e.parentElement.offsetHeight}px`
  }

  onPunishTagsChange = (event, values, reason, detail) => {
    this.changePunishSize()

    const durationNode = this.durationRef.current;
    const pointNode = this.pointRef.current;

    var available = this.state.availableOptions;

    this.setState({
      punishments: values
    }, () => {
      const chosenOptions = Array.from(this.state.punishments)
      if (chosenOptions.includes("Mute") || chosenOptions.includes("Tempban")) {
        durationNode.style.display = "block"
      } else {
        durationNode.style.display = "none"

      }

      if (chosenOptions.includes("Warn")) {
        pointNode.style.display = "block"


      } else {
        pointNode.style.display = "none"

      }
    });



    var chosenOptions = Array.from(values)
    if (chosenOptions.includes("Mute")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Mute") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Warn")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Warn") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Kick")) {
      function ok(value) {
        return value != "Mute" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Kick") {
        if (!available.includes("Mute")) {
          available.push("Mute")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Tempban")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Mute"
      }
      const temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Tempban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Ban")) {
      function ok(value) {
        return value != "Mute" && value != "Kick" && value != "Tempban" && value != "Warn"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (((reason === 'remove-option' || reason === 'clear') || reason === 'clear') && detail.option == "Ban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Warn")) {
          available.push("Warn")
        }

      }
    }

    if (reason === 'clear') {
      available = ['Delete message', 'Mute', 'Warn', 'Kick', 'Tempban', 'Ban']
    }

    this.setState({
      availableOptions: available
    })


  }


  onChannelWhitelistChange = (event, values) => {
    const channelobj = this.props.channelobj
    let channels = {}
    values.forEach(value => { channels[value] = channelobj[value] })
    this.setState({
      whitelistedChannels: channels
    })
  }

  onRoleWhitelistChange = (event, values) => {
    const roleobj = this.props.roleobj
    let roles = {}
    values.forEach(value => { roles[value] = roleobj[value] })
    this.setState({
      whitelistedRoles: roles
    })
  }

  amountChange() {
    const value = this.amountLimit.current.value;
    this.setState({ amountLimit: parseInt(value) })
  }

  onPunishTimeChange() {
    const value = parseInt(this.timeAmount.current.value)
    this.setState({ time: value })
  }

  onPointChange() {
    const value = parseInt(this.points.current.value)
    this.setState({ points: value })
  }
  timeUnitChange(e) {
    this.setState({ timeunit: e.target.value })
  }
  componentDidMount() {
    const punishments = this.state.punishments
    if (punishments.includes('Mute')) {
      this.setState({ availableOptions: ['Delete message', 'Mute', 'Warn'] })
      this.durationRef.current.style.display = 'block'
    }
    if (punishments.includes('Warn')) {
      this.setState({ availableOptions: ['Delete message', 'Mute', 'Warn'] })
      this.pointRef.current.style.display = 'block'
    }
    if (punishments.includes('Kick')) {
      this.setState({ availableOptions: ['Delete message', 'Warn', 'Kick'] })
    }
    if (punishments.includes('Tempban')) {
      this.setState({ availableOptions: ['Delete message', 'Warn', 'Tempban'] })
      this.durationRef.current.style.display = 'block'
    }
    if (punishments.includes('Ban')) {
      this.setState({ availableOptions: ['Delete message', 'Ban'] })
    }
    let chwl = {}
    let rlwl = {}
    let ch_whitelists = Object.keys(this.props.channelobj).filter(f => Object.values(this.props.channel_whitelists).includes(this.props.channelobj[f]))
    let rl_whitelists = Object.keys(this.props.roleobj).filter(f => Object.values(this.props.role_whitelists).includes(this.props.roleobj[f]))
    ch_whitelists.forEach(ch => chwl[ch] = this.props.channelobj[ch])
    rl_whitelists.forEach(rl => rlwl[rl] = this.props.roleobj[rl])
    this.setState({ whitelistedChannels: chwl })
    this.setState({ whitelistedRoles: rlwl })
    this.setState({ currentStuff: this.state })

    this.changePunishSize()
    const s = new ResizeSensor(document.getElementById(`${this.props.table}punishselect`).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, this.changePunishSize)


  }
  saveData() {

    const timeval = this.time.current.value
    var logData = {}
    logData = { type: 'nabased', table: this.props.table, guild: this.props.server, punishments: this.state.punishments, whitelistedChannels: this.state.whitelistedChannels, time: this.state.time, whitelistedRoles: this.state.whitelistedRoles, limit: this.state.amountLimit, actualTime: this.state.timeunit, punishTime: 0, warnPoints: this.state.points, timeval: this.state.time }
    if (this.state.punishments.includes("Mute") || this.state.punishments.includes("Tempban")) {
      if (timeval == "seconds") {
        logData.punishTime = this.state.time
      }
      if (timeval == "minutes") {
        logData.punishTime = 60 * this.state.time
      }
      if (timeval == "hours") {
        logData.punishTime = 3600 * this.state.time
      }
      if (timeval == "days") {
        logData.punishTime = 86400 * this.state.time
      }
    }
    (logData)
    fetch('/api/send-automod', {
      method: 'POST',
      body: JSON.stringify(logData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    



    this.setState({ currentStuff: this.state })





  }


  render() {
    return <Grid item xs={12} md={6}>
      <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flexGrow: 1, left: 15, position: "relative", width: "calc(100% - 30px)" }}>
          <Typography style={{ position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)" }}>{this.props.offtype}</Typography>
          <footer style={{ padding: "5px 0" }}></footer>
          <Grid xs={12} style={{ width: "calc(100% - 20px)", position: "relative", left: 10 }}>
            <Grid container >
              <Grid item xs={12}>
                <Typography style={{ fontSize: 16, width: "100%", display: "block" }}>Actions to be taken</Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete id={`${this.props.table}punishselect`} value={this.state.punishments} onChange={this.onPunishTagsChange} multiple style={{ height: 32, width: "100%" }} options={this.state.availableOptions} renderInput={(params) => <TextField {...params} placeholder={this.props.placeholder} />} />
              </Grid>
            </Grid>
            <Grid xs={12} style={{ position: "relative" }} >
              <div ref={this.durationRef} style={{ display: "none", position: "relative" }}>
                <footer style={{ padding: "10px 0" }}></footer>
                <input ref={this.timeAmount} onInput={this.timeAmountChange} defaultValue={this.state.time} style={{ height: 30, fontSize: 18, width: `calc(100% - 110px)` }} type="number" /><select defaultValue={this.state.timeunit} ref={this.time} onChange={this.timeUnitChange} style={{ width: 100, position: "absolute", fontSize: 16, height: 30, right: 0 }}><option value={"seconds"}>Seconds</option> <option value={"minutes"}>Minutes</option> <option value={"hours"}>Hours</option> <option value={"days"}>Days</option></select>
              </div>
              <div ref={this.pointRef} style={{ display: "none", position: "relative" }}>
                <footer style={{ padding: "10px 0" }}></footer>
                <input onInput={this.onPointChange} ref={this.points} defaultValue={this.state.points} style={{ height: 30, fontSize: 18, width: `calc(100% - 80px)` }} type="number" /><Typography style={{ width: 80, textAlign: "right", fontSize: 16, position: "absolute", right: 0, top: "calc(50% - 2px)" }}>Points</Typography>
              </div>
            </Grid>
            <Gap></Gap>
            <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Punish after</Typography>
            <Grid item xs={12} style={{ position: "relative", top: 10 }}><input style={{ height: 30, fontSize: 18, width: `calc(100% - ${this.props.textWidth1 + 5}px)` }} type="number" defaultValue={this.state.amountLimit} onInput={this.amountChange} ref={this.amountLimit} /><Typography style={{ width: this.props.textWidth1, display: "block", fontSize: 16, padding: "3px 0", position: "absolute", textAlign: "center", right: 0, top: "calc(50% - 15px)" }}>{this.props.oftdesc}</Typography></Grid>
            <Gap></Gap>
            <Grid xs={12} style={{ position: "relative" }}>
              <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted channels</Typography>
              <Autocomplete onChange={this.onChannelWhitelistChange} value={Object.keys(this.props.channelobj).filter(f => Object.values(this.props.channel_whitelists).includes(this.props.channelobj[f]))} multiple options={this.props.channels} renderInput={(params) => <TextField {...params} />} />
            </Grid>
            <Gap />
            <Grid xs={12} style={{ position: "relative" }}>
              <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted roles</Typography>
              <Autocomplete onChange={this.onRoleWhitelistChange} value={Object.keys(this.props.roleobj).filter(f => Object.values(this.props.role_whitelists).includes(this.props.roleobj[f]))} multiple options={this.props.roles} renderInput={(params) => <TextField {...params} />} />
            </Grid>

          </Grid>
        </CardContent>
        <footer style={{ padding: "20px 0" }}>
          <Button onClick={this.saveData} style={{ backgroundColor: "cornflowerblue", padding: "5px", position: "relative", left: 40, top: -9 }}><Typography style={{ fontSize: 18, textTransform: "initial", color: "white" }}>Save</Typography></Button>
        </footer>

      </Card>
    </Grid>

  }





}

class TAAutomodSet extends React.Component {
  constructor(props) {
    super(props);
    this.onPunishTagsChange = this.onPunishTagsChange.bind(this);
    this.onChannelWhitelistChange = this.onChannelWhitelistChange.bind(this);
    this.onRoleWhitelistChange = this.onRoleWhitelistChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this)
    this.timeUnitChange = this.timeUnitChange.bind(this)
    this.state = { punishments: this.props.punishments, availableOptions: ["Delete message", "Mute", "Warn", "Kick", "Tempban", "Ban"], whitelistedChannels: this.props.channel_whitelists, whitelistedRoles: this.props.role_whitelists, timeval: this.props.timeval, points: this.props.points, timeunit: this.props.timeunit };
    this.time = React.createRef();
    this.timeAmount = React.createRef();
    this.pointRef = React.createRef();
    this.points = React.createRef();
    this.durationRef = React.createRef();
    this.onPointChange = this.onPointChange.bind(this)
    this.saveData = this.saveData.bind(this)
    this.changePunishSize = this.changePunishSize.bind(this)

  }

  changePunishSize = () => {
    const e = document.getElementById(`${this.props.table}punishselect`)
    e.parentElement.parentElement.parentElement.style.height = `${e.parentElement.offsetHeight}px`
  }

  onPunishTagsChange = (event, values, reason, detail) => {
    this.changePunishSize()

    const durationNode = this.durationRef.current;
    const pointNode = this.pointRef.current;

    var available = this.state.availableOptions;

    this.setState({
      punishments: values
    }, () => {
      const chosenOptions = Array.from(this.state.punishments)
      if (chosenOptions.includes("Mute") || chosenOptions.includes("Tempban")) {
        durationNode.style.display = "block"
      } else {
        durationNode.style.display = "none"

      }

      if (chosenOptions.includes("Warn")) {
        pointNode.style.display = "block"


      } else {
        pointNode.style.display = "none"

      }
    });



    var chosenOptions = Array.from(values)
    if (chosenOptions.includes("Mute")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Mute") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Warn")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Warn") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Kick")) {
      function ok(value) {
        return value != "Mute" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Kick") {
        if (!available.includes("Mute")) {
          available.push("Mute")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Tempban")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Mute"
      }
      const temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Tempban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Ban")) {
      function ok(value) {
        return value != "Mute" && value != "Kick" && value != "Tempban" && value != "Warn"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (((reason === 'remove-option' || reason === 'clear') || reason === 'clear') && detail.option == "Ban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Warn")) {
          available.push("Warn")
        }

      }
    }

    if (reason === 'clear') {
      available = ['Delete message', 'Mute', 'Warn', 'Kick', 'Tempban', 'Ban']
    }

    this.setState({
      availableOptions: available
    })


  }
  onChannelWhitelistChange = (event, values) => {
    const channelobj = this.props.channelobj
    let channels = {}
    values.forEach(value => { channels[value] = channelobj[value] })
    this.setState({
      whitelistedChannels: channels
    })
  }

  onRoleWhitelistChange = (event, values) => {
    const roleobj = this.props.roleobj
    let roles = {}
    values.forEach(value => { roles[value] = roleobj[value] })
    this.setState({
      whitelistedRoles: roles
    })
  }

  saveData() {

    const value = parseInt(this.timeAmount.current.value)
    const timeval = this.time.current.value
    var logData = {}
    logData = { table: this.props.table, type: 'taabased', guild: this.props.server, punishments: this.state.punishments, whitelistedChannels: this.state.whitelistedChannels, whitelistedRoles: this.state.whitelistedRoles, warnPoints: this.state.points, punishTime: this.state.timeval, timeval: this.state.timeval, timeunit: this.state.timeunit }
    if (this.state.punishments.includes("Mute") || this.state.punishments.includes("Tempban")) {
      if (timeval == "seconds") {
        logData.punishTime = this.state.timeval
      }
      if (timeval == "minutes") {
        logData.punishTime = 60 * this.state.timeval
      }
      if (timeval == "hours") {
        logData.punishTime = 3600 * this.state.timeval
      }
      if (timeval == "days") {
        logData.punishTime = 86400 * this.state.timeval
      }
    }

    fetch('/api/send-automod', {
      method: 'POST',
      body: JSON.stringify(logData),
      headers: {
        'Content-Type': 'application/json'
      }
    })



    this.setState({ currentStuff: this.state })


  }
  timeUnitChange(e) {
    this.setState({ timeunit: e.target.value })
  }
  onPointChange() {
    const value = parseInt(this.points.current.value)
    this.setState({ points: value })
  }

  componentDidMount() {
    const punishments = this.state.punishments
    if (punishments.includes('Mute')) {
      this.setState({ availableOptions: ['Delete message', 'Mute', 'Warn'] })
      this.durationRef.current.style.display = 'block'
    }
    if (punishments.includes('Warn')) {
      this.setState({ availableOptions: ['Delete message', 'Mute', 'Warn'] })
      this.pointRef.current.style.display = 'block'
    }
    if (punishments.includes('Kick')) {
      this.setState({ availableOptions: ['Delete message', 'Warn', 'Kick'] })
    }
    if (punishments.includes('Tempban')) {
      this.setState({ availableOptions: ['Delete message', 'Warn', 'Tempban'] })
      this.durationRef.current.style.display = 'block'
    }
    if (punishments.includes('Ban')) {
      this.setState({ availableOptions: ['Delete message', 'Ban'] })
    }
    let chwl = {}
    let rlwl = {}
    let ch_whitelists = Object.keys(this.props.channelobj).filter(f => Object.values(this.props.channel_whitelists).includes(this.props.channelobj[f]))
    let rl_whitelists = Object.keys(this.props.roleobj).filter(f => Object.values(this.props.role_whitelists).includes(this.props.roleobj[f]))
    ch_whitelists.forEach(ch => chwl[ch] = this.props.channelobj[ch])
    rl_whitelists.forEach(rl => rlwl[rl] = this.props.roleobj[rl])
    this.setState({ whitelistedChannels: chwl })
    this.setState({ whitelistedRoles: rlwl })
    this.setState({ currentStuff: this.state })
    this.changePunishSize()
    const s = new ResizeSensor(document.getElementById(`${this.props.table}punishselect`).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, this.changePunishSize)
  }

  onTimeChange = (e) => {
    const value = parseInt(e.target.value)
    this.setState({ timeval: value })
  }

  render() {
    return <Grid item xs={12} md={6}>
      <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flexGrow: 1, left: 15, position: "relative", width: "calc(100% - 30px)" }}>
          <Typography style={{ position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)" }}>{this.props.offtype}</Typography>
          <footer style={{ padding: "5px 0" }}></footer>
          <Grid xs={12} style={{ width: "calc(100% - 20px)", position: "relative", left: 10 }}>
          <Grid container >
              <Grid item xs={12}>
                <Typography style={{ fontSize: 16, width: "100%", display: "block" }}>Actions to be taken</Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete id={`${this.props.table}punishselect`} value={this.state.punishments} onChange={this.onPunishTagsChange} multiple style={{ height: 32, width: "100%" }} options={this.state.availableOptions} renderInput={(params) => <TextField {...params} placeholder={this.props.placeholder} />} />
              </Grid>
            </Grid>
            <Grid xs={12} style={{ position: "relative" }} >
              <div ref={this.durationRef} style={{ display: "none", position: "relative" }}>
                <footer style={{ padding: "10px 0" }}></footer>
                <input ref={this.timeAmount} onInput={this.timeAmountChange} defaultValue={this.state.timeval} style={{ height: 30, fontSize: 18, width: `calc(100% - 110px)` }} type="number" /><select defaultValue={this.state.timeunit} ref={this.time} onChange={this.timeUnitChange} style={{ width: 100, position: "absolute", fontSize: 16, height: 30, right: 0 }}><option value={"seconds"}>Seconds</option> <option value={"minutes"}>Minutes</option> <option value={"hours"}>Hours</option> <option value={"days"}>Days</option></select>
              </div>
              <div ref={this.pointRef} style={{ display: "none", position: "relative" }}>
                <footer style={{ padding: "10px 0" }}></footer>
                <input onInput={this.onPointChange} ref={this.points} defaultValue={this.state.points} style={{ height: 30, fontSize: 18, width: `calc(100% - 80px)` }} type="number" /><Typography style={{ width: 80, textAlign: "right", fontSize: 16, position: "absolute", right: 0, top: "calc(50% - 2px)" }}>Points</Typography>
              </div>
            </Grid>
            <Gap></Gap>
            <Grid xs={12} style={{ position: "relative" }}>
              <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted channels</Typography>
              <Autocomplete onChange={this.onChannelWhitelistChange} value={Object.keys(this.props.channelobj).filter(f => Object.values(this.props.channel_whitelists).includes(this.props.channelobj[f]))} multiple options={this.props.channels} renderInput={(params) => <TextField {...params} />} />
            </Grid>
            <Gap />
            <Grid xs={12} style={{ position: "relative" }}>
              <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted roles</Typography>
              <Autocomplete onChange={this.onRoleWhitelistChange} value={Object.keys(this.props.roleobj).filter(f => Object.values(this.props.role_whitelists).includes(this.props.roleobj[f]))} multiple options={this.props.roles} renderInput={(params) => <TextField {...params} />} />
            </Grid>
          </Grid>
        </CardContent>
        <footer style={{ padding: "20px 0" }}>
          <Button onClick={this.saveData} style={{ backgroundColor: "cornflowerblue", padding: "5px", position: "relative", left: 40, top: -9 }}><Typography style={{ fontSize: 18, textTransform: "initial", color: "white" }}>Save</Typography></Button>
        </footer>

      </Card>
    </Grid>

  }





}

class Selfbot extends React.Component {
  constructor(props) {
    super(props);
    this.onPunishTagsChange = this.onPunishTagsChange.bind(this);
    this.onRoleWhitelistChange = this.onRoleWhitelistChange.bind(this);
    this.state = { punishments: this.props.punishments, availableOptions: ["Delete message", "Mute", "Warn", "Kick", "Tempban", "Ban"], whitelistedRoles: this.props.role_whitelists, points: this.props.points, timeval: this.props.timeval, timeunit: this.props.timeunit };
    this.time = React.createRef();
    this.amountLimit = React.createRef();
    this.timeAmount = React.createRef();
    this.pointRef = React.createRef();
    this.points = React.createRef();
    this.durationRef = React.createRef();
    this.saveData = this.saveData.bind(this)
    this.onPointChange = this.onPointChange.bind(this)
    this.timeChange = this.timeChange.bind(this)
    this.timeUnitChange = this.timeUnitChange.bind(this)
    this.changePunishSize = this.changePunishSize.bind(this)

  }

  changePunishSize = () => {
    const e = document.getElementById(`${this.props.table}punishselect`)
    e.parentElement.parentElement.parentElement.style.height = `${e.parentElement.offsetHeight}px`
  }

  onPunishTagsChange = (event, values, reason, detail) => {
    this.changePunishSize()
    const durationNode = this.durationRef.current;
    const pointNode = this.pointRef.current;

    var available = this.state.availableOptions;

    this.setState({
      punishments: values
    }, () => {
      const chosenOptions = Array.from(this.state.punishments)
      if (chosenOptions.includes("Mute") || chosenOptions.includes("Tempban")) {
        durationNode.style.display = "block"
      } else {
        durationNode.style.display = "none"

      }

      if (chosenOptions.includes("Warn")) {
        pointNode.style.display = "block"


      } else {
        pointNode.style.display = "none"

      }
    });



    var chosenOptions = Array.from(values)
    if (chosenOptions.includes("Mute")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Mute") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Warn")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Warn") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Kick")) {
      function ok(value) {
        return value != "Mute" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Kick") {
        if (!available.includes("Mute")) {
          available.push("Mute")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Tempban")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Mute"
      }
      const temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Tempban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Ban")) {
      function ok(value) {
        return value != "Mute" && value != "Kick" && value != "Tempban" && value != "Warn"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (((reason === 'remove-option' || reason === 'clear') || reason === 'clear') && detail.option == "Ban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Warn")) {
          available.push("Warn")
        }

      }
    }

    if (reason === 'clear') {
      available = ['Delete message', 'Mute', 'Warn', 'Kick', 'Tempban', 'Ban']
    }

    this.setState({
      availableOptions: available
    })


  }


  onRoleWhitelistChange = (event, values) => {
    const roleobj = this.props.roleobj
    let roles = {}
    values.forEach(value => { roles[value] = roleobj[value] })
    this.setState({
      whitelistedRoles: roles
    })
  }

  saveData() {

    const value = parseInt(this.timeAmount.current.value)
    const timeval = this.time.current.value
    var logData = {}
    logData = { guild: this.props.server, punishments: this.state.punishments, type: 'selfbot', table: 'selfbot', whitelistedRoles: this.state.whitelistedRoles, timeval: this.state.timeval, timeunit: this.state.timeunit, points: this.state.points, duration: 0 }
    if (this.state.punishments.includes("Mute") || this.state.punishments.includes("Tempban")) {
      if (timeval === "seconds") {
        logData.duration = this.state.timeval
      }
      if (timeval === "minutes") {
        logData.duration = 60 * this.state.timeval
      }
      if (timeval === "hours") {
        logData.duration = 3600 * this.state.timeval
      }
      if (timeval === "days") {
        logData.duration = 86400 * this.state.timeval
      }

      fetch('/api/send-automod', {
        method: 'POST',
        body: JSON.stringify(logData),
        headers: {
          'Content-Type': 'application/json'
        }
      })




      this.setState({ currentStuff: this.state })

    }
  }


  onPointChange() {
    const value = parseInt(this.points.current.value)
    this.setState({ points: value })
  }

  timeChange(e) {
    const value = e.target.value
    this.setState({ timeval: parseInt(value) })

  }

  timeUnitChange(e) {
    this.setState({ timeunit: e.target.value })
  }

  componentDidMount() {
    const punishments = this.state.punishments
    if (punishments.includes('Mute')) {
      this.setState({ availableOptions: ['Delete message', 'Mute', 'Warn'] })
      this.durationRef.current.style.display = 'block'
    }
    if (punishments.includes('Warn')) {
      this.setState({ availableOptions: ['Delete message', 'Mute', 'Warn'] })
      this.pointRef.current.style.display = 'block'
    }
    if (punishments.includes('Kick')) {
      this.setState({ availableOptions: ['Delete message', 'Warn', 'Kick'] })
    }
    if (punishments.includes('Tempban')) {
      this.setState({ availableOptions: ['Delete message', 'Warn', 'Tempban'] })
      this.durationRef.current.style.display = 'block'
    }
    if (punishments.includes('Ban')) {
      this.setState({ availableOptions: ['Delete message', 'Ban'] })
    }
    let rlwl = {}
    let rl_whitelists = Object.keys(this.props.roleobj).filter(f => Object.values(this.props.role_whitelists).includes(this.props.roleobj[f]))
    rl_whitelists.forEach(rl => rlwl[rl] = this.props.roleobj[rl])
    this.setState({ whitelistedRoles: rlwl })
    this.setState({ currentStuff: this.state })
    this.changePunishSize()
    const s = new ResizeSensor(document.getElementById(`${this.props.table}punishselect`).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, this.changePunishSize)
  }

  render() {
    return <Grid item xs={12} md={6}>
      <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flexGrow: 1, left: 15, position: "relative", width: "calc(100% - 30px)" }}>
          <Typography style={{ position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)" }}>{this.props.offtype}</Typography>
          <footer style={{ padding: "5px 0" }}></footer>
          <Grid xs={12} style={{ width: "calc(100% - 20px)", position: "relative", left: 10 }}>
          <Grid container >
              <Grid item xs={12}>
                <Typography style={{ fontSize: 16, width: "100%", display: "block" }}>Actions to be taken</Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete id={`${this.props.table}punishselect`} value={this.state.punishments} onChange={this.onPunishTagsChange} multiple style={{ height: 32, width: "100%" }} options={this.state.availableOptions} renderInput={(params) => <TextField {...params} placeholder={this.props.placeholder} />} />
              </Grid>
            </Grid>
            <Grid xs={12} style={{ position: "relative" }} >
              <div ref={this.durationRef} style={{ display: "none", position: "relative" }}>
                <footer style={{ padding: "10px 0" }}></footer>
                <input ref={this.timeAmount} onInput={this.timeAmountChange} defaultValue={this.state.time} style={{ height: 30, fontSize: 18, width: `calc(100% - 110px)` }} type="number" /><select defaultValue={this.state.actualTime} ref={this.time} onChange={this.timeUnitChange} style={{ width: 100, position: "absolute", fontSize: 16, height: 30, right: 0 }}><option value={"seconds"}>Seconds</option> <option value={"minutes"}>Minutes</option> <option value={"hours"}>Hours</option> <option value={"days"}>Days</option></select>
              </div>
              <div ref={this.pointRef} style={{ display: "none", position: "relative" }}>
                <footer style={{ padding: "10px 0" }}></footer>
                <input onInput={this.onPointChange} ref={this.points} defaultValue={this.state.points} style={{ height: 30, fontSize: 18, width: `calc(100% - 80px)` }} type="number" /><Typography style={{ width: 80, textAlign: "right", fontSize: 16, position: "absolute", right: 0, top: "calc(50% - 2px)" }}>Points</Typography>
              </div>
            </Grid>
            <Gap />
            <Grid xs={12} style={{ position: "relative" }}>
              <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted roles</Typography>
              <Autocomplete onChange={this.onRoleWhitelistChange} multiple options={this.props.roles} value={Object.keys(this.props.roleobj).filter(f => Object.values(this.props.role_whitelists).includes(this.props.roleobj[f]))} renderInput={(params) => <TextField {...params} />} />
            </Grid>
          </Grid>
        </CardContent>
        <footer style={{ padding: "20px 0" }}>
          <Button onClick={this.saveData} style={{ backgroundColor: "cornflowerblue", padding: "5px", position: "relative", left: 40, top: -9 }}><Typography style={{ fontSize: 18, textTransform: "initial", color: "white" }}>Save</Typography></Button>
        </footer>

      </Card>
    </Grid>

  }





}

const BlacklistBasedSet = (props) => {
  const wholeThing = React.useRef()
  const [categories, setCategories] = useState(props.categories)
  const onPunishTagsChange = (event, values, reason, detail) => {
    
    changePunishSize()
    let categoryInfo = categories
    console.log(getIndex(event, 'punishments'))
    const index = getIndex(event, 'punishments').index
    const whole = getIndex(event, 'punishments').whole
    const durationNode = Array.from(wholeThing.current.getElementsByClassName('duration'))[index];
    const pointNode = Array.from(wholeThing.current.getElementsByClassName('warnpoints'))[index];
    var available = categories[index].availableOptions;
    categoryInfo[index].punishments = values


    if (values.includes('Mute') || values.includes('Tempban')) {
      durationNode.style.display = 'block'
    } else {
      durationNode.style.display = 'none'
    }
    if (values.includes('Warn')) {
      pointNode.style.display = 'block'
    } else {
      pointNode.style.display = 'none'
    }

    var chosenOptions = Array.from(values)

    if (chosenOptions.includes("Mute")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (((reason === 'remove-option' || reason === 'clear') || reason === 'clear') && detail.option == "Mute") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Warn")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (((reason === 'remove-option' || reason === 'clear') || reason === 'clear') && detail.option == "Warn") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Kick")) {
      function ok(value) {
        return value != "Mute" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if ((reason === 'remove-option' || reason === 'clear') && detail.option == "Kick") {
        if (!available.includes("Mute")) {
          available.push("Mute")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Tempban")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Mute"
      }
      const temp = available.filter(ok)
      available = temp
    } else {
      if ((reason === 'remove-option' || reason === 'clear') && detail.option == "Tempban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Ban")) {
      function ok(value) {
        return value != "Mute" && value != "Kick" && value != "Tempban" && value != "Warn"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (((reason === 'remove-option' || reason === 'clear') || reason === 'clear') && detail.option == "Ban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Warn")) {
          available.push("Warn")
        }

      }
    }

    categoryInfo[index].availableOptions = available

    setCategories([...categoryInfo])


  }

  const createCategory = () => {
    let currentCats = categories
    currentCats.push({ title: 'New category', punishments: [], availableOptions: ['Delete message', 'Mute', 'Warn', 'Kick', 'Tempban', 'Ban'], words: {}, points: 0, timeval: 0, timeunit: 'minutes', whitelistedRoles: {}, whitelistedChannels: {}, duration: 0 })
    setCategories([...currentCats])
  }

  const onWordsChange = (event, values, reason, detail) => {
    const target = event.target
    const grid = target.parentElement.parentElement.parentElement.parentElement.parentElement
    const wordInputs = Array.from(target.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('inputWords'))
    const index = getIndex(event, "inputWords").index
    console.log(getIndex(event, "inputWords").index)
    console.log(target)
    var addedWords = categories[index].words;
    const checked = Array.from(grid.getElementsByClassName('searchForSubs'))[index].checked
    var toExact = ""
    const categoryInfo = categories
    if ((reason === 'remove-option')) {
      delete addedWords[String(detail.option)]
    }
    else if (reason === 'clear') {
      addedWords = {}
    }
    else {
      if (checked) {
        toExact = "Substring"
      } else {
        toExact = "NoSubstring"


      }
      addedWords[String(Array.from(values)[Array.from(values).length - 1])] = toExact

    }
    categoryInfo[index].words = addedWords
    setCategories([...categoryInfo])
  }

  const onTimevalChange = (event) => {
    let categoryInfo = categories
    const target = event.target
    const timeValInputs = Array.from(target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('duration'))
    const index = timeValInputs.indexOf(target.parentElement.parentElement)
    const timeunit = target.parentElement.children[1].value

    categoryInfo[index].timeval = parseInt(target.value)
    if (timeunit == 'seconds') {
      categoryInfo[index].duration = parseInt(target.value)
    }
    if (timeunit == 'minutes') {
      categoryInfo[index].duration = 60 * parseInt(target.value)
    }
    if (timeunit == 'hours') {
      categoryInfo[index].duration = 3600 * parseInt(target.value)
    }
    if (timeunit == 'days') {
      categoryInfo[index].duration = 86400 * parseInt(target.value)
    }

    setCategories([...categoryInfo])
  }

  const onTimeunitChange = (event) => {
    let categoryInfo = categories
    const target = event.target
    const timeUnitInputs = Array.from(target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('duration'))
    const index = timeUnitInputs.indexOf(target.parentElement.parentElement)
    categoryInfo[index].timeunit = target.value
    const timeval = target.parentElement.children[0].value
    if (timeunit == 'seconds') {
      categoryInfo[index].duration = timeval
    }
    if (timeunit == 'minutes') {
      categoryInfo[index].duration = 60 * timeval
    }
    if (timeunit == 'hours') {
      categoryInfo[index].duration = 3600 * timeval
    }
    if (timeunit == 'days') {
      categoryInfo[index].duration = 86400 * timeval
    }
    setCategories([...categoryInfo])
  }

  const setTitle = (e) => {
    let categoryInfo = categories
    categoryInfo[Array.from(e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('title')).indexOf(e.target.parentElement.parentElement)].title = e.target.value
    setCategories([...categoryInfo])
  }

  const onPointChange = (e) => {
    let categoryInfo = categories
    categoryInfo[Array.from(e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('warnpoints')).indexOf(e.target.parentElement.parentElement)].points = parseInt(e.target.value)

    setCategories([...categoryInfo])
  }

  const getIndex = (e, className) => {
    if (e.target.tagName == 'LI') {
      console.log(parseInt(e.target.parentElement.className.slice(42)))
      return { index: parseInt(e.target.parentElement.className.slice(42)), whole: e.target.parentElement.parentElement.parentElement.parentElement }
    }
    if (e.target.tagName == 'svg' && e.target.className.animVal == 'MuiSvgIcon-root MuiSvgIcon-fontSizeSmall') {
      const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
      const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
      return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement }
    }
    if (e.target.tagName == 'svg' && e.target.className.animVal == 'MuiSvgIcon-root MuiChip-deleteIcon') {
      const target = e.target.parentElement.parentElement.parentElement.parentElement
      const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
      return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement }

    }
    if (e.target.tagName == 'path') {
      if (e.target.outerHTML == '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>') {
        const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
        return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement }

      }
      if (e.target.outerHTML == '<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>') {
        const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
        const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
        return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement }

      }

    }
    if (e.target.tagName == 'BUTTON') {
      const target = e.target.parentElement.parentElement.parentElement.parentElement
      const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
      return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement }

    }
    if (e.target.tagName == 'INPUT') {
      const target = e.target.parentElement.parentElement.parentElement
      const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
      return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement }

    }

  }

  const channelWhitelistChange = (e, values) => {
    const index = getIndex(e, 'channelWhitelist').index
    let channels = {}
    values.forEach(value => { channels[value] = props.channelobj[value] })
    let categoryInfo = categories
    categoryInfo[index].whitelistedChannels = channels
    setCategories([...categoryInfo])
  }

  const roleWhitelistChange = (e, values) => {
    const index = getIndex(e, 'roleWhitelist').index
    let roles = {}
    values.forEach(value => { roles[value] = props.roleobj[value] })
    let categoryInfo = categories
    categoryInfo[index].whitelistedRoles = roles
    setCategories([...categoryInfo])
  }

  const saveData = () => {
    let logData = { guild: props.server, table: props.table, type: 'blacklist', categories: categories }
    fetch('/api/send-automod', {
      method: 'POST',
      body: JSON.stringify(logData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const changePunishSize = () => {
    const finders = Array.from(wholeThing.current.getElementsByClassName("punishments"))
    finders.forEach(e => e.style.height = `${e.children[0].offsetHeight}px`)
  }

  useEffect(() => {
    categories.forEach(category => {
      const punishments = category.punishments
      let categoryInfo = categories
      if (punishments.includes('Mute')) {
        categoryInfo[categories.indexOf(category)].availableOptions = ['Delete message', 'Mute', 'Warn']
      }
      if (punishments.includes('Kick')) {
        categoryInfo[categories.indexOf(category)].availableOptions = ['Delete message', 'Warn', 'Kick']
      }
      if (punishments.includes('Tempban')) {
        categoryInfo[categories.indexOf(category)].availableOptions = ['Delete message', 'Warn', 'Tempban']
      }
      if (punishments.includes('Ban')) {
        categoryInfo[categories.indexOf(category)].availableOptions = ['Delete message', 'Ban']
      }

      if (category.punishments.includes('Mute') || category.punishments.includes('Tempban')) {
        Array.from(wholeThing.current.getElementsByClassName('duration'))[categories.indexOf(category)].style.display = 'block'
      }
      if (category.punishments.includes('Warn')) {
        categoryInfo[categories.indexOf(category)].availableOptions = ['Delete message', 'Mute', 'Warn']
        Array.from(wholeThing.current.getElementsByClassName('warnpoints'))[categories.indexOf(category)].style.display = 'block'
      }
      let chwl = {}
      let rlwl = {}

      let ch_whitelists = Object.keys(props.channelobj).filter(f => Object.values(category.whitelistedChannels).includes(props.channelobj[f]))
      let rl_whitelists = Object.keys(props.roleobj).filter(f => Object.values(category.whitelistedRoles).includes(props.roleobj[f]))
      ch_whitelists.forEach(ch => chwl[ch] = props.channelobj[ch])
      rl_whitelists.forEach(rl => rlwl[rl] = props.roleobj[rl])
      category.whitelistedChannels = chwl
      category.whitelistedRoles = rlwl

      setCategories([...categoryInfo])
    })
    
    changePunishSize()
    const finders = Array.from(wholeThing.current.getElementsByClassName("punishments"))
    finders.forEach(f => {const s = new ResizeSensor(f.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, changePunishSize)})
  }, [])

  const deleteRule = (e) => {
    if (e.target.tagName == 'path') {
      const target = e.target.parentElement.parentElement.parentElement
      const whole = target.parentElement.parentElement
      const deletes = Array.from(whole.getElementsByClassName('delete'))
      const index = deletes.indexOf(target)
      const categoryInfo = categories
      categoryInfo.splice(index, 1)
      setCategories([...categoryInfo])
    }
    if (e.target.tagName == 'svg') {
      const target = e.target.parentElement.parentElement
      const whole = target.parentElement.parentElement
      const deletes = Array.from(whole.getElementsByClassName('delete'))
      const index = deletes.indexOf(target)
      const categoryInfo = categories
      categoryInfo.splice(index, 1)
      setCategories([...categoryInfo])
    }
    if (e.target.tagName == 'SPAN') {
      const target = e.target
      const whole = target.parentElement.parentElement
      const deletes = Array.from(whole.getElementsByClassName('delete'))
      const index = deletes.indexOf(target)
      const categoryInfo = categories
      categoryInfo.splice(index, 1)
      setCategories([...categoryInfo])
    }
  }

  let subString;
  if (props.offtype == 'Bad Words') {
    subString = <div style={{ width: "100%", position: "relative", height: 24, top: 10 }}>
      <input className={'searchForSubs'} type="checkbox" style={{ width: 18, height: 18, position: "absolute", left: -5, top: -1 }} />
      <Typography style={{ fontSize: 16, width: "calc(100% - 30px)%", display: "flex", position: "absolute", left: 25, top: 0 }}>Search for substrings</Typography>
    </div>
  } else {
    subString = <></>
  }

  let categorySection;
  if (categories.length > 0) {
    categorySection = categories.map((category) => {
      const whitelistCh = Object.keys(props.channelobj).filter(f => Object.values(category.whitelistedChannels).includes(props.channelobj[f]))
      return <div key={categories.indexOf(category)} className={'category'}>
        <TextField style={{ width: 200 }} className={'title'} defaultValue={category.title} onInput={setTitle} /><IconButton onClick={deleteRule} className={`delete ${categories.indexOf(category)}`} style={{ color: 'red', height: 35, width: 35, position: 'relative', top: 'calc(100% - 17.5px)' }} component="span"> <CloseIcon /> </IconButton>
        <footer style={{ padding: "10px 0" }}></footer>
        <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Words</Typography>
        <Autocomplete className={'inputWords'} multiple onChange={onWordsChange} value={Object.keys(category.words)} freeSolo options={[]} renderInput={(params) => <TextField {...params} placeholder={props.placehold} />} />
        {subString}
        <footer style={{ padding: "10px 0" }}></footer>
        <Grid container>
        <Grid item xs={12}>
        <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Punishments</Typography>
        </Grid>
        <Grid item xs={12}>
        <Autocomplete className={'punishments'} onChange={onPunishTagsChange} value={category.punishments} multiple style={{ height: 32, width: "100%" }} options={category.availableOptions} ListboxProps={{ className: `MuiAutocomplete-listbox punishAutocomplete${categories.indexOf(category)}` }} renderInput={(params) => <TextField {...params} placeholder={props.placeholder} />} />
        </Grid>
        </Grid>
        <Grid xs={12} style={{ position: "relative" }}>
        <div className={'duration'} style={{ display: 'none' }}>
          <footer style={{ padding: "10px 0" }}></footer>
          <input defaultValue={category.timeval} onInput={onTimevalChange} style={{ height: 30, fontSize: 18, width: `calc(100% - 110px)` }} type="number" /><select onChange={onTimeunitChange} defaultValue={category.timeunit} style={{ width: 100, position: "absolute", fontSize: 16, height: 30, right: 0 }}><option value={"seconds"}>Seconds</option> <option value={"minutes"}>Minutes</option> <option value={"hours"}>Hours</option> <option value={"days"}>Days</option></select>
        </div>
        <div style={{ display: "none" }} className={'warnpoints'}>
          <footer style={{ padding: "10px 0" }}></footer>
            <input onInput={onPointChange} defaultValue={category.points} style={{ height: 30, fontSize: 18, width: `calc(100% - 80px)` }} type="number" /><Typography style={{ width: 80, textAlign: "right", fontSize: 16, position: "absolute", right: 0, top: "calc(50% - 2px)" }}>Points</Typography>
        </div>
        </Grid>
        <Gap></Gap>
        <Grid xs={12} style={{ position: "relative" }}>
          <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted channels</Typography>
          <Autocomplete className={'channelWhitelist'} multiple options={props.channels} onChange={channelWhitelistChange} renderInput={(params) => <TextField {...params} />} value={Object.keys(category.whitelistedChannels)} ListboxProps={{ className: `MuiAutocomplete-listbox punishAutocomplete${categories.indexOf(category)}` }} />
        </Grid>
        <Gap />
        <Grid xs={12} style={{ position: "relative" }}>
          <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted roles</Typography>
          <Autocomplete value={Object.keys(category.whitelistedRoles)} multiple className={'roleWhitelist'} onChange={roleWhitelistChange} options={props.roles} renderInput={(params) => <TextField {...params} />} ListboxProps={{ className: `MuiAutocomplete-listbox punishAutocomplete${categories.indexOf(category)}` }} />
        </Grid>
        <footer style={{ padding: "10px 0" }}></footer>
        <footer style={{ padding: "10px 0" }}></footer>
      </div>
    })
  } else {
    categorySection = <Typography style={{ paddingRight: 5, fontSize: 16 }}>{newC}</Typography>
  }



  return (<Grid ref={wholeThing} item xs={12} md={6}>
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1, left: 15, position: "relative", width: "calc(100% - 30px)" }}>
        <Typography style={{ position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)" }}>{props.offtype}</Typography>
        <footer style={{ padding: "5px 0" }}></footer>
        <Grid xs={12} style={{ width: "calc(100% - 20px)", position: 'relative', left: 10 }}>
          <Button onClick={() => { createCategory() }} style={{ backgroundColor: "lightgray" }}><AddIcon style={{ color: "black", fontSize: 14, position: "relative", left: -3, }} /><Typography style={{ color: "black", fontSize: 14 }}>CREATE NEW CATEGORY</Typography></Button>
          <footer style={{ padding: "10px 0" }}></footer>
          <Divider style={{ opacity: 0.4, position: "relative", top: 0, width: "100%", }}></Divider>
          <footer style={{ padding: "5px 0" }}></footer>
          <Typography style={{ fontSize: 18, width: "100%", display: "block" }}>{props.categoryName}</Typography>
          <footer style={{ padding: "10px 0" }}></footer>
          {categorySection}
          <Gap />



        </Grid>

      </CardContent>

      <footer style={{ padding: "20px 0" }}>
        <Button onClick={saveData} style={{ backgroundColor: "cornflowerblue", padding: "5px", position: "relative", left: 40, top: -9 }}><Typography style={{ fontSize: 18, textTransform: "initial", color: "white" }}>Save</Typography></Button>
      </footer>

    </Card>
  </Grid>)



}

const CatProfileBasedSet = (props) => {
  console.log(props.categories)

  const [categories, setCategories] = useState(props.categories)
  const onPunishTagsChange = (event, values, reason, detail) => {
    changePunishSize()

    let categoryInfo = categories
    const index = getIndex(event, 'punishments').index
    const whole = getIndex(event, 'punishments').whole

    const durationNode = Array.from(wholeThing.current.getElementsByClassName('duration'))[index];
    const pointNode = Array.from(wholeThing.current.getElementsByClassName('warnpoints'))[index];
    var available = categories[index].availableOptions;
    categoryInfo[index].punishments = values


    if (values.includes('Mute') || values.includes('Tempban')) {
      durationNode.style.display = 'block'
    } else {
      durationNode.style.display = 'none'
    }
    if (values.includes('Warn')) {
      pointNode.style.display = 'block'
    } else {
      pointNode.style.display = 'none'
    }

    var chosenOptions = Array.from(values)

    if (chosenOptions.includes("Mute")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Mute") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Warn")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Warn") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Kick")) {
      function ok(value) {
        return value != "Mute" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Kick") {
        if (!available.includes("Mute")) {
          available.push("Mute")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Tempban")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Mute"
      }
      const temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Tempban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Ban")) {
      function ok(value) {
        return value != "Mute" && value != "Kick" && value != "Tempban" && value != "Warn"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (((reason === 'remove-option' || reason === 'clear') || reason === 'clear') && detail.option == "Ban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Warn")) {
          available.push("Warn")
        }

      }
    }

    if (reason === 'clear') {
      available = ['Delete message', 'Mute', 'Warn', 'Kick', 'Tempban', 'Ban']
    }



    categoryInfo[index].availableOptions = available

    setCategories([...categoryInfo])


  }

  const changePunishSize = () => {
    const finders = Array.from(wholeThing.current.getElementsByClassName("punishments"))
    finders.forEach(e => e.style.height = `${e.children[0].offsetHeight}px`)
  }

  const wholeThing = React.useRef()

  useEffect(() => {
    categories.forEach(category => {
      const punishments = category.punishments
      let categoryInfo = categories
      if (punishments.includes('Mute')) {
        categoryInfo[categories.indexOf(category)].availableOptions = ['Mute', 'Warn']
      }
      if (punishments.includes('Kick')) {
        categoryInfo[categories.indexOf(category)].availableOptions = ['Warn', 'Kick']
      }
      if (punishments.includes('Tempban')) {
        categoryInfo[categories.indexOf(category)].availableOptions = ['Warn', 'Tempban']
      }
      if (punishments.includes('Ban')) {
        categoryInfo[categories.indexOf(category)].availableOptions = ['Ban']
      }

      if (category.punishments.includes('Mute') || category.punishments.includes('Tempban')) {
        Array.from(wholeThing.current.getElementsByClassName('duration'))[categories.indexOf(category)].style.display = 'block'
      }
      if (category.punishments.includes('Warn')) {
        categoryInfo[categories.indexOf(category)].availableOptions = ['Delete message', 'Mute', 'Warn']
        Array.from(wholeThing.current.getElementsByClassName('warnpoints'))[categories.indexOf(category)].style.display = 'block'
      }

      let rlwl = {}

      let rl_whitelists = Object.keys(props.roleobj).filter(f => Object.values(category.whitelistedRoles).includes(props.roleobj[f]))
      rl_whitelists.forEach(rl => rlwl[rl] = props.roleobj[rl])
      category.whitelistedRoles = rlwl

      setCategories([...categoryInfo])
    })

    changePunishSize()
    const finders = Array.from(wholeThing.current.getElementsByClassName("punishments"))
    finders.forEach(f => {const s = new ResizeSensor(f.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, changePunishSize)})
  }, [])

  const createCategory = () => {
    let currentCats = categories
    currentCats.push({ title: 'New category', punishments: [], availableOptions: ['Mute', 'Warn', 'Kick', 'Tempban', 'Ban'], words: {}, points: 0, timeval: 0, timeunit: 'minutes', whitelistedRoles: {}, duration: 0 })
    setCategories([...currentCats])
  }

  const onWordsChange = (event, values, reason, detail) => {
    const index = getIndex(event, 'inputWords').index
    var addedWords = categories[index].words;
    const checked = Array.from(wholeThing.current.getElementsByClassName('searchForSubs'))[index].checked
    var toExact = ""
    const categoryInfo = categories
    if ((reason === 'remove-option')) {
      delete addedWords[String(detail.option)]
    }
    else if (reason === 'clear') {
      addedWords = {}
    }
    else {
      if (checked) {
        toExact = "Substring"
      } else {
        toExact = "NoSubstring"


      }
      console.log(categories)
      addedWords[String(Array.from(values)[Array.from(values).length - 1])] = toExact

    }
    categoryInfo[index].words = addedWords
    setCategories([...categoryInfo])
  }

  const onTimevalChange = (event) => {
    let categoryInfo = categories
    const target = event.target
    const timeValInputs = Array.from(target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('duration'))
    const index = timeValInputs.indexOf(target.parentElement.parentElement)
    const timeunit = target.parentElement.children[1].value

    categoryInfo[index].timeval = parseInt(target.value)
    if (timeunit == 'seconds') {
      categoryInfo[index].duration = parseInt(target.value)
    }
    if (timeunit == 'minutes') {
      categoryInfo[index].duration = 60 * parseInt(target.value)
    }
    if (timeunit == 'hours') {
      categoryInfo[index].duration = 3600 * parseInt(target.value)
    }
    if (timeunit == 'days') {
      categoryInfo[index].duration = 86400 * parseInt(target.value)
    }

    setCategories([...categoryInfo])
  }

  const onTimeunitChange = (event) => {
    let categoryInfo = categories
    const target = event.target
    const timeUnitInputs = Array.from(target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('duration'))
    const index = timeUnitInputs.indexOf(target.parentElement.parentElement)
    categoryInfo[index].timeunit = target.value
    const timeval = target.parentElement.children[0].value
    if (timeunit == 'seconds') {
      categoryInfo[index].duration = timeval
    }
    if (timeunit == 'minutes') {
      categoryInfo[index].duration = 60 * timeval
    }
    if (timeunit == 'hours') {
      categoryInfo[index].duration = 3600 * timeval
    }
    if (timeunit == 'days') {
      categoryInfo[index].duration = 86400 * timeval
    }
    setCategories([...categoryInfo])
  }

  const setTitle = (e) => {
    let categoryInfo = categories
    categoryInfo[Array.from(e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('title')).indexOf(e.target.parentElement.parentElement)].title = e.target.value
    setCategories([...categoryInfo])
  }

  const onPointChange = (e) => {
    let categoryInfo = categories
    categoryInfo[Array.from(e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('warnpoints')).indexOf(e.target.parentElement.parentElement)].points = parseInt(e.target.value)

    setCategories([...categoryInfo])
  }

  const getIndex = (e, className) => {
    if (e.target.tagName == 'LI') {
      return { index: parseInt(e.target.parentElement.className.slice(42,)), whole: e.target.parentElement.parentElement.parentElement.parentElement }
    }
    if (e.target.tagName == 'svg' && e.target.className.animVal == 'MuiSvgIcon-root MuiSvgIcon-fontSizeSmall') {
      const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
      const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
      return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement }
    }
    if (e.target.tagName == 'svg' && e.target.className.animVal == 'MuiSvgIcon-root MuiChip-deleteIcon') {
      const target = e.target.parentElement.parentElement.parentElement.parentElement
      const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
      return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement }

    }
    if (e.target.tagName == 'path') {
      if (e.target.outerHTML == '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>') {
        const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
        return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement }

      }
      if (e.target.outerHTML == '<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>') {
        const target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
        const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
        return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement }

      }

    }
    if (e.target.tagName == 'BUTTON') {
      const target = e.target.parentElement.parentElement.parentElement.parentElement
      const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
      return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement }

    }
    if (e.target.tagName == 'INPUT') {
      const target = e.target.parentElement.parentElement.parentElement
      const index = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(className)).indexOf(target)
      return { index: index, whole: e.target.parentElement.parentElement.parentElement.parentElement.parentElement }

    }

  }

  const roleWhitelistChange = (e, values) => {
    const index = getIndex(e, 'roleWhitelist').index
    let roles = {}
    values.forEach(value => { roles[value] = props.roleobj[value] })
    let categoryInfo = categories
    categoryInfo[index].whitelistedRoles = roles
    setCategories([...categoryInfo])
  }

  const saveData = () => {
    let logData = { guild: props.server, table: props.table, type: 'blacklist', categories: categories }
    fetch('/api/send-automod', {
      method: 'POST',
      body: JSON.stringify(logData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const deleteRule = (e) => {
    if (e.target.tagName == 'path') {
      const target = e.target.parentElement.parentElement.parentElement
      const whole = target.parentElement.parentElement
      const deletes = Array.from(whole.getElementsByClassName('delete'))
      const index = deletes.indexOf(target)
      const categoryInfo = categories
      categoryInfo.splice(index, 1)
      setCategories([...categoryInfo])
    }
    if (e.target.tagName == 'svg') {
      const target = e.target.parentElement.parentElement
      const whole = target.parentElement.parentElement
      const deletes = Array.from(whole.getElementsByClassName('delete'))
      const index = deletes.indexOf(target)
      const categoryInfo = categories
      categoryInfo.splice(index, 1)
      setCategories([...categoryInfo])
    }
    if (e.target.tagName == 'SPAN') {
      const target = e.target
      const whole = target.parentElement.parentElement
      const deletes = Array.from(whole.getElementsByClassName('delete'))
      const index = deletes.indexOf(target)
      const categoryInfo = categories
      categoryInfo.splice(index, 1)
      setCategories([...categoryInfo])
    }
  }
  let categorySection;
  if (categories.length > 0) {
    categorySection = categories.map((category) => {
      return <div className={'category'} key={categories.indexOf(category)}>
        <TextField style={{ width: 200 }} className={'title'} defaultValue={category.title} onInput={setTitle} /><IconButton onClick={deleteRule} className={`delete ${categories.indexOf(category)}`} style={{ color: 'red', height: 35, width: 35, position: 'relative', top: 'calc(100% - 17.5px)' }} component="span"> <CloseIcon /> </IconButton>
        <footer style={{ padding: "10px 0" }}></footer>
        <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Words</Typography>
        <Autocomplete className={'inputWords'} multiple onChange={onWordsChange} value={Object.keys(category.words)} freeSolo options={[]} renderInput={(params) => <TextField {...params} placeholder={props.placehold} />} />
        <div style={{ width: "100%", position: "relative", height: 24, top: 10 }}>
          <input className={'searchForSubs'} type="checkbox" style={{ width: 18, height: 18, position: "absolute", left: -5, top: -1 }} />
          <Typography style={{ fontSize: 16, width: "calc(100% - 30px)%", display: "flex", position: "absolute", left: 25, top: 0 }}>Search for substrings</Typography>
        </div>
        <footer style={{ padding: "10px 0" }}></footer>
        <Grid container>
        <Grid item xs={12}>
        <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Punishments</Typography>
        </Grid>
        <Grid item xs={12}>
        <Autocomplete className={'punishments'} onChange={onPunishTagsChange} value={category.punishments} multiple style={{ height: 32, width: "100%" }} options={category.availableOptions} ListboxProps={{ className: `MuiAutocomplete-listbox punishAutocomplete${categories.indexOf(category)}` }} renderInput={(params) => <TextField {...params} placeholder={props.placeholder} />} />
        </Grid>
        </Grid>
        <Grid xs={12} style={{ position: "relative" }}>
        <div className={'duration'} style={{ display: "none" , position: 'relative'}}>
          <footer style={{ padding: "10px 0" }}></footer>
          <input defaultValue={category.timeval} onInput={onTimevalChange} style={{ height: 30, fontSize: 18, width: `calc(100% - 110px)` }} type="number" /><select onChange={onTimeunitChange} defaultValue={category.timeunit} style={{ width: 100, position: "absolute", fontSize: 16, height: 30, right: 0 }}><option value={"seconds"}>Seconds</option> <option value={"minutes"}>Minutes</option> <option value={"hours"}>Hours</option> <option value={"days"}>Days</option></select>
        </div>
        <div style={{ display: "none" , position: 'relative'}} className={'warnpoints'}>
          <footer style={{ padding: "10px 0" }}></footer>
            <input onInput={onPointChange} defaultValue={category.points} style={{ height: 30, fontSize: 18, width: `calc(100% - 80px)` }} type="number" /><Typography style={{ width: 80, textAlign: "right", fontSize: 16, position: "absolute", right: 0, top: "calc(50% - 2px)" }}>Points</Typography>
        </div>
        </Grid>
        <Gap></Gap>
        <Grid xs={12} style={{ position: "relative" }}>
          <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted roles</Typography>
          <Autocomplete value={Object.keys(category.whitelistedRoles)} multiple className={'roleWhitelist'} onChange={roleWhitelistChange} options={props.roles} renderInput={(params) => <TextField {...params} />} ListboxProps={{ className: `MuiAutocomplete-listbox punishAutocomplete${categories.indexOf(category)}` }} />
        </Grid>
        <footer style={{ padding: "10px 0" }}></footer>
        <footer style={{ padding: "10px 0" }}></footer>
      </div>
    })
  } else {
    categorySection = <Typography style={{ paddingRight: 5, fontSize: 16 }}>{newC}</Typography>
  }
  return (<Grid ref={wholeThing} item xs={12} md={6}>
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1, left: 15, position: "relative", width: "calc(100% - 30px)" }}>
        <Typography style={{ position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)" }}>{props.offtype}</Typography>
        <footer style={{ padding: "5px 0" }}></footer>
        <Grid xs={12} style={{ width: "calc(100% - 20px)", position: 'relative', left: 10 }}>
          <Button onClick={() => { createCategory() }} style={{ backgroundColor: "lightgray" }}><AddIcon style={{ color: "black", fontSize: 14, position: "relative", left: -3, }} /><Typography style={{ color: "black", fontSize: 14 }}>CREATE NEW CATEGORY</Typography></Button>
          <footer style={{ padding: "10px 0" }}></footer>
          <Divider style={{ opacity: 0.4, position: "relative", top: 0, width: "100%", }}></Divider>
          <footer style={{ padding: "5px 0" }}></footer>
          <Typography style={{ fontSize: 18, width: "100%", display: "block" }}>{props.categoryName}</Typography>
          <footer style={{ padding: "10px 0" }}></footer>
          {categorySection}
          <Gap />



        </Grid>

      </CardContent>

      <footer style={{ padding: "20px 0" }}>
        <Button onClick={saveData} style={{ backgroundColor: "cornflowerblue", padding: "5px", position: "relative", left: 40, top: -9 }}><Typography style={{ fontSize: 18, textTransform: "initial", color: "white" }}>Save</Typography></Button>
      </footer>

    </Card>
  </Grid>)



}


class ProfileTAAutomodSet extends React.Component {
  constructor(props) {
    super(props);
    this.onPunishTagsChange = this.onPunishTagsChange.bind(this);
    this.onRoleWhitelistChange = this.onRoleWhitelistChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this)
    this.timeUnitChange = this.timeUnitChange.bind(this)
    this.state = { punishments: this.props.punishments, availableOptions: ["Mute", "Warn", "Kick", "Tempban", "Ban"], whitelistedRoles: this.props.role_whitelists, timeval: this.props.timeval, points: this.props.points, timeunit: this.props.timeunit };
    this.time = React.createRef();
    this.timeAmount = React.createRef();
    this.pointRef = React.createRef();
    this.points = React.createRef();
    this.durationRef = React.createRef();
    this.onPointChange = this.onPointChange.bind(this)
    this.saveData = this.saveData.bind(this)
    this.changePunishSize = this.changePunishSize.bind(this)

  }
  changePunishSize = () => {
    const e = document.getElementById(`${this.props.table}punishselect`)
    e.parentElement.parentElement.parentElement.style.height = `${e.parentElement.offsetHeight}px`
  }

  onPunishTagsChange = (event, values, reason, detail) => {
    this.changePunishSize()

    const durationNode = this.durationRef.current;
    const pointNode = this.pointRef.current;

    var available = this.state.availableOptions;

    this.setState({
      punishments: values
    }, () => {
      const chosenOptions = Array.from(this.state.punishments)
      if (chosenOptions.includes("Mute") || chosenOptions.includes("Tempban")) {
        durationNode.style.display = "block"
      } else {
        durationNode.style.display = "none"

      }

      if (chosenOptions.includes("Warn")) {
        pointNode.style.display = "block"


      } else {
        pointNode.style.display = "none"

      }
    });



    var chosenOptions = Array.from(values)

    if (chosenOptions.includes("Mute")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Mute") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Warn")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Warn") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Kick")) {
      function ok(value) {
        return value != "Mute" && value != "Ban" && value != "Tempban"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Kick") {
        if (!available.includes("Mute")) {
          available.push("Mute")
        }

        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Tempban")) {
      function ok(value) {
        return value != "Kick" && value != "Ban" && value != "Mute"
      }
      const temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Tempban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
      }
    }

    if (chosenOptions.includes("Ban")) {
      function ok(value) {
        return value != "Mute" && value != "Kick" && value != "Tempban" && value != "Warn"
      }
      var temp = available.filter(ok)
      available = temp
    } else {
      if (reason === 'remove-option' && detail.option == "Ban") {
        if (!available.includes("Kick")) {
          available.push("Kick")
        }

        if (!available.includes("Mute")) {
          available.push("Mute")
        }
        if (!available.includes("Ban")) {
          available.push("Ban")
        }
        if (!available.includes("Tempban")) {
          available.push("Tempban")
        }
        if (!available.includes("Warn")) {
          available.push("Warn")
        }

      }
    }

    if (reason === 'clear') {
      available = ['Mute', 'Warn', 'Kick', 'Tempban', 'Ban']
    }

    this.setState({
      availableOptions: available
    })


  }

  onRoleWhitelistChange = (event, values) => {
    const roleobj = this.props.roleobj
    let roles = {}
    values.forEach(value => { roles[value] = roleobj[value] })
    this.setState({
      whitelistedRoles: roles
    })
  }

  saveData() {

    const value = parseInt(this.timeAmount.current.value)
    const timeval = this.time.current.value
    var logData = {}
    logData = { table: this.props.table, type: 'profiletaabased', guild: this.props.server, punishments: this.state.punishments, whitelistedRoles: this.state.whitelistedRoles, warnPoints: this.state.points, punishTime: this.state.timeval, timeval: this.state.timeval, timeunit: this.state.timeunit }
    if (this.state.punishments.includes("Mute") || this.state.punishments.includes("Tempban")) {
      if (timeval == "seconds") {
        logData.punishTime = this.state.timeval
      }
      if (timeval == "minutes") {
        logData.punishTime = 60 * this.state.timeval
      }
      if (timeval == "hours") {
        logData.punishTime = 3600 * this.state.timeval
      }
      if (timeval == "days") {
        logData.punishTime = 86400 * this.state.timeval
      }
    }

    fetch('/api/send-automod', {
      method: 'POST',
      body: JSON.stringify(logData),
      headers: {
        'Content-Type': 'application/json'
      }
    })




    this.setState({ currentStuff: this.state })


  }
  timeUnitChange(e) {
    this.setState({ timeunit: e.target.value })
  }
  onPointChange() {
    const value = parseInt(this.points.current.value)
    this.setState({ points: value })
  }

  componentDidMount() {
    const punishments = this.state.punishments
    if (punishments.includes('Mute')) {
      this.setState({ availableOptions: ['Mute', 'Warn'] })
      this.durationRef.current.style.display = 'block'
    }
    if (punishments.includes('Warn')) {
      this.setState({ availableOptions: ['Mute', 'Warn'] })
      this.pointRef.current.style.display = 'block'
    }
    if (punishments.includes('Kick')) {
      this.setState({ availableOptions: ['Warn', 'Kick'] })
    }
    if (punishments.includes('Tempban')) {
      this.setState({ availableOptions: ['Warn', 'Tempban'] })
      this.durationRef.current.style.display = 'block'
    }
    if (punishments.includes('Ban')) {
      this.setState({ availableOptions: ['Ban'] })
    }
    let rlwl = {}
    let rl_whitelists = Object.keys(this.props.roleobj).filter(f => Object.values(this.props.role_whitelists).includes(this.props.roleobj[f]))
    rl_whitelists.forEach(rl => rlwl[rl] = this.props.roleobj[rl])
    this.setState({ whitelistedRoles: rlwl })
    this.setState({ currentStuff: this.state })
    this.changePunishSize()
    const s = new ResizeSensor(document.getElementById(`${this.props.table}punishselect`).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, this.changePunishSize)
  }

  onTimeChange = (e) => {
    const value = parseInt(e.target.value)
    this.setState({ timeval: value })
  }

  render() {
    return <Grid item xs={12} md={6}>
      <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent style={{ flexGrow: 1, left: 15, position: "relative", width: "calc(100% - 30px)" }}>
          <Typography style={{ position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)" }}>{this.props.offtype}</Typography>
          <footer style={{ padding: "5px 0" }}></footer>
          <Grid xs={12} style={{ width: "calc(100% - 20px)", position: "relative", left: 10 }}>
          <Grid container >
              <Grid item xs={12}>
                <Typography style={{ fontSize: 16, width: "100%", display: "block" }}>Actions to be taken</Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete id={`${this.props.table}punishselect`} value={this.state.punishments} onChange={this.onPunishTagsChange} multiple style={{ height: 32, width: "100%" }} options={this.state.availableOptions} renderInput={(params) => <TextField {...params} placeholder={this.props.placeholder} />} />
              </Grid>
            </Grid>
            <Grid xs={12} style={{ position: "relative" }} >
              <div ref={this.durationRef} style={{ display: "none", position: "relative" }}>
                <footer style={{ padding: "10px 0" }}></footer>
                <input ref={this.timeAmount} onInput={this.timeAmountChange} defaultValue={this.state.timeValue} style={{ height: 30, fontSize: 18, width: `calc(100% - 110px)` }} type="number" /><select defaultValue={this.state.actualTime} ref={this.time} onChange={this.timeUnitChange} style={{ width: 100, position: "absolute", fontSize: 16, height: 30, right: 0 }}><option value={"seconds"}>Seconds</option> <option value={"minutes"}>Minutes</option> <option value={"hours"}>Hours</option> <option value={"days"}>Days</option></select>
              </div>
              <div ref={this.pointRef} style={{ display: "none", position: "relative" }}>
                <footer style={{ padding: "10px 0" }}></footer>
                <input onInput={this.onPointChange} ref={this.points} defaultValue={this.state.points} style={{ height: 30, fontSize: 18, width: `calc(100% - 80px)` }} type="number" /><Typography style={{ width: 80, textAlign: "right", fontSize: 16, position: "absolute", right: 0, top: "calc(50% - 2px)" }}>Points</Typography>
              </div>
            </Grid>
            <Gap />
            <Grid xs={12} style={{ position: "relative" }}>
              <Typography style={{ fontSize: 15, width: "100%", display: "block" }}>Whitelisted roles</Typography>
              <Autocomplete onChange={this.onRoleWhitelistChange} value={Object.keys(this.props.roleobj).filter(f => Object.values(this.props.role_whitelists).includes(this.props.roleobj[f]))} multiple options={this.props.roles} renderInput={(params) => <TextField {...params} />} />
            </Grid>
          </Grid>
        </CardContent>
        <footer style={{ padding: "20px 0" }}>
          <Button onClick={this.saveData} style={{ backgroundColor: "cornflowerblue", padding: "5px", position: "relative", left: 40, top: -9 }}><Typography style={{ fontSize: 18, textTransform: "initial", color: "white" }}>Save</Typography></Button>
        </footer>

      </Card>
    </Grid>

  }





}


export {
  General,
  SpamAutomodSet,
  NABasedAutomodSet,
  TAAutomodSet,
  Selfbot,
  BlacklistBasedSet,
  CatProfileBasedSet,
  ProfileTAAutomodSet,
  icons,
  equals

}