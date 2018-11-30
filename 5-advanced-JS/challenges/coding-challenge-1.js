/////////////////////////////
// CODING CHALLENGE


/*
  --- Let's build a fun quiz game in the console! ---

  1. Build a function constructor called Question to describe a question. A question should include:
  a) question itself
  b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
  c) correct answer (I would use a number for this)

  2. Create a couple of questions using the constructor

  3. Store them all inside an array

  4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

  5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

  6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

  7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

  --- Expert level ---

  8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

  9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

  10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

  11. Display the score in the console. Use yet another method for this.
*/

(function() {
  var questions, question, userAnswer, score;

  var messages = {
    prompt: "Type the number for your answer or 'exit' to end the game.",

    noQuestionsLeft: function() {
      console.log("You've answered all the available questions!");
    },
    quittingGame: function() {
      console.log("Thanks for playing! Here's your final score: " + score);
    },
    invalidInput: function() {
      console.log("Invalid input. Please choose the number of your answer.");
    },
    answerIsWrong: function(answer) {
      console.log("Wrong answer! " + answer + " is the correct choice.");
      if (hasQuestionsRemaining()) this.defaultTrailer();
    },
    answerIsCorrect: function(answer) {
      console.log("Congrats! " + answer + " is the correct answer!");
      if (hasQuestionsRemaining()) this.defaultTrailer();
    },
    currentScore: function() {
      console.log("Your current score: " + score);
    },
    defaultTrailer: function() {
      this.currentScore();
      console.log('Next question:');
    }
  };

  function Question(question, choices, rightAnswerIndex) {
    this.question = question;
    this.choices = choices;
    this.rightAnswer = this.choices[rightAnswerIndex];
  }

  Question.prototype.ask = function() {
    console.log(question.question);
    this.showChoices();
    userAnswer = prompt(messages.prompt);
  };

  Question.prototype.showChoices = function() {
    for (i = 0; i < this.choices.length; i++)
      console.log(i+1 + ' - ' + this.choices[i]);
  };

  Question.prototype.checkAnswer = function() {
    var answer = question.choices[userAnswer - 1];

    if (userAnswer === 'exit') {
      messages.quittingGame();

    } else if (answer === undefined) {
      messages.invalidInput();
      question.ask();
      question.checkAnswer();

    } else if (answer === question.rightAnswer) {
      score += 1;
      messages.answerIsCorrect(answer);
      newRound();

    } else {
      messages.answerIsWrong(question.rightAnswer);
      newRound();
    }
  };

  function newGame() {
    console.clear();

    score = 0;

    questions = [
      new Question(
        "What is the largest country located entirely in Europe?",
        ["Russia", "Ukraine", "Sweden", "Finland"], 1
      ),
      new Question(
        "What heavy metal element was once known as quicksilver?",
        ["Cadmium", "Iron", "Silver", "Mercury"], 3
      ),
      new Question(
        "The adult human skeleton is made of up how many bones?",
        ["206", "198", "222", "213"], 0
      ),
      new Question(
        "Traditionally, the term “caviar” refers to the salt-cured roe of which fish?",
        ["Tuna", "Sturgeon", "Bluegill", "Trout"], 1
      )
    ];

    newRound();
  };

  function newRound() {
    if (questions.length <= 0) {
      messages.noQuestionsLeft();
      messages.quittingGame();
    } else {
      question = questions.pop(Math.floor(Math.random() * questions.length));
      question.ask();
      question.checkAnswer();
    }
  };

  function hasQuestionsRemaining() {
    return questions.length > 0;
  }

  newGame();
})();
