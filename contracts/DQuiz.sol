pragma solidity ^0.4.24;


contract DQuiz {

  struct Question {
    string questionString;
    string options;
  }

  struct QuestionAnswer {
    Question question;
    uint8 answerKey;
    bool isQuestionOut;
  }

  struct Participant {
    bool isEntered;
    mapping(uint8 => uint8) answerList; // key is questionIndex and value is answerKey
    bool isEligible;
  }

  struct QuizData {
    string name;
    string description;
    uint startTime;
    uint timeToAnswer;
    uint timeToFreezeAnswer;
    uint enterFees;
    address host;
    uint8 totalQuestions;
    uint8 currentQuestionIndex;
    QuestionAnswer[] questionAnswerList;
    mapping(address => Participant) participantList;
    uint totalParticipants;
    uint totalReward;
  }

  mapping(bytes32 => QuizData) public quizList;

  bytes32 public lastByte32;

  constructor () public {

  }

  function createQuiz(string name, 
    string description, 
    uint enterFees, 
    uint startTime, 
    uint timeToAnswer, 
    uint timeToFreezeAnswer, 
    uint8 totalQuestions
    ) public {
      bytes32 key = keccak256(abi.encodePacked(name));
      lastByte32 = key;
      quizList[key].name = name;
      quizList[key].description = description;
      quizList[key].enterFees = enterFees;
      quizList[key].startTime = startTime;
      quizList[key].timeToAnswer = timeToAnswer;

      quizList[key].timeToFreezeAnswer = timeToFreezeAnswer;
      quizList[key].totalQuestions = totalQuestions;
      quizList[key].host = msg.sender;
  }

// Host related functions

  function addQuestion(string quizName, 
  string questionString, 
  string options) public {
    bytes32 key = stringToByte32(quizName);
    require(quizList[key].currentQuestionIndex < quizList[key].totalQuestions);
    require(msg.sender == quizList[key].host);

    quizList[key].currentQuestionIndex++;

    Question memory newQuestion = Question({
      questionString: questionString,
      options: options
    });

    QuestionAnswer memory newQuestionAnswer = QuestionAnswer({
      question: newQuestion,
      answerKey: 0,
      isQuestionOut: true
    });

    quizList[key].questionAnswerList.push(newQuestionAnswer);
  }

  function revealAnswer(string quizName, uint8 answerKey) public {
    require(answerKey != 0);
    bytes32 key = stringToByte32(quizName);
    require(quizList[key].host == msg.sender);

    uint8 currentQuestionIndex = quizList[key].currentQuestionIndex;
    
    require(quizList[key].questionAnswerList[currentQuestionIndex - 1].answerKey == 0);

    quizList[key].questionAnswerList[currentQuestionIndex - 1].answerKey = answerKey;
  }

// Pariticipant related functions

  function enterQuiz(string quizName) public payable {

    bytes32 key = stringToByte32(quizName);
    require(stringToByte32(quizList[key].name) == key);
    require(msg.value >= quizList[key].enterFees);

    quizList[key].participantList[msg.sender].isEntered = true;
    quizList[key].participantList[msg.sender].isEligible = true;
    quizList[key].totalReward += msg.value;
    quizList[key].totalParticipants++;
  }

  function submitAnswer(string quizName, uint8 answerKey) public {
    require(answerKey != 0);

    bytes32 key = stringToByte32(quizName);
    require(quizList[key].participantList[msg.sender].isEntered);
    uint8 currentQuestionIndex = quizList[key].currentQuestionIndex;
    
    if(currentQuestionIndex != 1){
      require(quizList[key].participantList[msg.sender].answerList[currentQuestionIndex - 2] != 0); // This is to check if pcpnt answered prvious question
    }
    
    require(quizList[key].participantList[msg.sender].isEligible);

    require(quizList[key].questionAnswerList[currentQuestionIndex - 1].isQuestionOut); // So that pcpnt can answer only if question is out
    require(quizList[key].participantList[msg.sender].answerList[currentQuestionIndex - 1] == 0); // So that pcpnt won't answer it twice

    quizList[key].participantList[msg.sender].answerList[currentQuestionIndex - 1] = answerKey;
  }

  function validateRecentAnswer(string quizName) public {
    bytes32 key = stringToByte32(quizName);
    require(quizList[key].participantList[msg.sender].isEntered);
    require(quizList[key].participantList[msg.sender].isEligible);

    uint8 currentQuestionIndex = quizList[key].currentQuestionIndex;

    uint8 myAnswer = quizList[key].participantList[msg.sender].answerList[currentQuestionIndex -1 ];
    uint8 correctAnswer = quizList[key].questionAnswerList[currentQuestionIndex - 1].answerKey;

    if(myAnswer == correctAnswer) {
      quizList[key].participantList[msg.sender].isEligible = true;
    } else {
      quizList[key].participantList[msg.sender].isEligible = false;        
    }
  }

  function getQuizNameByte32(string quizName) public view returns (string,
    string,
    address ) {

    bytes32 key = keccak256(abi.encodePacked(quizName));
    return(quizList[key].name, quizList[key].description, quizList[key].host);
  }

  function amIEligible(string quizName) public view returns(bool) {
    bytes32 key = stringToByte32(quizName);
    require(quizList[key].participantList[msg.sender].isEntered);

    return quizList[key].participantList[msg.sender].isEligible;
  }

  function stringToByte32(string s) internal pure returns(bytes32){

    bytes32 converted = keccak256(abi.encodePacked(s));
    return converted;
  }

}