document.addEventListener("DOMContentLoaded", function () {
  // ============ القوائم المنسدلة (تعمل بالضغط فقط) ============
  const dropdowns = document.querySelectorAll("#mainNav .dropdown");

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector("a");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (!menu) return;

    // إزالة أي تأثير للمرور (hover) — والاعتماد على النقر فقط
    toggle.addEventListener("click", function(e) {
      e.preventDefault();
      menu.classList.toggle("show");
    });
  });

  // ============ زر الهمبرغر ============
  const hamburger = document.querySelector(".hamburger");
  const mainNav = document.getElementById("mainNav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      mainNav.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }

  // ============ إغلاق الهمبرغر والقوائم عند النقر على رابط ============
  if (mainNav) {
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        // إغلاق الهمبرغر
        if (hamburger) hamburger.classList.remove("active");
        if (mainNav) mainNav.classList.remove("active");
        document.body.classList.remove("no-scroll");
        
        // إغلاق جميع القوائم المنسدلة
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
          menu.classList.remove("show");
        });
      });
    });
  }

  // ============ معرض الفيديو ============
  const videoItems = document.querySelectorAll(".video-item video");

  if (videoItems.length > 0) {
    videoItems.forEach(video => {
      video.addEventListener("mouseenter", function () {
        this.play();
      });

      video.addEventListener("mouseleave", function () {
        this.pause();
      });

      video.addEventListener("click", function () {
        // إنشاء Modal
        let modal = document.createElement("div");
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.95);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        `;

        let modalContent = document.createElement("div");
        modalContent.style.cssText = `
          position: relative;
          width: 100%;
          max-width: 800px;
          border-radius: 10px;
          overflow: hidden;
        `;

        let closeBtn = document.createElement("span");
        closeBtn.innerHTML = "&times;";
        closeBtn.style.cssText = `
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          font-size: 30px;
          cursor: pointer;
          z-index: 10000;
        `;

        let videoElement = document.createElement("video");
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.style.cssText = `
          width: 100%;
          display: block;
          background: #000;
        `;
        videoElement.src = this.src;

        modalContent.appendChild(closeBtn);
        modalContent.appendChild(videoElement);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // إغلاق Modal
        closeBtn.addEventListener("click", function () {
          document.body.removeChild(modal);
        });

        modal.addEventListener("click", function (e) {
          if (e.target === modal) {
            document.body.removeChild(modal);
          }
        });
      });
    });
  }

  // ============ معرض الصور ============
  const galleryImages = document.querySelectorAll(".gallery img");
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const caption = document.getElementById("caption");
  const closeModalBtn = document.querySelector(".modal-close");

  if (galleryImages.length > 0 && imageModal) {
    galleryImages.forEach(img => {
      img.addEventListener("click", function () {
        modalImage.src = this.src;
        caption.textContent = this.alt || "";
        imageModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", function () {
        imageModal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }

    imageModal.addEventListener("click", function (e) {
      if (e.target === imageModal) {
        imageModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }
});
