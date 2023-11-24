const User = require('../models/User');
const Feedback = require('../models/Feedback');
const Contact = require('../models/ContactUs');
const Blogs = require('../models/Blogs');
const Loans = require('../models/LoanType');
const Frequently = require('../models/Frequently');
const CombinedDetails = require('../models/CombinedDetails');
const Jobs = require('../models/Jobs');
const Newsletter = require('../models/Newsletter');

// Function to calculate EMI
function calculateEMI(principalStr, annualInterestRateStr, tenureInYearsStr) {
  const principal = parseFloat(principalStr);
  const annualInterestRate = parseFloat(annualInterestRateStr);
  const tenureInYears = parseFloat(tenureInYearsStr);
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfMonths = tenureInYears * 12;
  const emi =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));
  return emi.toFixed(2);
}

module.exports.admin = async (req, res) => {
  const jobs = await Jobs.find();
  const blogs = await Blogs.find();
  const loans = await Loans.find();
  const user = req.session?.passport?.user;
  const newsletter = await Newsletter.find();
  const allFeedback = await Feedback.find();
  const allUsersDetails = await CombinedDetails.find({});
  const allUsers = await User.find({ isAdmin: false });
  const faqs = await Frequently.find();
  const contacts = await Contact.find();
  res.render('admin', {
    user,
    allFeedback,
    newsletter,
    faqs,
    blogs,
    jobs,
    allUsersDetails,
    loans,
    allUsers,
    contacts,
  });
};
// delete feedback

module.exports.userDetails = async (req, res) => {
  const { singleUserId } = req.params;
  const singleUserData = await CombinedDetails.findOne({
    userId: singleUserId,
  });
  const user = await User.findOne({ _id: singleUserId });
  const allNotifications = user?.notifications;
  const principal = singleUserData?.loanDetails?.loanAmount;
  const loanType = singleUserData?.loanDetails?.['select-loan-type'];
  const rateNew = await Loans.findOne({ category: loanType }).select(
    'interest'
  );
  const tenure = singleUserData?.loanDetails?.tenureDuration;
  const tenureUnit = singleUserData?.loanDetails?.tenureUnit;
  if (tenureUnit === 'month') {
    tenure = tenure / 12;
  }
  const emi = calculateEMI(principal, rateNew?.interest, tenure);
  res.render('userDetails', { singleUserData, emi, allNotifications });
};

module.exports.updateStatus = async (req, res) => {
  const singleUserId = req.params.singleUserId;
  const newLoanStatus = req.body.loanStatus;
  try {
    const updatedUser = await CombinedDetails.findOneAndUpdate(
      { userId: singleUserId },
      { $set: { ApplicationStatus: newLoanStatus } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.redirect('/admin/user-details/' + singleUserId);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
module.exports.deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  await Feedback.findByIdAndDelete(feedbackId);
  res.redirect('/admin');
};
// delete feedback
module.exports.deleteNewsletter = async (req, res) => {
  const { subsId } = req.params;
  await Newsletter.findByIdAndDelete(subsId);
  res.redirect('/admin');
};

// get all data
module.exports.getCombinedDetails = async (req, res) => {
  try {
    const allUserDetails = await CombinedDetails.find({});

    if (!allUserDetails || allUserDetails.length === 0) {
      return res.status(404).json({ message: 'User details not found' });
    }
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// get new job
module.exports.addNewJob = async (req, res) => {
  try {
    const {
      title,
      category,
      location,
      jobPosition,
      jobType,
      description,
      specifications,
    } = req.body;
    if (
      title &&
      description &&
      location &&
      category &&
      jobPosition &&
      jobType &&
      specifications
    ) {
      const newJob = {
        title,
        category,
        location,
        jobPosition,
        jobType,
        description,
        specifications,
      };

      if (req.files) {
        newJob.images = req.files.map((f) => {
          return {
            url: f.path,
            filename: f.filename,
          };
        });
      }
      await Jobs.create(newJob);
      res.redirect('/admin');
    }
  } catch (err) {
    res.redirect('error', { err });
  }
};

// update job
module.exports.updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatedJobData = req.body;
    const job = await Jobs.findByIdAndUpdate(jobId, updatedJobData);
    if (req.file) {
      images = {
        url: req.file.path,
        filename: req.file.filename,
      };
      job.image = [...images];
    }
    await job.save();
    // res.redirect('/admin');
    res.status(200).json({ message: 'Job updated successfully' });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

// delete job
module.exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    await Jobs.deleteOne({ _id: jobId });
    res.redirect('/admin');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

// create new FAQ
module.exports.createFaq = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const faq = new Frequently({ question, answer });
    await faq.save();
    res.redirect('/admin');
  } catch (error) {
    res.redirect('error', { error });
  }
};

// deletefaq
module.exports.deleteFaq = async (req, res) => {
  const faqId = req.params.faqId;
  try {
    await Frequently.findByIdAndDelete(faqId);
    res.redirect('/admin');
  } catch (err) {
    res.redirect('error', { err });
  }
};

// addNewBLog
module.exports.addNewBlog = async (req, res) => {
  try {
    const { title, description, author, category, tags } = req.body;
    if (title && description && author && category && tags) {
      const tagsArray = tags.split(',');
      const newBlog = { title, description, author, category, tags: tagsArray };
      if (req.files) {
        newBlog.images = req.files.map((f) => {
          return {
            url: f.path,
            filename: f.filename,
          };
        });
      }
      console.log(newBlog)
      await Blogs.create(newBlog);
      res.redirect('/admin');
    }
  } catch (err) {
    res.redirect('error', { err });
  }
};

// update Blog
module.exports.updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const updateBlogData = req.body;
    const blog = await Blogs.findByIdAndUpdate(blogId, updateBlogData);
    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully' });
    // res.redirect('/admin');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

// deleteBlog
module.exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    await Blogs.deleteOne({ _id: blogId });
    res.redirect('/admin');
  } catch (err) {
    res.redirect('error', { err });
  }
};
module.exports.deleteLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    await Loans.deleteOne({ _id: loanId });
    res.redirect('/admin');
  } catch (err) {
    res.redirect('error', { err });
  }
};

module.exports.addNewLoan = async (req, res) => {
  try {
    const { interest, documents, category } = req.body;
    if (interest && documents && category) {
      const newLoan = { interest, documents, category };
      await Loans.create(newLoan);
      res.redirect('/admin');
    }
  } catch (err) {
    res.redirect('error', { err });
  }
};

module.exports.sendNotificationToUser = async (req, res) => {
  const { userId } = req.params;
  const { title, message } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID ${userId} not found` });
    }

    user.notifications.push({ title, message });
    await user.save();

    res.redirect('/admin/user-details/' + userId);
  } catch (err) {
    res.redirect('error', { err });
  }
};

module.exports.sendNotificationToAll = async (req, res) => {
  const { title, message } = req.body;
  try {
    const users = await User.find();
    for (const user of users) {
      user.notifications.push({ title, message });
      await user.save();
    }
    res.redirect('/admin');
  } catch (err) {
    res.redirect('error', { err });
  }
};

module.exports.deleteNotification = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { 'notifications._id': notificationId },
      { $pull: { notifications: { _id: notificationId } } },
      { new: true }
    );

    if (!user) {
      return res.redirect('error', { err });
    }

    res.redirect('/admin/user-details/' + user._id);
  } catch (err) {
    res.redirect('error', { err });
  }
};
module.exports.deleteNotificationAdmin = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { 'notifications._id': notificationId },
      { $pull: { notifications: { _id: notificationId } } },
      { new: true }
    );

    if (!user) {
      return res.redirect('error', { err });
    }
    res.redirect('/admin');
  } catch (err) {
    res.redirect('error', { err });
  }
};
