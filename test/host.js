var DQuiz = artifacts.require('./DQuiz.sol');

// Mocking data for test
const QUIZ_NAME = 'Quiz Name';
const QUIZ_DESCRIPTION = 'Quiz Description';
const ENTER_FEES = 20;
const START_TIME = 1530419400;
const TIME_TO_ANSWER = 60;
const TIME_TO_FREEZE_ANSWER = 30;
const NUMBER_OF_QUESTION = 5;

contract('DQuiz', function(accounts) {
  const HOST_ADDRESS = accounts[0];
  const participantOne = accounts[1];
  const participantTwo = accounts[2];

  it('should create a quiz with the host account', async () => {
    const dQuizInstance = await DQuiz.deployed();

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

    const returnedValue = await dQuizInstance.getQuizNameByte32.call(QUIZ_NAME, {
      from: HOST_ADDRESS,
    });
    assert.equal(returnedValue[0], QUIZ_NAME);
  });
});
