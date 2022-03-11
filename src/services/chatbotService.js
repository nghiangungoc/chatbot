import { response } from "express";
import request from "request";
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v13.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });

}
let getUserName = async (sender_psid) => {
    let username = '';
    // Send the HTTP request to the Messenger Platform
    await request({
        "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "GET",
    }, (err, res, body) => {
        console.log(body);
        if (!err) {
            response = JSON.parse(res);
            // "first_name":"peter",
            // "last_name":"Chang",
            username = `${response.first_name} ${response.last_name}`

        } else {
            console.error("Unable to send message:" + err);
        }
    });
    return username;
}
let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid);
            response = { "text": `Ok. xin chào mừng bạn ${username} đến với nhà hàng của nghĩa` }
            await callSendAPI(response);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleGetStarted: handleGetStarted,
}