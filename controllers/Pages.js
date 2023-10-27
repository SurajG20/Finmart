const Feedback = require('../models/Feedback');
const Blogs = require('../models/Blogs');
const Frequently = require('../models/Frequently');
const Jobs = require('../models/Jobs');
const { cloudinary } = require('../cloudinary');
const Newsletter = require('../models/Newsletter');
const CombinedDetails = require('../models/CombinedDetails');

// homepage
module.exports.home = async (req, res) => {
  const blogs = await Blogs.find();
  const user = req.session.user;
  const frequently = await Frequently.find();
  const feedback = await Feedback.find();
  res.render('index', { blogs, frequently, feedback, user });
};
// about page
module.exports.about = (req, res) => {
  res.render('about');
};
module.exports.user = (req, res) => {
  res.render('user');
};
module.exports.admin = (req, res) => {
  res.render('admin');
};
module.exports.login = (req, res) => {
  res.render('login');
};
module.exports.register = (req, res) => {
  res.render('register');
};

module.exports.newsletter = async (req, res) => {
  const { email } = req.body;
  try {
    const subscribedEmail = new Newsletter({ email });
    await subscribedEmail.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing to the newsletter' });
  }
};
//Feedback
module.exports.feedback = async (req, res) => {
  const { fullname, email, message, subject } = req.body;
  try {
    const feedback = new Feedback({ fullname, email, message, subject });
    await feedback.save();
    res.status(201).json({ message: 'feedback recieved successfully' });
  } catch (error) {
    res.render('error', { error });
  }
};

// loan page
module.exports.loan = async (req, res) => {
  res.render('loan');
};

// blog page
module.exports.blog = async (req, res) => {
  const blogs = await Blogs.find();
  res.render('blog', { blogs });
};

// contact page
module.exports.contact = async (req, res) => {
  const frequently = await Frequently.find();
  res.render('contact', { frequently });
};

// rendering job post page
module.exports.renderJobPost = async (req, res) => {
  const jobs = await Jobs.find();
  res.render('job-post', { jobs });
};

// rendering job application page for user to apply
module.exports.addJobApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const singleJob = await Jobs.findById({ _id: jobId });
    // res.render('job-application');
    res.status(200).json({ message: 'single job successfully' });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

// apply to job for user
module.exports.applyToJob = async (req, res) => {
  try {
    const { userId, jobId, firstname, lastname, message, email, phone } =
      req.body;
    console.log(req.body);
    const application = {
      user: userId,
      firstname,
      lastname,
      message,
      email,
      phone,
      attachment: { url: 'someurl', filename: 'somefilename' },
    };

    // if (req.file) {
    //   const resumeURL = req.file.path;
    //   application.attachment = resumeURL;
    // }
    const job = await Jobs.findById(jobId);
    job.applications.push(application);
    await job.save();
    // res.redirect('/jobs');
    res.status(200).json({ message: 'Job applied successfully' });
  } catch (err) {
    // res.redirect('error', { err });
    res.status(500).json({ err: err });
  }
};

// rendering blog details page
module.exports.renderBlogDetails = async (req, res) => {
  try {
    const { blogId } = req.params;
    const singleBlog = await Blogs.findById({ _id: blogId });
    // res.render('blog-details', { singleBlog });
    res.status(200).json({ message: 'single blog successfully' });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

// rendering error page
module.exports.errorPage = (req, res) => {
  res.render('error');
};

// Handle submission of loan details form

module.exports.submitLoanDetails = async (req, res) => {
  try {
    const { loanType, interestRate, tenureYears, loanAmount, financingType } =
      req.body;
    // Collect and validate loan details data from the request
    const loanDetails = {
      loanType: loanType,
      rateOfInterest: interestRate,
      tenurePeriodInYears: tenureYears,
      amount: loanAmount,
      financingType: financingType,
    };

    const userId = req.session.user._id;
    let combinedDetails = await CombinedDetails.findOne({ userId });

    if (!combinedDetails) {
      combinedDetails = new CombinedDetails({
        userId,
        loanDetails,
        personalDetails: {},
        documentUploads: [],
      });
    } else {
      combinedDetails.loanDetails = loanDetails;
    }

    // Save the combined details data
    await combinedDetails.save();

    // res.redirect('/personal-details');
    res.status(200).json({ message: 'loan details saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not save loan details.' });
    // res.render('error', { error });
  }
};

module.exports.submitPersonalDetails = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      maritalStatus,
      email,
      mobileNumber,
      presentAddress,
      state,
      city,
      zipCode,
    } = req.body;
    // Collect and validate personal details data from the request
    const personalDetails = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      maritalStatus: maritalStatus,
      email: email,
      mobileNumber: mobileNumber,
      presentAddress: presentAddress,
      state: state,
      city: city,
      zipCode: zipCode,
    };

    // Find or create a CombinedDetails document for the user
    const userId = req.session.user._id;
    let combinedDetails = await CombinedDetails.findOne({ userId });

    if (!combinedDetails) {
      combinedDetails = new CombinedDetails({
        userId,
        loanDetails: {},
        personalDetails,
        documentUploads: [],
      });
    } else {
      combinedDetails.personalDetails = personalDetails;
    }

    // Save the combined details data
    await combinedDetails.save();

    // Redirect to the next form (e.g., document upload form)
    // res.redirect('/document-upload');
    res.status(200).json({ message: 'personal details saved successfully' });
  } catch (error) {
    // Handle errors, e.g., render an error page
    // res.render('error', { error });
    res.status(500).json({ error: 'Could not save personal details.' });
  }
};

// Handle submission of document upload form
module.exports.submitDocumentUpload = async (req, res) => {
  try {
    // const { description, fileUrl } = req.body;

    testingData = {
      url: 'String',
      filename: 'ring',
    };
    const userId = req.session.user._id;
    let combinedDetails = await CombinedDetails.findOne({ userId });

    if (!combinedDetails) {
      combinedDetails = new CombinedDetails({
        userId,
        loanDetails: {},
        personalDetails: {},
        documentUploads: [{ description, fileUrl }],
      });
    } else {
      combinedDetails.documentUploads.push(testingData);
    }

    // Save the combined details data
    await combinedDetails.save();

    // res.redirect('/confirmation-page');
    res.status(200).json({ message: 'document uploaded successfully' });
  } catch (error) {
    // res.render('error', { error });
    res.status(500).json({ error: 'Could not save document upload.' });
  }
};
