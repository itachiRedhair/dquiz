const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const DQuiz = artifacts.require('./DQuiz.sol');

// Mocking data for test
const QUIZ_NAME = 'Quiz Name';
const QUIZ_DESCRIPTION = 'Quiz Description';
const ENTER_FEES = 100000000000000000;
const START_TIME = 1530419400;
const TIME_TO_ANSWER = 60;
const TIME_TO_FREEZE_ANSWER = 30;
const NUMBER_OF_QUESTION = 5;
const QUESTION_ONE = 'Question ONE?',
  ANSWER_ONE_OPTIONS = 'answer1_1,answer1_2,answer1_3,answer1_4',
  CORRECT_ANSWER_ONE = 1;
const QUESTION_TWO = 'Question TWO?',
  ANSWER_TWO_OPTIONS = 'answer2_1,answer2_2,answer2_3,answer2_4',
  CORRECT_ANSWER_TWO = 2;
const QUESTION_THREE = 'Question THREE?',
  ANSWER_THREE_OPTIONS = 'answer3_1,answer3_2,answer3_3,answer3_4',
  CORRECT_ANSWER_THREE = 3;
const QUESTION_FOUR = 'Question FOUR?',
  ANSWER_FOUR_OPTIONS = 'answer4_1,answer4_2,answer4_3,answer4_4',
  CORRECT_ANSWER_FOUR = 4;
const QUESTION_FIVE = 'Question _FIVE?',
  ANSWER_FIVE_OPTIONS = 'answer5_1,answer5_2,answer5_3,answer5_4',
  CORRECT_ANSWER_FIVE = 1;

contract('DQuiz: Participant entering   ', function(accounts) {
  const HOST_ADDRESS = accounts[0];
  const PARTICIPANT_ONE = accounts[1];
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
  });

  it('should enter the participant in a quiz after the quiz created with fees provided MORE THAN enter fees', async () => {
    await dQuizInstance.enterQuiz(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
      value: ENTER_FEES,
    });

    const returnedValue = await dQuizInstance.amIEligible.call(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
    });

    expect(returnedValue).to.equal(true);
  });

  it('should NOT enter the participant in a quiz after the quiz created with fees provided NOT MORE THAN enter fees', async () => {
    await expect(
      dQuizInstance.enterQuiz(QUIZ_NAME, {
        from: PARTICIPANT_ONE,
        value: ENTER_FEES / 2, // Trying to enter with half the fees
      }),
    ).to.be.rejected;
  });
});

contract('DQuiz: Participant participating', function(accounts) {
  const HOST_ADDRESS = accounts[0];
  const PARTICIPANT_ONE = accounts[1];
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
    await dQuizInstance.enterQuiz(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
      value: ENTER_FEES,
    });
  });

  it('should NOT let participant submit answer BEFORE host adding question', async () => {
    await expect(dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE })).to.be
      .rejected;
  });

  it('should let participant submit answer AFTER host adding question', async () => {
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_ONE, ANSWER_ONE_OPTIONS);
    await expect(dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE })).to.be
      .fulfilled;
  });

  it('should NOT let participant submit answer twice AFTER host adding question', async () => {
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_ONE, ANSWER_ONE_OPTIONS);
    await dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE });
    await expect(dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE })).to.be
      .rejected;
  });
});

contract('DQuiz: Pariticipant answering', function(accounts) {
  const HOST_ADDRESS = accounts[0];
  const PARTICIPANT_ONE = accounts[1];
  const PARTICIPANT_TWO = accounts[2];
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

  it('should make participant INELIGIBLE after validating a WRONG answer', async () => {
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_TWO });
    const returnedValue = await dQuizInstance.amIEligible(QUIZ_NAME, { from: PARTICIPANT_TWO });
    expect(returnedValue).to.equal(false);
  });

  it('should keep participant ELIGIBLE after validating a RIGHT answer', async () => {
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_ONE });
    const returnedValue = await dQuizInstance.amIEligible(QUIZ_NAME, { from: PARTICIPANT_ONE });
    expect(returnedValue).to.equal(true);
  });

  it(`should not let participant answer next question if he answered the prev one wrong and validated it`, async () => {
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_TWO });

    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_TWO, ANSWER_TWO_OPTIONS);

    await expect(dQuizInstance.submitAnswer(QUIZ_NAME, 3, { from: PARTICIPANT_TWO })).to.be
      .rejected;
  });

  it(`should NOT let participant answer next question if he hasn't validated the prev one`, async () => {
    await dQuizInstance.revealAnswer(QUIZ_NAME, 2);
    // -> pcpnt did'nt validate his/her answer

    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_TWO, ANSWER_TWO_OPTIONS);

    await expect(dQuizInstance.submitAnswer(QUIZ_NAME, 1, { from: PARTICIPANT_ONE })).to.be
      .rejected;
  });

  it(`should let participant answer next question if he answered the prev one right and validated it`, async () => {
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_ONE });

    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_TWO, ANSWER_TWO_OPTIONS);

    await expect(dQuizInstance.submitAnswer(QUIZ_NAME, 3, { from: PARTICIPANT_ONE })).to.be
      .fulfilled;
  });
});

contract('DQuiz: Pariticipant finishing the quiz', function(accounts) {
  const HOST_ADDRESS = accounts[0];
  const PARTICIPANT_ONE = accounts[1];
  const PARTICIPANT_TWO = accounts[2];
  const PARTICIPANT_THREE = accounts[3];
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
    await dQuizInstance.enterQuiz(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
      value: ENTER_FEES,
    });
    await dQuizInstance.enterQuiz(QUIZ_NAME, {
      from: PARTICIPANT_TWO,
      value: ENTER_FEES,
    });
    await dQuizInstance.enterQuiz(QUIZ_NAME, {
      from: PARTICIPANT_THREE,
      value: ENTER_FEES,
    });

    // Question 1
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_ONE, ANSWER_ONE_OPTIONS);
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE, { from: PARTICIPANT_ONE });
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE, { from: PARTICIPANT_TWO });
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE, { from: PARTICIPANT_THREE });
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_ONE });
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_TWO });
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_THREE });
    // Question 2
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_TWO, ANSWER_TWO_OPTIONS);
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_TWO, { from: PARTICIPANT_ONE });
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_TWO, { from: PARTICIPANT_TWO });
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_TWO, { from: PARTICIPANT_THREE });
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_TWO);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_ONE });
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_TWO });
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_THREE });
    // Question 3
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_THREE, ANSWER_THREE_OPTIONS);
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_THREE, { from: PARTICIPANT_ONE });
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_THREE, { from: PARTICIPANT_TWO });
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_THREE, { from: PARTICIPANT_THREE });
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_THREE);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_ONE });
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_TWO });
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_THREE });
    // Question 4  // -> This question is where Participant one gives wrong answer
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_FOUR, ANSWER_FOUR_OPTIONS);
    await dQuizInstance.submitAnswer(QUIZ_NAME, 3, { from: PARTICIPANT_ONE }); // -> Participant one giving wrong answer
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_FOUR, { from: PARTICIPANT_TWO });
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_FOUR, { from: PARTICIPANT_THREE });
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_FOUR);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_ONE });
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_TWO });
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_THREE });
  });

  it('should NOT let Participant One who gave wrong answer continue', async () => {
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_FIVE, ANSWER_FIVE_OPTIONS);
    await expect(
      dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_FIVE, { from: PARTICIPANT_ONE }),
    ).to.be.rejected;
  });

  it(`should NOT let anyone just collect ether if he/she hasn't won`, async () => {
    await expect(dQuizInstance.getMoneyIfWon(QUIZ_NAME, { from: PARTICIPANT_ONE })).to.be.rejected;
  });

  it('should let Participants who gave right answer continue', async () => {
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_FIVE, ANSWER_FIVE_OPTIONS);
    await expect(
      dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_FIVE, { from: PARTICIPANT_TWO }),
    ).to.be.fulfilled;
    await expect(
      dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_FIVE, { from: PARTICIPANT_THREE }),
    ).to.be.fulfilled;
  });

  it('should let Participants collect ether who won the quiz', async () => {
    // Question five
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_FIVE, ANSWER_FIVE_OPTIONS);
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_FIVE, { from: PARTICIPANT_TWO });
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_FIVE, { from: PARTICIPANT_THREE });
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_FIVE);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_TWO });
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_THREE });

    await expect(dQuizInstance.getMoneyIfWon(QUIZ_NAME, { from: PARTICIPANT_TWO })).to.be.fulfilled;
    await expect(dQuizInstance.getMoneyIfWon(QUIZ_NAME, { from: PARTICIPANT_THREE })).to.be
      .fulfilled;
  });

  it('should add ether in participants balance and get the total win count', async () => {
    // Question five
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_FIVE, ANSWER_FIVE_OPTIONS);
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_FIVE, { from: PARTICIPANT_TWO });
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_FIVE, { from: PARTICIPANT_THREE });
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_FIVE);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_TWO });
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, { from: PARTICIPANT_THREE });

    const prevBalance = await web3.eth.getBalance(PARTICIPANT_TWO);

    await dQuizInstance.getMoneyIfWon(QUIZ_NAME, { from: PARTICIPANT_TWO });
    await dQuizInstance.getMoneyIfWon(QUIZ_NAME, { from: PARTICIPANT_THREE });

    const afterBalance = await web3.eth.getBalance(PARTICIPANT_TWO);

    expect(afterBalance.toNumber()).to.be.above(prevBalance.toNumber());

    const returnedValue = await dQuizInstance.getQuizWinCount.call(QUIZ_NAME);
    expect(returnedValue.toNumber()).to.equal(2);
  });
});

contract('DQuiz: Pariticipant getting current question', function(accounts) {
  const HOST_ADDRESS = accounts[0];
  const PARTICIPANT_ONE = accounts[1];
  const PARTICIPANT_TWO = accounts[2];
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

    // -> Only Participant One is entering the quiz
    await dQuizInstance.enterQuiz(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
      value: ENTER_FEES,
    });

    // Question 1
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_ONE, ANSWER_ONE_OPTIONS);
  });

  it(`should let ENTERED participant get first question and it's options`, async () => {
    const returnedValue = await dQuizInstance.getCurrentQuestion.call(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
    });
    expect(returnedValue[0]).to.equal(QUESTION_ONE);
    expect(returnedValue[1]).to.equal(ANSWER_ONE_OPTIONS);
  });

  it(`should NOT let NOT ENTERED participant get first question and it's options`, async () => {
    expect(
      dQuizInstance.getCurrentQuestion.call(QUIZ_NAME, {
        from: PARTICIPANT_TWO,
      }),
    ).to.be.rejected;
  });

  it(`should let ENTERED participant get current question and it's options if he/she has validated the prev with right answer`, async () => {
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE, { from: PARTICIPANT_ONE });
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
    });
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_TWO, ANSWER_TWO_OPTIONS);

    const returnedValue = await dQuizInstance.getCurrentQuestion.call(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
    });
    expect(returnedValue[0]).to.equal(QUESTION_TWO);
    expect(returnedValue[1]).to.equal(ANSWER_TWO_OPTIONS);
  });

  it(`should NOT let ENTERED participant get current question and it's options if he/she has validated the prev with wrong answer`, async () => {
    await dQuizInstance.submitAnswer(QUIZ_NAME, 2, { from: PARTICIPANT_ONE }); // -> Participant One answered with the wrong answer
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE);
    await dQuizInstance.validateRecentAnswer(QUIZ_NAME, {
      from: PARTICIPANT_ONE,
    });
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_TWO, ANSWER_TWO_OPTIONS);

    await expect(
      dQuizInstance.getCurrentQuestion.call(QUIZ_NAME, {
        from: PARTICIPANT_ONE,
      }),
    ).to.be.rejected;
  });

  it(`should NOT let ENTERED participant get current question and it's options if he/she has NOT validated the prev`, async () => {
    await dQuizInstance.submitAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE, { from: PARTICIPANT_ONE }); // -> Participant One answered with the right answer
    await dQuizInstance.revealAnswer(QUIZ_NAME, CORRECT_ANSWER_ONE);
    // -> But he/she didn't validated it
    await dQuizInstance.addQuestion(QUIZ_NAME, QUESTION_TWO, ANSWER_TWO_OPTIONS);

    await expect(
      dQuizInstance.getCurrentQuestion.call(QUIZ_NAME, {
        from: PARTICIPANT_ONE,
      }),
    ).to.be.rejected;
  });
});
