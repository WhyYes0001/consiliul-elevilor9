'use strict';



// add Event on multiple elment

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



// PRELOADING

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});



// MOBILE NAV TOGGLE

const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-overlay]")
];

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElements(navLinks, "click", closeNav);



// HEADER

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);



/**
 * TEXT ANIMATION EFFECT FOR HERO SECTION
 */

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {

  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    // get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove all character from the current letter box
    letterBoxes[i].textContent = "";

    // loop through all letters
    for (let j = 0; j < letters.length; j++) {

      // create a span
      const span = document.createElement("span");

      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // set the "in" class on the span, if current letter box is active
      // otherwise class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // pass current letter into span
      span.textContent = letters[j];

      // add space class on span, when current letter contain space
      if (letters[j] === " ") span.classList.add("space");

      // pass the span on current letter box
      letterBoxes[i].appendChild(span);

      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.05;

    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }

  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

    setLetterEffect();
  }, (totalLetterBoxDelay * 1000) + 3000);

}

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);



/**
 * BACK TO TOP BUTTON
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();



/**
 * CUSTOM CURSOR
 */

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

// add cursor hoverd class
const hoverActive = function () { cursor.classList.add("hovered"); }

// remove cursor hovered class
const hoverDeactive = function () { cursor.classList.remove("hovered"); }

// add hover effect on cursor, when hover on any button or hyperlink
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

// remove diabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});

const canvasBackground = document.getElementById("backgroundCanvas");
const ctxBackground = canvasBackground.getContext("2d");

const canvasStars = document.getElementById("starsCanvas");
const ctxStars = canvasStars.getContext("2d");

// Default options
const defaultOptions = {
  numberOfStars: 300,
  maxDistance: 70,
  starSize: { min: 1, max: 5 },
  speedFactor: 1,
  mouseRadius: 200,
  starColor: "#fff",
  connectionColor: "rgba(255, 255, 255, ${opacity})",
  canvasBackgroundColor: "#000",
  backgroundImageURL: null, // Option to set a background image
  overlayColor: "rgba(0, 0, 0, 0.5)", // Color to overlay on top of the background image
  lineThickness: 1,
  starShapes: ["circle", "star"],
  randomStarSpeeds: true,
  rotationSpeed: { min: 0.001, max: 0.003 },
  connectionsWhenNoMouse: false,
  percentStarsConnecting: 30, // percentage of stars that can connect when mouse is not on canvasStars
  connectionLinesDashed: false, // option to make connection lines dashed
  dashedLinesConfig: [5, 15], // configuration for dashed lines
  canvasGradient: null, // gradient for canvasStars background
  starDensity: "medium", // Options: 'low', 'medium', 'high', 'ultra'
  interactive: false, // If true the user can add stars by clicking on the canvasStars
  parallaxEffect: true,
  parallaxStrength: 1, // the higher, the slower the motion
  idleRestartTime: 1000
};

const userOptions = {};

// Star densities corresponding to 'low', 'medium', 'high', and 'ultra'
const starDensities = {
  low: 0.00005,
  medium: 0.0001,
  high: 0.0002,
  ultra: 0.0004
};

// Merge user options with default options
const options = { ...defaultOptions, ...userOptions };

// Size of a cell in the hashmap
const CELL_SIZE = options.maxDistance;
// The hashmap
let cells = {};

window.addEventListener("resize", function () {
  stars.length = 0; // Clear the existing stars
  cells = {}; // Clear the existing cells
  resizeCanvas();
  createStars(); // Create new stars according to the new screen size
});

const stars = [];
const mouse = { x: null, y: null };

// Change in the mousemove event listener
let animationIdleTimeout = null;

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;

  // Clear any previous timeout
  clearTimeout(animationIdleTimeout);

  // Set a new timeout
  animationIdleTimeout = setTimeout(() => {
    mouse.x = null;
    mouse.y = null;
  }, options.idleRestartTime);
});

function resizeCanvas() {
  canvasBackground.width = window.innerWidth;
  canvasBackground.height = window.innerHeight;
  canvasStars.width = window.innerWidth;
  canvasStars.height = window.innerHeight;

  // Drawing the background
  if (options.canvasGradient) {
    const gradient = ctxBackground.createLinearGradient(
      0,
      0,
      canvasBackground.width,
      canvasBackground.height
    );
    options.canvasGradient.forEach((color, index) => {
      gradient.addColorStop(index / (options.canvasGradient.length - 1), color);
    });
    ctxBackground.fillStyle = gradient;
    ctxBackground.fillRect(
      0,
      0,
      canvasBackground.width,
      canvasBackground.height
    );
  } else if (options.backgroundImageURL) {
    const img = new Image();
    img.onload = function () {
      ctxBackground.drawImage(
        img,
        0,
        0,
        canvasBackground.width,
        canvasBackground.height
      );
      ctxBackground.fillStyle = options.overlayColor;
      ctxBackground.fillRect(
        0,
        0,
        canvasBackground.width,
        canvasBackground.height
      );
    };
    img.src = options.backgroundImageURL;
  } else {
    ctxBackground.fillStyle = options.canvasBackgroundColor;
    ctxStars.fillRect(0, 0, canvasBackground.width, canvasBackground.height);
  }
}

function Star(x, y) {
  this.x = x;
  this.y = y;
  this.size =
    Math.random() * (options.starSize.max - options.starSize.min) +
    options.starSize.min;
  this.shape =
    options.starShapes[Math.floor(Math.random() * options.starShapes.length)];
  this.speedX =
    (Math.random() - 0.5) *
    (options.randomStarSpeeds ? options.speedFactor : 1);
  this.speedY =
    (Math.random() - 0.5) *
    (options.randomStarSpeeds ? options.speedFactor : 1);
  this.rotation = 0;
  this.rotationSpeed =
    Math.random() * (options.rotationSpeed.max - options.rotationSpeed.min) +
    options.rotationSpeed.min;
  if (options.percentStarsConnecting === 100) {
    this.connects = true;
  } else {
    this.connects =
      options.connectionsWhenNoMouse &&
      Math.random() < options.percentStarsConnecting / 100;
  }
  this.depth = Math.random();
  this.originalX = x;
  this.originalY = y;
  this.size *= this.depth; // Size varies based on depth
}

function updateStarPositionForParallax() {
  if (!options.parallaxEffect || !mouse.x || !mouse.y) return;

  stars.forEach((star) => {
    const dx = (canvasStars.width / 2 - mouse.x) / options.parallaxStrength;
    const dy = (canvasStars.height / 2 - mouse.y) / options.parallaxStrength;
    star.x = star.originalX + dx * (1 - star.depth);
    star.y = star.originalY + dy * (1 - star.depth);
  });
}

Star.prototype.draw = function () {
  ctxStars.beginPath();
  ctxStars.fillStyle = options.starColor;
  switch (this.shape) {
    case "circle":
      ctxStars.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      break;
    case "star":
      ctxStars.save();
      ctxStars.translate(this.x, this.y);
      ctxStars.rotate(this.rotation);
      ctxStars.beginPath();
      // Five-point star shape
      for (let i = 0; i < 5; i++) {
        ctxStars.lineTo(0, -this.size / 2);
        ctxStars.translate(0, -this.size / 2);
        ctxStars.rotate((Math.PI * 2) / 10);
        ctxStars.lineTo(0, -this.size / 2);
        ctxStars.translate(0, -this.size / 2);
        ctxStars.rotate(-((Math.PI * 6) / 10));
      }
      ctxStars.lineTo(0, -this.size / 2);
      ctxStars.restore();
      break;
    // More shapes can be added here
  }
  ctxStars.closePath();
  ctxStars.fill();
};

let backgroundImage = null;
if (options.backgroundImageURL) {
  backgroundImage = new Image();
  backgroundImage.src = options.backgroundImageURL;
}

// Modified animateStars function
function animateStars() {
  updateStarPositionForParallax();
  ctxStars.clearRect(0, 0, canvasStars.width, canvasStars.height);

  // Clear the cell hash at the start of each animation frame
  cells = {};

  stars.forEach((star) => {
    star.x += star.speedX;
    star.y += star.speedY;

    if (star.shape === "star") star.rotation += star.rotationSpeed;
    if (star.x > canvasStars.width || star.x < 0) {
      star.speedX = -star.speedX;
    }
    if (star.y > canvasStars.height || star.y < 0) {
      star.speedY = -star.speedY;
    }
    star.draw();

    // Recalculate cell position after star movement
    let cellX = Math.floor(star.x / CELL_SIZE);
    let cellY = Math.floor(star.y / CELL_SIZE);
    if (!cells[cellX]) {
      cells[cellX] = {};
    }
    if (!cells[cellX][cellY]) {
      cells[cellX][cellY] = [];
    }
    cells[cellX][cellY].push(star);

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let neighbourCellX = cellX + i;
        let neighbourCellY = cellY + j;
        if (cells[neighbourCellX] && cells[neighbourCellX][neighbourCellY]) {
          cells[neighbourCellX][neighbourCellY].forEach((otherStar) => {
            let dx = star.x - otherStar.x;
            let dy = star.y - otherStar.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let mouseDx = star.x - mouse.x;
            let mouseDy = star.y - mouse.y;
            let mouseDistance = Math.sqrt(
              mouseDx * mouseDx + mouseDy * mouseDy
            );
            if (
              distance < options.maxDistance &&
              (mouseDistance < options.mouseRadius ||
                (star.connects && otherStar.connects))
            ) {
              ctxStars.beginPath();
              ctxStars.moveTo(star.x, star.y);
              ctxStars.lineTo(otherStar.x, otherStar.y);
              const opacity =
                (options.maxDistance - distance) / options.maxDistance;
              ctxStars.strokeStyle = options.connectionColor.replace(
                "${opacity}",
                opacity.toString()
              );
              ctxStars.lineWidth = options.lineThickness;
              if (options.connectionLinesDashed) {
                ctxStars.setLineDash(options.dashedLinesConfig);
              } else {
                ctxStars.setLineDash([]);
              }
              ctxStars.stroke();
            }
          });
        }
      }
    }
  });
  requestAnimationFrame(animateStars);
}

function createStars() {
  resizeCanvas();
  const numberOfStars =
    starDensities[options.starDensity] * canvasStars.width * canvasStars.height;
  for (let i = 0; i < numberOfStars; i++) {
    let x = Math.random() * canvasStars.width;
    let y = Math.random() * canvasStars.height;
    let star = new Star(x, y);
    stars.push(star);
    // Determine which cell this star belongs to
    let cellX = Math.floor(x / CELL_SIZE);
    let cellY = Math.floor(y / CELL_SIZE);
    // If the cell doesn't exist yet, create it
    if (!cells[cellX]) {
      cells[cellX] = {};
    }
    if (!cells[cellX][cellY]) {
      cells[cellX][cellY] = [];
    }
    // Add the star to the cell
    cells[cellX][cellY].push(star);
  }
}

window.addEventListener("click", function (event) {
  if (!options.interactive) return;
  const x = event.x;
  const y = event.y;
  const star = new Star(x, y);
  stars.push(star);
});

resizeCanvas(); // This will draw the background.
createStars();
animateStars();

























































































// Connect JavaScript with renamed CSS
// I hope this over-commenting helps. Let's do this!
// Let's use the 'active' variable to let us know when we're using it
let active = false;

// First we'll have to set up our event listeners
// We want to watch for clicks on our scroller
document.querySelector('.unique-scroller').addEventListener('mousedown',function(){
  active = true;
  // Add our scrolling class so the scroller has full opacity while active
  document.querySelector('.unique-scroller').classList.add('unique-scrolling');
});
// We also want to watch the body for changes to the state,
// like moving around and releasing the click
// so let's set up our event listeners
document.body.addEventListener('mouseup',function(){
  active = false;
  document.querySelector('.unique-scroller').classList.remove('unique-scrolling');
});
document.body.addEventListener('mouseleave',function(){
  active = false;
  document.querySelector('.unique-scroller').classList.remove('unique-scrolling');
});

// Let's figure out where their mouse is at
document.body.addEventListener('mousemove',function(e){
  if (!active) return;
  // Their mouse is here...
  let x = e.pageX;
  // but we want it relative to our wrapper
  x -= document.querySelector('.unique-wrapper').getBoundingClientRect().left;
  // Okay let's change our state
  scrollIt(x);
});

// Let's use this function
function scrollIt(x){
    let transform = Math.max(0,(Math.min(x,document.querySelector('.unique-wrapper').offsetWidth)));
    document.querySelector('.unique-after').style.width = transform+"px";
    document.querySelector('.unique-scroller').style.left = transform-25+"px";
}

// Let's set our opening state based off the width, 
// we want to show a bit of both images so the user can see what's going on
scrollIt(150);

// And finally let's repeat the process for touch events
// first our middle scroller...
document.querySelector('.unique-scroller').addEventListener('touchstart',function(){
  active = true;
  document.querySelector('.unique-scroller').classList.add('unique-scrolling');
});
document.body.addEventListener('touchend',function(){
  active = false;
  document.querySelector('.unique-scroller').classList.remove('unique-scrolling');
});
document.body.addEventListener('touchcancel',function(){
  active = false;
  document.querySelector('.unique-scroller').classList.remove('unique-scrolling');
});



