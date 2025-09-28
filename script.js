document.addEventListener("DOMContentLoaded", function () {
  // ============ القوائم المنسدلة ============
  const dropdowns = [
    {
      el: document.getElementById("worksDropdown"),
      menu: null,
      timeout: null
    },
    {
      el: document.getElementById("productsDropdown"),
      menu: null,
      timeout: null
    },
    {
      el: document.getElementById("servicesDropdown"),
      menu: null,
      timeout: null
    }
  ];

  dropdowns.forEach(item => {
    if (item.el) {
      item.menu = item.el.querySelector(".dropdown-menu");
    }
  });

  const closeAllMenus = () => {
    dropdowns.forEach(item => {
      if (item.timeout) {
        clearTimeout(item.timeout);
        item.timeout = null;
      }
      if (item.menu) {
        item.menu.classList.remove("show");
      }
    });
  };

  const openMenu = (targetMenu) => {
    closeAllMenus();
    targetMenu.classList.add("show");
  };

  const scheduleClose = (item) => {
    item.timeout = setTimeout(() => {
      if (item.menu) {
        item.menu.classList.remove("show");
      }
      item.timeout = null;
    }, 500);
  };

  dropdowns.forEach(item => {
    if (!item.el || !item.menu) return;

    const { el, menu } = item;

    const handleMouseEnter = () => {
      if (item.timeout) {
        clearTimeout(item.timeout);
        item.timeout = null;
      }
      openMenu(menu);
    };

    const handleMouseLeave = () => {
      scheduleClose(item);
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    menu.addEventListener("mouseenter", handleMouseEnter);
    menu.addEventListener("mouseleave", handleMouseLeave);

    el.addEventListener("click", function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        if (menu.classList.contains("show")) {
          menu.classList.remove("show");
        } else {
          openMenu(menu);
        }
      }
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

  // إغلاق القائمة عند الضغط على رابط
  if (mainNav) {
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (hamburger) hamburger.classList.remove("active");
        if (mainNav) mainNav.classList.remove("active");
        document.body.classList.remove("no-scroll");
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
