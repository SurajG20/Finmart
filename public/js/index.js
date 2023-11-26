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

document.addEventListener('DOMContentLoaded', async function () {
  const typeOfLoanSelect = document.getElementById('loandetails');
  const rateOfInterestInput = document.getElementById('rate-interest');

  const response = await fetch('/loan-data');
  const loanData = await response.json();

  const interestRates = {};
  loanData.forEach((loan) => {
    interestRates[loan.category] = parseFloat(loan.interest);
  });

  typeOfLoanSelect.addEventListener('change', function () {
    const selectedLoanType = typeOfLoanSelect.value;
    if (interestRates[selectedLoanType]) {
      rateOfInterestInput.value = interestRates[selectedLoanType];
    }
  });
});
