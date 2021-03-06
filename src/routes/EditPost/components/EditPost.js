// @flow
import React, { Component } from 'react'
import styles from './EditPost.css'
import { Input, Form, Icon, Button, message, Select } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input
const options = [
  {
    value: '0',
    label: '本地资讯'
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
        fetch('post/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: localStorage.getItem('username'),
            title: values.title,
            tag: values.tag.label,
            content: values.content
          })
        }).then(res => res.json())
          .then(res => {
            // 后端正确
            if (res.success) {
              message.destroy()
              message.success(res.message)
              window.location.href = '/detail'
            } else {
              message.destroy()
              message.info(res.message)
            }
          })
          .catch(e => console.log('Oops, error', e))
      }
    })
  }
  handleChange = (content) => {
    console.log(content)
  }

  handleRawChange = (rawContent) => {
    console.log(rawContent)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: '<p>你的正文</p>',
      onChange: this.handleChange,
      onRawChange: this.handleRawChange
    }
    return (
      <div className={styles['containel']}>
        <Form onSubmit={this.handleSubmit} className={styles.formStyle}>
          <FormItem>
            {getFieldDecorator('tag', {
              rules: [{ required: true, message: '请选择分区!' }]
            })(
              <Select style={{ width: 200 }} labelInValue placeholder='选择分区' >
                {
                  options && options.map((list, index) => {
                    return <Option value={list.value}>{list.label}</Option>
                  })
                }
              </Select>
                      )}
          </FormItem>
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
              <BraftEditor {...editorProps} />
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
