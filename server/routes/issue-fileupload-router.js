const express = require("express");

const IssueController = require("../controllers/issue-fileupload-controller");

const router = express.Router();

router.post("/issuefile", IssueController.uploadFile);
router.put("/issuefile/:id", IssueController.updateIssue);
router.delete("/issuefile/:id", IssueController.deleteIssue);
router.get("/issuefile/:key", IssueController.getIssueById);
router.get("/issuefile", IssueController.getIssues);

module.exports = router;
