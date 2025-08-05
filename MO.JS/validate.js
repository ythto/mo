if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log("✅ Service Worker registered"))
    .catch(err => console.error("❌ Service Worker error", err));
}
    // صور السلايدر
const images = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg"
];

let currentIndex = 0;
const imgElement = document.getElementById("carouselImage");

function showImage(index) {
  imgElement.style.opacity = 0;
  setTimeout(() => {
    imgElement.src = images[index];
    imgElement.style.opacity = 1;
  }, 300);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

// ✅ تحريك تلقائي كل 5 ثواني
let autoSlide = setInterval(nextImage, 3000);

// ⏸️ إيقاف المؤقت عند استخدام الزر (اختياري)
document.querySelectorAll('.carousel-buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextImage, 5000); // إعادة التشغيل
  });
});
let startX = 0;
let endX = 0;

// نضيف أحداث اللمس إلى العنصر الذي يحتوي الصورة
const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const deltaX = endX - startX;
  if (Math.abs(deltaX) > 50) { // عشان نتأكد أنه سحب حقيقي مش لمسة بسيطة
    if (deltaX > 0) {
      prevImage(); // سحب يمين ← صورة سابقة
    } else {
      nextImage(); // سحب يسار ← صورة تالية
    }
    clearInterval(autoSlide);
    autoSlide = setInterval(nextImage, 5000); // إعادة تشغيل السلايدر
  }
}
// ✨ Scroll animation
const faders = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.3
});

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

const questions = [
    {
      question: "ما أول سورة نزلت في القرآن؟",
      options: ["الفاتحة", "العلق", "البقرة", "الناس"],
      correct: 1
    },
    {
      question: "كم عدد أركان الإسلام؟",
      options: ["5", "6", "7", "4"],
      correct: 0
    },
    {
      question: "من هو النبي الذي ابتلعه الحوت؟",
      options: ["موسى", "يونس", "إبراهيم", "عيسى"],
      correct: 1
    },
    {
      question: "كم عدد الصلوات المفروضة في اليوم؟",
      options: ["3", "4", "5", "6"],
      correct: 2
    },
    {
      question: "ما اسم والدة النبي محمد ﷺ؟",
      options: ["خديجة", "آمنة", "فاطمة", "سودة"],
      correct: 1
    },
  ];

  const today = new Date().getDate();
  const questionOfDay = questions[today % questions.length];

  const questionText = document.getElementById("question-text");
  const answersBox = document.getElementById("answers");
  const resultMessage = document.getElementById("result-message");

  questionText.textContent = questionOfDay.question;

  questionOfDay.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.style.display = "block";
    btn.style.width = "100%";
    btn.style.margin = "10px auto";
    btn.style.padding = "10px";
    btn.style.borderRadius = "10px";
    btn.style.border = "none";
    btn.style.backgroundColor = "#2c7a7b";
    btn.style.color = "white";
    btn.style.cursor = "pointer";
    btn.onclick = () => {
      if (index === questionOfDay.correct) {
        resultMessage.textContent = "✅ إجابة صحيحة!";
        resultMessage.style.color = "green";
      } else {
        resultMessage.textContent = "❌ إجابة خاطئة!";
        resultMessage.style.color = "red";
      }
    };
    answersBox.appendChild(btn);
  });
  const encouragementTexts = [
    {
      type: "آية",
      text: "﴿وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ﴾ [القمر:17]"
    },
    {
      type: "حديث",
      text: "قال رسول الله ﷺ: «خيركم من تعلم القرآن وعلّمه» [رواه البخاري]"
    },
    {
      type: "حديث",
      text: "قال ﷺ: «يقال لصاحب القرآن: اقرأ وارتق ورتّل كما كنت ترتّل في الدنيا، فإن منزلتك عند آخر آية تقرؤها» [رواه أبو داود والترمذي]"
    },
    {
      type: "حديث",
      text: "قال رسول الله ﷺ: «من قرأ حرفًا من كتاب الله فله به حسنة، والحسنة بعشر أمثالها» [رواه الترمذي]"
    },
    {
      type: "آية",
      text: "﴿نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ﴾ [يوسف:3] — والقرآن مليء بالقصص لتعليم الأبناء القيم"
    }
  ];
// افضل التلاوات 
  const videos = document.querySelectorAll(".recitation-card video");

  videos.forEach((video) => {
    video.addEventListener("play", () => {
      // وقف باقي الفيديوهات
      videos.forEach((v) => {
        if (v !== video) v.pause();
      });
    });
  });

  window.addEventListener("scroll", () => {
    videos.forEach((video) => {
      const rect = video.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

      // لو خرج من الشاشة بالكامل يتقفل
      if (!isVisible) {
        video.pause();
      }
    });
  });
// دعوه ختاميه
const duaSection = document.getElementById("closingDua");

window.addEventListener("scroll", () => {
  const sectionTop = duaSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight - 100) {
    duaSection.classList.add("show");
    duaSection.classList.remove("hidden");
  }
});

  // اختر عشوائي
  const random = Math.floor(Math.random() * encouragementTexts.length);
  const box = document.getElementById("encouragement-text");
  const item = encouragementTexts[random];

  box.innerHTML = `<strong>${item.type}:</strong> ${item.text}`;
  


let deferredPrompt;
const installBtn = document.getElementById("installBtn");

// ✅ التعامل مع حدث beforeinstallprompt
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // منع البانر التلقائي
  deferredPrompt = e; // تخزين الحدث لاستخدامه لاحقًا
  installBtn.hidden = false; // إظهار الزر
});

// ✅ عند الضغط على زر التثبيت
installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // إظهار نافذة التثبيت
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("✅ تم التثبيت");
    } else {
      console.log("❌ تم رفض التثبيت");
    }

    deferredPrompt = null;
    installBtn.hidden = true; // إخفاء الزر بعد المحاولة
  }
});
// فيديو مهم 
function scrollToVideo() {
  const videoSection = document.getElementById("importantVideo");
  if (videoSection) {
    videoSection.scrollIntoView({ behavior: "smooth" });
  }
}
