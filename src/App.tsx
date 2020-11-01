import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Home from './Home'
import {Favorites} from './Favorites'
import {Layout, Menu, Space} from 'antd'
const {Header, Content} = Layout

export default function App() {
  return (
    <Router>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/favorites">Favorites</Link>
          </Menu.Item>
        </Menu>
        <div className="logo" />
      </Header>
      <Space size="large" direction="vertical" />
      <Content style={{padding: '0 50px'}}>
        <div className="site-layout-content">
          <Switch>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Content>
    </Router>
  )
}
