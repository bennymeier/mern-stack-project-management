const express = require("express");

const IssueController = require("../controllers/issue-controller");

const router = express.Router();

router.post("/issue", IssueController.createIssue);
router.put("/issue/:id", IssueController.updateIssue);
router.delete("/issue/:id", IssueController.deleteIssue);
router.get("/issue/:key", IssueController.getIssueById);
router.get("/issues", IssueController.getIssues);

module.exports = router;
