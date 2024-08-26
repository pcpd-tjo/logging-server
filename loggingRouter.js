const express = require('express');
const router = express.Router();
const { WebhookClient } = require('discord.js');
const { TITLE_WEBHOOK_ID, TITLE_WEBHOOK_TOKEN, CRYSTAL_WEBHOOK_ID, CRYSTAL_WEBHOOK_TOKEN, ARREST_WEBHOOK_ID, ARREST_WEBHOOK_TOKEN } = process.env;

const Embed = require("./embed");
const Colors = require("./Colors.js");

const { getUsernameFromId } = require("noblox.js");

const titleWebhook = new WebhookClient({ id: TITLE_WEBHOOK_ID, token: TITLE_WEBHOOK_TOKEN });

router.post("/title-log", async (req, res) => {
    let data
    if (req.query.data) {
        data = JSON.parse(req.query.data)
    } else {
        let actions = [
            "added",
            "removed"
        ]
        data = { "title": "Test", "editingplayer": "1", "target": "2", "action": actions[Math.floor(Math.random() * actions.length)] }
    }

    let title = data.title;
    let targetPlayer = data.target;
    let player = data.editingplayer;
    let action = data.action;

    let color = action == "added" ? Colors["Green"] : Colors["Red"];

    let embed = new Embed({
        title: "Title Log",
        description: `Title Editor: **[${await getUsernameFromId(player)}](https://roblox.com/users/${player})** \n Player Affected: **[${await getUsernameFromId(targetPlayer)}](https://roblox.com/users/${targetPlayer})** \n Title ${action.charAt(0).toUpperCase() + action.slice(1)}: ${title} \n\n Sent at: <t:${Math.floor(Date.now() / 1000)}:F>`,
        colour: color
    });

    titleWebhook.send({
        embeds: [embed]
    }).then(() => {
        res.status(200).json({ "result": "Log Created and Sent" });
    }).catch(console.log);

});

const crystalWebhook = new WebhookClient({ id: CRYSTAL_WEBHOOK_ID, token: CRYSTAL_WEBHOOK_TOKEN });

router.post("/crystal-log", async (req, res) => {
    let data
    if (!req.body) {
        let actions = [
            "added",
            "removed"
        ]
        data = {
            "crystal": "Pink",
            "player": "1",
            "target": "2",
            "cg": "true",
            "reason": "Testing",
            "action": actions[Math.floor(Math.random() * actions.length)]
        }
    } else {
        data = req.body;
    }

    let crystal_colour = data.crystal; // string
    let targetplayer = data.target; // string 
    let cg = Boolean(data.cg); // true or false
    let player = data.editingplayer;
    let action = data.action; // added or removed : a string

    let reasonStr = cg === true ? "Crystal Gathering" : ""
    let actionStr = action.charAt(0).toUpperCase() + action.slice(1)
    let colourStr = (crystal_colour.charAt(0).toUpperCase() + crystal_colour.slice(1)).replace(/ /g, '')
    let HexColour = Colors[colourStr] || 0xffffff
    let embed = new Embed({
        title: "Crystal Log",
        description: `Crystal Editor: **[${await getUsernameFromId(player)}](https://roblox.com/users/${player})** \n Player Affected: **[${await getUsernameFromId(targetplayer)}](https://roblox.com/users/${targetplayer})** \n Crystal ${actionStr}: ${crystal_colour} ${reasonStr !== "" ? `\n Reason: ${reasonStr}` : ""}\n\n Sent at: <t:${Math.floor(Date.now() / 1000)}:F>`,
        colour: HexColour
    });

    crystalWebhook.send({
        embeds: [embed]
    }).then(() => {
        res.status(200).json({ "result": "Log Created and Sent" })
    }).catch(console.log);
});

const arrestWebhook = new WebhookClient({ id: ARREST_WEBHOOK_ID, token: ARREST_WEBHOOK_TOKEN });

router.post("/arrest-log", async (req, res) => {
    /* 
    DATA:

    - Captor
    - Offender
    - Reason
    - Time / ArrestDuration
    - Laws Broken
    - Witnesses
    - Extra Notes

    {
            captor = CaptorPlayer.UserId,
            Duration = Duration,
            LawsBroken = LawsBrokenInput,
            Reason = ReasonInput,
            Witnesses = WitnessesInput,
            ExtraNotes = ExtraNotesInput
        }
    */
    let data
    if (req.query.data) {
        data = JSON.parse(req.query.data);
    } else {
        data = {
            "captor": "1",
            "offender": "1",
            "reason": "no reason",
            "lawsBroken": "Test,Test,Test,Test",
            "duration": "15:00",
            "witnesses": "No Witnesses",
            "extraNotes": "No Notes",

        }
    }

    let captor = data.captor || "1";
    let offender = data.offender || "1";
    let reason = data.reason || "error";
    let lawsBroken = data.lawsBroken || "error";
    let duration = data.duration;
    let witnesses = data.witnesses || "No Witnesses";
    let extraNotes = data.extraNotes || "No Notes";
    let embed = new Embed({
        title: "Arrest Log",
        description: `Offender: **[${await getUsernameFromId(offender)}](https://roblox.com/users/${offender})** \n Captor: **[${await getUsernameFromId(captor)}](https://roblox.com/users/${captor})** \n Duration: ${duration} \n Reason: ${reason} \n Laws Broken: ${lawsBroken.replace(",", ", ")}\n Witnesses: ${witnesses} \n Notes: ${extraNotes} \n\n Sent at: <t:${Math.floor(Date.now() / 1000)}:F>`,
        colour: 0xfabd36
    })

    arrestWebhook.send({
        embeds: [embed]
    }).then(() => {
        res.status(200).json({ "result": "Log Created and Sent" })
    }).catch(console.log);
});

module.exports = router;