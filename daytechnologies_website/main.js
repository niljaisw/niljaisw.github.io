AOS.init();

let date = new Date();
year.innerHTML = date.getUTCFullYear();

let logo = document.getElementById("logo");
let header = document.getElementById("dark-header");
let menuBar = document.getElementById("menu-bar");
let menu = document.getElementById("menu");
let darkFade = document.getElementById("dark-fade");

const sections = document.querySelectorAll(".section");
const navLi = document.querySelectorAll("nav ul li a");

menuBar.onclick = () => {
  if (menu.style.display !== "none") {
    menu.style.display = "none";
  } else {
    menu.style.display = "inline-block";
  }
};
darkFade.onclick = () => {
  menu.style.display = "none";
};

window.onscroll = () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((a) => {
    a.style.color = "#000";
    if (window.innerWidth < 600) {
      a.onclick = () => {
        menu.style.display = "none";
      };
    }
    if (a.dataset.nav === current) {
      a.style.color = "#c2393b";
    }
  });
};
window.onload = () => {
  contactForm.reset();
};

document.querySelectorAll("input").forEach((inp) => {
  inp.onkeyup = () => {
    contactForm.querySelector(".error-message").classList.remove("d-block");
    contactForm.querySelector(".sent-message").classList.remove("d-none");
  };
});
document.querySelectorAll("textarea").forEach((inp) => {
  inp.onkeyup = () => {
    contactForm.querySelector(".error-message").classList.remove("d-block");
    contactForm.querySelector(".sent-message").classList.remove("d-none");
  };
});

contactForm.onsubmit = (e) => {
  function displayError(contactForm, error) {
    contactForm.querySelector(".loading").classList.remove("d-block");
    contactForm.querySelector(".error-message").innerHTML = error;
    contactForm.querySelector(".error-message").classList.add("d-block");
    contactForm.querySelector(".sent-message").classList.add("d-none");
  }

  e.preventDefault();
  if (contactForm.file.files[0]) {
    if (contactForm.file.files[0].size > 1024 * 1000) {
      return displayError(
        contactForm,
        "File size shouldn't be longer than 1MB!"
      );
    }
  }
  contactForm.querySelector(".loading").classList.add("d-block");
  contactForm.querySelector(".error-message").classList.remove("d-block");
  contactForm.querySelector(".sent-message").classList.add("d-none");

  let formData = new FormData(contactForm);
  fetch("/email/mail.php", {
    method: "POST",
    body: formData,
    headers: { "X-Requested-With": "XMLHttpRequest" },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(
          `${response.status} ${response.statusText} ${response.url}`
        );
      }
    })
    .then((data) => {
      contactForm.querySelector(".loading").classList.remove("d-block");
      if (data.trim() == "OK") {
        contactForm.querySelector(".sent-message").classList.remove("d-none");
        contactForm.querySelector(".sent-message").style.opacity = 1;
        contactForm.reset();
      } else {
        throw new Error(data ? data : "Form submission failed");
      }
    })
    .catch((error) => {
      displayError(contactForm, error);
    });
};
