// @flow
import React, { Component } from 'react'
import styles from './EditPost.css'
import { Input, Form, Icon, Button, message, Select } from 'antd'
const FormItem = Form.Item

const options = [
  {
    value: '0',
    label: '本地咨询'
  },
  {
    value: '1',
    label: '邻里讨论'
  },
  {
    value: '2',
    label: '二手市场'
  },
  {
    value: '3',
    label: '同城交友'
  },
  {
    value: '4',
    label: '房屋租赁'
  }
]
type Props = {}
type State = {}

class EditPost extends React.PureComponent<Props, State> {
  constructor (props) {
    super(props)
  }
  // 发帖
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles['containel']}>
        <Form onSubmit={this.handleSubmit} className={styles.formStyle}>
          <FormItem>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题!' },
            { type: 'string', max:50, message: '标题不能超过50个字符!' }]
            })(
              <Input prefix={<Icon type='edit' style={{ fontSize: 13 }} />} placeholder='你的标题' />
                      )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请输入正文!' }]
            })(
              <Input prefix={<Icon type='edit' style={{ fontSize: 13 }} />}
                type='textarea' style={{ height: 300 }} placeholder='你的正文' />
                      )}
          </FormItem>
          <FormItem>
            <Button className={styles.loginButton} type='primary' htmlType='submit'>
              <Icon type='share-alt' style={{ fontSize: 13 }} />发布
                      </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const EditPostForm = Form.create()(EditPost)

export default EditPostForm
