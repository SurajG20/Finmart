const Feedback = require('../models/Feedback');
const Blogs = require('../models/Blogs');
const Frequently = require('../models/Frequently');
const Jobs = require('../models/Jobs');
const Loans = require('../models/LoanType');
const Newsletter = require('../models/Newsletter');
const CombinedDetails = require('../models/CombinedDetails');

// Function to calculate EMI
function calculateEMI(principalStr, annualInterestRateStr, tenureInYearsStr) {
  const principal = parseFloat(principalStr);
  const annualInterestRate = parseFloat(annualInterestRateStr);
  const tenureInYears = parseFloat(tenureInYearsStr);
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfMonths = tenureInYears * 12;
  const emi =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
    (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
  return emi.toFixed(2);
}

// home page
module.exports.home = async (req, res) => {
  const blogs = await Blogs.find();
  const user = req.session?.passport?.user;
  const frequently = await Frequently.find();
  const feedbacks = await Feedback.find();
  res.render('index', { blogs, frequently, feedbacks, user });
};

// about page
module.exports.about = (req, res) => {
  const user = req.session?.passport?.user;
  res.render('about', { user });
};
module.exports.user = async (req, res) => {
  const user = req.session?.passport?.user;
  const userData = await CombinedDetails.findOne({ userId: user._id });
  const loanType = userData?.loanDetails?.['select-loan-type'];
  const rateNew = await Loans.findOne({ category: loanType }).select(
    'interest'
  );
  const principal = userData?.loanDetails?.loanAmount;
  const tenure = userData?.loanDetails?.tenureDuration;
  const emi = calculateEMI(principal, rateNew?.interest, tenure);
  res.render('user', { user, userData, emi });
};

module.exports.login = (req, res) => {
  res.render('login');
};
module.exports.register = (req, res) => {
  res.render('register');
};

module.exports.newsletter = async (req, res) => {
  try {
    const { email } = req.body;
    const subscribedEmail = new Newsletter({ email });
    await subscribedEmail.save();

    res.json({ success: true });
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

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Form submission failed.' });
  }
};

// loan page
module.exports.loan = async (req, res) => {
  const user = req.session?.passport?.user;
  res.render('loan', { user });
};

// blog page
module.exports.blog = async (req, res) => {
  const blogs = await Blogs.find();
  const user = req.session?.passport?.user;
  res.render('blog', { blogs, user });
};

// contact page
module.exports.contact = async (req, res) => {
  const frequently = await Frequently.find();
  const user = req.session?.passport?.user;
  res.render('contact', { frequently, user });
};

// rendering job post page
module.exports.renderJobPost = async (req, res) => {
  const user = req.session?.passport?.user;
  const jobs = await Jobs.find();
  res.render('job-post', { jobs, user });
};

// rendering job application page for user to apply
module.exports.addJobApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const user = req.session?.passport?.user;
    const singleJob = await Jobs.findById({ _id: jobId });
    res.render('job-application', { singleJob, user });
  } catch (err) {
    res.redirect('error', { err });
  }
};

// apply to job for user
module.exports.applyToJob = async (req, res) => {
  try {
    const { jobId, fullname, message, email, phone } = req.body;
    const application = {
      fullname,
      message,
      email,
      phone,
    };
    if (req.file) {
      const attachment = {
        url: req.file.path,
        filename: req.file.originalname,
      };
      application.attachment = attachment;
    }

    const job = await Jobs.findById(jobId);
    job.applications.push(application);
    await job.save();
    res.redirect('/job-post');
  } catch (err) {
    res.redirect('error', { err });
  }
};

// rendering blog details page
module.exports.renderBlogDetails = async (req, res) => {
  try {
    const { blogId } = req.params;
    const singleBlog = await Blogs.findById({ _id: blogId });
    const user = req.session?.passport?.user;
    res.render('blog-details', { user, singleBlog });
  } catch (err) {
    res.redirect('error', { err });
  }
};

// rendering error page
module.exports.errorPage = (req, res) => {
  res.render('error');
};

// Handle submission of loan details form

module.exports.renderLoanDetails = async (req, res) => {
  const user = req.session?.passport?.user;
  const loans = await Loans.find();
  res.render('loan-details', { user, loans });
};

module.exports.renderPersonalDetails = async (req, res) => {
  const user = req.session?.passport?.user;
  res.render('personal-details', { user });
};

module.exports.renderDocumentUpload = async (req, res) => {
  const user = req.session?.passport?.user;
  const userData = await CombinedDetails.findOne({ userId: user._id });
  const loanType = userData?.loanDetails?.['select-loan-type'];
  const documentsRequired = await Loans.findOne({ category: loanType }).select(
    'documents'
  );
  const documentArray = documentsRequired?.documents
    ? documentsRequired.documents.split(',').map((item) => item.trim())
    : [];

  res.render('document-upload', { user, documentArray });
};

module.exports.submitLoanDetails = async (req, res) => {
  try {
    const loanDetails = req.body;

    const userId = req.session.passport.user._id;

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
    await combinedDetails.save();

    res.redirect('/document-upload');
  } catch (error) {
    res.render('error', { error });
  }
};

module.exports.submitPersonalDetails = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      day,
      month,
      year,
      MaritalStatus,
      email,
      mobileNumber,
      presentAddress,
      state,
      city,
      zipCode,
    } = req.body;
    const dateOfBirth = `${day}, ${month}, ${year}`;
    const personalDetails = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      MaritalStatus: MaritalStatus,
      email: email,
      mobileNumber: mobileNumber,
      presentAddress: presentAddress,
      state: state,
      city: city,
      zipCode: zipCode,
    };

    const userId = req.session.passport.user._id;
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
    await combinedDetails.save();
    res.redirect('/loan-details');
  } catch (error) {
    res.render('error', { error });
  }
};

module.exports.submitDocumentUpload = async (req, res) => {
  try {
    if (req.files) {
      const userId = req.session.passport.user._id;

      const documents = req.files.map((f) => {
        return {
          url: f.path,
          filename: f.filename,
        };
      });

      let combinedDetails = await CombinedDetails.findOne({ userId });

      if (!combinedDetails) {
        combinedDetails = new CombinedDetails({
          userId,
          loanDetails: {},
          personalDetails: {},
          documentUploads: documents,
        });
      } else {
        combinedDetails.documentUploads =
          combinedDetails.documentUploads.concat(documents);
      }
      await combinedDetails.save();
      res.redirect('/user');
    } else {
      res.render('error', { error: 'No files uploaded' });
    }
  } catch (error) {
    res.render('error', { error });
  }
};
