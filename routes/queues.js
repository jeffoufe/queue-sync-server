var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

/* GET queues listing. */
router.get('/', function(req, res, next) {
    const uri = "mongodb+srv://jeffoufe:Laporeille51@cluster0-wkpnb.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(async (err) => {
        if (err) {
            res.send(err);
        }
        const queues = await client.db('QueueSync').collection('queues').find({}).toArray();
        res.json({ queues }); 
        client.close();
    })
});

module.exports = router;
