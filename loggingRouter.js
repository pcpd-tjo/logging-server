const express = require('express');
const router = express.Router();
const { WebhookClient } = require('discord.js');
const { TITLE_WEBHOOK_ID, TITLE_WEBHOOK_TOKEN, CRYSTAL_WEBHOOK_ID, CRYSTAL_WEBHOOK_TOKEN, ARREST_WEBHOOK_ID, ARREST_WEBHOOK_TOKEN } = process.env;

const Embed = require("./embed");
const Colors = require("./Colors.js");

const { getIdFromUsername, getUsernameFromId } = require("noblox.js")

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
        data = { "title": "Test", "player": "UntoldGam", "target": "Dev_Untold", "action": actions[Math.floor(Math.random() * actions.length)] }
    }

    let title = data.title;
    let target = data.target;
    let player = data.editingplayer;
    let action = data.action;
    let color
    let text
    if (action === "added") {
        color = 5763719
        text = `Title Giver: ${player} \n Title Receiever: ${target}`
    } else if (action === "removed") {
        color = 15548997
        text = `Title Editor: ${player} \n Title Receiever: ${target}`
    }

    let properties = {
        "Title": "Title Log",
        "Description": `Title Editor: ${player} (${await getIdFromUsername(player)}) \n Player Affected: ${target} (${await getIdFromUsername(target)}) \n Title ${action.charAt(0).toUpperCase() + action.slice(1)}: ${title} \n <t:${Math.floor(Date.now() / 1000)}:F>`,

        "Description": `Title giver: ${player} \n Title receiver: ${target} \n Title Name: ${title} \n <t:${Math.floor(Date.now() / 1000)}:F>`,
        "Color": color
    }

    let embed = await Embed(properties);

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
            "player": "UntoldGam",
            "target": "Dev_Untold",
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
    let properties = {
        "Title": "Crystal Log",
        "Description": `Crystal Editor: ${player} (${await getIdFromUsername(player)}) \n Player Affected: ${targetplayer} (${await getIdFromUsername(targetplayer)}) \n Crystal ${actionStr}: ${crystal_colour} ${reasonStr !== "" ? `\n Reason: ${reasonStr}` : ""} \n <t:${Math.floor(Date.now() / 1000)}:F>`,
        "Color": HexColour
    }
    let embed = await Embed(properties)

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
            "reason": "0",
            "lawsBroken": "0",
            "duration": "0",
            "witnesses": "0",
            "extraNotes": "0",

        }
    }

    let captor = data.captor || "1";
    let offender = data.offender || "1";
    let reason = data.reason || "error";
    let lawsBroken = data.lawsBroken || "error";
    let duration = data.duration;
    let witnesses = data.witnesses || "No Witnesses";
    let extraNotes = data.extraNotes || "No Notes";
    let properties = {
        "Title": "Arrest Log",
        "Description": `Offender: ${await getUsernameFromId(offender)} (${offender}) \n Captor: ${await getUsernameFromId(captor)} (${captor}) \n Duration: ${duration} \n Reason: ${reason} \n Laws Broken: ${lawsBroken.replace(",", ", ")}\n Witnesses: ${witnesses} \n Notes: ${extraNotes} \n <t:${Math.floor(Date.now() / 1000)}:F>`,
        "Color": Colors["Orange"]
    }
    let embed = await Embed(properties)

    arrestWebhook.send({
        embeds: [embed]
    }).then(() => {
        res.status(200).json({ "result": "Log Created and Sent" })
    }).catch(console.log);
});

module.exports = router;