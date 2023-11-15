const modal = document.getElementById('loanResultModal');

// Get the button that opens the modal
const calculateButton = document.getElementById('calculateButton');

// Get the <span> element that closes the modal
const closeModal = document.getElementById('closeModal');

// When the user clicks the button, open the modal
calculateButton.onclick = function () {
  // Fetch values from the form
  const loanType = document.getElementById('loandetails').value;
  const loanAmount = parseFloat(document.getElementById('loan-amount').value);
  const loanTime = parseInt(document.getElementById('loan-time').value);
  const rateOfInterest = parseFloat(
    document.getElementById('rate-interest').value
  );

  // Validate inputs
  if (isNaN(loanAmount) || isNaN(loanTime) || isNaN(rateOfInterest)) {
    alert(
      'Please enter valid numeric values for loan amount, tenure, and interest rate.'
    );
    return;
  }

  // Convert annual interest rate to monthly and percentage to decimal
  const monthlyInterestRate = rateOfInterest / 12 / 100;

  // Convert loan tenure to months
  const numberOfPayments = loanTime * 12;

  // Calculate EMI using the formula
  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Display the result in the modal
  document.getElementById('loanResult').innerHTML =
    'Loan Type: ' +
    loanType +
    '<br>' +
    'Loan Amount: ' +
    loanAmount +
    '<br>' +
    'Tenure Period: ' +
    loanTime +
    ' years' +
    '<br>' +
    'Rate of Interest: ' +
    rateOfInterest +
    '%' +
    '<br>' +
    'EMI: &#8377; ' +
    emi.toFixed(2);

  // Show the modal
  modal.style.display = 'flex';
};

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
