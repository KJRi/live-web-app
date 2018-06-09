// @flow
import React from 'react'
import styles from './UserProfile.css'
import { Avatar, Icon, Button, message } from 'antd'

type Props = {
  userinfo: Object,
  name: String
}
type State = {
  followState: Boolean,
  showButton: Boolean
}

class UserProfile extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      followState: false,
      showButton: true
    }
  }
  componentWillMount () {
    const { name } = this.props
    const username = localStorage.getItem('username')
    fetch(`/follow/getBy?follow=${name}&&username=${username}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      if (res.length === 1) {
        this.setState({
          followState: true
        })
      }
    })
  }
  followIt = () => {
    const { username } = this.props.userinfo
    const name = localStorage.getItem('username')
    const { followState } = this.state
    if (followState) {
      // 取消关注
      fetch('/follow/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: name,
          follow: username
        })
      }).then(res => res.json())
        .then(res => {
          // 后端正确
          if (res.success) {
            message.destroy()
            message.success(res.message)
          } else {
            message.destroy()
            message.info(res.message)
          }
        })
        .catch(e => console.log('Oops, error', e))
      this.setState({
        followState: false
      })
    } else {
      fetch('/follow/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: name,
          follow: username
        })
      }).then(res => res.json())
        .then(res => {
          // 后端正确
          if (res.success) {
            message.destroy()
            message.success(res.message)
          } else {
            message.destroy()
            message.info(res.message)
          }
        })
        .catch(e => console.log('Oops, error', e))
      this.setState({
        followState: true
      })
    }
  }
  render () {
    const { userinfo } = this.props
    const name = localStorage.getItem('username')
    return (
      <div className={styles['main-cont']}>
        {
          userinfo.headerImg
          ? <Avatar src={userinfo.headerImg} />
          : <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
        }
        <h2>{userinfo.username}</h2>
        {
          (name === userinfo.username)
          ? ''
          : <Button onClick={this.followIt}>
            {
                this.state.followState
                ? '取消关注'
                : '+关注'
              }</Button>
        }
        {
          userinfo.description
          ? <p>{userinfo.description}</p>
          : ''
        }
        {
          userinfo.birthday
          ? <p><Icon type='heart-o' style={{ color: 'red' }} />{userinfo.birthday}</p>
          : ''
        }
        {
          userinfo.location
          ? <p><Icon type='environment' />{userinfo.location[0]}/{userinfo.location[1]}/{userinfo.location[2]}</p>
          : ''
        }
      </div>
    )
  }
}

export default UserProfile
