// @flow
import React, { Component } from 'react'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import MainLayout from 'layouts/MainLayout'
import { Provider } from 'react-redux'

type Props = {
  store: Object
}

const supportsHistory = 'pushState' in window.history

export class AppContainer extends Component {
  props: Props

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { store } = this.props

    return (
      <Provider store={store}>
        <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
          <div style={{ height: '100%' }}>
            <MainLayout />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default AppContainer
