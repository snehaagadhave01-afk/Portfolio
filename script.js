/* =========================
   TYPING EFFECT
========================= */
const roles = [
    "Software Developer",
    "Python Programmer",
    "Flutter Developer",
    "SQL Developer",
    "Web Developer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.getElementById("typing");

function type() {
    const current = roles[roleIndex];

    if (!isDeleting) {
        typing.textContent = current.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(type, 1400);
            return;
        }
    } else {
        typing.textContent = current.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(type, isDeleting ? 55 : 110);
}

if (typing) type();

/* =========================
   MOBILE NAV TOGGLE
========================= */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
}

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
});

/* =========================
   SCROLL REVEAL
========================= */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
} else {
    revealEls.forEach(el => el.classList.add("in-view"));
}

/* =========================
   CONTACT FORM (front-end only)
========================= */
const EMAILJS_PUBLIC_KEY = "DIUAWMgq08vpGjJDs";
const EMAILJS_SERVICE_ID = "service_wfwb8vl";
const EMAILJS_TEMPLATE_ID = "template_igxnpio";

if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        formStatus.textContent = "Sending...";

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
            .then(() => {
                formStatus.textContent = "Thanks! Your message is on its way — I'll reply soon.";
                contactForm.reset();
            })
            .catch(() => {
                formStatus.textContent = "Something went wrong. Please email me directly instead.";
            });
    });
}