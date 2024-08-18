const startBtn=document.getElementById('start-btn');
const questionContainer=document.getElementById('question-container');
const nextBtn=document.getElementById('next-btn');
const questionElement=document.getElementById('question');
const answerButtonsElement=document.getElementById('answer-btns');
// console.log(questionContainer)

let shuffledAnswers,shuffledQuestions,currentQuestionIndex;

const startGame=()=>{
    shuffledQuestions=questions.sort(()=> Math.random()-0.5);
    currentQuestionIndex=0;
    questionContainer.classList.remove('hide');
    startBtn.classList.add('hide');
    setNextQuestion();
}

startBtn.addEventListener('click',startGame);

nextBtn.addEventListener('click',()=>{
    currentQuestionIndex++;
    setNextQuestion();
})

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

const showQuestion=(question)=>{
    questionElement.innerText=question.question;
    shuffledAnswers=question.answers.sort(()=> Math.random()-0.5);
    shuffledAnswers.forEach(answer=>{
        const button=document.createElement('button');
        button.innerText=answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer);
        answerButtonsElement.appendChild(button);
    })
    
}

function selectAnswer(e){

    const selectedAnswer=e.target;
    const correct=selectedAnswer.dataset.correct;
    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach(button=>{
        setStatusClass(button,button.dataset.correct);
    });

    if(shuffledQuestions.length>currentQuestionIndex+1){
        nextBtn.classList.remove('hide');
    }else{
        startBtn.innerText='Restart';
        startBtn.classList.remove('hide');
    }
}

function resetState(){
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }

}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function setStatusClass(element,correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    }else{
        element.classList.add('incorrect');
    }
}

const questions=[
    {
        question:'What is left shift operator in C++?',
        answers:[
            {text: '>>',correct:false},
            {text: '&',correct:false},
            {text: '~',correct:false},
            {text: '<<', correct:true}
        ]
    },
    {
        question:'What is right shift operator in C++?',
        answers:[
            {text: '<<', correct:false},
            {text: '|', correct:false},
            {text: '>>',correct:true},
            {text: '%', correct:false}
        ]
    },
    {
        question:'What is xor operator in C++?',
        answers:[
            {text: '&',correct:false},
            {text: '^', correct:true},
            {text: '~',correct:false},
            {text: '/',correct:false}
        ]
    }
]