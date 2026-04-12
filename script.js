/* ============================================================
   SCRIPT.JS — Portfolio Interactions
   ============================================================ */

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== UI ENHANCEMENTS =====
// 1. Custom Minimalist Cursor
const cursorDot = document.createElement('div');
const cursorOutline = document.createElement('div');
cursorDot.classList.add('custom-cursor-dot');
cursorOutline.classList.add('custom-cursor-outline');
document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

window.addEventListener('mousemove', (e) => {
  cursorDot.style.translate = `${e.clientX}px ${e.clientY}px`;
  
  // Smooth follow for outline
  cursorOutline.animate({
    translate: `${e.clientX}px ${e.clientY}px`
  }, { duration: 500, fill: "forwards" });
});

// Cursor hover effects on links/buttons
document.querySelectorAll('a, button, .contact-item, .project-card, .btn-primary, .btn-ghost').forEach(el => {
  el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
});

// 2. Magnetic Buttons
document.querySelectorAll('.btn-primary, .btn-ghost, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = `translate(0px, 0px)`;
  });
});

// 3. Interactive Card Spotlight
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// 4. Parallax Backgrounds
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const glowBlue = document.querySelector('.glow-blue');
  const glowOrange = document.querySelector('.glow-orange');
  const glowPurple = document.querySelector('.glow-purple');
  if (glowBlue) glowBlue.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.15}px))`;
  if (glowOrange) glowOrange.style.transform = `translateY(${scrolled * 0.1}px)`;
  if (glowPurple) glowPurple.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.25}px))`;
});

// 5. Animated Code Card (Typewriter Effect)
const typeCode = document.getElementById('typewriter');
if (typeCode) {
  const codeLines = typeCode.innerHTML.split('\n');
  typeCode.innerHTML = '';
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      let delay = 0;
      codeLines.forEach((line) => {
        const lineSpan = document.createElement('div');
        lineSpan.className = 'type-line';
        lineSpan.style.animationDelay = `${delay}s`;
        lineSpan.innerHTML = line || ' '; // Keep empty lines
        typeCode.appendChild(lineSpan);
        delay += 0.2;
      });
      observer.disconnect();
    }
  });
  observer.observe(typeCode);
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  '.section-tag, .section-title, .section-sub, .project-card, .bento-card, .mini-card, .timeline-item, .contact-item, .contact-form, .hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats, .hero-visual, .about-text, .about-cards, .stat-card, .float-card'
);

revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger sibling elements automatically
  const group = el.parentElement;
  const siblings = group ? [...group.children].indexOf(el) : 0;
  if (siblings > 0 && siblings < 5) {
    el.classList.add(`reveal-delay-${siblings}`);
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => observer.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksList.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--text-primary)';
        }
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => sectionObserver.observe(section));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('formSubmit');
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  const name = document.getElementById('fname').value;
  const email = document.getElementById('femail').value;
  const subject = document.getElementById('fsubject').value;
  const message = document.getElementById('fmsg').value;

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        access_key: "52e4b45e-733c-406d-a433-5a574fe738b1",
        name: name,
        email: email,
        subject: subject || "New Contact from Portfolio!",
        message: message
    })
  })
  .then(async (response) => {
    let data = await response.json();
    if (response.status == 200) {
      btn.textContent = '✅ Sent!';
      formSuccess.classList.add('show');
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message 🚀';
        btn.style.opacity = '1';
        btn.disabled = false;
        formSuccess.classList.remove('show');
      }, 4000);
    } else {
      console.error("Web3Forms error:", data);
      throw new Error(data.message || "Failed to send message");
    }
  })
  .catch(error => {
    console.error("Form submission error:", error);
    btn.textContent = '❌ Error';
    setTimeout(() => {
      btn.textContent = 'Send Message 🚀';
      btn.style.opacity = '1';
      btn.disabled = false;
    }, 3000);
  });
});

// ===== SMOOTH COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const isFloat = el.textContent.includes('.');
    const target = isFloat ? parseFloat(el.textContent) : parseInt(el.textContent);
    const suffix = el.textContent.replace(/[0-9.]/g, '');
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    }, 35);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== TILT EFFECT ON CARDS =====
const tiltCards = document.querySelectorAll('.project-card, .mini-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    card.style.transform = `translateY(-4px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    card.style.transition = 'transform 0.1s';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// ===== TYPING EFFECT IN HERO BADGE =====
const badge = document.querySelector('.hero-badge');
if (badge) {
  const messages = [
    '🎓 Open to Internships 2025',
    '🚀 Building Motopack',
    '🔒 Exploring Cybersecurity',
    '💡 Learning AI / ML'
  ];
  let msgIndex = 0;
  setInterval(() => {
    msgIndex = (msgIndex + 1) % messages.length;
    badge.innerHTML = `<span class="badge-dot"></span> ${messages[msgIndex]}`;
  }, 3000);
}

console.log('%c👋 Hey there! Interested in my code? Connect with me.', 
  'color: #00a3ff; font-size: 14px; font-weight: bold; padding: 8px;');
