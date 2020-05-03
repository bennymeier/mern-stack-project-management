const express = require("express");
const verifyToken = require("../db/verifyToken");
const IssueController = require("../controllers/issue-fileupload-controller");

const router = express.Router();

router.post("/issuefile", verifyToken, IssueController.uploadFile);
router.put("/issuefile/:id", verifyToken, IssueController.updateIssue);
router.delete("/issuefile/:id", verifyToken, IssueController.deleteIssue);
router.get("/issuefile/:key", verifyToken, IssueController.getIssueById);
router.get("/issuefile", verifyToken, IssueController.getIssues);

module.exports = router;
