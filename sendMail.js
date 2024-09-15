import 'dotenv/config'
import nodemailer from 'nodemailer'
import emailTemplate from './emailTemplate.js'

const GmailHost = "smtp.gmail.com"
const GmailPort = 465
const NoReplyMail = "no-reply@teamfuture.in"
const GmailUsername = process.env.GMAIL_USERNAME
const GmailPassword = process.env.GMAIL_PASSWORD

const transporter = nodemailer.createTransport({
    host: GmailHost,
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: GmailUsername,
        pass: GmailPassword,
    },
});

async function sendMail(req, res) {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const year = req.body.year;
        const roll = req.body.roll;
        const food = req.body.food;
        const imageBase64 = req.body.image;
        console.log({ name, email, year, roll, food })

        const emailSubject = 'Food Coupon for Tumi Jaago (CSE dept.) - ' + name;

        const mailBody = emailTemplate(name, year, roll, food, imageBase64);

        const info = await transporter.sendMail({
            from: `Tumi Jaago CSE Organizing Team ${NoReplyMail}`, // sender address
            to: email, // list of receivers
            subject: emailSubject, // Subject line
            html: mailBody, // html body
            attachments: [
                {
                    filename: 'image.png',
                    content: Buffer.from(imageBase64, 'base64'),
                    encoding: 'base64',
                    cid: "imageId"
                }
            ]
        });

        console.log("Message sent: %s", info.messageId);

        const responseMsg = {
            status: 'success',
            message: 'Mail sent successfully'
        }
        res.send(JSON.stringify(responseMsg))

    } catch (e) {
        console.log(e)
        const responseMsg = {
            status: 'error',
            message: 'Mail not sent',
            error: e
        }

        res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        });
        res.send(JSON.stringify(responseMsg))
    }
}

export default sendMail