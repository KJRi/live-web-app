// @flow
import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import routes from '../../routes'
// normalize with antd and add icons & animations
import 'antd/lib/style/css'
import '../../styles/core.css'
import styles from './LoginLayout.css'

export const CoreLayout = () => (
  <div className={styles['core-layout']}>
    <div className={styles['viewport']}>
      <Switch>
        <Route path='/Register' component={routes.register} exact />
        <Route path='/Login' component={routes.login} exact />
      </Switch>
    </div>
  </div>
)

export default CoreLayout
