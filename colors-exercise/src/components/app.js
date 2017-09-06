import React, { Component } from 'react';
import Colors from './colors';

export default class App extends Component {

  render() {
  	return (
      <div>
        <div>
          <svg width="600" height="200">
            <Colors width="200" />
          </svg>
        </div>
        <div>
          <svg width="600" height="200">
            <Colors width="200" reverse/>
          </svg>
        </div>
      </div>
    )
  }
}
