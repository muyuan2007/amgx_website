import React, {useState, useRef} from "react";
import { Divider, TextField,Typography,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import GavelIcon from '@material-ui/icons/Gavel';
import ListIcon from '@material-ui/icons/List';
import SecurityIcon from '@material-ui/icons/Security';
import SettingsIcon from '@material-ui/icons/Settings';
import PolicyIcon from '@material-ui/icons/Policy';
import classes from './Bot.module.css'
const icons = {"General Settings": <SettingsIcon />, "Automod": <SecurityIcon />, "Logging":<ListIcon />, "Autopunish": <GavelIcon />, "Auto Kick/Ban":<PolicyIcon />}

const columns = [
    { field: "id", headerName: "ID",  hide: true},
    { field: "time", headerName: 'Time', flex:0.5, wordWrap: "normal"},
    { field: "user", headerName: "User ID", flex:0.5},
    { field: "action", headerName:"Action",flex:1},
];
const rows = [];

// const columns = [
//     { field: 'id', headerName: 'ID', width: 90, hide: true },

    
//     {
//       field: 'firstName',
//       headerName: 'First name',
//       width: 150,
//       "Edit"able: true,
//     },
//     {
//       field: 'lastName',
//       headerName: 'Last name',
//       width: 150,
//       "Edit"able: true,
//     },
//     {
//       field: 'age',
//       headerName: 'Age',
//       type: 'number',
//       width: 110,
//       "Edit"able: true,
//     },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 160,
//       valueGetter: (params) =>
//         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
//   ];
  
//   const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ];
const Bot = (props) => {

    const name = useRef()
    const prefix = useRef()

    const getName = () => {
        (name.current.value)
    }

    const getPrefix = () => {
        (prefix.current.value)
    }

    const setName = () => {
        const goAhead = fetch('/api/send-general', {
            method: 'POST',
            body: JSON.stringify({guild: props.guildid, name: name.current.value}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    const setPrefix = () => {
        const goAhead = fetch('/api/send-general', {
            method: 'POST',
            body: JSON.stringify({guild: props.guildid, prefix: prefix.current.value}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    return (
        <>
        
        <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={4}>
        <Grid item key={"ok"} xs={12} lg={6}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography style={{position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)"}}>Bot Settings</Typography>                    
                    <footer className={classes.footerInBetween}></footer>
                    <Grid className={classes.settingBPair}>
                    <span className={classes.optionSub}>Command Prefix</span>
                    <textarea ref={prefix} onInput={getPrefix} defaultValue={props.prefix}className={classes.settingTF}></textarea>
                    <Button style={{width: 40, height: 30, backgroundColor: "cornflowerblue",position: "absolute", right: 0, bottom: 0}} onClick={setPrefix}>Set</Button>
                    </Grid>
                </CardContent>
                <footer className={classes.cardFooter}></footer>
            </Card>
        </Grid>
        
        
        </Grid>
        
        </Container>
        </>
    )
}

export default Bot
export {
    icons
}