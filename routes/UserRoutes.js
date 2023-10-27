const express = require('express');
const router = express.Router();
const {
  home,
  about,
  blog,
  contact,
  renderBlogDetails,
  applyToJob,
  renderJobPost,
  feedback,
  newsletter,
  addJobApplication,
  submitLoanDetails,
  submitPersonalDetails,
  submitDocumentUpload,
  loan,
  login,
  user,
  admin,
} = require('../controllers/Pages');
const { isLoggedIn } = require('../middlewares/Middlewares');
const { Login, Register, Logout } = require('../controllers/User');

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const { register } = require('../controllers/Pages');
const upload = multer({ storage });

router.route('/').get(home);
router.route('/login').get(login);

router.route('/login').post(Login);
router.route('/logout').get(Logout);
router.route('/user').get(user);
router.route('/admin').get(admin);

router.route('/register').post(Register);
router.route('/register').get(register);

router.route('/loan').get(loan);

router.route('/about').get(about);

router.route('/blog').get(blog);

router.route('/contact').get(contact);

router.route('/job-application/:jobId').get(addJobApplication);
router.route('/job-post').get(renderJobPost);

router.route('/feedback').post(feedback);

router.route('/newsletter').post(newsletter);

router
  .route('/applyToJob')
  .post(isLoggedIn, applyToJob, upload.single('resume'));

router.route('/personal-details').post(isLoggedIn, submitPersonalDetails);

router.route('/loan-details').post(isLoggedIn, submitLoanDetails);

router.route('/document-upload').post(isLoggedIn, submitDocumentUpload);

router.route('/blog-details/:blogId').get(renderBlogDetails);

module.exports = router;
