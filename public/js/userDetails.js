//************* */ User js start **************
document.addEventListener('DOMContentLoaded', function () {
  // Get the buttons and corresponding divs by their IDs
  var personalDetailBtn = document.getElementById('personalDetailBtn');
  var loanDetailBtn = document.getElementById('loanDetailBtn');
  var applicationDetailBtn = document.getElementById('applicationDetailBtn');
  var documentDetailBtn = document.getElementById('documentDetailBtn');
  var notificationBtn = document.getElementById("notificationBtn");

  var personalDetail = document.getElementById('personalDetail');
  var loanDetail = document.getElementById('loanDetail');
  var applicationDetail = document.getElementById('applicationDetail');
  var documentDetail = document.getElementById('documentDetail');
  var notificationContainer = document.getElementById("notificationContainer");

  // Show personalDetail by default and hide others
  showDiv(personalDetail);
  hideOthers([
    loanDetail,
    applicationDetail,
    documentDetail,
    notificationContainer,
  ]);

  // Add click event listeners to the buttons
  personalDetailBtn.addEventListener('click', function () {
    showDiv(personalDetail);
    hideOthers([
      loanDetail,
      applicationDetail,
      documentDetail,
      notificationContainer,
    ]);
  });

  loanDetailBtn.addEventListener('click', function () {
    showDiv(loanDetail);
    hideOthers([
      personalDetail,
      applicationDetail,
      documentDetail,
      notificationContainer,
    ]);
  });

  applicationDetailBtn.addEventListener('click', function () {
    showDiv(applicationDetail);
    hideOthers([
      personalDetail,
      loanDetail,
      documentDetail,
      notificationContainer,
    ]);
  });

  documentDetailBtn.addEventListener('click', function () {
    showDiv(documentDetail);
    hideOthers([
      personalDetail,
      loanDetail,
      applicationDetail,
      notificationContainer,
    ]);
  });
  notificationBtn.addEventListener("click", function () {
    showDiv(notificationContainer);
    hideOthers([personalDetail, loanDetail, applicationDetail, documentDetail]);
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
