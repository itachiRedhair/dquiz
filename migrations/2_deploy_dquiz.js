const DQuiz = artifacts.require("./DQuiz.sol");

module.exports = function(deployer) {
  deployer.deploy(DQuiz);
};
