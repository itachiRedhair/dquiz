import React from 'react';
import { Route } from 'react-router-dom';

// Custom Components
import HostHome from './scenes/HostHome';
import StartQuiz from './scenes/StartQuiz';

const Host = () => (
  <React.Fragment>
    <Route exact path="/host" component={HostHome} />
    <Route path="/host/start/:quizName" component={StartQuiz} />
  </React.Fragment>
);

export default Host;
