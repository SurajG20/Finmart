const express = require('express');
const router = express.Router();
const { isAdminLoggedIn } = require('../middlewares/Middlewares');
const {
  getCombinedDetails,
  deleteFeedback,
  addNewJob,
  deleteJob,
  createFaq,
  deleteFaq,
  deleteBlog,
  addNewBlog,
  deleteNewsletter,
  addNewLoan,
  deleteLoan,
  admin,
  sendNotification,
  userDetails,
  updateStatus,
  sendNotificationToUser,
  sendNotificationToAll,
  deleteNotification,
  deleteNotificationAdmin,
  deleteDocument,
} = require('../controllers/Admin');

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
router.route('/').get(isAdminLoggedIn, admin);
router
  .route('/user-details/:singleUserId')
  .get(isAdminLoggedIn, userDetails)
  .post(isAdminLoggedIn, userDetails);
router
  .route('/user-details/updateStatus/:singleUserId')
  .post(isAdminLoggedIn, updateStatus);
router
  .route('/user-details/deleteDocument/:singleUserId/:documentId/delete')
  .delete(isAdminLoggedIn, deleteDocument);

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
router.route('/add-faq').post(isAdminLoggedIn, upload.none(), createFaq);
router.route('/delete-faq/:faqId/delete').delete(isAdminLoggedIn, deleteFaq);

router
  .route('/add-blog')
  .post(isAdminLoggedIn, upload.array('images'), addNewBlog);

router.route('/delete-blog/:blogId/delete').delete(isAdminLoggedIn, deleteBlog);
router.route('/delete-loan/:loanId/delete').delete(isAdminLoggedIn, deleteLoan);

router.route('/add-loan').post(isAdminLoggedIn, upload.none(), addNewLoan);

router
  .route('/send-notification/:userId')
  .post(isAdminLoggedIn, sendNotificationToUser);
router
  .route('/send-notificationAll')
  .post(isAdminLoggedIn, sendNotificationToAll);

router
  .route('/delete-notification/:notificationId/delete')
  .delete(isAdminLoggedIn, deleteNotification);
router
  .route('/delete-notificationAdmin/:notificationId/delete')
  .delete(isAdminLoggedIn, deleteNotificationAdmin);

module.exports = router;
