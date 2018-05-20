// @flow
import React from 'react'
import styles from './MyFollow.css'
import { Link } from 'antd'

type Props = {}
type State = {
  followList: Array<Object>
}

class MyFollow extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      followList: []
    }
  }
  componentWillMount () {
    const username = localStorage.getItem('username')
    fetch('/follow/getByUser', {
      method: 'GET'
    }).then(res => res.json())
    .then(res => {
      this.setState({
        followList: res
      })
    })
  }
  render () {
    const { followList } = this.state
    const followLink = `/circle/item.follow`
    return (
      {
        followList && followList.map((item, index) => {
          <Link to={followLink}><div>{item.follow}</div></Link>
        })
      }
    )
  }
}

// const ReactTemplate = (props: Props) => {
//   return (
//     <div>hello world</div>
//   )
// }

export default MyFollow
