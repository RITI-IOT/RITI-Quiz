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
var correct_responses = 0;

var correct = new Audio("./assets/music/correct.wav"); // buffers automatically when created
var wrong = new Audio("./assets/music/Wrong.wav"); // buffers automatically when created
var success = new Audio("./assets/music/Success.wav"); // buffers automatically when created
var gameOver = new Audio("./assets/music/GameOver.wav"); // buffers automatically when created

const correctColor = getComputedStyle(document.documentElement).getPropertyValue("--correct-answer");
const wrongColor = getComputedStyle(document.documentElement).getPropertyValue("--wrong-answer");
const congratulationColor = getComputedStyle(document.documentElement).getPropertyValue("--congratulations");
const saddenedColor = getComputedStyle(document.documentElement).getPropertyValue("--saddened");
const matchingColor = getComputedStyle(document.documentElement).getPropertyValue("--matching-color1");
const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");

var answered = [false, false, false, false];
var overall = true;

const lastPhase = document.getElementById("last-phase");
const great = document.getElementById("great");
const chaos = document.getElementById("chaos");
const grade = document.getElementById("grade");
next.addEventListener("click", function(){
    slides[pointer].style.opacity = 0;
    if(pointer < 3){
        pointer++;
        next.disabled = false;
    }

    if(pointer >= 3){
        next.disabled = true;
    }

    if(pointer >=1) previous.disabled = false;
    slides[pointer].style.transform = "translateX(0%)";
})

previous.addEventListener("click", function(){
    slides[pointer].style.transform = "translateX(100%)";
    
    if(pointer > 0){
        pointer--;
        previous.disabled = false;
    }
    if(pointer <=3){
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
        selectedlabel.style.padding = "clamp(0.9rem, 1.6vw, 1.1rem) 0 clamp(0.9rem, 1.6vw, 1.1rem) 1.7rem"
        if(pointer == 0){ 
            if(selectedid == "first-first-choice"){
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                correct.play();
                selectedlabel.style.color = "white";
                correctAnswer();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                document.getElementById("first-first-choicel").style.backgroundColor = correctColor;
                document.getElementById("first-first-choicel").style.color = "white";
                wrong.play();
            }
        }
        if(pointer == 1){ 
            if(selectedid == "second-third-choice"){
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                selectedlabel.style.color = "white";
                correctAnswer();
                correct.play();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                document.getElementById("second-third-choicel").style.backgroundColor = correctColor;
                document.getElementById("second-third-choicel").style.color = "white";
                wrong.play();
            }
        }
        if(pointer == 2){ 
            if(selectedid == "third-second-choice"){
                correct_responses++;
                selectedlabel.style.color = "white";
                selectedlabel.style.backgroundColor = correctColor;
                correctAnswer();
                correct.play();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                document.getElementById("third-second-choicel").style.color = "white";
                document.getElementById("third-second-choicel").style.backgroundColor = correctColor;
                wrong.play();
            }
        }
        if(pointer == 3){ 
            if(selectedid == "fourth-fourth-choice"){
                selectedlabel.style.color = "white";
                correct_responses++;
                selectedlabel.style.backgroundColor = correctColor;
                correctAnswer();
                correct.play();
            }
            else{
                selectedlabel.style.backgroundColor = wrongColor;
                selectedlabel.style.color = "white";
                document.getElementById("fourth-fourth-choicel").style.color = "white";
                document.getElementById("fourth-fourth-choicel").style.backgroundColor = correctColor;
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
            if(correct_responses > 2){
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
      shapes: 'circle',
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