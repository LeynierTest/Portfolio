const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.textContent = "☰";
    });
});

const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    themeButton.textContent =
        darkMode ? "☀" : "☾";

    localStorage.setItem(
        "darkMode",
        darkMode
    );
});

const savedTheme =
    localStorage.getItem("darkMode");

if (savedTheme === "true") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀";
}

const sections =
    document.querySelectorAll("section[id]");

const observerOptions = {
    threshold: 0.35
};

const sectionObserver =
    new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        ".nav-link[href=\"#" +
                        entry.target.id +
                        "\"]"
                    );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            });
        },
        observerOptions
    );

sections.forEach(section => {
    sectionObserver.observe(section);
});

const backToTop =
    document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const contactForm =
    document.getElementById("contact-form");

const formMessage =
    document.getElementById("form-message");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent =
            "Completa todos los campos.";

        return;
    }

    formMessage.textContent =
        "Gracias, " +
        name +
        ". El formulario fue validado correctamente.";

    contactForm.reset();
});
