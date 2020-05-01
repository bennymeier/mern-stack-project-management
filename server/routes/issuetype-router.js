const express = require("express");

const IssueTypeController = require("../controllers/issuetype-controller");

const router = express.Router();

router.post("/issuetype", IssueTypeController.createIssueType);
router.put("/issuetype/:id", IssueTypeController.updateIssueType);
router.delete("/issuetype/:id", IssueTypeController.deleteIssueType);
router.get("/issuetype/:key", IssueTypeController.getIssueTypeById);
router.get("/issuetypes", IssueTypeController.getIssueTypes);

module.exports = router;
