function showPage(pageId) {
  // hide all pages
  document.querySelectorAll('.tv-screen').forEach(el => {
    el.classList.remove('active');
  });

  // show the selected page
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
  }
}

// Example usage:
// Later you can call: showPage('page-info');
  const aboutDiv = document.getElementById("option-about");

  // add click event listener
  aboutDiv.addEventListener("click", () =>
    showPage("page-info"));
showPage('page-landing'); // show landing by default