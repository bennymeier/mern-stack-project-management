const express = require("express");
const verifyToken = require("../db/verifyToken");
const IssueTypeController = require("../controllers/issuetype-controller");

const router = express.Router();

router.post("/issuetype", verifyToken, IssueTypeController.createIssueType);
router.put("/issuetype/:id", verifyToken, IssueTypeController.updateIssueType);
router.delete(
  "/issuetype/:id",
  verifyToken,
  IssueTypeController.deleteIssueType
);
router.get(
  "/issuetype/:key",
  verifyToken,
  IssueTypeController.getIssueTypeById
);
router.get("/issuetypes", verifyToken, IssueTypeController.getIssueTypes);

module.exports = router;
