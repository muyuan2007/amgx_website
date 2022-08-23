import React from "react";
import { Typography,Box,Divider, Tabs, Tab,TextField,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'

const commands = [{'command': 'warn', 'description':'Give a member warning points.', 'usage': 'a!warn [member] [amount] <reason>', 'permissions': 'kick members, ban members'},
                  {'command': 'unwarn', 'description':'Remove warning points from a member.', 'usage': 'a!warn [member] [amount]', 'permissions': 'kick members, ban members'},
                  {'command': 'warns', 'description':"Check a member's warning points.", 'usage': 'a!warns [member]', 'permissions': 'no special permissions required'},
                  {'command': 'mute', 'description':'Timeout/mute a member.', 'usage': 'a!mute <member> <duration> [reason]', 'permissions': 'moderate/mute members'},
                  {'command': 'unmute', 'description':'Un-timeout/unmute a member.', 'usage': 'a!unmute <member>', 'permissions': 'moderate/mute members'},
                  {'command': 'kick', 'description':'Kick a member.', 'usage': 'a!kick <member> [reason]', 'permissions': 'kick members'},
                  {'command': 'tempban', 'description':'Temporarily ban a member.', 'usage': 'a!tempban <member> <duration> [reason]', 'permissions': 'ban members'},
                  {'command': 'ban', 'description':'Ban a member.', 'usage': 'a!ban [member] <reason>', 'permissions': 'ban members'},
                  {'command': 'unban', 'description':'Unban a member.', 'usage': 'a!unban [member]', 'permissions': 'ban members'},
                  {'command': 'amsettings', 'description':'Check dashboard configuration settings for a certain type of setting.', 'usage': 'a!amsettings [table]', 'permissions': 'no special permissions required'},
                  {'command': 'purge', 'description':'Purge messages.', 'usage': 'a!purge <amount>', 'permissions': 'manage messages'},
                  {'command': 'prefix', 'description': 'Check the current command prefix', 'usage': 'a!prefix', 'permissions': 'no special permissions required'},
                  {'command': 'changeprefix', 'description': 'Change the command prefix', 'usage': 'a!changeprefix <prefix>', 'permissions': 'manage server'},
                  {'command': 'infractions', 'description': "Check all of a member's infractions", 'usage': 'a!infractions <member> [page]', 'permissions': 'no special permissions required'}
                                
    ]
const desc = "Arguments surrounded by greater/less than signs are required. Arguments surrounded by brackets are optional. Any duration arguments have to be inputted in seconds. The 'table' argument must be one of modlogs, messagespam, emojispam, mentionspam, stickerspam, attachmentspam, linkspam, duplicatecharacters, duplicatemessages, linebreaks, toomanycaps, invites, selfbot, nsfwcontent, hatespeech, badwords, badlinks, badnicks, badnames, badstatuses, nsfwpfp, autopunish, autokickban, or automodgeneral. For the 'unwarn' command, enter 0 as the argument to remove all infraction points."
const Commands = () => {
    return (
        <div style={{width: 'calc(100% - 100px)', position: 'relative', left: 50}}>
        <Typography style={{fontSize: 25, fontWeight: 600}}>Commands</Typography>
        <table style={{fontFamily: 'arial', position: 'relative', borderCollapse: 'collapse'}}>
            <tr>
                <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Command</th>
                <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Description</th>
                <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Usage</th>
                <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Permissions required</th>
            </tr>
            {commands.map((command) => (
                <tr key={command.command}>
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{command.command}</td> 
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{command.description}</td> 
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{command.usage}</td> 
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{command.permissions}</td> 
                </tr>
            ))}
        </table>
        <br />
        <Typography style={{fontSize: 15}}>{desc}</Typography>
        </div>

    )
}

export default Commands