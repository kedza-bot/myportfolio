document.addEventListener("DOMContentLoaded", () => {
                const body = document.body;
                const lightBtn = document.getElementById("toggle-light");
                const darkBtn = document.getElementById("toggle-dark");

                // --- Detect system preference ---
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                    body.classList.add("dark-mode");
                }

                // --- Manual toggle ---
                darkBtn.addEventListener("click", () => {
                    body.classList.remove("dark-mode");
                });

                lightBtn.addEventListener("click", () => {
                    body.classList.add("dark-mode");
                });
            });

            function setActive(icon) {
                document.querySelectorAll(".themes i").forEach(i => i.classList.remove("active"));
                icon.classList.add("active");
            }

            lightBtn.addEventListener("click", () => {
                body.classList.remove("dark-mode");
                setActive(lightBtn);
            });

            darkBtn.addEventListener("click", () => {
                body.classList.add("dark-mode");
                setActive(darkBtn);
            });