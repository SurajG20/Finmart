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
  renderDocumentUpload,
  renderLoanDetails,
  renderPersonalDetails,
} = require('../controllers/Pages');
const { isLoggedIn } = require('../middlewares/Middlewares');
const {
  Login,
  Register,
  Logout,
  GoogleLogin,
  GoogleCallback,
} = require('../controllers/User');
const passport = require('passport');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const { register } = require('../controllers/Pages');
const upload = multer({ storage });

router.route('/').get(home);
router.route('/login').get(login);

router.route('/login').post(Login);
router.route('/register').post(Register);
router.route('/logout').get(Logout);

router.route('/auth/google').get(GoogleLogin);
router.route('/google/callback').get(GoogleCallback);

router.route('/register').get(register);
router.route('/user').get(isLoggedIn, user);

router.route('/loan').get(loan);

router.route('/about').get(about);

router.route('/blog').get(blog);

router.route('/contact').get(contact);

router.route('/job-application/:jobId').get(addJobApplication);
router.route('/job-post').get(renderJobPost);

router.route('/feedback').post(upload.none(), feedback);

router.route('/newsletter').post(upload.none(), newsletter);

router.route('/applyToJob').post(upload.single('resume'), applyToJob);

router
  .route('/personal-details')
  .get(renderPersonalDetails)
  .post(isLoggedIn, upload.none(), submitPersonalDetails);

router
  .route('/loan-details')
  .get(renderLoanDetails)
  .post(isLoggedIn, upload.none(), submitLoanDetails);

router
  .route('/document-upload')
  .get(renderDocumentUpload)
  .post(isLoggedIn, upload.array('Documents'), submitDocumentUpload);

router.route('/blog-details/:blogId').get(renderBlogDetails);

module.exports = router;
