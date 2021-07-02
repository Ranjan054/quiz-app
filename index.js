var quizWrapper = $("#quiz-wrapper");
var scoreUpdate = $("#score-change");

$("#form-quiz").submit(function (e) {
  e.preventDefault();

  var radioCheckedValue = $("input[type=radio]:checked");
  var userResult = {};

  if (radioCheckedValue.length === 0 || radioCheckedValue.length < 5) {
    alert("Please mark all the answer")
    return;
  }

  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (data) {
    var radioButtons = $("input");

    for (i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        userResult[radioButtons[i].name] = radioButtons[i].value;
      }
    }

    var totalScore = 0;
    for (j = 0; j < data.length; j++) {
      var key = "q" + data[j].id; //q1
      var ansSelected = "#" + (key + "-" + userResult[key]) + "+ label"; 
      //#q1-3

      if (userResult[key] == data[j].answer) {
        totalScore++;
        var correctIcon = $("<i>").addClass("fas fa-check icon-right");
        $(ansSelected).append(correctIcon);
      } else {
        var correctAnsSelector = "#" + (key + "-" + data[j].answer + "+ label");

        var correctIcon = $("<i>").addClass("fas fa-check icon-right");
        $(correctAnsSelector).append(correctIcon);

        var wrongIcon = $("<i>").addClass("fas fa-times icon-wrong");
        $(ansSelected).append(wrongIcon);
      }
    }

    scoreUpdate.text(totalScore);
  });

  $("input").attr("disabled", true);
  radioCheckedValue.attr({
    disabled: false,
    checked: true,
  });

  $("#form-submit-btn").addClass("form-btn-disable");
 console.log( $("#form-submit-btn").addClass());
  window.scrollTo(0, 0)
});


function createQuizQuestions(data, i) {
  var mainDiv = $("<div>").addClass("ques-ans-wrapper");
  var question = $("<h3>").addClass("question").text(data[i].question);
  var answerWrapper = $("<div>").addClass("answer-wrapper");
  var hrLine = $("<hr>");

  for (j = 0; j < 4; j++) {
    var ansOptions = $("<div>").addClass("answer-option");
    var radioSelect = $("<input>").attr({
      type: "radio",
      name: "q" + data[i].id,
      id: "q" + data[i].id + "-" + (j + 1),
      value: j + 1,
    });
    var label = $("<label>")
      .attr("for", "q" + data[i].id + "-" + (j + 1))
      .addClass("answers");
    label.text(data[i].options[j]);

    ansOptions.append(radioSelect, label);
    answerWrapper.append(ansOptions);
  }

  mainDiv.append(question, answerWrapper);
  quizWrapper.append(mainDiv, hrLine);
}



$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (data) {
  for (i = 0; i < data.length; i++) {
    createQuizQuestions(data, i); 
  }

 var submitBtn = $("<input>").attr({
    type: "submit",
    value: "Submit",
    id: "form-submit-btn"
  })
  $("#form-quiz").append(submitBtn);
});

