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
        answer = "0";
        return {question, answer};
    }

    // Sharp side
    if (idx > 6) {
        question = `${AlterationQuestionTemplate} ${MajorScale[idx]} ?`;
        answer = `${idx - 6}#`;
        return {question, answer};
    }

    // Flat side
    if (idx < 6) {
        question = `${AlterationQuestionTemplate} ${MajorScale[idx]} ?`;
        answer = `${6 - idx}b`;
        return {question, answer};
    }

    return {question: "", answer: ""};
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
    } else {
        [ask, answer] = [MajorScale[idx], MinorScale[idx]];
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

$(".key").click(function(){
    getAlterationsQuestion();
    ShowTheQuestion(answer);


    if ($(this).attr("id")==MajorScale[idx]){
        $("#MajorScale").addClass("hidden");
        $("#MinorScale").removeClass("hidden");
        getRelativeQuestion(mode)


    }
})

.addEventListener("click", function(){ alert("Hello World!"); });