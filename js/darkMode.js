// darkMode.js

// Apply saved theme on load (after DOM is ready enough for <body>)
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// Use event delegation so we don't depend on timing/order
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".dark-mode-switcher");
  if (!btn) return;

  document.body.classList.toggle("dark-mode");

  // Persist choice
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});
