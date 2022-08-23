

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

        function checkIfIdExists(table) {
            return new Promise((resolve, reject) => {
                client.query(`SELECT * FROM ${table} where guild_id=$1`, [guildid], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })

            })
        }
       

        if (data.type == 'spam') {
            await checkIfIdExists(data.table).then(res => {
                let { table, punishments, whitelistedChannels, whitelistedRoles, limit, timeValue, actualTime, punishTime, warnPoints } = data
                if (res.rows.length == 0) {
                    client.query(`INSERT INTO ${table} (guild_id, punishments, maxes, channel_whitelists, role_whitelists, points, duration, timeunit, timeval) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [guildid, punishments, limit, whitelistedChannels, whitelistedRoles, warnPoints, punishTime, actualTime, timeValue])}
                else {
                    client.query(`UPDATE ${table} SET guild_id=$1, punishments=$2, maxes=$3, channel_whitelists=$4, role_whitelists=$5, points=$6, duration=$7, timeunit=$8, timeval=$9 WHERE guild_id=$1`,[guildid, punishments, limit, whitelistedChannels, whitelistedRoles, warnPoints, punishTime, actualTime, timeValue])
                }})
                
         
        } if (data.type == 'general') {
            await checkIfIdExists('automodgeneral').then(res => {
                let { whitelistedChannels, whitelistedRoles } = data
                if (res.rows.length == 0) {
                    client.query(`INSERT INTO automodgeneral (guild_id, channel_whitelists, role_whitelists) VALUES ($1, $2, $3)`, [guildid, whitelistedChannels, whitelistedRoles])}
                else {
                    client.query(`UPDATE automodgeneral SET guild_id=$1, channel_whitelists=$2, role_whitelists=$3 WHERE guild_id=$1`,[guildid, whitelistedChannels, whitelistedRoles])
                }})
           
        } if (data.type == 'nabased') {
            await checkIfIdExists(data.table).then(res => {
                let { table, punishments, whitelistedChannels, whitelistedRoles, limit, timeval, actualTime, punishTime, warnPoints } = data
                if (res.rows.length == 0) {
                    client.query(`INSERT INTO ${table} (guild_id, punishments, top, channel_whitelists, role_whitelists, points, duration, timeunit, timeval) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [guildid, punishments, limit, whitelistedChannels, whitelistedRoles, warnPoints, punishTime, actualTime, timeval])
                }
                else {
                    client.query(`UPDATE ${table} SET guild_id=$1, punishments=$2, top=$3, channel_whitelists=$4, role_whitelists=$5, points=$6, duration=$7, timeunit=$8, timeval=$9 WHERE guild_id=$1`,[guildid, punishments, limit, whitelistedChannels, whitelistedRoles, warnPoints, punishTime, actualTime, timeval])
                }})

             
            
        } if (data.type == 'taabased') {
            await checkIfIdExists(data.table).then(res => {
                let { table, punishments, whitelistedChannels, whitelistedRoles, warnPoints, punishTime, timeval, timeunit } = data
                if (res.rows.length == 0) {
                    client.query(`INSERT INTO ${table} (guild_id, punishments, channel_whitelists, role_whitelists, points, duration, timeunit, timeval) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [guildid, punishments, whitelistedChannels, whitelistedRoles, warnPoints, punishTime, timeunit, timeval])
                }
                else {
                    client.query(`UPDATE ${table} SET guild_id=$1, punishments=$2, channel_whitelists=$3, role_whitelists=$4, points=$5, duration=$6, timeunit=$7, timeval=$8 WHERE guild_id=$1`,[guildid, punishments, whitelistedChannels, whitelistedRoles, warnPoints, punishTime, timeunit, timeval])                   
                }
            })
           
            
        }

        if (data.type == 'selfbot') {
            await checkIfIdExists('selfbot').then(res => {
                let { punishments, table, whitelistedRoles, timeval, timeunit, points, duration } = data
                if (res.rows.length == 0) {
                    client.query(`INSERT INTO ${table} (guild_id, punishments, role_whitelists, points, duration, timeunit, timeval) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [guildid, punishments, whitelistedRoles, points, duration, timeunit, timeval])
                }
                else {
                    client.query(`UPDATE ${table} SET guild_id=$1, punishments=$2, role_whitelists=$3, points=$4, duration=$5, timeunit=$6, timeval=$7 WHERE guild_id=$1`,[guildid, punishments, whitelistedRoles, points, duration, timeunit, timeval])                   
                }
            })
          
        } if (data.type == 'blacklist') {
            await checkIfIdExists(data.table).then(res => {
                let { table, categories } = data
                if (res.rows.length == 0) {
                    client.query(`INSERT INTO ${table} (guild_id, categories) VALUES ($1, $2)`, [guildid, categories])
                } else {
                    client.query(`UPDATE ${table} SET guild_id=$1, categories=$2 WHERE guild_id=$1`,[guildid, categories])                   
                }
            })
       
        } if (data.type == 'profiletaabased') {
            await checkIfIdExists('nsfwpfp').then(res => {
                let { table, punishments,  whitelistedRoles, warnPoints, punishTime, timeval, timeunit } = data
                if (res.rows.length == 0) {
                    client.query(`INSERT INTO nsfwpfp (guild_id, punishments, role_whitelists, points, duration, timeunit, timeval) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [guildid, punishments, whitelistedRoles, warnPoints, punishTime, timeunit, timeval])
                }
                else {
                    client.query(`UPDATE nsfwpfp SET guild_id=$1, punishments=$2, role_whitelists=$3, points=$4, duration=$5, timeunit=$6, timeval=$7 WHERE guild_id=$1`,[guildid, punishments, whitelistedRoles, warnPoints, punishTime, timeunit, timeval])                   
                }
            })
          
        }

      

        client.end()
    }

    res.status(201).json({message: "success"})

}

export default handler