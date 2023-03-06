const { generate } = require("../tokenAuth");
const { Crypto } = require("cryptojs");
const { LoggerLevel } = require("mongodb");

function authRoutes(app, { users }) {

    app.post("/auth/login", async(req, res) => {

        try {
            const { email, password } = req.body;
            /* CRYPT PW */
            const hash = Crypto.SHA1(password);

            /* VALIDATE EMAIL & PASSWORD */
            const validationEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const validationPassword = /^(?=.*\d)(?=.*[A-Z])(.{6,12})$/;

            if (!validationEmail.test(email)) throw ({ success: false, message: "email not valid" })
            if (!validationPassword.test(password)) throw ({ success: false, message: "password not valid" })

            /* SEARCH USER */
            const foundUser = await users.findOne({ email });
            if (!foundUser) throw ({ success: false, message: "No User with this credentials" })

            /* VALIDATE USER */
            if (foundUser.hashedPassword === hash) return res.status(200).json({ success: true, data: { token: generate({ email }) } })

        } catch (error) {
            res.status(406).json(error);
        }
    });

    app.post("/auth/register", async(req, res) => {

        try {
            const { email, password, repeatPassword } = req.body;
            /* CRYPT PW */
            const hashedPassword = Crypto.SHA1(password);

            /* VALIDATE EMAIL & PASSWORD */
            const validationEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const validationPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

            if (!validationEmail.test(email)) throw ({ success: false, message: "email is not valid" })
            if (!validationPassword.test(password)) throw ({ success: false, message: "password is not valid" })
            if (password !== repeatPassword) throw ({ success: false, message: "passwords dont match together" })

            /* SEARCH FOR USER */
            const foundUser = await users.findOne({ email });
            if (foundUser) throw ({ success: false, message: "user already exists" })

            /*  REGISTER NEW USER */
            await users.insertOne({ email, hashedPassword });

            res.status(200).send({ success: true, data: { token: generate({ email }) } });

        } catch (error) {
            res.status(406).json(error);
        }
    });
}

module.exports = authRoutes;