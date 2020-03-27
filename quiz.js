//All variables obtained from querySelector

const initial = document.querySelector(".initial");
const quiz = document.querySelector(".quiz");
const question = document.querySelector(".question");
const qImg = document.querySelector(".qImg");
const choiceA = document.querySelector(".optionA");
const choiceB = document.querySelector(".optionB");
const choiceC = document.querySelector(".optionC");
const counter = document.querySelector(".counter");
const timeGauge = document.querySelector(".timeGauge");
const progress = document.querySelector(".progress");
const marksDiv = document.querySelector(".marks");

// HTML/CSS Questions

let questions1 = [
  {
    question: "What does HTML stand for?",
    imgSrc: "img/html.png",
    choiceA: "Hyper Text Markup Language",
    choiceB: "Hyperlinks and Text Markup Language",
    choiceC: "Home Tool Markup Language",
    correct: "A"
  },
  {
    question: "What does CSS stand for?",
    imgSrc: "img/css.png",
    choiceA: "Cascade Style Scheme",
    choiceB: "Cascading Style Sheets",
    choiceC: "Cascading Style Scheme",
    correct: "B"
  },
  {
    question: "Which CSS property is used to make rounded buttons?",
    imgSrc: "img/css.png",
    choiceA: "button-round",
    choiceB: "border-radius",
    choiceC: "border-circle",
    correct: "B"
  }
];

// Java/Python Questions

let questions2 = [
  {
    question: "What shortcut is used for multiple line comments in Java?",
    imgSrc: "img/java.jpg",
    choiceA: "Tab + /",
    choiceB: "Shift + /",
    choiceC: "Ctrl + /",
    correct: "C"
  },
  {
    question: "Lists with no duplicate or identical entries are called?",
    imgSrc: "img/python.png",
    choiceA: "Sets",
    choiceB: "Groups",
    choiceC: "Archives",
    correct: "A"
  },
  {
    question: "Which data type is used for text?",
    imgSrc: "img/python.png",
    choiceA: "int",
    choiceB: "float",
    choiceC: "String",
    correct: "C"
  }
];

// Database Questions

let questions3 = [
  {
    question: "What does SQL stand for?",
    imgSrc: "img/sql.png",
    choiceA: "Sequel Query Language",
    choiceB: "Structured Query Language",
    choiceC: "Solved Query Language",
    correct: "B"
  },
  {
    question: "What command is used to filter documents in MongoDB?",
    imgSrc: "img/mdb.png",
    choiceA: "find()",
    choiceB: "select()",
    choiceC: "get()",
    correct: "A"
  },
  {
    question: "Is MongoDB a relational DBMS?",
    imgSrc: "img/mdb.png",
    choiceA: "Yes",
    choiceB: "No",
    choiceC: "Can't say",
    correct: "A"
  }
];

let lastQuestionIndex;
let runningQuestion = 0;
let count = 0;
const time = 10; // 10s
const barWidth = 150; // 150px
const unit = barWidth / time;
let TIMER;
let marks = 0;

// Display Questions

function getQuestion(quizName) {
  let q;
  if (quizName === "one") q = questions1[runningQuestion];
  else if (quizName === "two") q = questions2[runningQuestion];
  else if (quizName === "three") q = questions3[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

// Check selected answer

function checkAnswer(answer) {
  if (quizName === "one") {
    if (answer === questions1[runningQuestion].correct) {
      marks++;
      answerIsCorrect(); // change progress color to green
    } else {
      answerIsWrong(); // change progress color to red
    }
  } else if (quizName === "two") {
    if (answer === questions2[runningQuestion].correct) {
      marks++;
      answerIsCorrect();
    } else {
      answerIsWrong();
    }
  } else if (quizName === "three") {
    if (answer === questions3[runningQuestion].correct) {
      marks++;
      answerIsCorrect();
    } else {
      answerIsWrong();
    }
  }
  count = 0;
  if (runningQuestion < lastQuestionIndex) {
    runningQuestion++;
    getQuestion(quizName);
  } else {
    // end the quiz and show the marks
    clearInterval(TIMER);
    getMarks();
  }
}

// start.addEventListener("click", startQuiz());  -- not working for some reason

//Global variables

let quizName = "";
let numQuestions;

// Function to start quiz

function startQuiz(quizType) {
  quizName = quizType;
  initial.style.display = "none";
  quiz.style.display = "block";

  if (quizName === "one") numQuestions = questions1.length;
  else if (quizName === "two") numQuestions = questions2.length;
  else if (quizName === "three") numQuestions = questions3.length;
  lastQuestionIndex = numQuestions - 1;
  //console.log(numQuestions);

  getQuestion(quizName);

  setProgress();
  getTime();
  TIMER = setInterval(getTime, 1000); //in ms
}

function setProgress() {
  for (let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

function getTime() {
  if (count <= time) {
    counter.innerHTML = count;
    timeGauge.style.width = count * unit + "px";
    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (runningQuestion < lastQuestionIndex) {
      runningQuestion++;
      getQuestion(quizName);
    } else {
      clearInterval(TIMER);
      getMarks();
    }
  }
}

// When answer is correct--
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// When answer is Wrong--
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function getMarks() {
  marksDiv.style.display = "block";

  const percent = Math.round((100 * marks) / numQuestions);

  let img, note;
  if (percent >= 80) img = "img/5.png";
  else if (percent >= 60) img = "img/4.png";
  else if (percent >= 40) img = "img/3.png";
  else if (percent >= 20) img = "img/2.png";
  else img = "img/1.png";

  if (percent >= 80)
    note = "Awesome! Your basics are really strong. Keep up the good work.";
  else if (percent >= 50)
    note = "Good! You certainly will become much better with practice.";
  else note = "Don't feel bad! Just keep grinding";

  marksDiv.innerHTML = "<img src=" + img + ">";
  marksDiv.innerHTML += "<p>" + percent + "%</p>" + "<p>" + note + "</p>";
}
