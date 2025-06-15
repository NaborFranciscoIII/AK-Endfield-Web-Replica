const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");
const content = document.querySelector(".content");

// function to make navigation links active when selected 
function updateActiveLink() {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (content.scrollTop >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
}

// Run when the user scrolls the content
content.addEventListener("scroll", updateActiveLink);

// ✅ Run once on page load to activate the first section
window.addEventListener("load", updateActiveLink);
