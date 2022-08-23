import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    full: {
        width: "100vw",
    },
    
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },homeImg:{
        
        ['@media (max-width:800px)']:{
            display: "none"
        }
        
    },
    menuGrid:{
        position: "relative",
        
    },

    tabGrid:{
        width: "calc(100% - 20px)",
        position: "relative",
        left: 10
    },
    icon: {
        color: "white",
        width: 21
        
    },
    
    menuIcon:{
        fontSize: 30
    },
    normallyInvis: {
        display: "none",
        background: "transparent", '&:hover': { background: "transparent"},
        ['@media (max-width:800px)']:{
            display: "flex"
        },
        
    },
    menuButton:{
        background: "transparent",
        color: "white"
    },
    menuThingy: {
        width: 30,
        background: "transparent", '&:hover': { background: "transparent"},
        color: "white"
    },
    menuButtonText:{
        marginLeft: 5,
        textTransform: "initial",
        fontSize: 15,
        ['@media (max-width:930px)']:{
            display: "none"
        },
        color: "white"
        
        
    },
    cardGrid:{
        padding: '20px 0',
        width: 'calc(100% - 50px)',
    },
    card:{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    cardContent:{
        flexGrow: 1,
        left:15,
        position: "relative",
        width: "calc(100% - 30px)"
    },
    cardTitle:{
        position: "relative",
        fontSize: 30,
        left: 10,
        fontFamily: "verdana",
        top: 0,
        width: "calc(100% - 80px)"
    },
    channelSelectHeader:{
        position: "relative",
        fontSize: 20,
        top: 5

    },
    selectGrid:{
        position:"relative",
        left: 10
    },
    select:{
        width: "calc(100% - 20px)",
        position: "relative",
        top: 10
    },

    cardFooter:{
        padding: "40px 0"
        },
    buttonGrid:{
        position: "relative",
        top:25,
        width: "calc(100% - 20px)",
        left: 15
    },
    NMLFooter:{
        padding: "20px 0"
    },

    button:{
        backgroundColor:"lightgray",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        
    },

    buttonText:{
        textTransform: "initial",
        fontSize: 18
    },
    settingTF:{
        position: "relative",
        
        width: "calc(100% - 40px)",
        resize: "none",
        display: "flex",
        height: 30,
        fontSize: 20,
        outline: "none",
        border: "1px solid lightgray",
        fontFamily: "arial"
    },
    webLogTab:{
        backgroundColor:"lightgray",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",       
    },

    atbtn:{
        backgroundColor: "#00c45c",
        color: "white",
        '&:hover': { backgroundColor: "#00db66"},
        left: 10

    },

    webLogTop:{
        position: "relative",
        left: 10
    },
    settingBPair:{
        width: "calc(100% - 20px)",
        position: "relative",
        left: 10
    },
    dataTable:{
        width: "100%"
    },

    sideButton:{
        width: 40,
        height: 30,
        backgroundColor: "cornflowerblue",
        '&:hover': { background: "cornflowerblue"},
        position: "absolute",
        right: 0,
        bottom: 0
        
    },
    
    footer:{
        backgroundColor: theme.palette.background.paper,
        padding: '60px 0'
    },
    expression:{
        color: "red",
        fontFamily: "monospace",
        fontSize: 13,
        display: "inline"
    },
    description: {
        fontSize: 13,
        display: "inline"
    },
    
    titleGrid:{
        position: "relative"
    },

    welcomeCardTitle: {
        fontFamily: "verdana",
        fontSize: 30,
        width: "calc(100% - 80px)",
       
        ['@media (max-width:650px)']:{
            fontSize: 18
        },
    },
    divider1: {
        opacity: 0.4,
        position: "relative",
        top: 0,
        width: "100%",
    },
    divider2: {
        opacity: 0.4,
        position: "relative",
        top: 40,
        width: "100%",
    },
    divider3: {
        opacity: 0.4,
        position: "relative",
        top: 60,
        width: "100%",
    },
    footerInBetween: {
        padding: "10px 0"
    },
    optionSub:{
        fontSize: 16,
        width: "100%",
        display: "block"

    },
    wlcslcgrid:{
        position: "relative",
        top: 0
        },
    wlcMSGChanSLC:{
        position: "relative",
        left: 0,
        top: -5,
        width: "100%",
        display: "block"
    },
    msgGrid:{
        position: "relative",
        top: 0,
        
    },
    welcomeTF: {
        width: "100%",
        border: "1px solid #e6e6e6",
        borderRadius: 10,
        resize: "none",
        height: 100
        
    },
    welcomeTSZ: {
        fontSize: 15
    },
    autoComplete:{
        width: "100%"
    },
    //switch
    root: {
        width: 70,
        height: 40,
        padding: 0,
        margin: 0,
        position: "absolute",
        right: 5,
        verticalAlign: "baseline",
        top: "50%",
        transform: 'translateY(-50%)'
        
        
        
        
      },
      switchBase: {
        padding: 1,
        '&$checked': {
          // This is the part that animates the thumb when the switch is toggled (to the right)
          transform: 'translateX(31px)',
          
          // This is the thumb color
          color: theme.palette.common.white,
          '& + $track': {
            // This is the track's background color (in this example, the iOS green)
            backgroundColor: '#52d869',
            opacity: 1,
            border: 'none',
          },
        },
      },
      thumb: {
        width: 30,
        height: 30,
        position: "relative",
        top: 6,
        left: 4,
        ['@media (max-width:700px)']:{
            width: 28,
            height: 28,
            
        },
        
    }
        ,
      track: {
        borderRadius: 19,
        border: `1px solid ${theme.palette.grey[300]}`,
        // This is the background color when the switch is off
        backgroundColor: theme.palette.grey[200],
        height: 35,
        opacity: 1,
        marginTop: 4,
        transition: theme.transitions.create(['background-color', 'border']),
      },
      checked: {},
      focusVisible: {}
    
}));

export default useStyles; 
