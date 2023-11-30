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
  var defaultSection = document.getElementById('dashboard');
  defaultSection.style.display = 'block';
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

function JobHandler() {
  document.addEventListener('DOMContentLoaded', function () {
    const inputFile = document.querySelector('#job-picture__input');
    const pictureImage = document.querySelector('.job-picture__image');
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
}

JobHandler();

//************************************** */ Job Toogler js end *****************************************

// Blog Toogler js

//************************************** */ blog Toogler js start *****************************************
function BlogHandler() {
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
}

BlogHandler();

//************************************** */ Blog js End *****************************************
//************************************** */ faqs Toogler js start *****************************************
function FAQ() {
  // Faqswitch handler
  document.addEventListener('DOMContentLoaded', function () {
    const faqsFormButton = document.querySelector('[for="faqs_form"]');
    const faqsViewButton = document.querySelector('[for="faqs_view"]');
    const faqsFormContainer = document.getElementById('faqs_form');
    const faqsViewContainer = document.getElementById('faqs_view');
    faqsFormContainer.style.display = 'none';

    // Show job_form and hide job_view when jobFormButton is clicked
    faqsFormButton.addEventListener('click', function () {
      faqsFormContainer.style.display = 'block';
      faqsViewContainer.style.display = 'none';
    });

    // Show job_view and hide job_form when jobViewButton is clicked
    faqsViewButton.addEventListener('click', function () {
      faqsViewContainer.style.display = 'block';
      faqsFormContainer.style.display = 'none';
    });
  });
}
FAQ();

//************************************** */ Blog js End *****************************************

//************************************** */ Loan setting start *******************************************
function LoanSettingHandler() {
  document.addEventListener('DOMContentLoaded', function () {
    const setting_FormContainer = document.getElementById('setting_form');
    const setting_formViewContainer = document.getElementById('setting_view');

    // Initially, show job_view and hide job_form and job_Applicant
    setting_FormContainer.style.display = 'none';
    setting_formViewContainer.style.display = 'block';

    // Update the buttons' event listeners
    const setting_formFormButton = document.querySelector(
      '[for="setting_form"]'
    );
    const setting_formViewButton = document.querySelector(
      '[for="setting_view"]'
    );

    setting_formFormButton.addEventListener('click', function () {
      setting_FormContainer.style.display = 'block';
      setting_formViewContainer.style.display = 'none';
    });

    setting_formViewButton.addEventListener('click', function () {
      setting_formViewContainer.style.display = 'block';
      setting_FormContainer.style.display = 'none';
    });
  });
}
LoanSettingHandler();

//************************************** */ Loan setting End *******************************************

//************************************** */ User js start ***************************************
function UserDetialHandler() {
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
}
UserDetialHandler();

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

function NotificationHandler() {
  document.addEventListener('DOMContentLoaded', function () {
    const notificationFormButton = document.querySelector(
      '[for="notification_form"]'
    );
    const notificationViewButton = document.querySelector(
      '[for="notification_view"]'
    );
    const notification_sendBtn = document.getElementById(
      'notification_sendBtn'
    );
    const sendallnotification = document.getElementById(
      'send-all-notification'
    );

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

    sendallnotification.addEventListener('click', function () {
      notificationFormContainer.style.display = 'block';
      notificationViewContainer.style.display = 'none';
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
}
NotificationHandler();

const openModalButton = document.getElementById('openModalButton');
const modal = document.getElementById('myModal');
const closeModal = document.getElementById('closeModal');

openModalButton.addEventListener('click', function () {
  modal.style.display = 'block';
});

closeModal.addEventListener('click', function () {
  modal.style.display = 'none';
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

let sidebar = document.querySelector('.sidebar');
let sidebarBtn = document.querySelector('.sidebarBtn');
sidebarBtn.onclick = function () {
  sidebar.classList.toggle('active');
  if (sidebar.classList.contains('active')) {
    sidebarBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
  } else sidebarBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
};

// Export Csv contacts

// Export Csv newsletter
