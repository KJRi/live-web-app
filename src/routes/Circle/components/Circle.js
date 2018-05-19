// @flow
import React from 'react'
import './Circle.css'
import PostPage from 'components/PostPage'
import UserProfile from 'components/UserProfile'
import { message } from 'antd'
const arr = [
  {
    title: '1',
    description: 'fsadfgadfg',
    adNum: '100',
    comNum: '20'
  },
  {
    title: '3',
    description: 'fsadfgadfg',
    adNum: '300',
    comNum: '20'
  },
  {
    title: '5',
    description: 'fsadfgadfg',
    adNum: '500',
    comNum: '20'
  }
]
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
type State = {}

class Circle extends React.PureComponent<Props, State> {
  componentWillMount () {
    const usernname = localStorage.getItem('username')
    if (!usernname) {
      message.info('请先登录')
      window.location.href = '/login'
    }
  }
  render () {
    // TestEntity.save(function (error, doc) {
    //   if (error) {
    //     console.log('error :' + error)
    //   } else {
    //     console.log(doc)
    //   }
    // })
    return (
      <div>
        <UserProfile {...{ userInfo }} />
        {
          arr && arr.map((list, index) => {
            return <PostPage {...{ list }} />
          })
        }
      </div>
    )
  }
}

export default Circle
