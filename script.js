var pointer = 0;

var slide = null;

const previous = document.getElementById("previous");
const next = document.getElementById("next");
const reset = document.getElementById("reset");
const okay = document.getElementById("okay");

const slides = document.querySelectorAll(".slide");
const forms = document.querySelectorAll("form");

previous.disabled = true;
reset.disabled = true;
next.disabled = true;
var correct_responses = 0;

var correct = new Audio("./assets/music/correct.wav"); // buffers automatically when created
var wrong = new Audio("./assets/music/Wrong.wav"); // buffers automatically when created
var success = new Audio("./assets/music/Success.wav"); // buffers automatically when created
var gameOver = new Audio("./assets/music/GameOver.wav"); // buffers automatically when created

var easysound = new Audio("./assets/music/easysound.mp3"); // buffers automatically when created
var mediumsound = new Audio("./assets/music/mediumsound.mp3"); // buffers automatically when created
var hardsound = new Audio("./assets/music/hardsound1.mp3"); // buffers automatically when created

const correctColor = getComputedStyle(document.documentElement).getPropertyValue("--correct-answer");
const wrongColor = getComputedStyle(document.documentElement).getPropertyValue("--wrong-answer");
const congratulationColor = getComputedStyle(document.documentElement).getPropertyValue("--congratulations");
const saddenedColor = getComputedStyle(document.documentElement).getPropertyValue("--saddened");
const matchingColor = getComputedStyle(document.documentElement).getPropertyValue("--matching-color1");
const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");

var answered = [false, false, false, false, false, false, false, false, false, false];
var overall = true;

const lastPhase = document.getElementById("last-phase");
const great = document.getElementById("great");
const chaos = document.getElementById("chaos");
const grade = document.getElementById("grade");

const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const difficulties = document.getElementById("difficulty-selection");

var currentDifficulty = "";

var answers = [];

var mediumArray = null;
var hardArray = null;

var mediumQuestions = [];
var hardQuestions = [];

var mediumOptions = [];
var hardOptions = [];
fetch("./questions.json")
    .then(response => response.json())
    .then(data =>{
        mediumArray = data.medium;
        hardArray = data.hard;
    })
easy.addEventListener("click", function(){
    easysound.play();
    firstPhase();
    answers = ["Internet of Things", "Transistor", "Provide power", "Capacitor", "True", "Solar Panel", "Light Emitting Diode", "False", "Conductor", "Rubber sole"];
})
medium.addEventListener("click", function(){
    mediumsound.play();
    firstPhase();
    mediumArray.forEach((ma, index) =>{
        mediumQuestions[index] = ma.question;
        mediumOptions[index] = ma.options;
        answers[index] = ma.answer;
    })
    slides.forEach((sl, index) =>{
        const strong = sl.querySelector("strong");
        strong.textContent = (index + 1) + ". " + mediumQuestions[index];

        const labels = sl.querySelectorAll("label");
        labels.forEach((lab, index1) =>{
            lab.textContent = mediumOptions[index][index1];
        })
    })
})
hard.addEventListener("click", function(){
    hardsound.play();

    firstPhase();
    hardArray.forEach((ha, index) =>{
        hardQuestions[index] = ha.question;
        hardOptions[index] = ha.options;
        answers[index] = ha.answer;
    })
    slides.forEach((sl, index) =>{
        const strong = sl.querySelector("strong");
        strong.textContent = (index + 1) + ". " + hardQuestions[index];

        const labels = sl.querySelectorAll("label");
        labels.forEach((lab, index1) =>{
            lab.textContent = hardOptions[index][index1];
        })
    })
})
function firstPhase(){
    slides[pointer].style.transform = "translateX(0%)";
    next.disabled = false;
    difficulties.style.opacity = 0;
}
next.addEventListener("click", function(){
    slides[pointer].style.opacity = 0;
    if(pointer < 9){
        pointer++;
        next.disabled = false;
    }

    if(pointer >= 9){
        next.disabled = true;
    }

    if(pointer >=1) previous.disabled = false;
    slides[pointer].style.transform = "translateX(0%)";
})

previous.addEventListener("click", function(){
    slides[pointer].style.transform = "translateX(102%)";
    
    if(pointer > 0){
        pointer--;
        previous.disabled = false;
    }
    if(pointer <=9){
        next.disabled = false;
    }
    if(pointer <= 0){
        previous.disabled = true;
    }
    slides[pointer].style.opacity = 1;
})

forms.forEach(form => {
    form.addEventListener("change", function(){
        const selected = form.querySelector("input[type='radio']:checked");
        const selectedid = selected.getAttribute("id");
        const selectedlabel = document.getElementById(selectedid + "l");
        answered[pointer] = true;
        selectedlabel.style.padding = "clamp(0.2rem, 1.4vw, 0.9rem) 2vw clamp(0.2rem, 1.4vw, 0.9rem)"
        if(pointer == 0){ 
            if(selectedlabel.textContent == answers[pointer]){
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                correct.play();
                selectedlabel.style.color = "white";
                correctAnswer();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                const labels = form.querySelectorAll("label");
                labels.forEach(lab => {
                    if(lab.textContent == answers[pointer]){
                        lab.style.backgroundColor = correctColor;
                        lab.style.color = "white";
                    }
                })
                console.log(labels);
                wrong.play();
            }
        }
        if(pointer == 1){ 
            if(selectedlabel.textContent == answers[pointer]){
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                selectedlabel.style.color = "white";
                correctAnswer();
                correct.play();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                const labels = form.querySelectorAll("label");
                labels.forEach(lab => {
                    if(lab.textContent == answers[pointer]){
                        lab.style.backgroundColor = correctColor;
                        lab.style.color = "white";
                    }
                })
                wrong.play();
            }
        }
        if(pointer == 2){ 
            if(selectedlabel.textContent == answers[pointer]){
                correct_responses++;
                selectedlabel.style.color = "white";
                selectedlabel.style.backgroundColor = correctColor;
                correctAnswer();
                correct.play();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                const labels = form.querySelectorAll("label");
                labels.forEach(lab => {
                    if(lab.textContent == answers[pointer]){
                        lab.style.backgroundColor = correctColor;
                        lab.style.color = "white";
                    }
                })
                wrong.play();
            }
        }
        if(pointer == 3){ 
            if(selectedlabel.textContent == answers[pointer]){
                selectedlabel.style.color = "white";
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                correctAnswer();
                correct.play();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                const labels = form.querySelectorAll("label");
                labels.forEach(lab => {
                    if(lab.textContent == answers[pointer]){
                        lab.style.backgroundColor = correctColor;
                        lab.style.color = "white";
                    }
                })
                wrong.play();
            }
        }
        if(pointer == 4){ 
            if(selectedlabel.textContent == answers[pointer]){
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                correct.play();
                selectedlabel.style.color = "white";
                correctAnswer();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                const labels = form.querySelectorAll("label");
                labels.forEach(lab => {
                    if(lab.textContent == answers[pointer]){
                        lab.style.backgroundColor = correctColor;
                        lab.style.color = "white";
                    }
                })
                wrong.play();
            }
        }
        if(pointer == 5){ 
            if(selectedlabel.textContent == answers[pointer]){
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                selectedlabel.style.color = "white";
                correctAnswer();
                correct.play();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                const labels = form.querySelectorAll("label");
                labels.forEach(lab => {
                    if(lab.textContent == answers[pointer]){
                        lab.style.backgroundColor = correctColor;
                        lab.style.color = "white";
                    }
                })
                wrong.play();
            }
        }
        if(pointer == 6){ 
            if(selectedlabel.textContent == answers[pointer]){
                correct_responses++;
                selectedlabel.style.color = "white";
                selectedlabel.style.backgroundColor = correctColor;
                correctAnswer();
                correct.play();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                const labels = form.querySelectorAll("label");
                labels.forEach(lab => {
                    if(lab.textContent == answers[pointer]){
                        lab.style.backgroundColor = correctColor;
                        lab.style.color = "white";
                    }
                })
                wrong.play();
            }
        }
        if(pointer == 7){ 
            if(selectedlabel.textContent == answers[pointer]){
                selectedlabel.style.color = "white";
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                correctAnswer();
                correct.play();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                const labels = form.querySelectorAll("label");
                labels.forEach(lab => {
                    if(lab.textContent == answers[pointer]){
                        lab.style.backgroundColor = correctColor;
                        lab.style.color = "white";
                    }
                })
                wrong.play();
            }
        }
        if(pointer == 8){ 
            if(selectedlabel.textContent == answers[pointer]){
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                correct.play();
                selectedlabel.style.color = "white";
                correctAnswer();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                const labels = form.querySelectorAll("label");
                labels.forEach(lab => {
                    if(lab.textContent == answers[pointer]){
                        lab.style.backgroundColor = correctColor;
                        lab.style.color = "white";
                    }
                })
                wrong.play();
            }
        }
        if(pointer == 9){ 
            if(selectedlabel.textContent == answers[pointer]){
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                selectedlabel.style.color = "white";
                correctAnswer();
                correct.play();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                const labels = form.querySelectorAll("label");
                labels.forEach(lab => {
                    if(lab.textContent == answers[pointer]){
                        lab.style.backgroundColor = correctColor;
                        lab.style.color = "white";
                    }
                })
                wrong.play();
            }
        }
        const radiobuttons = form.querySelectorAll("input");
        radiobuttons.forEach(but => {
            but.disabled = true;
        })
        const labels = form.querySelectorAll("label");
        labels.forEach(lab => {
            lab.style.pointerEvents = "none";
        })
        answered.forEach(flag => {
            if(!flag){
                overall = false;
            }
        })
        if(overall){
            grade.textContent = correct_responses;
            if(correct_responses > 5){
                great.style.display = "flex";
                lastPhase.style.backgroundColor = congratulationColor;
                triggerConfetti();
                success.play();
            }
            else{
                chaos.style.display = "flex";
                lastPhase.style.backgroundColor = saddenedColor;
                gameOver.play();
            }
            lastPhase.style.opacity = 1;
            lastPhase.style.zIndex = 1;
            lastPhase.style.boxShadow = "0 0 0 5000px rgb(0,0,0,0.4)"
            reset.style.opacity = 1;
            reset.disabled = false;
        }
        overall = true;
        console.log(correct_responses);
    })
})
function triggerConfetti() {
    confetti({
      particleCount: 200,   // Number of particles
      spread: 150,           // Spread of the particles
      origin: { y: 0.7 }    // Start a bit above the bottom
    });
}
  
// Call triggerConfetti when the quiz is completed successfully
// triggerConfetti();

function correctAnswer() {
    confetti({
      particleCount: 30,   // Number of particles
      spread: 100,           // Spread of the particles
      origin: { y: 0.7 },    // Start a bit above the bottom
      ticks: 60,
      shapes: ["square", "circle"],
      colors: [correctColor]
    });
}

okay.addEventListener("click", function() {
    lastPhase.style.opacity = 0;
    lastPhase.style.zIndex = -1;
    lastPhase.style.boxShadow = "none";
})
reset.addEventListener("click", function(){
    window.location.reload();
})

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let particlesArray = [];

// Function to draw a star shape
function drawStar(ctx, x, y, radius, points, innerRadius, color) {
    let angle = Math.PI / points;
  
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    
    for (let i = 0; i < 2 * points; i++) {
      let r = (i % 2 === 0) ? radius : innerRadius;
      let posX = x + Math.cos(i * angle) * r;
      let posY = y + Math.sin(i * angle) * r;
      ctx.lineTo(posX, posY);
    }
  
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
  
  // Particle Class with star shape
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size; // This will be the outer radius of the star
      this.color = color;
    }
  
    // Draw particle as a star
    draw() {
      // Parameters: context, x, y, outer radius, number of points, inner radius, color
      drawStar(ctx, this.x, this.y, this.size, 4, this.size / 2, this.color);
    }
  
    // Update particle position
    update() {
      // Move particle
      if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
      }
      this.x += this.directionX;
      this.y += this.directionY;
  
      // Draw the particle again
      this.draw();
    }
  }
// Initialize particles
function init() {
  particlesArray = [];
  let numberOfParticles = 100;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 8;
    let x = Math.random() * (canvas.width - size * 2) + size;
    let y = Math.random() * (canvas.height - size * 2) + size;
    let directionX = (Math.random() * 0.4) - 0.2;
    let directionY = (Math.random() * 0.4) - 0.2;
    let color = '#ffffff';
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

// Initialize and animate particles
init();
animate();
