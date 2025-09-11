document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const lightBtn = document.getElementById("toggle-light");
    const darkBtn = document.getElementById("toggle-dark");

    // --- Load saved preference ---
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        setActive(darkBtn);
    } else if (savedTheme === "light") {
        body.classList.remove("dark-mode");
        setActive(lightBtn);
    } else {
        // Detect system preference if no saved theme
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            body.classList.add("dark-mode");
            setActive(darkBtn);
        } else {
            body.classList.remove("dark-mode");
            setActive(lightBtn);
        }
    }

    // --- Manual toggle ---
    darkBtn.addEventListener("click", () => {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        setActive(darkBtn);
    });

    lightBtn.addEventListener("click", () => {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        setActive(lightBtn);
    });

    // --- Helper function ---
    function setActive(icon) {
        document.querySelectorAll(".themes i").forEach(i => i.classList.remove("active"));
        icon.classList.add("active");
    }
});



/* mobile animations*/ 
const sidebar = document.getElementById("sidebar");
  const sidebarItems = document.querySelectorAll(".sidebar-icons li");

  // Expand on first click
  sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
      if (!sidebar.classList.contains("expanded")) {
        // expand if collapsed
        sidebar.classList.add("expanded");
      } else {
        // if already expanded and user clicked → collapse again
        sidebar.classList.remove("expanded");
      }
    });
  });