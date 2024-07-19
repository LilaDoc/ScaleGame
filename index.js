const MajorScale = ["Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#"];
const MinorScale = ["ebm", "bbm", "fm", "cm", "gm", "dm", "am", "em", "bm", "f#m", "c#m", "g#m",
"d#m"];

const AlterationQuestionTemplate = "How many alterations in";

/**
 * This function generates a random question related to an alteration in a major scale.
 * @returns {Object} An object containing the question and answer related to a random alteration in
a major scale.
 */
function getAlterationsQuestion() {
    const idx = Math.floor(Math.random() * MajorScale.length);

    return getAlterationsQuestionForIDX(idx);
}

/**
 * Given an index from MajorScale, this function generates a question related to the alteration (if
any) at that position in the scale.
 * @param {number} idx - The index within the MajorScale array.
 * @returns {Object} An object containing the question and answer based on the given index.
 */
function getAlterationsQuestionForIDX(idx) {
    let question, answer;

    // C - Middle Neutral point
    if (idx === 6) {
        question = `${AlterationQuestionTemplate} ${MajorScale[idx]} ?`;
        answer = "n0";
        return {question, answer};
    }

    // Sharp side
    if (idx > 6) {
        question = `${AlterationQuestionTemplate} ${MajorScale[idx]} ?`;
        answer = `n${idx - 6}#`;
        mode = "#"
        return {question, answer, mode};
    }

    // Flat side
    if (idx < 6) {
        question = `${AlterationQuestionTemplate} ${MajorScale[idx]} ?`;
        answer = `n${6 - idx}b`;
        mode = "b"
        return {question, answer, mode};
    }

    return {question: "", answer: "", mode: ""};
}

/**
 * Given a mode (major or minor), this function generates a random question related to the relative
scale of a given note (from MajorScale or MinorScale).
 * @param {string} mode - The desired mode: 'major' or 'minor'.
 * @returns {Object} An object containing the question and answer based on a random note in the
specified scale.
 */
function getRelativeQuestion(mode) {
    const idx = Math.floor(Math.random() * MajorScale.length);
    let ask = MajorScale[idx];
    let answer = MinorScale[idx];

    if (mode != "major" && mode != "minor") {
        return { question: "", answer: "" };
    }

    if (mode === "major") {
        [ask, answer] = [MinorScale[idx], MajorScale[idx]];
        //affiche majorpad

    } else {
        [ask, answer] = [MajorScale[idx], MinorScale[idx]];
        //affiche minor pad
    
    }

    return {
        question: `What's the ${mode} relative of ${ask} ?`,
        answer
    };
}



/** This function will show the question retative to the alteration
 * 
 */
function ShowTheQuestion(question){

    $("h1").text(question);

}


/** when the user click on a button 
 * the button that has been click animate
 * if it is the right one: 
 *  
 *  the major keyboard desepier and the Minor Keyboard Appere 
 * we call the function that listen the next question
 */


//Select a new question
//Show the corresponding pad
function NextQuestion(score){
    Countdown(10)
    $(".score").text(score);
    $(".key").off("click");
    console.log("Next question")
    const idquestion = Math.floor(Math.random() * 10);
    if (idquestion>5){
        $("#mode").addClass("hidden");
         $("#Alteration").removeClass("hidden");
        StartAlterationQuestion(score);

    }else{
        $("#Alteration").addClass("hidden");
        $("#mode").removeClass("hidden");
        StartRelativeQuestion(score);
    }
    // uncomment to go back to normal
 }

function ShowGoodJob(){
    $("h1").text("Good Job");
}
function ShowBoo(){
    $("h1").text("Nice try");
}

function StartAlterationQuestion(score){
    console.log("alteration");
    const {question,answer} = getAlterationsQuestion();
    // const {question,answer} =  {question:"How many alterations in", answer:"n1b"};;
    
    let userAnswer = "";
    // CheckAnswer(answer, userAnswerAlteration)
    ShowTheQuestion(question)
    console.log(answer);
    $(".key").on( "click", function() {
        
        const answerClicked = $(this).attr("id")
        console.log(answerClicked);
        userAnswer += answerClicked;
        
        console.log(userAnswer);
        console.log(answer.length,userAnswer.length )
        if (answer.length == userAnswer.length && answer.length>0 ){
            console.log(answer.length,userAnswer.length )
            CheckAnswer(answer, userAnswer,score);
            console.log ("length ok");
        }else if (answer.length < userAnswer.length){
            CheckAnswer(answer, userAnswer,score);
        }
             

} )
}

function StartRelativeQuestion(score){
    let mode = GetMode();
    // let mode = "major";
    console.log(mode);
    ShowModePad(mode);

   
    // const {question,answer} = {
    //     question: `What's the  relative of  ?`,
    //     answer: "Eb"
    // };
    const {question,answer} = getRelativeQuestion(mode);
    // switch those to to go back to normal
 
    ShowTheQuestion(question);
    console.log(answer);
    $(".key").on( "click", function() {
        const clickedAnswer = $(this).attr("id");
        console.log(clickedAnswer);
        CheckAnswer(answer,clickedAnswer,score)
        
    })


}

function CheckAnswer(answer, userAnswer,score){
    console.log("enter in checkanswer fn");
    // console.log (`the mode is ${mode}`);
    // getRelativeQuestion(mode);
    console.log(`userAnswer:${userAnswer}` );
    console.log(`answer:${answer}`  );
    if (userAnswer == answer){
        score+=1;
        console.log(`score :${score}`);
        
        console.log("ansewer checked");

        ShowGoodJob();
        console.log("good job")
        console.log("restart");
        
        Restart(score);
    } else { 
        ShowBoo();

        Reset();
        


    }


}

function Animate(){

}
function Restart(score){
    console.log("Restart fn");
    setTimeout(function () {
        NextQuestion(score);
      }, 1000);
}

function GetMode(){
    const idmode = Math.floor(Math.random() * 10);
    if(idmode <5){
        return "major";
    }
    else{
        return "minor";
    }
}

function ShowModePad(mode){
    if(mode == "minor"){
        console.log("show minor pad");
        $("#MinorKey").removeClass("hidden");
        $("#MajorKey").addClass("hidden");
    }else{
        console.log("major pad");
        $("#MajorKey").removeClass("hidden");
        $("#MinorKey").addClass("hidden");
    }
}

function Reset(score){
    score =0;
    
    setTimeout(function () {
        NextQuestion(score);
      }, 1000);
}

function Start(){
    let score=0;
    $(".score").text(score);
    
        NextQuestion(score);

}

Start();
//Next step

function Countdown(seconds) {
    function tick() {
        $(".timer").text(seconds);
        console.log(seconds);
      if (seconds > 0) {
        seconds--;

        setTimeout(tick, 1000);
      } else {
        console.log("This is too slow you can do better!");
        ShowMessage("This is too slow you can do better!");
        setTimeout(Start, 3000);
      }
    }
    tick();
  }

  function ShowMessage(message){

    $("h1").text(message);

}
