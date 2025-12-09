/**
 * Main JavaScript for Portfolio
 * Handles smooth scrolling, scroll reveal, and modal interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: true,
          });
        }

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 2. Initialize AOS Animation
  AOS.init({
    duration: 1000,
    once: true,
  });

  // 3. Project Modal Data Population
  const projectModal = document.getElementById("projectModal");
  if (projectModal) {
    projectModal.addEventListener("show.bs.modal", (event) => {
      // Button that triggered the modal
      const button = event.relatedTarget;

      // Extract info from data-* attributes
      const title = button.getAttribute("data-title");
      const desc = button.getAttribute("data-desc");
      const tech = button.getAttribute("data-tech");

      // Update the modal's content.
      const modalTitle = projectModal.querySelector(".modal-title");
      const modalDesc = projectModal.querySelector("#modalDesc");
      const modalTechList = projectModal.querySelector("#modalTechList");
      const modalTechBadge = projectModal.querySelector("#modalTechBadge");

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalTechList.textContent = tech;

      // Simple logic to set badge color based on project type (optional)
      modalTechBadge.textContent = tech.split(",")[0]; // First tech as primary badge
    });
  }

  // 4. Contact Form with EmailJS
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // These IDs from your EmailJS dashboard
      const serviceID = "service_9fzdy1f";
      const templateID = "template_i6sfjkl";

      // Prepare template parameters (match these with your EmailJS template)
      const templateParams = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      emailjs.send(serviceID, templateID, templateParams).then(
        () => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;

          // Reset form
          contactForm.reset();

          // Show success message
          formFeedback.classList.remove("d-none", "text-danger");
          formFeedback.classList.add("text-success");
          formFeedback.innerHTML =
            '<i class="fas fa-check-circle me-2"></i>Message sent successfully!';

          setTimeout(() => {
            formFeedback.classList.add("d-none");
          }, 5000);
        },
        (err) => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;

          // Show error message
          formFeedback.classList.remove("d-none", "text-success");
          formFeedback.classList.add("text-danger");
          formFeedback.innerHTML =
            '<i class="fas fa-exclamation-circle me-2"></i>Failed to send message. Please try again.';
          console.error("EmailJS Error:", err);
        }
      );
    });
  }

  // 5. Navbar Scroll Effect (Optional: add shadow on scroll)
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-sm");
      navbar.style.padding = "0.5rem 0";
    } else {
      navbar.classList.remove("shadow-sm");
      navbar.style.padding = "1rem 0";
    }
  });

  // 6. Dark/Light Mode Toggle
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  // Check LocalStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (body.getAttribute("data-theme") === "dark") {
        body.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      } else {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    });
  }
});
