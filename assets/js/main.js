/* ============================================================
   MAIN JS — main.js
   Shared across all pages.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ─── NAVBAR: shrink on scroll ──────────────────────────── */
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20)
    })
  }

  /* ─── MOBILE MENU toggle ────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle')
  const mobileMenu = document.querySelector('.mobile-menu')
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open')
    })
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open')
      }
    })
  }

  /* ─── ACTIVE NAV LINK (based on current page) ───────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'
  document
    .querySelectorAll('.navbar-links a, .mobile-menu a')
    .forEach((link) => {
      const href = link.getAttribute('href')
      if (href && href.includes(currentPage)) {
        link.classList.add('active')
      }
    })

  /* ─── SCROLL REVEAL (fade up on scroll) ─────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll('.reveal').forEach((el) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    revealObserver.observe(el)
  })

  /* ─── COUNTER ANIMATION ──────────────────────────────────── */
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll('.stat-num[data-count]').forEach((el) => {
    counterObserver.observe(el)
  })

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'))
    const suffix = el.getAttribute('data-suffix') || ''
    const duration = 1500
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      el.textContent = Math.floor(current) + suffix
    }, 16)
  }

  /* ─── SMOOTH SCROLL for anchor links ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'))
      if (target) {
        e.preventDefault()
        const offset = 80 // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    })
  })
})
