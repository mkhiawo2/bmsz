const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const adminNumber = JSON.parse(fs.readFileSync('./lib/admin.json'))
const moment = require('moment-timezone')
const get = require('got')
const msgFilter = require('./lib/msgFilter')
const fetch = require('node-fetch');
const bent = require('bent')
const msgLimit = JSON.parse(fs.readFileSync('./lib/msgLimit.json'))
const ban = JSON.parse(fs.readFileSync('./lib/blocked.json'))

module.exports = mkh = async (mkh, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, mentionedJidList, author, quotedMsgObj } = message
        let { body } = message
        const { name } = chat
        let { pushname, verifiedName } = sender
        const serial = sender.id
        const prefix = ':'
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
        const args = body.slice(prefix.length).trim().split(/ +/).slice(1)
        bodi = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const argj = bodi.substring(bodi.indexOf(' ') + 1)
        const isCmd = body.startsWith(prefix)
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM!]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM!]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name))
        if (!isCmd && !isGroupMsg) return console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname))
        if (!isCmd && isGroupMsg) return console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname), 'in', color(name))
        if (isCmd && !isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name))
        if ((!isGroupMsg) && message.type === 'chat' && !message.body.startsWith(prefix)) {
            get.get(`https://bmsbms.herokuapp.com/api?text=${message.body}&lang=en`).json()
            .then((success) => {
                mkh.reply(from, `${success.success}`, id)
            })
            .catch((err) => {
                console.log('[ERROR]\n'+err+'\nTake it easy... it will recover')
            })
        }
        const botNumber = await mkh.getHostNumber()
        const botnumber = '27628472326@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await mkh.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const isBanned = ban.includes(serial)
        const isbotadmin = botadmins.includes(sender.id)
        const isAdmin = adminNumber.includes(sender.id)
        const ownerNumber = '27656035811@c.us'
        const isOwner = ownerNumber.includes(sender.id)
        msgFilter.addFilter(from)
        

        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, playboi carti) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+:=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.:?&/=]*)/gi)
      if(isBanned){
          mkh.reply(from, 'you banned', id)
      }
      if (ispaid){
        switch (command) {
       case 'hi' :
           mkh.reply(from, 'welcome my pro mstAER',message.id)
      }
    }

        switch (command) {
            case 'hi': 
            mkh.reply(from ,hey,id)

            case 'ban': 
            if(!isbotadmin) return mkh.reply(from, 'Only Bot admins can use this CMD!', message.id)
            const userBan = body.slice(5)
            if (!userBan) return mkh.reply(from, 'Enter the number!\nEx: 27xxxx')  
            {
            let text = userBan+'@c.us'
            var cek = ban.includes(text);
            if(cek){
                return mkh.reply(from, 'Number has been banned before!', id) //if number already exists on database
            } else {
                const mentah = await mkh.checkNumberStatus(text) //VALIDATE WHATSAPP NUMBER
                const hasil = mentah.canReceiveMessage ? `Banned successfully\nTotal users are banned now: *${ban.length}*` : false
                if (!hasil) return mkh.reply(from, 'Invalid WhatsApp number [Not registered on WhatsApp]', id) 
                {
                ban.push(mentah.id._serialized)
                fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
                    mkh.sendText(from, hasil)}
                }
            }
            break

                case'snk':  
                mkh.reply(from, snk, message.id)
                default:
                    await mkh.reply(from, `Don't use unlisted commands, Baka!`, id)
                   // console.log(color('[UNLISTED]', 'red'), color(time, 'yellow'), 'Unregistered Command from', color(pushname))
                    break
                }
            
         } catch (err) {
                console.log(color('[ERROR]', 'red'), err)
            }
        }