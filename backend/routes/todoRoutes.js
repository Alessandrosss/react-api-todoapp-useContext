const { ObjectId } = require("mongodb");

const ERROR_MESSAGES = {
    INPUT_VOID: "input fild must be filled",
    TODO_NOT_FOUND: "no todo with this id"
}

function todoRoutes(app, { todos }) {

    /* READ */
    app.get("/api/todos", async(req, res) => {
        const todoList = await todos.find().toArray();
        if (todoList) return res.status(200).json({ success: true, data: todoList })
    });

    /* CREATE */
    app.post("/api/todos", async(req, res) => {
        const { content } = req.body;
        const slug = content.toLowerCase()
        const newTodo = { content, slug }

        try {
            if (content === "") throw ({ success: false, message: ERROR_MESSAGES.INPUT_VOID })
            await todos.insertOne(newTodo)
            const todoList = await todos.find().toArray()
            return res.status(200).json({ success: true, data: todoList })
        } catch (error) {
            res.status(406).json(error)
        }
    })

    /* UPDATE */
    app.put("/api/todos/:_id", async(req, res) => {
        const { _id } = req.params
        const { content } = req.body
        const slug = content.toLowerCase()
        const todo = { content, slug }

        try {
            if (content === "") throw ({ success: false, message: ERROR_MESSAGES.INPUT_VOID })
            await todos.replaceOne({ _id: ObjectId(_id) }, todo)
            const todoList = await todos.find().toArray()
            return res.status(200).json({ success: true, data: todoList })
        } catch (error) {
            res.status(406).json(error)
        }
    })

    /* DELETE */
    app.delete("/api/todos/:_id", async(req, res) => {
        const { _id } = req.params
        try {
            const toDelete = await todos.deleteOne({ _id: ObjectId(_id) })
            if (toDelete.deletedCount === 0) throw ({ success: false, message: ERROR_MESSAGES.TODO_NOT_FOUND })
            const todoList = await todos.find().toArray()
            return res.status(200).json({ success: true, data: todoList })

        } catch (error) {
            res.status(406).json(error)
        }
    })
}

module.exports = todoRoutes;