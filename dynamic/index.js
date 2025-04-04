const sections = [...document.querySelectorAll(".section")];
window.addEventListener("scroll", _ => {
  // run active function with current viewed section
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop) {
      activeTitle(section);
      if (section.classList.contains("our-skills")) {
        activeProgress();
      };
    };
  });
});

function activeTitle(section) {
  // get title of viewed section and active it
  const sectionTitle = document.querySelector(`.${section.classList[0]} .main-title`);
  sectionTitle.classList.add("active-main-title");
};

function activeProgress() {
  // active progress when skill section viewed
  const progressS = [...document.querySelectorAll(".our-skills .progress")];
  progressS.forEach(progress => {
    progress.classList.add("active-progress");
  });
};

activeEventTimer();
function activeEventTimer() {
  const daysEle = document.querySelector(".latest-events .days");
  const hoursEle = document.querySelector(".latest-events .hours");
  const minutesEle = document.querySelector(".latest-events .minutes");
  const secondsEle = document.querySelector(".latest-events .seconds");

  let targetDate = new Date("Jul 1 2025 00:00:00").getTime();

  let counterDate = setInterval(() => {
    createDate();
  }, 1000);
  
  function createDate() {
    let mainDate = new Date().getTime();
    let deffDate = targetDate - mainDate;

    // convert milliseconds to days
    let days = Math.floor(deffDate / (1000 * 60 * 60 * 24));
    // days.(hours), convert milliseconds to hours
    let hours = Math.floor(deffDate % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    // hours.(minutes), convert milliseconds to minutes
    let minutes = Math.floor(deffDate % (1000 * 60 * 60) / (1000 * 60));
    // minutes.(seconds), convert milliseconds to seconds
    let seconds = Math.floor(deffDate % (1000 * 60) / (1000));
    
    daysEle.innerHTML = days < 10? `0${days}`: days;
    hoursEle.innerHTML = hours < 10? `0${hours}`: hours;
    minutesEle.innerHTML = minutes < 10? `0${minutes}`: minutes;
    secondsEle.innerHTML = seconds < 10? `0${seconds}`: seconds;

    // stop counter when time is up
    if (deffDate <= 0) {
      clearInterval(counterDate);
      daysEle.innerHTML = "00";
      hoursEle.innerHTML = "00";
      minutesEle.innerHTML = "00";
      secondsEle.innerHTML = "00";
    };
  };
};

videosSection();
function videosSection() {
  const ulVideos = document.querySelector(".top-videos .ul-videos");
  const video = document.querySelector(".top-videos video");
  const infoVideo = document.querySelector(".top-videos .screen .info");

  let videosData = [
    {
      source: "video-preview-01.mp4",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta voluptate eius repellat quisquam quos sapiente!",
      duration: "00:05"
    },
    {
      source: "video-preview-02.mp4",
      description: "Lorem ipsum dolor sit amet.",
      duration: "00:14"
    },
    {
      source: "video-preview-03.mp4",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident quo quam officiis magni dolore in labore, cumque earum eius ducimus?",
      duration: "00:14"
    },
    {
      source: "video-preview-04.mp4",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, hic.",
      duration: "00:07"
    },
    {
      source: "video-preview-05.mp4",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium nostrum eligendi quia delectus ipsam veritatis quos numquam culpa! Corrupti delectus iure quae blanditiis inventore ad.",
      duration: "00:17"
    },
    {
      source: "video-preview-06.mp4",
      description: "Lorem, ipsum dolor.",
      duration: "00:32"
    },
    {
      source: "video-preview-07.mp4",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio cumque minima quasi unde inventore porro.",
      duration: "00:54"
    },
    {
      source: "video-preview-08.mp4",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid ad harum sequi ea voluptate quas cumque blanditiis laboriosam quidem! Dignissimos!",
      duration: "00:06"
    },
    {
      source: "video-preview-09.mp4",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, veniam?",
      duration: "00:20"
    },
    {
      source: "video-preview-10.mp4",
      description: "Lorem ipsum dolor sit amet consectetur.",
      duration: "00:19"
    }
  ];

  createbtn();
  function createbtn() {
    for (let i = 0; i < videosData.length; i++) {
      // create li element
      const liVideo = document.createElement("li");
      liVideo.classList.add("li-video");
  
      // create button element
      const btnVideo = document.createElement("button");
      btnVideo.classList.add("btn-video");
      liVideo.appendChild(btnVideo);
  
      // create p (descrip-video) element
      const descripVideo = document.createElement("p");
      descripVideo.classList.add("descrip-video");
      descripVideo.textContent = videosData[i].description;
      btnVideo.appendChild(descripVideo);
  
      // create span (duration-video) element
      const durationVideo = document.createElement("span");
      durationVideo.classList.add("duration-video");
      durationVideo.textContent = videosData[i].duration;
      btnVideo.appendChild(durationVideo);
  
      // print items on page
      ulVideos.appendChild(liVideo);
    };
    handleBtn();
  };

  
  function handleBtn() {
    const btnVideos = [...document.querySelectorAll(".top-videos .ul-videos .btn-video")];

    // active first indexes as default
    window.addEventListener("load", _ => {
      activeVideo(0);
    });
    
    // active indexes depends on clicked button (index)
    btnVideos.forEach((btn, index) => {
      btn.addEventListener("click", _ => {
        activeVideo(index);
      });
    });

    function activeVideo(i) {
      unactiveBtn();
      // active and print content
      btnVideos[i].classList.add("active");
      video.src = `static/videos/${videosData[i].source}`;
      infoVideo.textContent = videosData[i].description;
    };

    // unactive all btns before active the current one
    function unactiveBtn() {
      btnVideos.forEach(btn => {
        btn.classList.remove("active");
      });
    };
  };
};

activeStatsNum();
function activeStatsNum() {
  const statsSection = document.querySelector(".stats");
  const numbs = [...document.querySelectorAll(".stats .numb")];

  // to start the loop one time only, then turn it false
  let start = true;
  
  window.addEventListener("scroll", _ => {
    // run active function when view the section
    if (window.scrollY >= statsSection.offsetTop - 100) {
      if (start) {
        numbs.forEach(numb => {
          activeNumb(numb);
        });
        start = false;
      };
    };
  });

  function activeNumb(num) {
    // target numb of the current element
    let dataNum = num.dataset.numb;
    // finish count in 2 seconds
    let duration = 2000 / dataNum;

    let numbCounter = setInterval(() => {
      num.innerHTML++;
      // stop count when reach the target
      if (num.innerHTML === dataNum) {
        clearInterval(numbCounter);
      };
    }, duration);
  };
};