const { MONGODB } = require("../config.js");
var axios = require("axios");
const MongoClient = require("mongodb").MongoClient;

const m = new Map();

async function getQuestions() {
  var config = {
    method: "get",
    url: "https://api.typeform.com/forms/VQ7Q7JiW",
    headers: {
      // add token
      Authorization: "Bearer ADD TOKEN",
      Cookie: "device_view=full",
    },
  };

  axios(config)
    .then(async function (response) {
      const fields = response.data.fields;
      var ref, title;
      for (var i = 0; i < fields.length; i++) {
        ref = fields[i].ref;
        title = fields[i].title;
        m.set(ref, title);
      }

      getAnswers();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getAnswers() {
  var config = {
    method: "get",
    url: "https://api.typeform.com/forms/VQ7Q7JiW/responses",
    headers: {
      Authorization:
        // add token
        "Bearer ADD TOKEN",
      Cookie: "device_view=full",
    },
  };

  axios(config)
    .then(function (response) {
      var items = response.data.items;
      var allAns = [];
      for (var i = 0; i < items.length; i++) {
        var indivAns = {};
        for (var j = 0; j < items[i].answers.length; j++) {
          var ansObj = items[i].answers[j];
          var typeOfAnswer = ansObj.type;
          var ans;
          if (
            typeOfAnswer == "choice" ||
            typeOfAnswer == "choices" ||
            typeOfAnswer == "multiple_choice"
          ) {
            var choice = ansObj[typeOfAnswer];
            if (choice.label) {
              ans = choice.label;
            } else {
              ans = choice.labels;
            }
          } else {
            ans = ansObj[typeOfAnswer];
          }
          var ref = ansObj.field.ref;

          indivAns[ref] = ans;
        }
        allAns.push(indivAns);
      }
      setResponses(allAns, m);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function setResponses(answers, m) {
  MongoClient.connect(MONGODB, function (err, client) {
    const db = client.db("wfn-applicant");
    for (var i = 0; i < answers.length; i++) {
      var item = {};
      var responsesArr = [];
      var refsArr = Object.keys(answers[i]);
      for (var j = 0; j < refsArr.length; j++) {
        var question = m.get(refsArr[j]);
        var answer = answers[i][refsArr[j]];

        if (question == "First Name") {
          item.fName = answer;
        } else if (question == "Last Name") {
          item.lName = answer;
        } else if (question == "Enter your UWO Email Address.") {
          item.email = answer;
        } else {
          if (typeof answer != "string" && answer) {
            answer = answer.toString();
          }
          responsesArr.push({ question: question, answer: answer });
        }
      }

      item.applicationStatus = "review";
      item.responses = responsesArr;

      console.log(item);
      db.collection("applicants")
        .insert(item)
        .then(function (result) {
          console.log(result);
        });
    }
  }).then(() => {
    client.close();
  });
}

getQuestions();
