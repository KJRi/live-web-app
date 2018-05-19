// @flow
import React from 'react'
import './Detail.css'
import { Input } from 'antd'
import PostPage from 'components/PostPage'
const Search = Input.Search

type Props = {}
type State = {
  postlist: Array<Object>
}

class Detail extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      postlist: []
    }
  }
  componentWillMount () {
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
        <Search
          placeholder='请输入您想搜索的帖子'
          onSearch={value => console.log(value)}
          size='large'
        />
        <PostPage {...{ postlist }} />
      </div>
    )
  }
}

export default Detail
