// @flow
import React from 'react'
import './MyLike.css'
import PostPage from 'components/PostPage'

type Props = {}
type State = {
  postlist: Array<Object>
}

class MyLike extends React.PureComponent<Props, State> {
  searchPst: Function
  constructor (props: Props) {
    super(props)
    this.state = {
      postlist: []
    }
    this.searchPst = this.searchPst.bind(this)
  }
  componentWillMount () {
    const username = localStorage.getItem('username')
    fetch('/post/all', {
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
    const postlist = this.state.postlist
    return (
      <div>
        <PostPage {...{ postlist }} />
      </div>
    )
  }
}

export default MyLike
