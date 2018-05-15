// @flow
import React, { Component } from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import routes from '../../routes'
import { bindActionCreators } from 'redux'
// normalize with antd and add icons & animations
import 'antd/lib/style/css'
import { connect } from 'react-redux'
import '../../styles/core.css'
import styles from './LoginLayout.css'

class LoginLayout extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={styles['core-layout']}>
        <div className={styles['viewport']}>
          <Switch>
            <Route path='/Register' component={routes.register} exact />
            <Route path='/Login' component={routes.login} exact />
          </Switch>
        </div>
      </div>
    )
  }
}

export default (LoginLayout)
