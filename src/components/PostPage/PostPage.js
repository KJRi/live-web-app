// @flow
import React from 'react'
import styles from './PostPage.css'
import { List, Avatar, Icon } from 'antd'

type Props = {
  postlist: Array<Object>,
}
type State = {
}

class PostPage extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
)
    const postlist = this.props.postlist
    console.log(postlist)
    return (
      <List
        itemLayout='vertical'
        size='large'
        dataSource={postlist}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<IconText type='like-o' text={item.adNum} />, <IconText type='message' text={item.comNum} />]}
      >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
        />
            {item.content}
          </List.Item>
    )}
  />
    )
  }
}

export default PostPage
