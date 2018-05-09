// @flow
import React from 'react'
import styles from './PersonalList.css'
import { Avatar, Icon } from 'antd'

type Props = {}
type State = {}

class PersonalList extends React.PureComponent<Props, State> {
  render () {
    return (
      <div>
        <div className={styles['list-item']}>
          <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
          <Icon type='right' />
        </div>
        <div className={styles['list-item']}>修改信息<Icon type='right' /></div>
        <div className={styles['list-item']}>我的关注<Icon type='right' /></div>
        <div className={styles['list-item']}>浏览记录<Icon type='right' /></div>
        <div className={styles['list-item']}>退出登录<Icon type='right' /></div>
      </div>
    )
  }
}

export default PersonalList
