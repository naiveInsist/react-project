import React, { Component } from 'react';
import './index.less';
export default class MyButton extends Component {
  render() {
    return <button className="my-button" {...this.props}>
    </button>
  }
}