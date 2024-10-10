//creates the header, bracket, textboxes for winners, and button menu to load the winner
function generateBracket(event) {
    //keeps the page from reloading
    event.preventDefault();

    //make reference for the names textbox and get rid of any blank space
    const input = document.getElementById('names').value.trim();
    //separates the names from the textbox and get rid of any blank space
    const names = input.split('\n').filter(name => name.trim());
    //This determines the amount of slots we need for the tournament, we use base 2 to ensure correct use with any amount of players
    const totalParticipants = Math.pow(2, Math.ceil(Math.log2(names.length)));
    //calculate the amount of bye slots to create in the tournament to fill the bracket
    const byes = totalParticipants - names.length;
    
    //add "Bye" participants if needed
    for (let i = 0; i < byes; i++) {
        names.push("Bye");
    }

    //shuffle names array using the Fisher-Yates algorithm
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Get a random index from 0 to i
        [names[i], names[j]] = [names[j], names[i]]; // Swap players
    }

    //retrieve bracket Name div and clear it
    const bracketNameDiv = document.getElementById('bracketName');
    bracketNameDiv.innerHTML = ''; 

    //create an h2 for the bracket name and give it style
    const bracketTitle = document.createElement('h2');
    bracketTitle.className = 'ContentHeader';

    //retrieve bracket name from the form and apply the user's title to the bracket title
    const bracketText = document.getElementById('tournamentName');
    bracketTitle.textContent = bracketText.value;

    //append the bracket title to bracket name div
    bracketNameDiv.appendChild(bracketTitle);

    //create a reference for the bracket div and clear it in case a user chooses to shuffle the bracket by pushing submit
    const bracketDiv = document.getElementById('bracket');
    bracketDiv.innerHTML = ''; 

    //create matches array
    let roundMatches = [names];
    
    //create rounds with matches
    //this checks whether the number of matches in the last round is greater than 1
    //if there is only one match in that round it is the winner slot
    while (roundMatches[roundMatches.length - 1].length > 1) {
        //creates variable to store the previous round
        const prevRound = roundMatches[roundMatches.length - 1];
        //creates variable to store the next round
        const nextRound = [];
        //iterate through the previous round matches
        for (let i = 0; i < prevRound.length; i += 2) {
            //check if the next index exists and if we are in the last round
            if(roundMatches[roundMatches.length - 1].length == 2){
                nextRound.push("Winner");
            }

            // Check if we are in the second to last round
            else if(roundMatches[roundMatches.length - 1].length == 4){
                nextRound.push("Finals");
            }

            // Check if we are in the second to last round
            else if(roundMatches[roundMatches.length - 1].length == 8){
                nextRound.push("Semi-Finals");
            }

            //write out the list of the names of who is competing or could be competing
            else if (i + 1 < prevRound.length) {
                nextRound.push(prevRound[i] + " vs " + prevRound[i + 1]);
            } 
            //otherwise use bye
            else {
                nextRound.push(prevRound[i] + " vs Bye");
            }
        }
        //add round to collection of rounds
        roundMatches.push(nextRound);
    }

    // Display the matches in rounds
    roundMatches.forEach((round, index) => {
        //create the div for the round
        const roundDiv = document.createElement('div');
        roundDiv.className = 'round';
        //create h3 for the round number
        const roundTitle = document.createElement('h3');
        roundTitle.textContent = `Round ${index + 1}`;
        //add title to the round div
        roundDiv.appendChild(roundTitle);
        
        //iterate through the matches
        round.forEach(match => {
            //create a div for each match
            const matchDiv = document.createElement('div');
            matchDiv.className = 'match';
            matchDiv.textContent = match;
            roundDiv.appendChild(matchDiv);

            //if we are past the first round add a textbox to write down the winner of the current match
            if(index > 0){
                //create input tag for text box
                const text = document.createElement('input');
                text.type = 'text';
                text.className ='winnerTextBox';
                //add textbox to each of these matches
                matchDiv.appendChild(text);
            }
        });
        //add round to the bracket div
        bracketDiv.appendChild(roundDiv);
    });
    
    //add the submit column div
    const submitDiv = document.createElement('div');
    submitDiv.id = 'submitDiv';
    submitDiv.className = 'round';
    //create the title for the submit column
    const submitTitle = document.createElement('h3');
    submitTitle.id = 'submitTitle'
    submitTitle.textContent = `Submit Winner`;
    submitDiv.appendChild(submitTitle);

     // Create a form element
     const form = document.createElement('form');
     form.id = `bracketForm`;
        
    // Create a submit button
    const submitButton = document.createElement('input');
    submitButton.id= 'bracketSubmit';
    submitButton.type = 'submit';
    submitButton.className = 'submit'
    submitButton.value = 'Submit';

    //add button to the submit button
    form.appendChild(submitButton);

    // Create a reset button
    const resetButton = document.createElement('input');
    resetButton.onclick = resetBracket;
    resetButton.id= 'bracketReset';
    resetButton.type = 'button';
    resetButton.className = 'submit'
    resetButton.value = 'Reset';

    //add button to the submit button
    form.appendChild(resetButton);

    // Create a start button
    const startButton = document.createElement('input');
    startButton.onclick = startTheConfetti;
    startButton.id= 'confettiStart';
    startButton.type = 'button';
    startButton.className = 'submit'
    startButton.value = 'Start';

    //add button to the form
    form.appendChild(startButton);

    // Create a stop button
    const stopButton = document.createElement('input');
    stopButton.onclick = stopTheConfetti;
    stopButton.id= 'confettiStop';
    stopButton.type = 'button';
    stopButton.className = 'submit'
    stopButton.value = 'Stop';

    //add button to the stop button
    form.appendChild(stopButton);
   

    //find the winner's name
    const winnerTextBoxes = document.querySelectorAll('.winnerTextBox');

    //check if any elements were found
    if (winnerTextBoxes.length > 0) {
        //access the last text box and add style
        const lastWinnerTextBox = winnerTextBoxes[winnerTextBoxes.length - 1];
        lastWinnerTextBox.required = true;
        lastWinnerTextBox.id = 'winnerTextbox';
    }

    //create a match div for the submit column
    const matchDiv = document.createElement('div');
    matchDiv.className = 'match';
    matchDiv.textContent = '';
    //add match div to the form, submit div, and bracket div
    matchDiv.appendChild(form);
    submitDiv.appendChild(matchDiv);
    bracketDiv.appendChild(submitDiv);





    // Add an event listener for the form submission
    form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    announceWinner();
    });
}

//announces the winner and initiates the confetti
function announceWinner() {
    //get the winner's name
    const winnerName = document.getElementById('winnerTextbox').value.trim(); 

     //check if the winner's name is not empty
     if (winnerName) {
        //winner alert message
        alert(`${winnerName} is the winner!`); 
        //starts confetti
        startTheConfetti();
    } else {
        //error message
        alert('Please enter the name of the winner.'); // Prompt to enter a name if input is empty
    }
}

//if the winner is entered reset page if not just reset the textboxes
function resetBracket(){
    //get the winner's name
    const winnerName = document.getElementById('winnerTextbox').value.trim(); 

     //check if the winner's name is not empty
    if (winnerName) {
        //scroll to the top of the page
        window.scrollTo(0, 0);

        //reload the page to reset everything, comment this out to just reset the textboxes
        location.reload();
    } 
    //reset the textboxes
    else {
        //find the winner's name
        const winnerTextBoxes = document.querySelectorAll('.winnerTextBox');

        // Loop through any elements were found
        if (winnerTextBoxes.length > 0) {
            // loop through the textboxes
            for(let i = 0; i < winnerTextBoxes.length; i++){
                winnerTextBoxes[i].value = '';
            }
        }
    }
}

//starts the confetti animation
function startTheConfetti(){
    //scroll to the top of the page
    window.scrollTo(0, 0);
    //call start confetti
    startConfetti();

    //hide the create bracket form
    const form = document.getElementById('form');
    form.style.display = 'none';

    //hide the header at the top of the create bracket form
    const header = document.getElementById('ContentHeader');
    header.style.display = 'none';
}

//stops the confetti animation
function stopTheConfetti(){
    //stops the confetti
    stopConfetti();
}