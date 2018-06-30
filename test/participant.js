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
  CORRECT_ANSWER_ONE = 0;
const QUESTION_TWO = 'Question TWO?',
  ANSWER_TWO_OPTIONS = 'answer2_1,answer2_2,answer2_3,answer2_4',
  CORRECT_ANSWER_TWO = 0;
const QUESTION_THREE = 'Question THREE?',
  ANSWER_THREE_OPTIONS = 'answer3_1,answer3_2,answer3_3,answer3_4',
  CORRECT_ANSWER_THREE = 0;
const QUESTION_FOUR = 'Question FOUR?',
  ANSWER_FOUR_OPTIONS = 'answer4_1,answer4_2,answer4_3,answer4_4',
  CORRECT_ANSWER_FOUR = 0;
const QUESTION_FIVE = 'Question _FIVE?',
  ANSWER_FIVE_OPTIONS = 'answer5_1,answer5_2,answer5_3,answer5_4',
  CORRECT_ANSWER_FIVE = 0;

contract('DQuiz: Participant entering   ', function(accounts) {
  const HOST_ADDRESS = accounts[0];
  const PARTICIPANT_ONE = accounts[1];
  let dQuizInstance;

  beforeEach(async () => {
    dQuizInstance = await DQuiz.deployed();

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
  });

  it('should enter the participant in a quiz after the quiz created with fees provided MORE THAN enter fees', async () => {
    await dQuizInstance.enterQuiz(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
      value: ENTER_FEES,
    });

    const returnedValue = await dQuizInstance.amIEligible.call(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
    });

    assert.equal(returnedValue, true);
  });

  it('should NOT enter the participant in a quiz after the quiz created with fees provided NOT MORE THAN enter fees', async () => {
    try {
      await dQuizInstance.enterQuiz(QUIZ_NAME, {
        from: PARTICIPANT_ONE,
        value: ENTER_FEES - 2,
      });
    } catch (err) {
      assert.ok(err);
    }
  });
});

contract('DQuiz: Participant participating', function(accounts) {
  const HOST_ADDRESS = accounts[0];
  const PARTICIPANT_ONE = accounts[1];
  let dQuizInstance;

  beforeEach(async () => {
    dQuizInstance = await DQuiz.deployed();

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
    await dQuizInstance.enterQuiz(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
      value: ENTER_FEES,
    });
  });

  it('should NOT let participant submit answer BEFORE host adding question', async () => {
    try {
      await dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE });
    } catch (err) {
      assert.ok(err);
    }
  });

  it('should let participant submit answer AFTER host adding question', async () => {
    console.log(dQuizInstance.address);
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_ONE, ANSWER_ONE_OPTIONS);
    await dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE });
    assert.ok(true);
  });

  it('should NOT let participant submit answer twice AFTER host adding question', async () => {
    console.log(dQuizInstance.address);
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_ONE, ANSWER_ONE_OPTIONS);
    await dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE });
    try {
      await dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE });
    } catch (err) {
      assert.ok(err);
    }
  });
});

contract('DQuiz: Pariticipant answering', function(accounts) {
  const HOST_ADDRESS = accounts[0];
  const PARTICIPANT_ONE = accounts[1];
  const PARTICIPANT_TWO = accounts[2];
  let dQuizInstance;

  beforeEach(async () => {
    dQuizInstance = await DQuiz.deployed();

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
    await dQuizInstance.enterQuiz(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
      value: ENTER_FEES,
    });
    await dQuizInstance.enterQuiz(QUIZ_NAME, {
      from: PARTICIPANT_TWO,
      value: ENTER_FEES,
    });

    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_ONE, ANSWER_ONE_OPTIONS);

    await dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE });
    await dQuizInstance.submitAnswer(QUIZ_NAME, 2, { from: PARTICIPANT_TWO });
  });

  it('should NOT reveal answer only if answerKey provided by host is 0', async () => {
    try {
      await dQuizInstance.revealAnswer(QUIZ_NAME, 0);
    } catch (err) {
      assert.ok(err);
    }
  });

  it('should reveal answer only if answerKey provided by host is OTHER THAN 0', async () => {
    await dQuizInstance.revealAnswer(QUIZ_NAME, 2);
    assert.ok(true);
  });

  it('should make participant INELIGIBLE after validating a WRONG answer', async () => {
    await dQuizInstance.revealAnswer(QUIZ_NAME, 2);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_ONE });
    const returnedValue = await dQuizInstance.amIEligible(QUIZ_NAME, { from: PARTICIPANT_ONE });
    assert.equal(returnedValue, false);
  });

  it('should keep participant ELIGIBLE after validating a RIGHT answer', async () => {
    await dQuizInstance.revealAnswer(QUIZ_NAME, 2);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_TWO });
    const returnedValue = await dQuizInstance.amIEligible(QUIZ_NAME, { from: PARTICIPANT_TWO });
    assert.equal(returnedValue, true);
  });

  it('should NOT let participant answer question after second question is out', async () => {
    await dQuizInstance.revealAnswer(QUIZ_NAME, 2);
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_TWO, ANSWER_TWO_OPTIONS);

    try {
      await dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE });
    } catch (err) {
      assert.ok(err);
    }
  });
});

// TODO: Last test is failing, see to that, might need to change hook, understand how it works before.
