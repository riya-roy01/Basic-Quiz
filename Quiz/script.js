const questions=[
    {
        question:"What is the largest social media network in the world?",
        answers: [
            { text:"Twitter",correct:false},
            { text:"Facebook",correct:true},
            { text:"Instagram",correct:false},
            { text:"Whatsapp",correct:false},
        ]
    },
    {
        question:"In which year did the Titanic sink?",
        answers: [
            { text:"1921",correct:false},
            { text:"1900",correct:false},
            { text:"1911",correct:false},
            { text:"1912",correct:true},
        ]
    },
    {
        question:"How many US presidents have been assassinated?",
        answers: [
            { text:"4",correct:true},
            { text:"5",correct:false},
            { text:"7",correct:false},
            { text:"3",correct:false},
        ]
    },
    {
        question:"How many bones does an adult human have?",
        answers: [
            { text:"207",correct:false},
            { text:"206",correct:true},
            { text:"200",correct:false},
            { text:"216",correct:false},
        ]
    },
    {
        question:"Which of the following can’t an astronaut do in space?",
        answers: [
            { text:"Read",correct:false},
            { text:"Sleep",correct:false},
            { text:"Cry",correct:true},
            { text:"Sit",correct:false},
        ]
    }

];
const questionElement = document.getElementById("ques");
const answerButton = document.getElementById("ans-btn");
const nextbutton = document.getElementById("next-btn");

let cur =0;
let score =0;
function startQuiz(){
    cur=0;
    score=0;
    nextbutton.innerHTML ="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let curQ =questions[cur];
    let quesN = cur+1;
    questionElement.innerHTML = quesN + "."+curQ.question;

    curQ.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });   
}
function resetState(){
    nextbutton.style.display ="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectbtn = e.target;
    const iscor = selectbtn.dataset.correct ==="true";
    if(iscor){
        selectbtn.classList.add("correct");
        score++;
    }
    else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    });
    nextbutton.style.display="block";
}
function handleNextButton(){
    cur++;
    if(cur<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
};
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML="Play Again";
    nextbutton.style.display="block";
};
nextbutton.addEventListener("click",()=>{
    if(cur<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();