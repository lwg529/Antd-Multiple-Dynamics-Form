import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Form } from 'antd';

class AddMonthModal extends Component {
  render () {
    const { handleCancle, handleOk, addModalVisible } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return (
      <Modal
        title='新建任务'
        visible={addModalVisible}
        onOk={handleOk}
        onCancel={handleCancle}
      >
        <Form layout='horizontal' className='custom-edit-form'>
          <Form.Item label='月份' {...formItemLayout}>
            {getFieldDecorator('month', {
              rules: [
                {
                  required: true,
                  message: '月份不能为空'
                }
              ]
            })(
              <Input placeholder='请输入月份' />
            )}
          </Form.Item>
          <Form.Item label='天数' {...formItemLayout}>
            {getFieldDecorator('month_days', {
              initialValue: 30,
              rules: [
                {
                  required: true,
                  message: '天数不能为空'
                }
              ]
            })(
              <Input placeholder='请输入天数' />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

AddMonthModal.propTypes = {
  form: PropTypes.object,
  addModalVisible: PropTypes.boolean,
  handleCancle: PropTypes.func,
  handleOk: PropTypes.func
};

export default Form.create()(AddMonthModal);
