// server/src/routes/taskRoutes.js
const express = require('express');
const { protect } = require('../middlewares/authMiddleware.js');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController.js');

const router = express.Router();

router.use(protect); // Protect all task routes

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;