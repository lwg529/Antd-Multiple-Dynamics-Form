import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
// import ComponentLoading from '@component/ComponentLoading';
import {
  Route,
  Switch
} from 'react-router-dom';
import { Layout } from 'antd';
import Demo from '@page/Demo';
import DynamicsForm from '@page/DynamicsForm';
import MutipleDynamicsForm from '@page/MutipleDynamicsForm';
import './style.less';

const { Header, Content } = Layout;

@inject(() => ({
  // menu,
  // fetchMenuData,
}))
@observer
class PageLayout extends Component {
  render () {
    return (
      <Layout className='layout-container'>
        <Header className='layout__header'>
          React Start
        </Header>
        <Content className='layout_content'>
          <Switch>
            <Route
              key='home'
              path='/'
              component={() => <Demo />}
              exact
            />
            <Route
              key='demo'
              path='/demo'
              component={() => <Demo />}
              exact
            />
            <Route
              key='dynamicsForm'
              path='/dynamics/form'
              component={() => <DynamicsForm />}
              exact
            />
            <Route
              key='mutipleForm'
              path='/mutiple/form'
              component={() => <MutipleDynamicsForm />}
              exact
            />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default PageLayout;
