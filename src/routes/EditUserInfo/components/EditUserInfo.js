// @flow
import React, { Component } from 'react'
import { Input, Form, Icon, Button, message, DatePicker, Cascader } from 'antd'
import styles from './EditUserInfo.css'
import data from 'data'
import moment from 'moment'
const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD'
type Props = {}
type State = {}

class EditUserInfo extends React.PureComponent<Props, State> {
  constructor (props) {
    super(props)
  }
  // 提交信息
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let arr = {
          description: values.description,
          birthday: moment(values.birthday).format(dateFormat),
          location: values.location
        }
        console.log(arr)
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles['containel']}>
        <Form onSubmit={this.handleSubmit} className={styles.formStyle}>
          <FormItem label='个性签名'>
            {getFieldDecorator('description')(
              <Input prefix={<Icon type='edit' style={{ fontSize: 13 }} />} placeholder='个性签名' />
                      )}
          </FormItem>
          <FormItem label='您的生日'>
            {getFieldDecorator('birthday')(
              <DatePicker style={{ width: '100%' }} />
                      )}
          </FormItem>
          <FormItem label='地区'>
            {getFieldDecorator('location')(
              <Cascader
                options={data} className={styles['type-item']} placeholder='请选择所在地区' />
                )}
          </FormItem>
          <FormItem>
            <Button className={styles.loginButton} type='primary' htmlType='submit'>
                          确认更改
                      </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const EditUserInfoForm = Form.create()(EditUserInfo)

export default EditUserInfoForm
