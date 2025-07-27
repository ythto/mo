  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log("✅ SW تم تسجيله"))
      .catch(err => console.log("❌ خطأ في SW:", err));
  }
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("👍 تمت إضافة الموقع إلى الشاشة الرئيسية");
      } else {
        console.log("👎 المستخدم رفض الإضافة");
      }
      deferredPrompt = null;
    });
  }
});

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

    // scroll animation
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
function openPopup(imgSrc, name) {
  document.getElementById("popupImg").src = imgSrc;
  document.getElementById("popupName").textContent = name;
  document.getElementById("popup").style.display = "flex";
  document.body.style.overflow = "hidden"; // ❌ يمنع سكرول الصفحة
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.body.style.overflow = "auto"; // ✅ يرجع السكرول
}

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

  // اختر عشوائي
  const random = Math.floor(Math.random() * encouragementTexts.length);
  const box = document.getElementById("encouragement-text");
  const item = encouragementTexts[random];

  box.innerHTML = `<strong>${item.type}:</strong> ${item.text}`;
  
