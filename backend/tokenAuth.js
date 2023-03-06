const jwt = require("jsonwebtoken");
const SECRET = "password1234"

/* GENERATE TOKEN */
function generate(data) {
    const payload = {...data, createdAt: Date.now() / 1000 }
    const token = jwt.sign(payload, SECRET, { algorithm: "HS256" })
    return token;
}

/* VERIFY TOKEN */
function verify(token) {
    try {
        const decodedToken = jtw.verify(token, SECRET);
        return {
            success: true,
            payload: decodedToken
        }

    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}

module.exports = { generate, verify };