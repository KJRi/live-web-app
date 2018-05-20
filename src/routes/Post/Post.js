// @flow
import React from 'react'
import styles from './Post.css'
import { Card, Icon, Avatar } from 'antd'
import { withRouter } from 'react-router'
const { Meta } = Card

type Props = {
  match: Object
}
type State = {
  postlist: Object
}

class Post extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      postlist: {}
    }
  }
  componentWillMount () {
    const id = this.props.match.params.id
    fetch(`/post/get?postId=${id}`, {
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
    console.log(postlist)
    return (
      <Card
        cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
        actions={[<Icon type='like-o' text={postlist.adNum} />,
          <Icon type='edit' text={postlist.comNum} />, <Icon type='ellipsis' />]}
  >
        <Meta
          avatar={
            <div style={{ textAlign: 'center' }}>
              <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              <h5 style={{ color: '#999' }}>{postlist.author}</h5>
            </div>
          }
          title={postlist.title}
          description={postlist.postTime}
          style={{ marginBottom: 10 }}
    />
        {postlist.content}
      </Card>
    )
  }
}

// const ReactTemplate = (props: Props) => {
//   return (
//     <div>hello world</div>
//   )
// }

export default withRouter(Post)
