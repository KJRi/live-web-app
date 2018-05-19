// @flow
import React from 'react'
import './Circle.css'
import UserProfile from 'components/UserProfile'
import PostPage from 'components/PostPage'
import { message } from 'antd'

const userInfo = {
  userName: 'kjr',
  location: {
    city: 'linfen',
    province: 'shanxi'
  },
  descrpition: 'sfasdgasdcasdga',
  phoneNum: '13303574348'
}

type Props = {}
type State = {
  postlist: Array<Object>
}

class Circle extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      postlist: []
    }
  }
  componentWillMount () {
    const usernname = localStorage.getItem('username')
    if (!usernname) {
      message.info('请先登录')
      window.location.href = '/login'
    }
    fetch(`/post/get?author=${usernname}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        postlist: res
      })
    })
  }

  render () {
    const { postlist } = this.state
    return (
      <div>
        <UserProfile {...{ userInfo }} />
        <PostPage {...{ postlist }} />
      </div>
    )
  }
}

export default Circle
