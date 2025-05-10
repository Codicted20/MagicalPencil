const keyboardSound = new Audio("keyboardSound.mp3");
const clickSound = new Audio("click.mp3");
const drawSound = new Audio("draw.mp3");
const audio = new Audio();

drawSound.loop = true;
const eraseSound = new Audio("eraser.mp3");
eraseSound.loop = true;

document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing");

  typingElement.addEventListener("animationstart", (e) => {
    if (e.animationName === "typing") {
      keyboardSound.currentTime = 0;
      keyboardSound.play().catch((err) => {
        console.warn("Audio play failed:", err);
      });
    }
  });
});

const Enter = new Audio("enter.mp3");
const touchSound = new Audio("touch.mp3");
document.addEventListener("DOMContentLoaded", () => {
  const pencilToggle = document.getElementById("pencilToggle");
  const themeToggle = document.getElementById("themeToggle");
  const moodButtons = document.querySelectorAll(".mood");
  const touchSound = new Audio("touch.mp3");

  const playTouchSound = () => {
    touchSound.currentTime = 0;
    touchSound.play();
  };

  if (pencilToggle) {
    pencilToggle.addEventListener("click", playTouchSound);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", playTouchSound);
  }

  moodButtons.forEach((moodBtn) => {
    moodBtn.addEventListener("click", playTouchSound);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const eraserButton = document.getElementById("eraserButton");
  const colorPalette = document.getElementById("colorPalette");
  const musicToggle = document.getElementById("musicToggle");
  const sizeSlider = document.getElementById("sizeSlider");

  const playTouchSound = () => {
    clickSound.currentTime = 0;
    clickSound.play();
  };

  if (eraserButton) {
    eraserButton.addEventListener("click", playTouchSound);
  }

  if (colorPalette) {
    colorPalette.addEventListener("click", playTouchSound);
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", playTouchSound);
  }
  if (sizeSlider) {
    sizeSlider.addEventListener("click", playTouchSound);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const sizeSlider = document.getElementById("sizeSlider");
  const wipeSound = new Audio("wipe.mp3");

  if (sizeSlider) {
    sizeSlider.addEventListener("input", () => {
      wipeSound.currentTime = 0;
      wipeSound.play();
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const magicButton = document.getElementById("magicButton");
  const magicSound = new Audio("magic.mp3");
  if (magicButton) {
    magicButton.addEventListener("click", () => {
      magicSound.currentTime = 0;
      magicSound.play();
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const clearButton = document.querySelector(".clear");
  const clearSound = new Audio("clearAll.mp3");

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      clearSound.currentTime = 0;
      clearSound.play();
      clearCanvas();
    });
  }
});

function openSketchbook() {
  Enter.play();
  document.querySelector(".container").style.display = "none";
  document.getElementById("drawingArea").style.display = "flex";
  document.body.style.backgroundColor = "#FF6B6B";
  let randomColor =
    colorOptions[Math.floor(Math.random() * colorOptions.length)];
  document.body.style.background = randomColor;
  resizeCanvas();
  setInitialColor();
}
const btn = document.getElementById("openBtn");
btn.style.pointerEvents = "none";
setTimeout(() => {
  btn.style.pointerEvents = "auto";
  btn.style.opacity = "1";
}, 4000);

btn.addEventListener("click", openSketchbook);

const musicToggle = document.getElementById("musicToggle");
const moodOptions = document.getElementById("moodOptions");
const volumeSlider = document.getElementById("volumeSlider");
musicToggle.addEventListener("click", () => {
  moodOptions.style.display =
    moodOptions.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".mood").forEach((img) => {
  img.addEventListener("click", () => {
    const mood = img.dataset.mood;
    musicToggle.src = `${mood}.png`;
    moodOptions.style.display = "none";
    playMoodMusic(mood);
    generateFloatingEmojis(mood);
  });
});
function playMoodMusic(mood) {
  audio.src = `${mood}.mp3`;
  audio.loop = true;
  audio.play();
}
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

function generateFloatingEmojis(mood) {
  document.querySelectorAll(".floating-emoji").forEach((e) => e.remove());

  for (let i = 0; i < 20; i++) {
    const emoji = document.createElement("img");
    emoji.src = `${mood}.png`;
    emoji.classList.add("floating-emoji");

    emoji.style.width = Math.floor(Math.random() * 30 + 30) + "px";
    emoji.style.left = Math.floor(Math.random() * 100) + "vw";
    emoji.style.top = Math.floor(Math.random() * 100) + "vh";
    emoji.style.animationDuration = Math.random() * 5 + 3 + "s";

    document.body.appendChild(emoji);
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let diaryBounds = { x: 0, y: 0, width: 0, height: 0 };
const colorPicker = document.getElementById("colorPicker");
const colorToggle = document.querySelector(".color-toggle");
const colorPalette = document.getElementById("colorPalette");
const sizeSlider = document.getElementById("sizeSlider");
const sizeDisplay = document.getElementById("sizeDisplay");
let colorOptions = [
  "#FF6B6B",
  "#6BCB77",
  "#4D96FF",
  "#FFD93D",
  "#C17CFF",
  "#F5B7B1",
  "#F9E79F",
  "#A3E4D7",
  "#D5DBDB",
  "#FAD02E",
  "#D45D79",
  "#F1C6A4",
  "#A29BFE",
  "#FF9F9F",
  "#BB8FCE",
  "#FFFFFF",
  "#000000",
];
let isDrawingSoundPlaying = false;
let isErasingSoundPlaying = false;
let lastMoveTime = Date.now();
let movementCheckInterval;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = "#222222";
let isPaletteVisible = false;
let isEraserActive = false;
let trailEffect = [];
let currentSize = parseInt(sizeSlider.value);

sizeSlider.addEventListener("input", (e) => {
  currentSize = parseInt(e.target.value);
  sizeDisplay.textContent = currentSize;
});

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const themeToggle = document.getElementById("themeToggle");

function setDiaryBackground(imageNumber) {
  const image = new Image();
  image.src = `diary${imageNumber}.png`;
  image.onload = function () {
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    canvas.style.backgroundImage = `url(${image.src})`;
    themeToggle.src = `diary${imageNumber}.png`;

    canvas.style.backgroundSize = "contain";
    canvas.style.backgroundRepeat = "no-repeat";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

setDiaryBackground(1);

themeToggle.addEventListener("click", () => {
  const randomNumber = Math.floor(Math.random() * 11) + 1; // 1 to 11
  setDiaryBackground(randomNumber);
});
canvas.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDrawing = true;
  lastMoveTime = Date.now();
  movementCheckInterval = setInterval(() => {
    if (Date.now() - lastMoveTime > 150) {
      if (isDrawingSoundPlaying) {
        drawSound.pause();
        drawSound.currentTime = 0;
        isDrawingSoundPlaying = false;
      }
      if (isErasingSoundPlaying) {
        eraseSound.pause();
        eraseSound.currentTime = 0;
        isErasingSoundPlaying = false;
      }
    }
  }, 100);

  const pos = getMousePos(e);
  [lastX, lastY] = [pos.x, pos.y];
  trailEffect = [];
});
themeToggle.addEventListener("click", () => {
  themeToggle.classList.add("pressed");

  setTimeout(() => {
    themeToggle.classList.remove("pressed");
  }, 100);

  const randomNumber = Math.floor(Math.random() * 11) + 1; // 1 to 11
  setDiaryBackground(randomNumber);
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  if (isEraserActive) {
    eraseSound.pause();
    eraseSound.currentTime = 0;
    isErasingSoundPlaying = false;
  }
  clearInterval(movementCheckInterval);

  drawSound.pause();
  drawSound.currentTime = 0;
  isDrawingSoundPlaying = false;
});
canvas.addEventListener("mouseout", () => {
  isDrawing = false;
  if (isEraserActive) {
    eraseSound.pause();
    eraseSound.currentTime = 0;
    isErasingSoundPlaying = false;
  }
  clearInterval(movementCheckInterval);

  drawSound.pause();
  isDrawingSoundPlaying = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  lastMoveTime = Date.now();

  const { x, y } = getMousePos(e);
  if (isEraserActive) {
    if (!isErasingSoundPlaying) {
      eraseSound.play();
      isErasingSoundPlaying = true;
    }
  } else {
    if (isErasingSoundPlaying) {
      eraseSound.pause();
      eraseSound.currentTime = 0;
      isErasingSoundPlaying = false;
    }
  }

  if (!isDrawingSoundPlaying && !isEraserActive) {
    drawSound.play();
    isDrawingSoundPlaying = true;
  }

  ctx.lineWidth = currentSize;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  if (isEraserActive) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "#FFFFFF";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = currentColor;
  }

  trailEffect.push({ x, y });
  drawMagicalLine(trailEffect);

  [lastX, lastY] = [x, y];
});

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / rect.width) * canvas.width,
    y: ((evt.clientY - rect.top) / rect.height) * canvas.height,
  };
}
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  isDrawing = true;
  lastMoveTime = Date.now();
  movementCheckInterval = setInterval(() => {
    if (Date.now() - lastMoveTime > 150) {
      if (isDrawingSoundPlaying) {
        drawSound.pause();
        drawSound.currentTime = 0;
        isDrawingSoundPlaying = false;
      }
      if (isEraserActive && !isErasingSoundPlaying) {
        eraseSound.play(); // Play eraser sound
        isErasingSoundPlaying = true; // Mark sound as playing
      }
    }
  }, 100);

  const touch = e.touches[0];
  const pos = getTouchPos(touch);
  [lastX, lastY] = [pos.x, pos.y];
  trailEffect = [];
});

canvas.addEventListener("touchmove", (e) => {
  if (!isDrawing) return;
  lastMoveTime = Date.now();

  e.preventDefault();
  const touch = e.touches[0];
  const { x, y } = getTouchPos(touch);

  ctx.lineWidth = currentSize;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  if (isEraserActive) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "#FFFFFF";

    if (!isErasingSoundPlaying) {
      eraseSound.play();
      isErasingSoundPlaying = true;
    }

    if (isDrawingSoundPlaying) {
      drawSound.pause();
      drawSound.currentTime = 0;
      isDrawingSoundPlaying = false;
    }
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = currentColor;

    if (!isDrawingSoundPlaying) {
      drawSound.play();
      isDrawingSoundPlaying = true;
    }

    if (isErasingSoundPlaying) {
      eraseSound.pause();
      eraseSound.currentTime = 0;
      isErasingSoundPlaying = false;
    }
  }

  trailEffect.push({ x, y });
  drawMagicalLine(trailEffect);
  [lastX, lastY] = [x, y];
});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
  if (isEraserActive) {
    eraseSound.pause();
    eraseSound.currentTime = 0;
    isErasingSoundPlaying = false;
  }
  clearInterval(movementCheckInterval);

  drawSound.pause();
  drawSound.currentTime = 0;
  isDrawingSoundPlaying = false;
});

function getTouchPos(touch) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((touch.clientX - rect.left) / rect.width) * canvas.width,
    y: ((touch.clientY - rect.top) / rect.height) * canvas.height,
  };
}
const touchPencil = document.getElementById("touchPencil");

function updateTouchPencilPosition(x, y) {
  const offsetX = 30;
  const offsetY = 280;
  touchPencil.style.left = `${x - offsetX}px`;
  touchPencil.style.top = `${y - offsetY}px`;
}

function handleTouchMove(e) {
  const touch = e.touches[0];
  updateTouchPencilPosition(touch.clientX, touch.clientY);
  touchPencil.style.display = "block";
}

function handleTouchStart(e) {
  const touch = e.touches[0];
  updateTouchPencilPosition(touch.clientX, touch.clientY);
  touchPencil.style.display = "block";
}

function handleTouchEnd() {
  touchPencil.style.display = "none";
}

document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchmove", handleTouchMove);
document.addEventListener("touchend", handleTouchEnd);

function clearCanvas() {
  const magic = document.getElementById("magicWipe");
  const canvasRect = canvas.getBoundingClientRect();

  magic.style.display = "block";
  magic.style.left = "-100px";
  magic.style.top = "200px";
  magic.style.transition = "left 1s linear";

  requestAnimationFrame(() => {
    magic.style.left = canvas.offsetWidth + "px";
  });

  canvas.style.transition = "opacity 1s ease";
  canvas.style.opacity = 0.1;

  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.opacity = 1;
    magic.style.display = "none";
    magic.style.left = "0";
  }, 1000);
}

const cursorImages = [
  "pencil1.png",
  "pencil2.png",
  "pencil3.png",
  "pencil4.png",
  "pencil5.png",
  "pencil6.png",
  "pencil7.png",
  "pencil8.png",
];

let cursorIndex = 0;

const pencilToggle = document.getElementById("pencilToggle");
const eraserButton = document.getElementById("eraserButton");

function changeCursor() {
  if (isEraserActive) {
    isEraserActive = false;
    eraserButton.classList.remove("active-eraser");
    eraserButton.textContent = "Eraser";
  }

  const nextIndex = (cursorIndex + 1) % cursorImages.length;
  const cursorUrl = `url(${cursorImages[nextIndex]}) 10 170, auto`;

  canvas.style.cursor = cursorUrl;
  pencilToggle.src = cursorImages[nextIndex];
  touchPencil.src = cursorImages[nextIndex];
  cursorIndex = nextIndex;
}

eraserButton.addEventListener("click", () => {
  isEraserActive = !isEraserActive;

  if (isEraserActive) {
    canvas.style.cursor = `url('eraser2.png') 20 140, auto`;
    eraserButton.classList.add("active-eraser");
    eraserButton.textContent = "Eraser (Active)";
  } else {
    const currentPencil = cursorImages[cursorIndex];
    canvas.style.cursor = `url(${currentPencil}) 20 140, auto`;
    eraserButton.classList.remove("active-eraser");
    eraserButton.textContent = "Eraser";
  }
});

pencilToggle.addEventListener("click", changeCursor);

function setInitialColor() {
  const isDark = document.body.classList.contains("dark");
  currentColor = isDark ? "#ffffff" : "#222222";
  colorPicker.value = currentColor;
  colorToggle.style.background = currentColor;
}

colorToggle.addEventListener("click", () => {
  isPaletteVisible = !isPaletteVisible;
  colorPalette.style.display = isPaletteVisible ? "flex" : "none";
});

colorOptions.forEach((color) => {
  const colorDiv = document.createElement("div");
  colorDiv.classList.add("color-option");
  colorDiv.style.backgroundColor = color;
  colorDiv.setAttribute("data-color", color);
  colorDiv.addEventListener("click", () => {
    currentColor = color;
    colorPicker.value = color;
    colorToggle.style.background = color;
    colorPalette.style.display = "none";
    isPaletteVisible = false;
  });
  colorPalette.appendChild(colorDiv);
});

colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
  colorToggle.style.background = currentColor;
  colorPalette.style.display = "none";
  isPaletteVisible = false;
});

window.addEventListener("resize", resizeCanvas);

function drawMagicalLine(trailEffect) {
  ctx.shadowBlur = 12;
  ctx.shadowColor = currentColor;

  for (let i = 0; i < trailEffect.length - 1; i++) {
    ctx.lineWidth = currentSize;

    ctx.beginPath();
    ctx.moveTo(trailEffect[i].x, trailEffect[i].y);
    ctx.lineTo(trailEffect[i + 1].x, trailEffect[i + 1].y);
    ctx.stroke();
  }

  ctx.shadowBlur = 0;
}

const magicButton = document.getElementById("magicButton");
const photoStandWrapper = document.getElementById("photoStandWrapper");
const photoStand = document.getElementById("photoStand");
const drawingCanvas = document.getElementById("drawingCanvas");
const colorTools = document.querySelector(".color-tools");

magicButton.addEventListener("click", () => {
  audio.pause();
  colorTools.style.pointerEvents = "none";
  colorTools.style.opacity = "0.5";

  const image = new Image();
  image.src = canvas.toDataURL();
  let scaleFactor = 1;
  let scaleDirection = 0.6;
  const breathingSpeed = 0.003;

  image.onload = () => {
    photoStandWrapper.style.display = "flex";
    photoStandWrapper.style.justifyContent = "center";
    photoStandWrapper.style.alignItems = "center";
    photoStandWrapper.style.height = "auto";

    photoStand.style.transform = "scale(1.1)";
    canvas.style.display = "none";
    photoStand.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
    photoStand.style.boxShadow = "15px 15px 60px rgba(0, 0, 0, 0.5)"; // Stronger box-shadow effect

    drawingCanvas.width = photoStand.width;
    drawingCanvas.height = photoStand.height;

    const standCtx = drawingCanvas.getContext("2d");
    standCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    standCtx.shadowColor = "rgba(0, 0, 0, 0.8)";
    standCtx.shadowBlur = 40;
    standCtx.shadowOffsetX = 20;
    standCtx.shadowOffsetY = 20;

    const aspectRatio = image.width / image.height;
    let drawWidth = drawingCanvas.width;
    let drawHeight = drawWidth / aspectRatio;

    if (drawHeight > drawingCanvas.height) {
      drawHeight = drawingCanvas.height;
      drawWidth = drawHeight * aspectRatio;
    }

    const offsetX = (drawingCanvas.width - drawWidth) / 2;
    const offsetY = (drawingCanvas.height - drawHeight) / 2;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = drawWidth;
    tempCanvas.height = drawHeight;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(image, 0, 0, drawWidth, drawHeight);

    const imageData = tempCtx.getImageData(0, 0, drawWidth, drawHeight);
    const data = imageData.data;

    const brightness = 15;
    const contrast = 1.3;
    const saturation = 1.4;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      const avg = (r + g + b) / 3;
      r = avg + (r - avg) * saturation;
      g = avg + (g - avg) * saturation;
      b = avg + (b - avg) * saturation;

      r = (r - 128) * contrast + 128;
      g = (g - 128) * contrast + 128;
      b = (b - 128) * contrast + 128;

      r += brightness;
      g += brightness;
      b += brightness;

      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }

    tempCtx.putImageData(imageData, 0, 0);

    function animateBreathing() {
      standCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

      scaleFactor += breathingSpeed * scaleDirection;

      if (scaleFactor > 1.2 || scaleFactor < 0.9) {
        scaleDirection *= -1;
      }

      standCtx.save();
      standCtx.translate(drawingCanvas.width / 2, drawingCanvas.height / 2); // Center the scaling
      standCtx.scale(scaleFactor, scaleFactor); // Scale the image
      standCtx.drawImage(
        tempCanvas,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );
      standCtx.restore();

      standCtx.shadowColor = "rgba(0, 0, 0, 0.8)";
      standCtx.shadowBlur = 40;
      standCtx.shadowOffsetX = 20;
      standCtx.shadowOffsetY = 20;

      requestAnimationFrame(animateBreathing);
    }

    animateBreathing();

    standCtx.shadowColor = "transparent";
    standCtx.shadowBlur = 0;
    standCtx.shadowOffsetX = 0;
    standCtx.shadowOffsetY = 0;
  };
});
const backArrow = document.querySelector(".backArrow");

backArrow.addEventListener("click", () => {
  backArrow.classList.add("slide-out");

  setTimeout(() => {
    photoStandWrapper.style.display = "none";
    canvas.style.display = "block";

    backArrow.classList.remove("slide-out");
    colorTools.style.pointerEvents = "auto";
    colorTools.style.opacity = "1";
  }, 500);
});
document.querySelector(".SaveBtn").addEventListener("click", () => {
  const canvas = document.getElementById("drawingCanvas");

  const link = document.createElement("a");
  link.download = "canvas-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
