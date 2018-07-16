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
    bool isWon;
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
    uint totalWinCount;
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

    if(quizList[key].currentQuestionIndex != 0){
      uint8 correctAnswer = quizList[key].questionAnswerList[
        quizList[key].currentQuestionIndex - 1 ]
        .answerKey;
      require(correctAnswer != 0); // -> This is to check if host had added the answer for prev question, then only let him proceed
    }
   
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
    require(answerKey >= 1 && answerKey <=4 ); // answerKey should be only between 1 and 4.
    bytes32 key = stringToByte32(quizName);
    require(quizList[key].host == msg.sender);

    uint8 currentQuestionIndex = quizList[key].currentQuestionIndex;

    require(quizList[key].questionAnswerList[currentQuestionIndex - 1].answerKey == 0); // -> This is to see if host don't reveal answer twice 

    quizList[key].questionAnswerList[currentQuestionIndex - 1].answerKey = answerKey;
  }

// Participant related functions

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
    require(answerKey >= 1 && answerKey <=4 ); // answerKey should be only between 1 and 4.

    bytes32 key = stringToByte32(quizName);
    require(quizList[key].participantList[msg.sender].isEntered);
    uint8 currentQuestionIndex = quizList[key].currentQuestionIndex;
    
    if(currentQuestionIndex != 1){
      require(quizList[key].participantList[msg.sender].answerList[currentQuestionIndex - 2] == 9); // This is to check if pcpnt validated prev answer
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

    uint8 myAnswer = quizList[key].participantList[msg.sender].answerList[currentQuestionIndex - 1];
    uint8 correctAnswer = quizList[key].questionAnswerList[currentQuestionIndex - 1].answerKey;

    require(correctAnswer != 0); // This means either host has not revealed the answer or he is just goofing around

    if(myAnswer == correctAnswer) {
      quizList[key].participantList[msg.sender].isEligible = true;
      quizList[key].participantList[msg.sender].answerList[currentQuestionIndex - 1] = 9; // 9 is for validated answer
      if(currentQuestionIndex == quizList[key].totalQuestions){
        quizList[key].participantList[msg.sender].isWon = true;
        quizList[key].totalWinCount++;
      }
    } else {
      quizList[key].participantList[msg.sender].isEligible = false;        
    }
  }

  function getMoneyIfWon(string quizName) public returns(uint256){
    bytes32 key = stringToByte32(quizName);
    require(quizList[key].participantList[msg.sender].isWon);
    uint myReward = quizList[key].totalReward / quizList[key].totalWinCount;
    msg.sender.transfer(myReward);
    return myReward;
    // delete quizList[key].participantList[msg.sender];
  }

  function amIEligible(string quizName) public view returns(bool) {
    bytes32 key = stringToByte32(quizName);
    require(quizList[key].participantList[msg.sender].isEntered);

    return quizList[key].participantList[msg.sender].isEligible;
  }

// General Methods can be called by anyone irrespective of host or participants or anyone
  function getQuizBasicInfo(string quizName) public view returns ( string,
    string,
    uint,
    uint,
    uint,
    uint,
    address,
    uint8 ) {

      bytes32 key = stringToByte32(quizName);
      QuizData memory quiz = quizList[key];

      return(quiz.name,
      quiz.description,
      quiz.startTime,
      quiz.timeToAnswer,
      quiz.timeToFreezeAnswer,
      quiz.enterFees,
      quiz.host,
      quiz.totalQuestions);
  }

  function getQuizDynamicInfo(string quizName) public view returns ( uint,
  uint ) {

    bytes32 key = stringToByte32(quizName);
    QuizData memory quiz = quizList[key];

    return(quiz.totalParticipants,
    quiz.totalReward);
  }

  function getQuizWinCount(string quizName) public view returns (uint) {
    bytes32 key = stringToByte32(quizName);
    return(quizList[key].totalWinCount);
  }

  function getCurrentQuestion(string quizName) public view returns(string,
  string,
  uint8 ) {
    bytes32 key = stringToByte32(quizName);
    require(quizList[key].participantList[msg.sender].isEntered);
    require(quizList[key].participantList[msg.sender].isEligible);
    
    uint8 currentQuestionIndex = quizList[key].currentQuestionIndex;

    if(currentQuestionIndex != 1) {
      require(quizList[key].participantList[msg.sender].answerList[currentQuestionIndex - 2] == 9); // This is to check if pcpnt validated prev answer
    }
    
    return(
      quizList[key].questionAnswerList[currentQuestionIndex - 1].question.questionString,
      quizList[key].questionAnswerList[currentQuestionIndex - 1].question.options,
      currentQuestionIndex
    );
  }  

// Utility Methods (Mostly for internal purpose)
  function stringToByte32(string s) internal pure returns(bytes32){

    bytes32 converted = keccak256(abi.encodePacked(s));
    return converted;
  }

}