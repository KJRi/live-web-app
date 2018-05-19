// @flow
import React from 'react'
import './Detail.css'
import { Input } from 'antd'
import PostPage from 'components/PostPage'
const Search = Input.Search
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

type Props = {}
type State = {
  postlist: Array<Object>
}

class Detail extends React.PureComponent<Props, State> {
  constructor (props) {
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
    console.log(postlist)
    return (
      <div>
        <Search
          placeholder='请输入您想搜索的帖子'
          onSearch={value => console.log(value)}
          size='large'
        />
        {
          arr && arr.map((list, index) => {
            return <PostPage {...{ list }} />
          })
        }
      </div>
    )
  }
}

export default Detail
