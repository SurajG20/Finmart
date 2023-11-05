document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedback-form');
  const formMessage = document.getElementById('form-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the form data
    const formData = new FormData(form);
    // You can use the Fetch API to send the form data to your server
    fetch('/feedback', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Check the response from the server for success or error
        if (data.success) {
          // Display a success message
          formMessage.textContent = 'Form submitted successfully!';
          formMessage.className = 'text-success';

          // Clear the form data
          form.reset();
        } else {
          // Display an error message
          formMessage.textContent = 'Form submission failed. Please try again.';
          formMessage.className = 'text-danger';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('subscribe-form');
  const formMessage = document.getElementById('subscribe-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    fetch('/newsletter', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          formMessage.textContent = 'Subsribed successfully!';
          formMessage.class = 'text-success';
          form.reset();
        } else {
          formMessage.textContent = 'Subscribtion failed. Please try again.';
          formMessage.className = 'text-danger';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});
// fixed rate of interest based on type of loan
document.addEventListener('DOMContentLoaded', function () {
  const typeOfLoanSelect = document.getElementById('loandetails');
  const rateOfInterestInput = document.getElementById('rate-interest');

  // Define the interest rates for different loan types
  const interestRates = {
    'Debt-Financing': 5.5, // Set the rate of interest for Debt Loan
    'Housing-Finance': 4.0, // Set the rate of interest for Housing Loan
    'Education-Finance': 6.5, // Set the rate of interest for Education Loan
    'Car-Finance': 5.0, // Set the rate of interest for Car Loan
    'Business-Finance': 7.0, // Set the rate of interest for Business Loan
    Other: 5.0, // Set a default rate of interest for "Other" type
  };

  typeOfLoanSelect.addEventListener('change', function () {
    const selectedLoanType = typeOfLoanSelect.value;
    console.log(selectedLoanType);
    if (interestRates[selectedLoanType]) {
      rateOfInterestInput.value = interestRates[selectedLoanType];
    }
  });
});

// homepage calculator data getting
document
  .getElementById('calculatorForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get user inputs from the form
    const loanType = document.getElementById('loandetails').value;
    const loanAmount = document.getElementById('loan-amount').value;
    const tenurePeriod = document.getElementById('loan-time').value;
    const rateOfInterest = document.getElementById('rate-interest').value;

    // Construct the URL with the data as parameters
    const url = `loan?loanType=${loanType}&loanAmount=${loanAmount}&tenurePeriod=${tenurePeriod}&rateOfInterest=${rateOfInterest}`;

    // Redirect to the loan page with the data
    window.location.href = url;
  });

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Retrieve the URL parameters
const loanType = getUrlParameter('loanType');
const loanAmount = getUrlParameter('loanAmount');
const tenurePeriod = getUrlParameter('tenurePeriod');
const rateOfInterest = getUrlParameter('rateOfInterest');

// Populate the Emi Calculator form fields
document.getElementById('loandetails').value = loanType;
document.getElementById('SetRange').value = loanAmount;
document.getElementById('loan-time').value = tenurePeriod;
document.getElementById('rate-interest').value = rateOfInterest;
