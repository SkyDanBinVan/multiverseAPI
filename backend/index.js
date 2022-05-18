// Imports
const express = require("express");
const cors = require("cors")
const { sequelize } = require("./connect");
const { Message } = require("./connect");
// Define const
const app = express();
const port = 3000;
// Use cors protocol
app.use(cors())
// Use Express server
app.use(express.json());
// Listen on port
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
// Define db init
async function start() {
    await sequelize.sync({
        logging: false
    });
}
// call db init
start()
    .then(() => console.log('Sequelize connected'))
    .catch((e) => console.log(`Caught error: ${e}`));

// Define endpoints
app
.get("/", async (req, res) => {
    try {
        const data = await Message.findAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
.get("/:id", async (req, res) => {
    try {
        const data = await Message.findByPk(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
.post("/", async (req, res) => {
    try {
        const data = await Message.create(req.body);
        res.status(201).send(data);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
.put("/:id", async (req, res) => {
    try {
        const data = await Message.findByPk(req.params.id);

        await data.update(req.body);
        await data.save();
        await data.reload();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
.delete("/:id", async (req, res) => {
    try {
        await Message.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(`User ${req.params.id} deleted.`);
    } catch (e) {
        res.status(400).send(e.message);
    }
});