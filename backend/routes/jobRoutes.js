const express = require("express");
const JobRequest = require("../models/JobRequest");

const router = express.Router();

// GET all jobs with optional filters
router.get("/", async (req, res, next) => {
  try {
    const { category, status } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
});

// GET single job
router.get("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
});

// POST create job
router.post("/", async (req, res, next) => {
  try {
    const job = await JobRequest.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job request created successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH update status only
router.patch("/:id", async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const allowedStatus = ["Open", "In Progress", "Closed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job status updated successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE job
router.delete("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job request deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;