window.addEventListener("load", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");
  const content = document.querySelector(".content");

  // Scroll-based active nav link logic
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

  content.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // Trigger on load

  // Thumbnail carousel logic
  const thumbnails = document.querySelectorAll('.thumbnail');
  const carousel = document.querySelector('.thumbnail-carousel');
  const leftArrow = document.querySelector('.information-nav-arrow.left');
  const rightArrow = document.querySelector('.information-nav-arrow.right');
  const caption = document.querySelector('.thumbnail-caption');
  const count = document.querySelector('.count');

  let currentIndex = 0;
  const total = thumbnails.length;
  const thumbWidth = 210;
  const visibleCount = 3.5;
  const maxIndex = total - 1;

  const visibleWidth = thumbWidth * 3.5;
  const totalWidth = thumbWidth * total;
  const maxTranslateX = totalWidth - visibleWidth;


  function updateCaption(newText) {
    caption.classList.add('fade-out');
    setTimeout(() => {
      caption.textContent = newText;
      caption.classList.remove('fade-out');
    }, 300);
  }

  function updateCarousel() {
    let targetTranslateX = currentIndex * thumbWidth;
    if (targetTranslateX > maxTranslateX) {
      targetTranslateX = maxTranslateX;
    }
    carousel.style.transform = `translateX(-${targetTranslateX}px)`;


    thumbnails.forEach(t => t.classList.remove('active'));
    thumbnails[currentIndex].classList.add('active');

    const newCaption = thumbnails[currentIndex].getAttribute('data-caption') || "No caption";
    updateCaption(newCaption);

    count.textContent = `${currentIndex + 1}/${total}`;
  }

  rightArrow.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  updateCarousel(); // Init on load
});
