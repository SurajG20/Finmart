const express = require('express');
const router = express.Router();
const { isAdminLoggedIn } = require('../middlewares/Middlewares');
const {
  getCombinedDetails,
  getAllFeedback,
  deleteFeedback,
  getAllJobs,
  updateJob,
  addNewJob,
  deleteJob,
  createFaq,
  updateFaqs,
  deleteFaq,
  getAllFaqs,
  deleteBlog,
  addNewBlog,
  updateBlog,
  getAllBlogs,
  getAllNewsletter,
} = require('../controllers/Admin');

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

// Feedback
router.route('/feedback').get(isAdminLoggedIn, getAllFeedback);
// get all jobs
router.route('/get-jobs').get(isAdminLoggedIn, getAllJobs);
// get new job
router
  .route('/add-job')
  .post(isAdminLoggedIn, upload.single('image'), addNewJob);
// update job
router
  .route('/update-job/:jobId')
  .put(isAdminLoggedIn, upload.single('image'), updateJob);

// delete job
router.route('/delete-job/:jobId').delete(isAdminLoggedIn, deleteJob);

// delete feedback
router.route('/feedback/:feedbackId').delete(isAdminLoggedIn, deleteFeedback);

// get all subscribed emails
router.route('/get-newsletter').get(isAdminLoggedIn, getAllNewsletter);

// get userLoan details
router.route('/user-documents').get(isAdminLoggedIn, getCombinedDetails);

// Faq add, update, delete, getAll
router.route('/add-faq').post(isAdminLoggedIn, createFaq);
router.route('/update-faq/:faqId').put(isAdminLoggedIn, updateFaqs);
router.route('/delete-faq/:faqId').delete(isAdminLoggedIn, deleteFaq);
router.route('/get-AllFaq').get(isAdminLoggedIn, getAllFaqs);

// Blog add, update, delete, getAll
router.route('/get-blogs').get(isAdminLoggedIn, getAllBlogs);
router
  .route('/add-blog')
  .post(isAdminLoggedIn, upload.array('images'), addNewBlog);
router
  .route('/update-blog/:blogId')
  .put(isAdminLoggedIn, upload.single('image'), updateBlog);
router.route('/delete-blog/:blogId').delete(isAdminLoggedIn, deleteBlog);

module.exports = router;
