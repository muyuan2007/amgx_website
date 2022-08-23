
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from "@mui/icons-material/Menu";
// import Typography from '@material-ui/material/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Autocomplete} from '@material-ui/lab'
import { Button, Typography, Container} from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button';
// import SaveIcon from '@material-ui/icons/Save'
import Box from '@material-ui/core/Box';
// import ListItemText from "@material-ui/material/ListItemText";
// import { createMuiTheme} from "@material-ui/core";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, makeStyles} from '@material-ui/core/styles';

import classes from './my.module.css'

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff8f00"
    },
    secondary: {
      main: "#ffcc80"
    }
  }
});

const whiteButton = makeStyles({
  root : {
    color : 'white'
  }
})





const Home = () => {
  const bclass = whiteButton();
  return (
    
    
    <ThemeProvider theme={theme}>
     <>
     
        
            <div className={classes.App} style={{position: 'relative', top: 100}}>
                <header>
               

                    
                    

                    

                    <Grid container direction={"column"} spacing={3} justifyContent="center">
                    <Grid item>
                        <Typography variant='h3'>
                        Welcome!
                        </Typography>
                    </Grid>
                    
                    <Grid item>
                        <Typography variant='subtitle1'>
                        Please login
                    </Typography>
                    </Grid>
                    
                    <Grid item>
                        <Box m={2} pt={3}>
                        <Grid container direction="row" spacing={3} justifyContent="center" m={1000}>
                            <Grid item>
                            <TextField   variant="outlined" label='First and Last Name' m={20} pt={3}/>
                            </Grid>

                            <Grid item >
                            <TextField className="App-Text" variant="outlined" label='Library Card Number' m={20} pt={3}/>
                            </Grid>

                        </Grid>
                        </Box>
                    </Grid>

                    <Grid item>
                        <Button className={bclass.root} variant="contained" color="primary" onClick={()=>alert("logged in")}>Log in</Button>
                    </Grid>
                    
                    </Grid>

               
                </header>
            </div>
            </>
    </ThemeProvider>

  )
}

export default Home