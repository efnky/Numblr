var attempts = [];
            var randomNumber; // Chiffre à deviner
            var maxAttempts = 8;
            document.addEventListener('DOMContentLoaded', function() {
                restartGame();
            });
            let inputs = document.querySelectorAll('.number-input');

            function insererTentative() {
                if (attempts.length >= maxAttempts) {
                    alert("Nombre maximal de tentatives atteintes !");
                    return; 
                }
                let tentative = '';    
                inputs.forEach(input => {
                    tentative+= input.value;
                });
                if(tentative.length!=totalDigits){
                    alert("Assurez-vous d'avoir rempli toutes les cellules !")
                }else{
                    checkTentative(tentative);
                }
            }

            function checkTentative(tentative){
                let sauvegard = '';
                let green = 0;   
                // The secret word to guess
                var secretWord = randomNumber;

                // The player's guess
                var guess = tentative;

                function chr(value, status) {
                    this.value = value;
                this.status = status;
                }

                var processedGuess = [];
                var userGuesses = [];

                for (let i = 0; i < guess.length; i++) {

                    let ballClass = 'incorrect';

                    let guessLetter = guess.charAt(i);
                    let secretLetter = secretWord.charAt(i);

                    //console.log('guessLetter:' + guessLetter);

                    var processedChr = new chr(guessLetter, '');
                    processedGuess.push(processedChr); 

                    var countOfGuessLetter = secretWord.split('').filter(l => l === guessLetter).length;
                    //console.log('countOfGuessLetter: ' + countOfGuessLetter);

                    var countOfGreenLetter = processedGuess.filter(obj => obj.value === guessLetter && obj.status === 'Green').length;
                    console.log('countOfGreenLetter: ' + countOfGreenLetter);

                    if (guessLetter === secretLetter) {
                            processedChr.status = 'Green';
                            ballClass = 'correct-location';
                            green++
                    } else if (secretWord.indexOf(guessLetter) >= 0 && countOfGuessLetter > countOfGreenLetter) {
                            processedChr.status = 'Yellow';
                            ballClass = 'correct-number';
                    } else {
                            processedChr.status = 'Red';
                            ballClass = 'incorrect';
                    }
                    var yellows = processedGuess.filter(obj => obj.value === guessLetter && obj.status === 'Yellow');
                    var yellow = yellows[yellows.length - 1];
                    if (processedGuess.filter(obj => obj.value === guessLetter).length > countOfGuessLetter) {
                        if(typeof(yellow) !== 'undefined'){
                            yellow.status = 'Red';
                            ballClass = 'incorrect';
                        }
                    }
                    
                    //console.log(processedGuess.filter(obj => obj.status === 'Green').length);
                }
                for (let i = 0; i< guess.length; i++){
                    if(typeof(processedGuess) !== 'undefined'){
                        sauvegard += '<div class="ball-result ' + processedGuess[i].status + '">' + processedGuess[i].value + '</div> ';
                    }
                }
                userGuesses.push(processedGuess);

                attempts.push({tentative: tentative, sauvegard: sauvegard});
                            // Mettre à jour le feedback sur la page
                updateFeedback();
                // Vérifier si l'utilisateur a gagné ou il a dépassé le nombre de tentatives 
                if (green === totalDigits) {
                    alert("Félicitations! Vous avez gagné!");
                } else if (attempts.length >= maxAttempts) {
                    alert("Nombre maximal de tentatives atteint. VOUS AVEZ PERDU. La réponse était  "  + secretWord.toString() + ".");
                }
            }

            function updateFeedback() {
                const sauvegardElement = document.getElementById('sauvegard');
                sauvegardElement.innerHTML = ''; // Effacer les feedbacks précédents
                // Parcourir toutes les tentatives et les afficher
                for (let attempt of attempts) {
                    let attemptElement = document.createElement('div');
                    attemptElement.innerHTML = attempt.sauvegard;
                    sauvegardElement.appendChild(attemptElement);
                }
            }

            function restartGame() {
                randomNumber = generateRandomNumber(totalDigits);
                const balls = document.getElementById('balls').getElementsByTagName('input');
                for (let ball of balls) {
                    ball.value = '';
                }
                attempts = [];
                updateFeedback();
            }

            function generateRandomNumber(length) {
                let number = '';
                for (let i = 0; i < length; i++) {
                    number += Math.floor(Math.random() * 10).toString();
                }
                return number;
            }

            function help_bot() {
                const helpMenu = document.getElementById('helpMenu');
                helpMenu.style.display = helpMenu.style.display === 'none' ? 'block' : 'none';
            }

            function validateInput() {
                inputs.forEach(input => { 
                    const value = parseInt(inputField.value);
                    if (value < 0 || value > 9) {
                    inputField.value = '';
                    }
                });
    
            }

            function handleKeyPress(event) {
                const charCode = event.which || event.keyCode;
                if (!((charCode >= 48 && charCode <= 57) || charCode === 8 || charCode === 46)) {
                    event.preventDefault();
                }
            }

            function roundNumber() {
                inputs.forEach(input => {
                        let roundedValue = Math.ceil(input.value);
                        input.value = roundedValue;
                });
            }
           
            function limitToOneDigit(input) {
                if (input.value.length > 1) {
                    input.value = input.value.slice(0, 1);
                }
            }