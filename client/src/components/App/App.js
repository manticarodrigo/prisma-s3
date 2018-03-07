import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import UploadFile from './UploadFile'

import { Layout } from 'antd';
const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Content className='main-content'>
          <UploadFile />
        </Content>
      </Layout>
    )
  }
}

export default App