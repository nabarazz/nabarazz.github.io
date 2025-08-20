// Load External HTML into Elements

function loadHTML(selector, file) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to fetch ${file}`);
      return response.text();
    })
    .then((data) => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = data;
    })
    .catch((err) => console.error(err));
}

// Load Header and All Sections

const sectionFiles = {
  "#header": "html/header.html",
  "#intro": "html/main/intro.html",
  "#experience": "html/main/experience.html",
  "#education": "html/main/education.html",
  "#project": "html/main/project.html",
  "#contact": "html/main/contact.html",
  "#blogs": "html/main/blogs.html",
};

Object.entries(sectionFiles).forEach(([selector, file]) => {
  loadHTML(selector, file);
});

// Section Display Helpers

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showAllSections() {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "block";
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Setup Event Listeners After Header Loads

document.addEventListener("DOMContentLoaded", () => {
  const headerEl = document.getElementById("header");

  const observer = new MutationObserver(() => {
    const logoLink = headerEl.querySelector(".logo[data-show-all]");
    const navLinks = headerEl.querySelectorAll(".site-nav a[data-section]");

    // ✅ Logo click → Show all sections
    if (logoLink) {
      logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        showAllSections();
      });
    }

    // ✅ Nav link click → Show selected section
    if (navLinks.length > 0) {
      navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const target = link.getAttribute("data-section");
          if (target) showSection(target);
        });
      });
    }

    // ✅ On first visit → show all sections by default
    showAllSections();

    observer.disconnect(); // Stop once loaded
  });

  observer.observe(headerEl, {
    childList: true,
    subtree: true,
  });
});
