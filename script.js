// Listen for authentication state changes from Firebase
auth.onAuthStateChanged(user => {
  if (!user || !user.emailVerified) {
    // No user: Clear any local session marker and redirect to login
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
  } else {
    // User is logged in: Show portfolio content
    document.getElementById('portfolio-content').style.display = 'block';
  }
});

// Simplified logout handler (call this whenever logging out)
async function handleLogout() {
  await Auth.signOut();
  localStorage.removeItem('loggedInUser'); // Make sure to clear local storage!
  // This will trigger auth.onAuthStateChanged to redirect to login
}

// After successful login
const usernameInput = document.getElementById("username");
if (usernameInput && usernameInput.value.trim()) {
  const username = usernameInput.value.trim();
  localStorage.setItem('loggedInUser', username);
  window.location.href = 'home.html';
}

// Only display greeting if both: 
// (1) Firebase auth says user is signed in
// (2) localStorage has a loggedInUser value
auth.onAuthStateChanged(user => {
  const greetingEl = document.getElementById('greeting');
  const localUser = localStorage.getItem('loggedInUser');
  if (user && user.emailVerified && localUser && greetingEl) {
    greetingEl.textContent = `Hi — ${localUser}`;
  } else if (greetingEl) {
    greetingEl.textContent = '';
  }
});
document.getElementById('portfolio-content').style.display = 'none'; // initially hide

auth.onAuthStateChanged(user => {
  if (!user || !user.emailVerified) {
    window.location.href = 'login.html';
  } else {
    document.getElementById('portfolio-content').style.display = 'block'; // show only if logged in
  }
});

document.addEventListener("DOMContentLoaded", () => {
  tsParticles.load("tsparticles", {
    background: {
      color: "#10192b"
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 120,
          duration: 0.4
        },
        push: {
          quantity: 4
        }
      }
    },
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          area: 1000
        }
      },
      color: {
        value: "#5bbefa"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 5,
        random: { enable: true, minimumValue: 2 },
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "bounce"
        },
        bounce: true,
        attract: { enable: false }
      },
      links: {
        enable: true,
        distance: 140,
        color: "#5bbefa",
        opacity: 0.3,
        width: 1
      }
    },
    detectRetina: true
  });

  // Sidebar button highlighting logic
  function showSection(id, event) {
    document.querySelectorAll(".content-section").forEach(section => section.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    document.querySelectorAll("nav.sidebar-menu button").forEach(btn => btn.classList.remove("active"));
    if (event) {
      event.currentTarget.classList.add("active");
    }
  }

  // EmailJS contact form integration (only works on contact page)
  if (document.getElementById("contact-form")) {
    emailjs.init("MVNLMa6XAnCSIfOnY");

    const form = document.getElementById("contact-form");
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupMsg = document.getElementById("popup-message");
    const popupIcon = document.getElementById("popup-icon");
    let popupTimeout;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_6bwckaq", "template_otmgn2e", this)
        .then(() => {
          popupTitle.textContent = "Success ✅";
          popupMsg.textContent = "Your message has been sent successfully!";
          popupIcon.textContent = "✔️";
          popupIcon.className = "popup-icon success-icon";
          showPopup();
          form.reset();
        }, (error) => {
          popupTitle.textContent = "Error ❌";
          popupMsg.textContent = "Failed to send message. Please try again.";
          popupIcon.textContent = "❌";
          popupIcon.className = "popup-icon error-icon";
          showPopup();
          console.error("EmailJS Error:", error);
        });
    });

    function showPopup() {
      popup.style.display = "flex";
      clearTimeout(popupTimeout);
      popupTimeout = setTimeout(() => {
        closePopup();
      }, 3000);
    }

    function closePopup() {
      popup.style.display = "none";
      clearTimeout(popupTimeout);
    }
  }
});

const username = document.getElementById("username").value.trim();
// after login success:
localStorage.setItem('loggedInUser', username);
window.location.href = 'home.html'; // redirect to home

window.onload = () => {
  const user = localStorage.getItem('loggedInUser');
  const greetingEl = document.getElementById('greeting');
  if (user && greetingEl) {
    greetingEl.textContent = `Hi — ${user}`;
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, { threshold: 0.5 }); // trigger when 50% visible

  cards.forEach(card => observer.observe(card));
});
// Simplified logout handler
async function handleLogout() {
  await Auth.signOut();
  userHasAuthenticated(false); // Mark user as logged out
  nav("/login"); // Redirect to login page ONLY
}
// Example Route Protection for Login Page
<Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />

async function handleLogout() {
  await Auth.signOut();
  localStorage.removeItem('loggedInUser'); // Remove local value!
  userHasAuthenticated(false); // Mark as logged out
  window.location.href = 'login.html'; // Always use location for consistency
}
