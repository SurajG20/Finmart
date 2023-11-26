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

document.addEventListener('DOMContentLoaded', function () {
  const typeOfLoanSelect = document.getElementById('loandetails');
  const rateOfInterestInput = document.getElementById('rate-interest');

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
    if (interestRates[selectedLoanType]) {
      rateOfInterestInput.value = interestRates[selectedLoanType];
    }
  });
});
