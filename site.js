(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const navLinksWrap = nav.querySelector('.nav__links');
    const toggleBtn = nav.querySelector('.nav__toggle');
    const links = Array.from(nav.querySelectorAll('.nav__link'));
    if (!links.length) return;

    const bubble = document.createElement('span');
    bubble.className = 'nav__bubble';
    (navLinksWrap || nav).appendChild(bubble);
    nav.classList.add('has-bubble');

    let activeLink = nav.querySelector('.nav__link--active') || links[0];
    let animating = false;

    const setBubblePosition = (el) => {
      if (!el) return;
      const parentRect = bubble.parentElement ? bubble.parentElement.getBoundingClientRect() : nav.getBoundingClientRect();
      const linkRect = el.getBoundingClientRect();

      const left = Math.round(linkRect.left - parentRect.left);
      const top = Math.round(linkRect.top - parentRect.top);
      const width = Math.round(linkRect.width);
      const height = Math.round(linkRect.height);

      bubble.style.setProperty('--bubble-left', `${left}px`);
      bubble.style.setProperty('--bubble-top', `${top}px`);
      bubble.style.setProperty('--bubble-width', `${width}px`);
      bubble.style.setProperty('--bubble-height', `${height}px`);
    };

    if (activeLink) {
      setBubblePosition(activeLink);
      requestAnimationFrame(() => bubble.classList.add('is-visible'));
    }

    window.addEventListener('pageshow', () => {
      if (!activeLink) return;
      setBubblePosition(activeLink);
      bubble.classList.add('is-visible');
    });

    if (toggleBtn && navLinksWrap) {
      const closeMenu = () => {
        toggleBtn.setAttribute('aria-expanded', 'false');
        navLinksWrap.classList.remove('nav__links--open');
      };

      toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        const newState = !expanded;
        toggleBtn.setAttribute('aria-expanded', String(newState));
        navLinksWrap.classList.toggle('nav__links--open', newState);
        if (newState && activeLink) {
          setTimeout(() => setBubblePosition(activeLink), 10);
        }
      });

      links.forEach(link => {
        link.addEventListener('click', () => {
          if (window.matchMedia('(max-width: 720px)').matches) {
            closeMenu();
          }
        });
      });

      window.addEventListener('resize', () => {
        if (!window.matchMedia('(max-width: 720px)').matches) {
          toggleBtn.setAttribute('aria-expanded', 'false');
          navLinksWrap.classList.remove('nav__links--open');
        }
      });
    }

    const shrinkDuration = 160;
    const totalDuration = 460;

    const animateTo = (target, callback) => {
      if (!target || animating) {
        if (typeof callback === 'function') callback();
        return;
      }

      animating = true;
      nav.classList.add('is-animating');
      bubble.classList.add('is-shrinking');

      setTimeout(() => {
        setBubblePosition(target);
        activeLink = target;

        setTimeout(() => {
          bubble.classList.remove('is-shrinking');
        }, 40);
      }, shrinkDuration);

      setTimeout(() => {
        nav.classList.remove('is-animating');
        animating = false;
        if (typeof callback === 'function') callback();
      }, totalDuration);
    };

    const handleNavigation = (link) => {
      animateTo(link, () => {
        window.location.assign(link.href);
      });
    };

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        if (
          link === activeLink ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }
        event.preventDefault();
        handleNavigation(link);
      });

      link.addEventListener('mouseenter', () => {
        if (animating) return;
        setBubblePosition(link);
      });
    });

    nav.addEventListener('mouseleave', () => {
      if (animating || !activeLink) return;
      setBubblePosition(activeLink);
    });

    nav.addEventListener('focusin', (event) => {
      const target = event.target;
      if (target && target.classList.contains('nav__link')) {
        setBubblePosition(target);
      }
    });

    nav.addEventListener('focusout', () => {
      if (!nav.contains(document.activeElement) && activeLink && !animating) {
        setBubblePosition(activeLink);
      }
    });

    window.addEventListener('resize', () => {
      if (animating || !activeLink) return;
      setBubblePosition(activeLink);
    });
  });
})();
