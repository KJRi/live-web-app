// @flow
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import routes from '../../routes'
import { bindActionCreators } from 'redux'
// normalize with antd and add icons & animations
import 'antd/lib/style/css'
import { connect } from 'react-redux'
import '../../styles/core.css'
import styles from './LoginLayout.css'
import { actions } from '../../reducers'

class LoginLayout extends Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixiin.shouldComponentUpdate.bind(this)
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
LoginLayout.defaultProps = {
  userInfo:{}
}

function mapStateToProps (state) {
  return {
    // userInfo:state.globalState.userInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login:bindActionCreators(actions.get_login, dispatch),
    register:bindActionCreators(actions.get_register, dispatch)
  }
}

export default connect(
     mapStateToProps,
     mapDispatchToProps
 )(LoginLayout)
