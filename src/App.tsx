import * as React from 'react';
import './App.css';

import {addAge} from './index';
import * as ReactRedux from 'react-redux';

import Button from './Button';

const logo = require('./logo.svg');

// mapStateToProps 와 mapDispatchToProps 의 리턴을 합치면 나오는 형태로 지정
interface AppProps {
  age: number;
  onAddClick(): void;
}

/*
class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          나이가 {this.props.age}
          <button onClick={this.props.onAddClick}>한해가 지났다.</button>
          <Button />
        </p>
      </div>
    );
  }
}
*/

const App: React.SFC<AppProps> = (props) => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        나이가 {props.age}
        <button onClick={props.onAddClick}>한해가 지났다.</button>
        <Button />
      </p>
    </div>
  );
};

const { connect } = ReactRedux;

// 이 함수는 store.getState() 한 state 를
// 연결한(connect) App 컴포넌트의 어떤 props 로 줄 것인지를 리턴
// 그래서 이 함수의 리턴이 곧 App 컴포넌트의 AppProps 의 부분집합이어야 한다.
const mapStateToProps = (state: { age: number; }) => {
  return {
    age: state.age,
  };
};

// 이 함수는 store.dispatch(액션)을
// 연결한(connect) App 컴포넌트의 어떤 props 로 줄 것인지를 리턴
// 그래서 이 함수의 리턴이 곧 App 컴포넌트의 AppProps 의 부분집합이어야 한다.
const mapDispatchToProps = (dispatch: Function) => {
  return {
    onAddClick: () => {
      dispatch(addAge());
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
// 1. mapStateToProps - 어떤 state 를 어떤 props 에 연결할 것인지에 대한 정의
// 2. mapDispatchToProps - 어떤 dispatch(action) 을 어떤 props 에 연결할 것인지에 대한 정의
// 3. App - 그 props 를 보낼 컴포넌트를 정의

export default AppContainer;
