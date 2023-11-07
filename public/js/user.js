function Sidebar() {
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
}
Sidebar();

// Notification js file code

function Notification() {
  document.addEventListener("DOMContentLoaded", function () {
    // Get button and container elements
    var allBtn = document.getElementById("notificationAllBtn");
    var unreadBtn = document.getElementById("notificationUnreadBtn");
    var readBtn = document.getElementById("notificationRead");
    var allContainer = document.getElementById("notificationAllContainer");
    var unreadContainer = document.getElementById(
      "notificationUnreadContainer"
    );
    var readContainer = document.getElementById("notificationReadContainer");

    // Show the default container (notificationAllContainer)
    allContainer.style.display = "block";
    unreadContainer.style.display = "none";
    readContainer.style.display = "none";

    // Add click event listeners to buttons
    allBtn.addEventListener("click", function () {
      allContainer.style.display = "block";
      unreadContainer.style.display = "none";
      readContainer.style.display = "none";
    });

    unreadBtn.addEventListener("click", function () {
      allContainer.style.display = "none";
      unreadContainer.style.display = "block";
      readContainer.style.display = "none";
    });

    readBtn.addEventListener("click", function () {
      allContainer.style.display = "none";
      unreadContainer.style.display = "none";
      readContainer.style.display = "block";
    });
  });
}
Notification();

// user document insert js code


