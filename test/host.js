const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

var DQuiz = artifacts.require('./DQuiz.sol');

// Mocking data for test
const QUIZ_NAME = 'Quiz Name';
const QUIZ_DESCRIPTION = 'Quiz Description';
const ENTER_FEES = 20;
const START_TIME = 1530419400;
const TIME_TO_ANSWER = 60;
const TIME_TO_FREEZE_ANSWER = 30;
const NUMBER_OF_QUESTION = 5;
const QUESTION_ONE = 'Question ONE?',
  ANSWER_ONE_OPTIONS = 'answer1_1,answer1_2,answer1_3,answer1_4',
  CORRECT_ANSWER_ONE = 1;

contract('DQuiz', function(accounts) {
  const HOST_ADDRESS = accounts[0];

  it('should create a quiz with the host account', async () => {
    const dQuizInstance = await DQuiz.new();

    await dQuizInstance.createQuiz(
      QUIZ_NAME,
      QUIZ_DESCRIPTION,
      ENTER_FEES,
      START_TIME, // time for Sunday, July 1, 2018 10:00:00 AM GMT+05:30
      TIME_TO_ANSWER,
      TIME_TO_FREEZE_ANSWER,
      NUMBER_OF_QUESTION,
      { from: HOST_ADDRESS },
    );

    const returnedValue = await dQuizInstance.getQuizBasicInfo.call(QUIZ_NAME, {
      from: HOST_ADDRESS,
    });
    expect(returnedValue[0]).to.equal(QUIZ_NAME);
  });
});

contract('DQuiz: Host revealing answer', function(accounts) {
  const HOST_ADDRESS = accounts[0];
  let dQuizInstance;

  beforeEach(async () => {
    dQuizInstance = await DQuiz.new();

    await dQuizInstance.createQuiz(
      QUIZ_NAME,
      QUIZ_DESCRIPTION,
      ENTER_FEES,
      START_TIME, // time for Sunday, July 1, 2018 10:00:00 AM GMT+05:30
      TIME_TO_ANSWER,
      TIME_TO_FREEZE_ANSWER,
      NUMBER_OF_QUESTION,
      { from: HOST_ADDRESS },
    );

    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_ONE, ANSWER_ONE_OPTIONS);
  });

  it('should NOT call reveal answer if answerKey provided by host is 0', async () => {
    await expect(dQuizInstance.revealAnswer(QUIZ_NAME, 0)).to.be.rejected;
  });

  it('should reveal answer only if answerKey provided by host is OTHER THAN 0', async () => {
    await expect(dQuizInstance.revealAnswer(QUIZ_NAME, 2)).to.be.fulfilled;
  });
});
