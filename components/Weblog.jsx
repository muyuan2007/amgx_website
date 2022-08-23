import React from "react";
import { Typography,Box,Divider, Tabs, Tab,TextField,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import classes from './Weblog.module.css'

const columns = [
    { field: "id", headerName: "ID",  hide: true},
    { field: "time", headerName: 'Time', flex:0.5, wordWrap: "normal"},
    { field: "userid", headerName: "User ID", flex:0.3},
    { field: "action", headerName:"Action",flex:1},
];
const Weblog = (props) => {

    return (
        <>
        <Container maxWidth="xl" className={classes.cardGrid}>
            <Grid item maxWidth="xl" xs={12}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                    <Typography style={{position: "relative", fontSize: 30, left:10,fontFamily: "verdana", top: 0, width: "calc(100% - 80px)"}}>Actions</Typography>
                        <footer className={classes.footerInBetween}></footer>
                        <div style={{width: "calc(100% - 20px)", height: 400, position: "relative", top: 15, left: 10 , wordWrap:"break-word"}}>
                        <DataGrid rowsPerPageOptions={[20, 50, 100]} rows={Array.from(props.actions).reverse()} columns={columns}></DataGrid>
                        </div>
                    </CardContent>
                    <footer className={classes.cardFooter}></footer>
                </Card>

            </Grid>
        </Container>
        </>
    )
    
}

export default Weblog