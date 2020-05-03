const express = require("express");
const verifyToken = require("../db/verifyToken");
const IssueController = require("../controllers/issue-controller");

const router = express.Router();

router.post("/issue", verifyToken, IssueController.createIssue);
router.put("/issue/:id", verifyToken, IssueController.updateIssue);
router.delete("/issue/:id", verifyToken, IssueController.deleteIssue);
router.get("/issue/:id", verifyToken, IssueController.getIssueById);
router.get("/issues", verifyToken, IssueController.getIssues);
router.get(
  "/issues/project/:id",
  verifyToken,
  IssueController.getIssuesByProjectId
);

module.exports = router;
