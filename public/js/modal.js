document
  .getElementById('calculateButton')
  .addEventListener('click', function (e) {
    e.preventDefault();

    // Fetch values from the form
    var loanType = document.getElementById('loandetails').value;
    var loanAmount = parseFloat(document.getElementById('loan-amount').value);
    var loanTime = parseInt(document.getElementById('loan-time').value);
    var rateOfInterest = parseFloat(
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
    var monthlyInterestRate = rateOfInterest / 12 / 100;

    // Convert loan tenure to months
    var numberOfPayments = loanTime * 12;

    // Calculate EMI using the formula
    var emi =
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
    document.getElementById('loanResultModal').style.display = 'flex';
  });
