//**************************************  sidebar toggler js start *************************************

document.addEventListener('DOMContentLoaded', function () {
  // Get the id parameter from the URL
  var dashboard = document.querySelectorAll('#dashboard');

  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get('id');

  // Get all content sections
  var contentSections = document.querySelectorAll('.content-section');

  // Hide all content sections except the userDetail div if id is '2'
  if (idParam) {
    contentSections.forEach(function (section) {
      if (section.id !== 'userDetail') {
        section.style.display = 'none';
      }
    });

    // Show the userDetail div
    var userDetailDiv = document.getElementById('userDetail');
    userDetailDiv.style.display = 'block';
  } else {
    // Hide userDetail and show other content sections for different URLs
    contentSections.forEach(function (section) {
      section.style.display = 'none';
    });
  }

  // Handle sidebar link clicks
  var sidebarLinks = document.querySelectorAll('#sidebar a');
  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      // Hide all content sections
      contentSections.forEach(function (section) {
        section.style.display = 'none';
      });

      // Show the clicked content section
      var targetId = link.getAttribute('href').substring(1);
      var targetSection = document.getElementById(targetId);
      targetSection.style.display = 'block';
    });
  });
});

// dashboard;

//**************************************  sidebar togggler js end ***************************************

//****************************** dashboard  Toggler js start ******************************

// dashboard search js start
$(document).ready(function () {
  $('#dashboard_search').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('.dashboard_table tbody tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

//****************************** job Toggler js start ******************************

document.addEventListener('DOMContentLoaded', function () {
  const jobFormContainer = document.getElementById('job_form');
  const jobViewContainer = document.getElementById('job_view');
  const jobApplicantContainer = document.getElementById('job_Applicant');

  // Initially, show job_view and hide job_form and job_Applicant
  jobFormContainer.style.display = 'none';
  jobApplicantContainer.style.display = 'none';

  // Show job_view and hide job_form and job_Applicant on dom load
  jobViewContainer.style.display = 'block';

  // Update the buttons' event listeners
  const jobFormButton = document.querySelector('[for="job_form"]');
  const jobViewButton = document.querySelector('[for="job_view"]');
  const jobApplicantButton = document.querySelector('[for="job_Applicant"]');

  jobFormButton.addEventListener('click', function () {
    jobFormContainer.style.display = 'block';
    jobViewContainer.style.display = 'none';
    jobApplicantContainer.style.display = 'none';
  });

  jobViewButton.addEventListener('click', function () {
    jobViewContainer.style.display = 'block';
    jobFormContainer.style.display = 'none';
    jobApplicantContainer.style.display = 'none';
  });

  jobApplicantButton.addEventListener('click', function () {
    jobApplicantContainer.style.display = 'block';
    jobFormContainer.style.display = 'none';
    jobViewContainer.style.display = 'none';
  });
});

//************************************** */ Job Toogler js end *****************************************

// Blog Toogler js


//************************************** */ blog Toogler js start *****************************************
// blog image handler
document.addEventListener('DOMContentLoaded', function () {
  const inputFile = document.querySelector('#blog-picture__input');
  const pictureImage = document.querySelector('.blog-picture__image');
  const pictureImageTxt = 'Choose an image';

  inputFile.addEventListener('change', function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', function (e) {
        const readerTarget = e.target;

        const img = document.createElement('img');
        img.src = readerTarget.result;
        img.classList.add('blog-picture__img'); // Add appropriate CSS class

        pictureImage.innerHTML = '';
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      pictureImage.innerHTML = pictureImageTxt;
    }
  });
});

// blog switch handler
document.addEventListener('DOMContentLoaded', function () {
  const jobFormButton = document.querySelector('[for="blog_form"]');
  const jobViewButton = document.querySelector('[for="blog_view"]');
  const jobFormContainer = document.getElementById('blog_form');
  const jobViewContainer = document.getElementById('blog_view');
  jobFormContainer.style.display = 'none';

  // Show job_form and hide job_view when jobFormButton is clicked
  jobFormButton.addEventListener('click', function () {
    jobFormContainer.style.display = 'block';
    jobViewContainer.style.display = 'none';
  });

  // Show job_view and hide job_form when jobViewButton is clicked
  jobViewButton.addEventListener('click', function () {
    jobViewContainer.style.display = 'block';
    jobFormContainer.style.display = 'none';
  });
});

//************************************** */ Blog js End *****************************************
//************************************** */ faqs Toogler js start *****************************************

// Faqswitch handler
document.addEventListener("DOMContentLoaded", function () {
  const faqsFormButton = document.querySelector('[for="faqs_form"]');
  const faqsViewButton = document.querySelector('[for="faqs_view"]');
  const faqsFormContainer = document.getElementById("faqs_form");
  const faqsViewContainer = document.getElementById("faqs_view");
  faqsFormContainer.style.display = "none";

  // Show job_form and hide job_view when jobFormButton is clicked
  faqsFormButton.addEventListener("click", function () {
    faqsFormContainer.style.display = "block";
    faqsViewContainer.style.display = "none";
  });

  // Show job_view and hide job_form when jobViewButton is clicked
  faqsViewButton.addEventListener("click", function () {
    faqsViewContainer.style.display = "block";
    faqsFormContainer.style.display = "none";
  });
});

//************************************** */ Blog js End *****************************************

//************************************** */ Loan setting start *******************************************
document.addEventListener('DOMContentLoaded', function () {
  const setting_FormContainer = document.getElementById('setting_form');
  const setting_formViewContainer = document.getElementById('setting_view');

  // Initially, show job_view and hide job_form and job_Applicant
  setting_FormContainer.style.display = 'none';
  setting_formViewContainer.style.display = 'block';

  // Update the buttons' event listeners
  const setting_formFormButton = document.querySelector('[for="setting_form"]');
  const setting_formViewButton = document.querySelector('[for="setting_view"]');

  setting_formFormButton.addEventListener('click', function () {
    setting_FormContainer.style.display = 'block';
    setting_formViewContainer.style.display = 'none';
  });

  setting_formViewButton.addEventListener('click', function () {
    setting_formViewContainer.style.display = 'block';
    setting_FormContainer.style.display = 'none';
  });
});

//************************************** */ Loan setting End *******************************************

//************************************** */ User js start ***************************************
document.addEventListener('DOMContentLoaded', function () {
  // Get the buttons and corresponding divs by their IDs
  var personalDetailBtn = document.getElementById('personalDetailBtn');
  var loanDetailBtn = document.getElementById('loanDetailBtn');
  var applicationDetailBtn = document.getElementById('applicationDetailBtn');
  var documentDetailBtn = document.getElementById('documentDetailBtn');

  var personalDetail = document.getElementById('personalDetail');
  var loanDetail = document.getElementById('loanDetail');
  var applicationDetail = document.getElementById('applicationDetail');
  var documentDetail = document.getElementById('documentDetail');

  // Show personalDetail by default and hide others
  showDiv(personalDetail);
  hideOthers([loanDetail, applicationDetail, documentDetail]);

  // Add click event listeners to the buttons
  personalDetailBtn.addEventListener('click', function () {
    showDiv(personalDetail);
    hideOthers([loanDetail, applicationDetail, documentDetail]);
  });

  loanDetailBtn.addEventListener('click', function () {
    showDiv(loanDetail);
    hideOthers([personalDetail, applicationDetail, documentDetail]);
  });

  applicationDetailBtn.addEventListener('click', function () {
    showDiv(applicationDetail);
    hideOthers([personalDetail, loanDetail, documentDetail]);
  });

  documentDetailBtn.addEventListener('click', function () {
    showDiv(documentDetail);
    hideOthers([personalDetail, loanDetail, applicationDetail]);
  });

  // Function to show a specific div
  function showDiv(div) {
    div.style.display = 'block';
  }

  // Function to hide other divs
  function hideOthers(divs) {
    divs.forEach(function (div) {
      div.style.display = 'none';
    });
  }
});

// user personal detais js

function personalDetail() {
  window.addEventListener('load', function () {
    var saveButtons = document.querySelectorAll('.save-button');
    var cancelButtons = document.querySelectorAll('.cancel-button');
    var editButtons = document.querySelectorAll('.edit-button');

    saveButtons.forEach(function (saveButton) {
      saveButton.style.display = 'none';
      saveButton.addEventListener('click', saveOnClick);
    });

    cancelButtons.forEach(function (cancelButton) {
      cancelButton.style.display = 'none';
      cancelButton.addEventListener('click', cancelOnClick);
    });

    editButtons.forEach(function (editButton) {
      editButton.addEventListener('click', editOnClick);
    });
  });
}

personalDetail();

function editOnClick() {
  setFormMode(this.closest('form'), 'edit');
}

function cancelOnClick() {
  setFormMode(this.closest('form'), 'view');
  // TODO: Undo input changes?
}

function saveOnClick() {
  setFormMode(this.closest('form'), 'view');
  // TODO: Send data to server?
}

function setFormMode(form, mode) {
  var saveButtons = form.querySelectorAll('.save-button');
  var cancelButtons = form.querySelectorAll('.cancel-button');
  var editButtons = form.querySelectorAll('.edit-button');
  var inputs = form.querySelectorAll('input, select');

  switch (mode) {
    case 'view':
      saveButtons.forEach(function (button) {
        button.style.display = 'none';
      });
      cancelButtons.forEach(function (button) {
        button.style.display = 'none';
      });
      editButtons.forEach(function (button) {
        button.style.display = 'block';
      });
      inputs.forEach(function (input) {
        input.disabled = true;
      });
      break;
    case 'edit':
      saveButtons.forEach(function (button) {
        button.style.display = 'block';
      });
      cancelButtons.forEach(function (button) {
        button.style.display = 'block';
      });
      editButtons.forEach(function (button) {
        button.style.display = 'none';
      });
      inputs.forEach(function (input) {
        input.disabled = false;
      });
      break;
  }
}

// user Document js

function userDoc() {
  $('.images img').click(function () {
    $('#full-image').attr('src', $(this).attr('src'));
    $('#image-viewer').show();
  });

  $('#image-viewer .close').click(function () {
    $('#image-viewer').hide();
  });
}
userDoc();

//********************* Notification  Toggler js start ******************************

document.addEventListener('DOMContentLoaded', function () {
  const notificationFormButton = document.querySelector(
    '[for="notification_form"]'
  );
  const notificationViewButton = document.querySelector(
    '[for="notification_view"]'
  );
  const notification_sendBtn = document.getElementById('notification_sendBtn');
  const sendallnotification = document.getElementById("send-all-notification");

  const notificationFormContainer =
    document.getElementById('notification_form');
  const notificationViewContainer =
    document.getElementById('notification_view');
  notificationFormContainer.style.display = 'none';

  // Show job_form and hide job_view when jobFormButton is clicked
  notificationFormButton.addEventListener('click', function () {
    notificationFormContainer.style.display = 'block';
    notificationViewContainer.style.display = 'none';
  });



  // Show job_view and hide job_form when jobViewButton is clicked
  notificationViewButton.addEventListener('click', function () {
    notificationViewContainer.style.display = 'block';
    notificationFormContainer.style.display = 'none';
  });

  notification_sendBtn.addEventListener('click', function () {
    notificationViewContainer.style.display = 'none';
    notificationFormContainer.style.display = 'block';
  });

    sendallnotification.addEventListener("click", function () {
      notificationFormContainer.style.display = "block";
      notificationViewContainer.style.display = "none";
    });
});

// Notification seaching js
$(document).ready(function () {
  $('#notification_search').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('.notification_table tbody tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

// checkbox js
$(document).ready(function () {
  // Check/uncheck all checkboxes when "Select All" checkbox is clicked
  $('#notification_select_all_btn').change(function () {
    var isChecked = $(this).prop('checked');
    $(".notification_table tbody input[type='checkbox']").prop(
      'checked',
      isChecked
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

// dashboard
// Add a click event listener to the "view" button in the dashboard table
// document.getElementById('table').addEventListener('click', function (event) {
//   if (event.target.id === 'dashboard_sendBtn') {
//     // Get the user's ID from the button's href attribute
//     const userId = event.target.getAttribute('href').split('=')[1];
//     console.log(userId);
//     // Find the user in the allUsers array based on their ID
//     const user = allUsers.find((element) => element.id === userId);

//     if (user) {
//       // Populate the user data component with the user's details
//       document.getElementById(
//         'username'
//       ).value = `${user?.personalDetails?.firstName} ${user?.personalDetails?.lastName}`;
//       document.getElementById('contact').value =
//         user?.personalDetails?.mobileNumber;
//       document.getElementById('inputLabel3').value =
//         user?.personalDetails?.email;
//       document.getElementById('email').value =
//         user?.personalDetails?.permanentAddress;
//       document.getElementById('selectBox').value =
//         user?.loanDetails?.['select-loan-type'];

//       // Display the user data component
//       showUserDetailsComponent('personalDetail');
//     }
//   }
// });

// function showUserDetailsComponent(componentId) {
//   // Hide all user data components
//   const components = document.querySelectorAll('.userDetail > div');
//   components.forEach((component) => {
//     component.style.display = 'none';
//   });

//   // Show the selected user data component
//   document.getElementById(componentId).style.display = 'block';
// }
