// admin dashboard section
document.addEventListener("DOMContentLoaded", function () {
  // Get all content sections
  var contentSections = document.querySelectorAll(".content-section");

  // Hide all content sections except the active one
  contentSections.forEach(function (section) {
    if (!section.classList.contains("active")) {
      section.style.display = "none";
    }
  });

  // Handle sidebar link clicks
  var sidebarLinks = document.querySelectorAll("#sidebar a");
  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Hide all content sections
      contentSections.forEach(function (section) {
        section.style.display = "none";
      });

      // Show the clicked content section
      var targetId = link.getAttribute("href").substring(1);
      var targetSection = document.getElementById(targetId);
      targetSection.style.display = "block";
    });
  });
});

// accordian section
$(function () {
  $(".fold-table tr.view").on("click", function () {
    $(this).toggleClass("open").next(".fold").toggleClass("open");
  });
});


// table section
document.addEventListener("DOMContentLoaded", function () {
  const sortSelect = document.getElementById("sort-filter");
  const amountFilter = document.getElementById("amount-filter");
  const applyFiltersButton = document.getElementById("apply-filters");
  const loanTypeFilter = document.getElementById("loan-type-filter"); // New filter
  const tableBody = document.querySelector("table.fold-table > tbody");

  let tableRows = Array.from(tableBody.querySelectorAll("tr.view"));

  applyFiltersButton.addEventListener("click", function () {
    // Filtering
    const filterValue = parseInt(amountFilter.value, 10);
    const selectedLoanType = loanTypeFilter.value.toLowerCase(); // New filter
    tableRows.forEach((row) => {
      const amountCell = row.querySelector(
        "td[data-column='amount']"
      ).textContent;
      const amount = parseFloat(amountCell.replace("₹", "").replace(",", ""));
      const loanType = row.querySelector("td.loan").textContent.toLowerCase();
      const hideByAmount =
        filterValue && filterValue !== 0 && amount >= filterValue * 100000;
      const hideByLoanType =
        selectedLoanType !== "" && !loanType.includes(selectedLoanType);

      if (!hideByAmount && !hideByLoanType) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });

    // Sorting
    const sortOrder = sortSelect.value;

    tableRows.sort((a, b) => {
      const aName = a.querySelector("td:first-child").textContent;
      const bName = b.querySelector("td:first-child").textContent;
      return sortOrder === "asc"
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    });

    // Clear the table and re-append sorted rows
    tableBody.innerHTML = "";
    tableRows.forEach((row) => {
      tableBody.appendChild(row);
    });
  });
});



// feedback section 

  var downloadGrid = (function () {
    "use strict";

    var $cardContainer = $(".download-cards");
    var $downloadCard = $(".download-card__content-box");
    var $viewTrigger = $("button").attr("data", "trigger");

    function swapTriggerActiveClass(e) {
      $viewTrigger.removeClass("active");
      $(e.target).addClass("active");
    }

    function swapView(e) {
      var $currentView = $(e.target).attr("data-trigger");
      $cardContainer.attr("data-view", $currentView);
    }

    $(document).ready(function () {
      // Event Listener
      $viewTrigger.click(function (e) {
        swapTriggerActiveClass(e);
        swapView(e);
      });
    });
  })();
    

//********************** */    Job section  javascript**************************************
  //Job image uploader section

document.addEventListener("DOMContentLoaded", function () {
  const inputFile = document.querySelector("#job-picture__input");
  const pictureImage = document.querySelector(".job-picture__image");
  const pictureImageTxt = "Choose an image";

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("job-picture__img"); // Add appropriate CSS class

        pictureImage.innerHTML = "";
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      pictureImage.innerHTML = pictureImageTxt;
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const jobFormButton = document.querySelector('[for="job_form"]');
  const jobViewButton = document.querySelector('[for="job_view"]');
  const jobFormContainer = document.getElementById("job_form");
  const jobViewContainer = document.getElementById("job_view");

  // Show job_form and hide job_view when jobFormButton is clicked
  jobFormButton.addEventListener("click", function () {
    jobFormContainer.style.display = "block";
    jobViewContainer.style.display = "none";
  });

  // Show job_view and hide job_form when jobViewButton is clicked
  jobViewButton.addEventListener("click", function () {
    jobViewContainer.style.display = "block";
    jobFormContainer.style.display = "none";
  });
});





// Blog description section

document.addEventListener("DOMContentLoaded", function () {
  const inputFile = document.querySelector("#blog-picture__input");
  const pictureImage = document.querySelector(".blog-picture__image");
  const pictureImageTxt = "Choose an image";

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("blog-picture__img"); // Add appropriate CSS class

        pictureImage.innerHTML = "";
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      pictureImage.innerHTML = pictureImageTxt;
    }
  });
});


// admin blog section javascript
document.addEventListener("DOMContentLoaded", function () {
  const blogFormButton = document.querySelector('[for="blog_from"]');
  const blogViewButton = document.querySelector('[for="blog_view"]');
  const blogFormContainer = document.getElementById("blog_from");
  const blogViewContainer = document.getElementById("blog_view");

  // Hide blog_from and show blog_view by default
  blogFormContainer.style.display = "none";
  blogViewContainer.style.display = "block";

  // Show blog_from and hide blog_view when blogFormButton is clicked
  blogFormButton.addEventListener("click", function () {
    blogFormContainer.style.display = "block";
    blogViewContainer.style.display = "none";
  });

  // Show blog_view and hide blog_from when blogViewButton is clicked
  blogViewButton.addEventListener("click", function () {
    blogViewContainer.style.display = "block";
    blogFormContainer.style.display = "none";
  });
});
