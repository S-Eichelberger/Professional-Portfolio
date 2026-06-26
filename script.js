// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  // Toggle menu when button is clicked
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
    
    // Update aria-label for accessibility
    const isOpen = siteNav.classList.contains('active');
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  // Close menu when a link is clicked
  const navLinks = siteNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('active');
      navToggle.setAttribute('aria-label', 'Open navigation');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-header')) {
      siteNav.classList.remove('active');
      navToggle.setAttribute('aria-label', 'Open navigation');
    }
  });
});

// Smooth scroll behavior for anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Gallery functionality
let currentProject = 1;
let currentSlide = 1;

// Project gallery images - customize with your own
const galleryImages = {
  1: [
    'assets/images/projects/flexpro_kpi_dashboard_redacted.png',
    'assets/images/projects/dashboard_closed_tickets.png',
    'assets/images/projects/dashboard_ticket_status.png'
  ],
  2: [
    'assets/images/projects/flexpro_retention_sop.png',
    'assets/images/projects/flexpro_qa_scorecard_form.png',
    'assets/images/projects/flexpro_qa_dos_donts.png'
  ],
  3: [
    'assets/images/projects/fcc_pdca_dunnage.png',
    'assets/images/projects/flexpro_process_projects.png'
  ]
};

function openGallery(projectNumber) {
  const modal = document.getElementById('galleryModal');
  currentProject = projectNumber;
  currentSlide = 1;
  
  const images = galleryImages[projectNumber] || [];
  if (images.length === 0) {
    alert('Gallery images not yet added for this project. Please add images with names like: project-' + projectNumber + '-1.jpg');
    return;
  }
  
  updateGalleryImage();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  const modal = document.getElementById('galleryModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function changeGallerySlide(n) {
  const images = galleryImages[currentProject] || [];
  currentSlide += n;
  
  if (currentSlide > images.length) {
    currentSlide = 1;
  }
  if (currentSlide < 1) {
    currentSlide = images.length;
  }
  
  updateGalleryImage();
}

function updateGalleryImage() {
  const images = galleryImages[currentProject] || [];
  const galleryImage = document.getElementById('galleryImage');
  const currentSlideSpan = document.getElementById('currentSlide');
  const totalSlidesSpan = document.getElementById('totalSlides');
  
  if (images.length > 0) {
    galleryImage.src = images[currentSlide - 1];
    currentSlideSpan.textContent = currentSlide;
    totalSlidesSpan.textContent = images.length;
  }
}

// Close gallery when pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeGallery();
  }
});

// Close gallery when clicking outside the image
document.getElementById('galleryModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'galleryModal') {
    closeGallery();
  }
});
