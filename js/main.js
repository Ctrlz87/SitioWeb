document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // MOBILE MENU (overlay + panel from right)
  // ============================================
  const menuBtn = document.getElementById('menu-btn');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobilePanel = document.getElementById('mobile-panel');
  const closeBtn = document.getElementById('close-menu');

  function openMenu() {
    if (mobileOverlay) mobileOverlay.classList.add('active');
    if (mobilePanel) mobilePanel.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (mobilePanel) mobilePanel.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Close mobile menu when clicking any .mobile-link
  document.querySelectorAll('.mobile-link').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ============================================
  // DESKTOP SERVICES DROPDOWN
  // ============================================
  const dropdownBtn = document.getElementById('services-dropdown-btn');
  const dropdownMenu = document.getElementById('services-dropdown-menu');
  if (dropdownBtn && dropdownMenu) {
    var dropdownTimeout;
    dropdownBtn.addEventListener('click', function(e) {
      e.preventDefault();
      dropdownMenu.classList.toggle('hidden');
    });
    dropdownBtn.parentElement.addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(function() { dropdownMenu.classList.add('hidden'); }, 150);
    });
    dropdownBtn.parentElement.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
    });
  }

  // ============================================
  // MOBILE SERVICES ACCORDION
  // ============================================
  var mobileServicesBtn = document.getElementById('mobile-services-btn');
  var mobileServicesMenu = document.getElementById('mobile-services-menu');
  if (mobileServicesBtn && mobileServicesMenu) {
    mobileServicesBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      mobileServicesMenu.classList.toggle('hidden');
      var arrow = mobileServicesBtn.querySelector('svg');
      if (arrow) arrow.classList.toggle('rotate-180');
    });
  }

  // ============================================
  // FORM HANDLING
  // ============================================
  document.querySelectorAll('form[data-form]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var valid = true;
      var required = form.querySelectorAll('[required]');
      required.forEach(function(field) {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('field-error');
        } else {
          field.classList.remove('field-error');
        }
      });

      // Email validation
      var email = form.querySelector('input[type="email"]');
      if (email && email.value) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          valid = false;
          email.classList.add('field-error');
        }
      }

      if (!valid) return;

      var formType = form.getAttribute('data-form');
      var formData = new FormData(form);
      var nombre = formData.get('nombre') || formData.get('name') || '';
      var email_val = formData.get('email') || '';
      var telefono = formData.get('telefono') || formData.get('phone') || '';
      var servicio = formData.get('servicio') || '';
      var mensaje = formData.get('mensaje') || formData.get('message') || '';

      if (formType === 'whatsapp') {
        // Send via WhatsApp
        var text = 'Hola, quiero agendar una valoración.\n\n';
        text += 'Nombre: ' + nombre + '\n';
        if (email_val) text += 'Email: ' + email_val + '\n';
        if (telefono) text += 'Teléfono: ' + telefono + '\n';
        if (servicio) text += 'Servicio: ' + servicio + '\n';
        if (mensaje) text += 'Mensaje: ' + mensaje + '\n';
        var waURL = 'https://wa.me/573162282769?text=' + encodeURIComponent(text);
        window.open(waURL, '_blank');
        showSuccess(form);
      } else if (formType === 'email') {
        // Build mailto link as fallback
        var subject = 'Contacto desde la web - ' + (servicio || 'General');
        var body = 'Nombre: ' + nombre + '\nEmail: ' + email_val + '\nTeléfono: ' + telefono + '\nServicio: ' + servicio + '\n\nMensaje:\n' + mensaje;
        window.location.href = 'mailto:contacto@cognitivaintegral.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        showSuccess(form);
      }
    });
  });

  function showSuccess(form) {
    var msg = document.createElement('div');
    msg.className = 'mt-4 p-4 rounded-lg text-center font-medium';
    msg.style.background = 'rgba(16, 185, 129, 0.1)';
    msg.style.color = '#059669';
    msg.textContent = '¡Gracias! Tu mensaje ha sido enviado. Te contactaremos pronto.';
    form.appendChild(msg);
    form.reset();
    setTimeout(function() { msg.remove(); }, 5000);
  }

  // ============================================
  // SMOOTH SCROLL (skip href="#")
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
      }
    });
  });

  // ============================================
  // FADE-IN ANIMATION ON SCROLL
  // ============================================
  var fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    var fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeElements.forEach(function(el) {
      fadeObserver.observe(el);
    });
  }

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var target = parseInt(entry.target.getAttribute('data-count'));
          var suffix = entry.target.getAttribute('data-suffix') || '';
          var current = 0;
          var increment = Math.ceil(target / 50);
          var timer = setInterval(function() {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            entry.target.textContent = current + suffix;
          }, 30);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function(counter) { counterObserver.observe(counter); });
  }

  // ============================================
  // HERO SLIDESHOW (autoplay)
  // ============================================
  var heroSlideshow = document.querySelector('.hero-slideshow');
  var heroSlides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));

  if (heroSlideshow && heroSlides.length > 0) {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var slideCount = heroSlides.length;
    var currentSlide = 0;
    var heroTimer = null;

    function showSlide(index) {
      heroSlides.forEach(function(slide, i) {
        slide.classList.remove('is-active');
        if (i === index) slide.classList.add('is-active');
      });
      currentSlide = index;
    }

    function startSlideshow() {
      showSlide(0);
      if (reducedMotion) return;
      heroTimer = setInterval(function() {
        var next = (currentSlide + 1) % slideCount;
        showSlide(next);
      }, 5000);
    }

    startSlideshow();
  }
});
