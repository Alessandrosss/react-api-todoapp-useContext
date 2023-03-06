function routes(app) {

    app.get("/", (req, res) => {
        return res.status(200)
    })

}

module.exports = routes;