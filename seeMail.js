import emailTemplate from "./emailTemplate.js";

async function seeMail(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const year = req.body.year;
    const roll = req.body.roll;
    const food = req.body.food;
    const imageBase64 = req.body.image;

    const mailBody = emailTemplate(name, year, roll, food, imageBase64);

    // render the html template
    return res.send(mailBody);
}

export default seeMail;