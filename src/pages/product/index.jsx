import React, { Component } from 'react';
import Index from './index/index';
import Detail from './detail';
import SaveUpdate from './save-update';
import { Route } from 'react-router-dom';
export default class Product extends Component {
  render() {
    return <div>
      <Route path="/product/index" component={Index}/>
      <Route path="/product/detail" component={Detail}/>
      <Route path="/product/saveupdate" component={SaveUpdate}/>
    </div>;
  }
}