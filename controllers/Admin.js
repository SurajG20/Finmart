const User = require('../models/User');
const Feedback = require('../models/Feedback');
const Blogs = require('../models/Blogs');
const Loans = require('../models/LoanType');
const Frequently = require('../models/Frequently');
const CombinedDetails = require('../models/CombinedDetails');
const Jobs = require('../models/Jobs');
const Newsletter = require('../models/Newsletter');

module.exports.admin = async (req, res) => {
  const jobs = await Jobs.find();
  const blogs = await Blogs.find();
  const loans = await Loans.find();
  const user = req.session?.passport.user;
  const newsletter = await Newsletter.find();
  const allFeedback = await Feedback.find();
  const allUsers = await CombinedDetails.find();
  res.render('admin', {
    user,
    allFeedback,
    newsletter,
    blogs,
    jobs,
    loans,
    allUsers,
  });
};
// delete feedback
module.exports.deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  console.log(feedbackId);
  await Feedback.findByIdAndRemove(feedbackId);
  res.redirect('/admin');
};
// delete feedback
module.exports.deleteNewsletter = async (req, res) => {
  const { subsId } = req.params;
  await Newsletter.findByIdAndRemove(subsId);
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
  console.log(req.body);
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
    res.status(201).json({ message: 'FAQ created successfully' });
    // res.redirect('admin');
  } catch (error) {
    res.status(500).json({ message: 'Error creating FAQ' });
  }
};

// update faq
module.exports.updateFaqs = async (req, res) => {
  const { question, answer } = req.body;
  const faqId = req.params.faqId;
  console.log(faqId);
  try {
    const updatedFAQ = await Frequently.findByIdAndUpdate(
      faqId,
      { question, answer },
      { new: true }
    );
    // res.redirect('admin', { updatedFAQ });
    res.status(200).json({ message: 'FAQ updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating FAQ' });
  }
};

// deletefaq
module.exports.deleteFaq = async (req, res) => {
  const faqId = req.params.faqId;
  console.log(faqId);
  try {
    await Frequently.findByIdAndRemove(faqId);
    // res.redirect('admin');
    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting FAQ' });
  }
};

// addNewBLog
module.exports.addNewBlog = async (req, res) => {
  try {
    const { title, description, author, category } = req.body;
    if (title && description && author && category) {
      const newBlog = { title, description, author, category };
      if (req.files) {
        newBlog.images = req.files.map((f) => {
          return {
            url: f.path,
            filename: f.filename,
          };
        });
      }
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
    // if (req.file) {
    //   images = {
    //     url: req.file.path,
    //     filename: req.file.filename,
    //   };
    //   blog.image = [...images];
    // }
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

module.exports.sendNotification = async (req, res) => {
  console.log(req.body);
  const { userIds, title, message } = req.body;
  try {
    for (const userId of userIds) {
      const user = await User.findById(userId);
      if (!user) {
        console.error(`User with ID ${userId} not found`);
        continue;
      }
      user.notifications.push({ title, message });
      await user.save();
    }

    return res.status(200).json({ message: 'Notifications sent successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
