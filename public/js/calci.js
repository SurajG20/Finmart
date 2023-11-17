document.addEventListener("DOMContentLoaded", function () {
  var P, R, N, pie, line;

  var loan_amt_input = document.getElementById("loan-amt-text");
  var int_rate_input = document.getElementById("interest-rate-text");
  var loan_period_input = document.getElementById("loan-period-text");
  var loan_amt_slider = document.getElementById("loan-amount");
  var int_rate_slider = document.getElementById("interest-rate");
  var loan_period_slider = document.getElementById("loan-period");

  // Update loan amount from input field
  loan_amt_input.addEventListener("input", (self) => {
    loan_amt_slider.value = parseInt(self.target.value.replace(/,/g, ""));
    P = parseFloat(loan_amt_slider.value);
    displayDetails();
  });

  // Update interest rate from input field
  int_rate_input.addEventListener("input", (self) => {
    int_rate_slider.value = parseFloat(self.target.value);
    R = parseFloat(int_rate_slider.value);
    displayDetails();
  });

  // Update loan period from input field
  loan_period_input.addEventListener("input", (self) => {
    loan_period_slider.value = parseFloat(self.target.value);
    N = parseFloat(loan_period_slider.value);
    displayDetails();
  });

  // Update loan amount from slider
  loan_amt_slider.addEventListener("input", (self) => {
    loan_amt_input.value = parseInt(self.target.value).toLocaleString("en-IN");
    P = parseFloat(self.target.value);
    displayDetails();
  });

  // Update interest rate from slider
  int_rate_slider.addEventListener("input", (self) => {
    int_rate_input.value = self.target.value + "%";
    R = parseFloat(self.target.value);
    displayDetails();
  });

  // Update loan period from slider
  loan_period_slider.addEventListener("input", (self) => {
    loan_period_input.value = self.target.value + " years";
    N = parseFloat(self.target.value);
    displayDetails();
  });

  // calculate total Interest payable
  function calculateLoanDetails(p, r, emi) {
    /*
    p: principal
    r: rate of interest
    emi: monthly emi
  */
    let totalInterest = 0;
    let yearlyInterest = [];
    let yearPrincipal = [];
    let years = [];
    let year = 1;
    let [counter, principal, interes] = [0, 0, 0];
    while (p > 0) {
      let interest = parseFloat(p) * parseFloat(r);
      p = parseFloat(p) - (parseFloat(emi) - interest);
      totalInterest += interest;
      principal += parseFloat(emi) - interest;
      interes += interest;
      if (++counter == 12) {
        years.push(year++);
        yearlyInterest.push(parseInt(interes));
        yearPrincipal.push(parseInt(principal));
        counter = 0;
      }
    }
    line.data.datasets[0].data = yearPrincipal;
    line.data.datasets[1].data = yearlyInterest;
    line.data.labels = years;
    return totalInterest;
  }

  // calculate details
  function displayDetails() {
    let r = parseFloat(R) / 1200;
    let n = parseFloat(N) * 12;

    let num = parseFloat(P) * r * Math.pow(1 + r, n);
    let denom = Math.pow(1 + r, n) - 1;
    let emi = parseFloat(num) / parseFloat(denom);
    emi = parseFloat(emi.toFixed(2));
    let payabaleInterest = calculateLoanDetails(P, r, emi);

    let opts = '{style: "decimal", currency: "INR"}';

    document.querySelector("#cp").innerText =
      parseFloat(P).toLocaleString("en-IN", opts) + "₹";

    document.querySelector("#ci").innerText =
      parseFloat(payabaleInterest).toLocaleString("en-IN", opts) + "₹";

    document.querySelector("#ct").innerText =
      parseFloat(parseFloat(P) + parseFloat(payabaleInterest)).toLocaleString(
        "en-IN",
        opts
      ) + "₹";

    document.querySelector("#price").innerText =
      (emi / 10).toLocaleString("en-IN", opts) + "₹";

    pie.data.datasets[0].data[0] = P;
    pie.data.datasets[0].data[1] = payabaleInterest;
    pie.update();
    line.update();
  }

  // Initialize everything
  function initialize() {
    document.querySelector("#loan-amt-text").innerText =
      parseInt(loan_amt_slider.value).toLocaleString("en-IN") + "₹";
    P = parseFloat(document.getElementById("loan-amount").value);

    document.querySelector("#interest-rate-text").innerText =
      int_rate_slider.value + "%";
    R = parseFloat(document.getElementById("interest-rate").value);

    document.querySelector("#loan-period-text").innerText =
      loan_period_slider.value + " years";
    N = parseFloat(document.getElementById("loan-period").value);

    line = new Chart(document.getElementById("lineChart"), {
      data: {
        datasets: [
          {
            type: "line",
            label: "Yearly Principal paid",
            borderColor: "rgb(67, 85, 133)",
            data: [],
          },
          {
            type: "line",
            label: "Yearly Interest paid",
            borderColor: "rgb(67, 85, 133)",
            data: [],
          },
        ],
        labels: [],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Yearly Payment Breakdown",
          },
        },
        scales: {
          x: {
            title: {
              color: "grey",
              display: true,
              text: "Years Passed",
            },
          },
          y: {
            title: {
              color: "grey",
              display: true,
              text: "Money in Rs.",
            },
          },
        },
      },
    });

    pie = new Chart(document.getElementById("pieChart"), {
      type: "doughnut",
      data: {
        labels: ["Principal", "Interest"],
        datasets: [
          {
            label: "Loan Details",
            data: [0, 0],
            backgroundColor: ["rgb(242, 255, 233)", "rgb(67, 85, 133)"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Payment Breakup",
          },
        },
      },
    });
    displayDetails();
  }
  initialize();
});
