document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const lightBtns = document.querySelectorAll("#toggle-light");
    const darkBtns = document.querySelectorAll("#toggle-dark");

    // --- Load saved preference ---
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        setActive("dark");
    } else if (savedTheme === "light") {
        body.classList.remove("dark-mode");
        setActive("light");
    } else {
        // Detect system preference if no saved theme
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            body.classList.add("dark-mode");
            setActive("dark");
        } else {
            body.classList.remove("dark-mode");
            setActive("light");
        }
    }

    // --- Manual toggle for ALL icons ---
    darkBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            setActive("dark");
        });
    });

    lightBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
            setActive("light");
        });
    });

    // --- Helper function (syncs desktop + mobile icons) ---
    function setActive(mode) {
        // Hide both icons first
        document.querySelectorAll("#toggle-light, #toggle-dark").forEach(i =>
            i.classList.remove("active")
        );

        // Show the correct one
        if (mode === "dark") {
            darkBtns.forEach(i => i.classList.add("active"));  // show sun
        } else {
            lightBtns.forEach(i => i.classList.add("active")); // show moon
        }
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