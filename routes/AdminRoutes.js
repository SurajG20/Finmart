const express = require('express');
const router = express.Router();
const { isAdminLoggedIn } = require('../middlewares/Middlewares');
const {
  getCombinedDetails,
  deleteFeedback,
  addNewJob,
  deleteJob,
  createFaq,
  updateFaqs,
  deleteFaq,
  deleteBlog,
  addNewBlog,
  updateBlog,
  deleteNewsletter,
  addNewLoan,
  deleteLoan,
  admin,
  sendNotification,
} = require('../controllers/Admin');

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
router.route('/').get(isAdminLoggedIn, admin);

router
  .route('/add-job')
  .post(isAdminLoggedIn, upload.array('images'), addNewJob);

// delete job
router.route('/delete-job/:jobId/delete').delete(isAdminLoggedIn, deleteJob);

// delete feedback
router
  .route('/feedback/:feedbackId/delete')
  .delete(isAdminLoggedIn, deleteFeedback);
// delete feedback
router
  .route('/newsletter/:subsId/delete')
  .delete(isAdminLoggedIn, deleteNewsletter);

// get userLoan details
router.route('/user-documents').get(isAdminLoggedIn, getCombinedDetails);

// Faq add, update, delete, getAll
router.route('/add-faq').post(isAdminLoggedIn, createFaq);
router.route('/update-faq/:faqId').put(isAdminLoggedIn, updateFaqs);
router.route('/delete-faq/:faqId').delete(isAdminLoggedIn, deleteFaq);

router
  .route('/add-blog')
  .post(isAdminLoggedIn, upload.array('images'), addNewBlog);
router
  .route('/update-blog/:blogId')
  .put(isAdminLoggedIn, upload.array('images'), updateBlog);
router.route('/delete-blog/:blogId/delete').delete(isAdminLoggedIn, deleteBlog);
router.route('/delete-loan/:loanId/delete').delete(isAdminLoggedIn, deleteLoan);

router.route('/add-loan').post(isAdminLoggedIn, upload.none(), addNewLoan);
router.route('/sent-notification').post(isAdminLoggedIn, sendNotification);

module.exports = router;
