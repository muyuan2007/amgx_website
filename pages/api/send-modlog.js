
async function handler(req, res) {
    if (req.method === 'POST') {
        const { Pool, Client } = require('pg')
        const client = new Client({
            user:process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password:process.env.DB_PASS,
            port:process.env.DB_PORT
        })
        client.connect()

        
        const data = req.body;
       

        const guildid = BigInt(data.guild)
        const type = data.type
        const actions = data.actions
        let channel = undefined
        if (data.channel !== 'undefined') {
            channel = BigInt(data.channel)
        }

        const spawn = require("child_process").spawn

        function checkIfIdExists() {
            return new Promise((resolve, reject) => {
                client.query('SELECT * FROM modlogs where guild_id=$1', [guildid], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })

            })
        }

        if (type === 'message') {
            await checkIfIdExists().then(res => {
                if (res.rows.length == 0) 
                    {client.query('INSERT INTO modlogs (guild_id, message_actions, message_channel) VALUES ($1, $2, $3)', [guildid, actions, channel])}
                else {
                    client.query('UPDATE modlogs SET guild_id=$1, message_actions=$2, message_channel=$3 WHERE guild_id=$1',[guildid, actions, channel])
                }})
            
        
        }
        if (type === 'member') {
            await checkIfIdExists().then(res => {
                if (res.rows.length == 0) 
                {client.query('INSERT INTO modlogs (guild_id, member_actions, member_channel) VALUES ($1, $2, $3)', [guildid, actions, channel])}
                else {
                    client.query('UPDATE modlogs SET guild_id=$1, member_actions=$2, member_channel=$3 WHERE guild_id=$1',[guildid, actions, channel])
                }})
        }
        if (type === 'moderation') {
            await checkIfIdExists().then(res => {
                if (res.rows.length == 0) 
                {client.query('INSERT INTO modlogs (guild_id, moderations, moderation_channel) VALUES ($1, $2, $3)', [guildid, actions, channel])}
                else {
                    client.query('UPDATE modlogs SET guild_id=$1, moderations=$2, moderation_channel=$3 WHERE guild_id=$1',[guildid, actions, channel])
                }})
        }
        if (type === 'server') {
            await checkIfIdExists().then(res => {
                if (res.rows.length == 0) 
                {client.query('INSERT INTO modlogs (guild_id, server_actions, server_channel) VALUES ($1, $2, $3)', [guildid, actions, channel])}
                else {
                    client.query('UPDATE modlogs SET guild_id=$1, server_actions=$2, server_channel=$3 WHERE guild_id=$1',[guildid, actions, channel])
                }})
        }
        if (type === 'vc') {
            await checkIfIdExists().then(res => {
                if (res.rows.length == 0) 
                {client.query('INSERT INTO modlogs (guild_id, vc_actions, voicestate_channel) VALUES ($1, $2, $3)', [guildid, actions, channel])}
                else {
                    client.query('UPDATE modlogs SET guild_id=$1, vc_actions=$2, voicestate_channel=$3 WHERE guild_id=$1',[guildid, actions, channel])
                }})
        }

       
        
        client.end()        
    }

    res.status(201).json({message: "success"})

}

export default handler