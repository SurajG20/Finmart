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
