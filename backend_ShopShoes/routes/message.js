const router = require('express').Router();
const messageController = require('../controllers/messageController')



router.post("/send", messageController.postMessage);

router.get("/:id", messageController.getMessage);

module.exports = router;