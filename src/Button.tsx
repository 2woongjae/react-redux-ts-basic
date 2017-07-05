import * as React from 'react';
import {Unsubscribe} from 'redux';
import {addAge} from './index';
import * as PropTypes from 'prop-types';

class Button extends React.Component<{}, {}> {
  // Button.contextTypes 에 스토어를 받아오도록 정의해야 합니다.
  public static contextTypes = {
    store: PropTypes.object
  };

  private _unsubscribe: Unsubscribe;
  constructor(props: {}) {
    super(props);

    this._addAge = this._addAge.bind(this);
  }
  componentDidMount() {
    const store = this.context.store;
    this._unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    if (this._unsubscribe !== null) {
      this._unsubscribe();
    }
  }
  render() {
    return <button onClick={this._addAge}>하위 컴포넌트에서 한해가 지났다.</button>;
  }
  private _addAge(): void {
    const store = this.context.store;
    const action = addAge();
    store.dispatch(action);
  }
}

export default Button;
