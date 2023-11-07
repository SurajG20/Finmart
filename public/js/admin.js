//**************************************  sidebar toggler js start *************************************


document.addEventListener("DOMContentLoaded", function () {
  // Get the id parameter from the URL
    var dashboard = document.querySelectorAll("#dashboard");


  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  // Get all content sections
  var contentSections = document.querySelectorAll(".content-section");

  // Hide all content sections except the userDetail div if id is '2'
  if (idParam) {
    contentSections.forEach(function (section) {
      if (section.id !== "userDetail") {
        section.style.display = "none";
      }
    });

    // Show the userDetail div
    var userDetailDiv = document.getElementById("userDetail");
    userDetailDiv.style.display = "block";
  } else {
    // Hide userDetail and show other content sections for different URLs
    contentSections.forEach(function (section) {
      section.style.display = "none";
    });
  }

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


// dashboard;

//**************************************  sidebar togggler js end ***************************************

//****************************** dashboard  Toggler js start ******************************

var customers = [
  {
    ID: 1,
    fullName: "Test1",
    contact: "(800) 555-2797",
    amount: "₹ 890000",
    loanType: "Personal Loan",
    date: "19/12/2020",
    status: "Active",
  },
  {
    ID: 2,

    fullName: "Test2",
    contact: "(800) 555-1212",
    amount: "₹ 670000",
    loanType: "Home Loan",
    date: "16/12/2020",
    status: "Pending",
  },
  {
    ID: 3,

    fullName: "Test3",
    contact: "(800) 555-1243",
    amount: "₹ 600000",
    loanType: "Education Loan",
    date: "18/12/2020",
    status: "Active",
  },
  {
    ID: 4,
    fullName: "Test4",
    contact: "(800) 555-8787",
    amount: "₹ 150000",
    loanType: "Car Loan",
    date: "11/12/2020",
    status: "Failed",
  },
  {
    ID: 5,

    fullName: "Test6",
    contact: "(800) 555-9323",
    amount: "₹ 120000",
    loanType: "Home Loan",
    date: "13/12/2020",
    status: "Active",
  },
];

$(function () {
  var grid = $("#gridContainer")
    .dxDataGrid({
      dataSource: customers,
      filterRow: {
        visible: true,
      },
      columns: [
        "fullName",
        "contact",
        "amount",
        "loanType",
        "date",
        "status",
        {
          caption: "Actions",
          cellTemplate: function (container, options) {
            $("<button>")
              .addClass("btn btn-primary")
              .text("View")
              .on("click", function () {
                // Generate the URL based on the ID and navigate to the link
                var customerId = options.data.ID;
                var url = "/admin?id=" + customerId; // Modify the URL structure as per your requirements
                window.location.href = url; // Navigate to the URL
              })
              .appendTo(container);
          },
        },
      ],
      showBorders: true,
      sorting: {
        mode: "multiple",
      },
    })
    .dxDataGrid("instance");

  $("#sortAZBtn").on("click", function () {
    grid.option(
      "dataSource",
      customers.slice().sort((a, b) => a.fullName.localeCompare(b.fullName))
    );
  });

  $("#sortDateBtn").on("click", function () {
    grid.option(
      "dataSource",
      customers
        .slice()
        .sort(
          (a, b) =>
            new Date(a.date.split("/").reverse().join("-")) -
            new Date(b.date.split("/").reverse().join("-"))
        )
    );
  });

  $("#sortLoanTypeBtn").on("click", function () {
    grid.option(
      "dataSource",
      customers.slice().sort((a, b) => a.loanType.localeCompare(b.loanType))
    );
  });

  $("#sortAmountBtn").on("click", function () {
    grid.option(
      "dataSource",
      customers
        .slice()
        .sort(
          (a, b) =>
            parseInt(a.amount.replace(/\D/g, "")) -
            parseInt(b.amount.replace(/\D/g, ""))
        )
    );
  });

  $("#sortStatusBtn").on("click", function () {
    grid.option(
      "dataSource",
      customers.slice().sort((a, b) => a.status.localeCompare(b.status))
    );
  });
});

//****************************** job Toggler js start ******************************

document.addEventListener("DOMContentLoaded", function () {
  const jobFormContainer = document.getElementById("job_form");
  const jobViewContainer = document.getElementById("job_view");
  const jobApplicantContainer = document.getElementById("job_Applicant");

  // Initially, show job_view and hide job_form and job_Applicant
  jobFormContainer.style.display = "none";
  jobApplicantContainer.style.display = "none";

  // Show job_view and hide job_form and job_Applicant on dom load
  jobViewContainer.style.display = "block";

  // Update the buttons' event listeners
  const jobFormButton = document.querySelector('[for="job_form"]');
  const jobViewButton = document.querySelector('[for="job_view"]');
  const jobApplicantButton = document.querySelector('[for="job_Applicant"]');

  jobFormButton.addEventListener("click", function () {
    jobFormContainer.style.display = "block";
    jobViewContainer.style.display = "none";
    jobApplicantContainer.style.display = "none";
  });

  jobViewButton.addEventListener("click", function () {
    jobViewContainer.style.display = "block";
    jobFormContainer.style.display = "none";
    jobApplicantContainer.style.display = "none";
  });

  jobApplicantButton.addEventListener("click", function () {
    jobApplicantContainer.style.display = "block";
    jobFormContainer.style.display = "none";
    jobViewContainer.style.display = "none";
  });
});

//************************************** */ Job Toogler js end *****************************************

// Blog Toogler js
//************************************** */ blog Toogler js start *****************************************
// blog image handler
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

// blog switch handler
document.addEventListener("DOMContentLoaded", function () {
  const jobFormButton = document.querySelector('[for="blog_form"]');
  const jobViewButton = document.querySelector('[for="blog_view"]');
  const jobFormContainer = document.getElementById("blog_form");
  const jobViewContainer = document.getElementById("blog_view");
  jobFormContainer.style.display = "none";

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

//************************************** */ Blog js End *****************************************

//************************************** */ Loan setting start *******************************************
document.addEventListener("DOMContentLoaded", function () {
  const setting_FormContainer = document.getElementById("setting_form");
  const setting_formViewContainer = document.getElementById("setting_view");

  // Initially, show job_view and hide job_form and job_Applicant
  setting_FormContainer.style.display = "none";
  setting_formViewContainer.style.display = "block";


  // Update the buttons' event listeners
  const setting_formFormButton = document.querySelector('[for="setting_form"]');
  const setting_formViewButton = document.querySelector('[for="setting_view"]');

  setting_formFormButton.addEventListener("click", function () {
    setting_FormContainer.style.display = "block";
    setting_formViewContainer.style.display = "none";
  });


  setting_formViewButton.addEventListener("click", function () {
    setting_formViewContainer.style.display = "block";
    setting_FormContainer.style.display = "none";
  });
});



//************************************** */ Loan setting End *******************************************











//************************************** */ User js start ***************************************
document.addEventListener("DOMContentLoaded", function () {
  // Get the buttons and corresponding divs by their IDs
  var personalDetailBtn = document.getElementById("personalDetailBtn");
  var loanDetailBtn = document.getElementById("loanDetailBtn");
  var applicationDetailBtn = document.getElementById("applicationDetailBtn");
  var documentDetailBtn = document.getElementById("documentDetailBtn");

  var personalDetail = document.getElementById("personalDetail");
  var loanDetail = document.getElementById("loanDetail");
  var applicationDetail = document.getElementById("applicationDetail");
  var documentDetail = document.getElementById("documentDetail");

  // Show personalDetail by default and hide others
  showDiv(personalDetail);
  hideOthers([loanDetail, applicationDetail, documentDetail]);

  // Add click event listeners to the buttons
  personalDetailBtn.addEventListener("click", function () {
    showDiv(personalDetail);
    hideOthers([loanDetail, applicationDetail, documentDetail]);
  });

  loanDetailBtn.addEventListener("click", function () {
    showDiv(loanDetail);
    hideOthers([personalDetail, applicationDetail, documentDetail]);
  });

  applicationDetailBtn.addEventListener("click", function () {
    showDiv(applicationDetail);
    hideOthers([personalDetail, loanDetail, documentDetail]);
  });

  documentDetailBtn.addEventListener("click", function () {
    showDiv(documentDetail);
    hideOthers([personalDetail, loanDetail, applicationDetail]);
  });

  // Function to show a specific div
  function showDiv(div) {
    div.style.display = "block";
  }

  // Function to hide other divs
  function hideOthers(divs) {
    divs.forEach(function (div) {
      div.style.display = "none";
    });
  }
});

// user personal detais js

function personalDetail() {
  window.addEventListener("load", function () {
    var saveButtons = document.querySelectorAll(".save-button");
    var cancelButtons = document.querySelectorAll(".cancel-button");
    var editButtons = document.querySelectorAll(".edit-button");

    saveButtons.forEach(function (saveButton) {
      saveButton.style.display = "none";
      saveButton.addEventListener("click", saveOnClick);
    });

    cancelButtons.forEach(function (cancelButton) {
      cancelButton.style.display = "none";
      cancelButton.addEventListener("click", cancelOnClick);
    });

    editButtons.forEach(function (editButton) {
      editButton.addEventListener("click", editOnClick);
    });
  });
}

personalDetail();

function editOnClick() {
  setFormMode(this.closest("form"), "edit");
}

function cancelOnClick() {
  setFormMode(this.closest("form"), "view");
  // TODO: Undo input changes?
}

function saveOnClick() {
  setFormMode(this.closest("form"), "view");
  // TODO: Send data to server?
}

function setFormMode(form, mode) {
  var saveButtons = form.querySelectorAll(".save-button");
  var cancelButtons = form.querySelectorAll(".cancel-button");
  var editButtons = form.querySelectorAll(".edit-button");
  var inputs = form.querySelectorAll("input, select");

  switch (mode) {
    case "view":
      saveButtons.forEach(function (button) {
        button.style.display = "none";
      });
      cancelButtons.forEach(function (button) {
        button.style.display = "none";
      });
      editButtons.forEach(function (button) {
        button.style.display = "block";
      });
      inputs.forEach(function (input) {
        input.disabled = true;
      });
      break;
    case "edit":
      saveButtons.forEach(function (button) {
        button.style.display = "block";
      });
      cancelButtons.forEach(function (button) {
        button.style.display = "block";
      });
      editButtons.forEach(function (button) {
        button.style.display = "none";
      });
      inputs.forEach(function (input) {
        input.disabled = false;
      });
      break;
  }
}

// user Document js

function userDoc() {
  $(".images img").click(function () {
    $("#full-image").attr("src", $(this).attr("src"));
    $("#image-viewer").show();
  });

  $("#image-viewer .close").click(function () {
    $("#image-viewer").hide();
  });
}
userDoc();

//********************* Notification  Toggler js start ******************************
var selectedUserIDs = [];

document.addEventListener("DOMContentLoaded", function () {
  const jobFormButton = document.querySelector('[for="notification_form"]');
  const jobViewButton = document.querySelector('[for="notification_view"]');
  const jobFormContainer = document.getElementById("notification_form");
  const jobViewContainer = document.getElementById("notification_view");
  jobFormContainer.style.display = "none";

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

var notificationCustomer = [
  {
    ID: 1,
    fullName: "Test2",
    contact: "(800) 555-1212",
    email: "test@gmail.com",
  },
  {
    ID: 2,
    fullName: "Test1",
    contact: "(800) 555-1212",
    email: "test@gmail.com",
  },
  {
    ID: 3,
    fullName: "Test3",
    contact: "(800) 555-1243",
    email: "JhonDoe@gmail.com",
  },
  {
    ID: 4,
    fullName: "Test4",
    contact: "(800) 555-8787",
    email: "dummy@gmail.com",
  },
  {
    ID: 5,
    fullName: "Test6",
    contact: "(800) 555-9323",
    amount: "₹ 120000",
    email: "test2@gmail.com",
  },
];

$(function () {
  var grid = $("#notificationContainer")
    .dxDataGrid({
      dataSource: notificationCustomer,
      filterRow: {
        visible: true,
      },
      selection: {
        mode: "multiple",
        showCheckBoxesMode: "always",
      },
      columns: ["fullName", "contact", "email"],
      showBorders: true,
      sorting: {
        mode: "multiple",
      },
    })
    .dxDataGrid("instance");
  grid.option("onSelectionChanged", function (selectedItems) {
    selectedUserIDs = selectedItems.selectedRowsData.map(function (item) {
      return item.ID;
    });
  });

  $("#sendButton").on("click", function () {
    if (selectedUserIDs.length > 0) {
      // Send the selected user IDs to the server or perform any other action
      
      // Reset the selectedUserIDs array if needed
      selectedUserIDs = [];

      const jobFormButton = document.querySelector('[for="notification_form"]');
      const jobViewButton = document.querySelector('[for="notification_view"]');
      const jobFormContainer = document.getElementById("notification_form");
      const jobViewContainer = document.getElementById("notification_view");

      // Redirect to the desired URL if needed
      jobViewContainer.style.display = "block";
      jobFormContainer.style.display = "none";
      console.log("Selected User IDs: " + selectedUserIDs.join(","));
    } else {
      // Show an alert or handle the case where no checkboxes are selected
      alert("Please select at least one user.");
    }
  });

  $("#notificationsortAZBtn").on("click", function () {
    grid.option(
      "dataSource",
      notificationCustomer
        .slice()
        .sort((a, b) => a.fullName.localeCompare(b.fullName))
    );
  });

  $("#notificationsortStatusBtn").on("click", function () {
    grid.option(
      "dataSource",
      notificationCustomer
        .slice()
        .sort((a, b) => a.status.localeCompare(b.status))
    );
  });
});

// notification table

// function NotificatoinTable() {
//   var customers = [
//     {
//       name: "Jhon Doe",
//       message:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, omnis?",
//     },
//     {
//       name: "Kunal",
//       message:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reprehenderit laudantium suscipit?",
//     },
//     {
//       name: "Harry",
//       message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
//     },
//   ];

//   var tableContainer = document.getElementById("tableContainer");

//   var table = document.createElement("table");
//   table.className = "table table-bordered";

//   var thead = document.createElement("thead");
//   var headerRow = document.createElement("tr");
//   var headers = ["Customer", "Notification Message"];

//   headers.forEach(function (headerText) {
//     var th = document.createElement("th");
//     th.appendChild(document.createTextNode(headerText));
//     headerRow.appendChild(th);
//   });

//   thead.appendChild(headerRow);
//   table.appendChild(thead);

//   var tbody = document.createElement("tbody");
//   customers.forEach(function (customer) {
//     var row = document.createElement("tr");

//     var nameCell = document.createElement("td");
//     var checkboxDiv = document.createElement("div");
//     checkboxDiv.className = "custom-control custom-checkbox";

//     var checkboxInput = document.createElement("input");
//     checkboxInput.type = "checkbox";
//     checkboxInput.className = "custom-control-input";
//     checkboxInput.id = "customCheck" + (customers.indexOf(customer) + 1);
//     checkboxDiv.appendChild(checkboxInput);

//     var checkboxLabel = document.createElement("label");
//     checkboxLabel.className = "custom-control-label";
//     checkboxLabel.setAttribute("for", checkboxInput.id);
//     checkboxLabel.appendChild(document.createTextNode(customer.name));
//     checkboxDiv.appendChild(checkboxLabel);

//     nameCell.appendChild(checkboxDiv);
//     row.appendChild(nameCell);

//     var messageCell = document.createElement("td");
//     messageCell.appendChild(document.createTextNode(customer.message));
//     row.appendChild(messageCell);

//     tbody.appendChild(row);
//   });

//   table.appendChild(tbody);
//   tableContainer.appendChild(table);
// }
// NotificatoinTable();

//********************** */  Image downlaoder start ****************************

//********************** */  Image downlaoder end ****************************

//****************************** Notification  Toggler js end ******************************
