const Feedback = require('../models/Feedback');
const Blogs = require('../models/Blogs');
const Frequently = require('../models/Frequently');
const CombinedDetails = require('../models/CombinedDetails');
const Jobs = require('../models/Jobs');
const Newsletter = require('../models/Newsletter');

// get all subscribed emails
module.exports.getAllNewsletter = async (req, res) => {
  try {
    const subscribedEmails = await Newsletter.find();
    // res.render('admin', { subscribedEmails });
    res.status(200).json({ subscribedEmails });
  } catch (error) {
    res.render('error');
  }
};

// get all feedback
module.exports.getAllFeedback = async (req, res) => {
  try {
    const allFeedback = await Feedback.find();
    // res.redirect('admin', { allFeedback });
    res.status(200).json({ allFeedback });
  } catch (error) {
    res.redirect('error', { error });
  }
};
// delete feedback
module.exports.deleteFeedback = async (req, res) => {
  const feedbackId = req.params.feedbackId;
  try {
    await Feedback.findByIdAndRemove(feedbackId);
    res.redirect('admin');
  } catch (error) {
    res.redirect('error', { error });
  }
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

// get all jobs
module.exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find();
    // res.render('admin', { jobs });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch personal details.' });
  }
};

// get new job
module.exports.addNewJob = async (req, res) => {
  try {
    const { title, description, city, state, image } = req.body;
    if (title && description && city && state && image) {
      const newJob = req.body;
      // console.log(req.files);
      // if (req.file) {
      //   newJob.image = {
      //     url: req.file.path,
      //     filename: req.file.filename,
      //   };
      // }
      await Jobs.create(newJob);
      res.status(200).json({ message: 'Job created successfully' });
      // res.redirect('/admin');
    }
  } catch (err) {
    // res.redirect('error', { err });
    res.status(500).json({ err: err });
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
    // res.redirect('/admin');
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error(err);
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

// get all FAQs
module.exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Frequently.find();
    // res.redirect('admin', { faqs });
    res.status(200).json({ faqs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQs' });
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

// getAllBlog
module.exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json({ blogs });
    // res.render('admin', { blogs });
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch personal details.' });
  }
};

// addNewBLog
module.exports.addNewBlog = async (req, res) => {
  try {
    const { title, description, author, image } = req.body;
    console.log(image);
    if (title && description && author && image) {
      const newBlog = req.body;
      // console.log(req.files);
      // if (req.file) {
      //   newBlog.image = {
      //     url: req.file.path,
      //     filename: req.file.filename,
      //   };
      // }
      await Blogs.create(newBlog);
      res.status(201).json({ message: 'Blog created successfully' });
      // res.redirect('/admin');
    }
  } catch (err) {
    res.status(500).json({ err: err });
    // res.redirect('error', { err });
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
    // res.redirect('/admin');
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
