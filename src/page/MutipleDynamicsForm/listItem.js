import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, Row, Col } from 'antd';
import './style.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  },
  style: {
    width: '100%',
    marginBottom: 0
  }
};
class TodoItem extends Component {
  static propTypes = {
    form: PropTypes.object,
    value: PropTypes.object
  }

  render () {
    const { form: { getFieldDecorator }, value } = this.props;
    // console.log('------value', value);
    return (
      <div className='resourceItem'>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label='Todo名称'>
              {getFieldDecorator('todo_name', {
                rules: [{
                  required: true,
                  message: '请输入Todo名称'
                }],
                initialValue: value && value.todo_name
              })(
                <Input placeholder='请输入Todo名称' />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label='截至日期'>
              {getFieldDecorator(`resource_price`, {
                initialValue: value && value.todo_date
              })(
                <DatePicker placeholder='请选择截至日期' />
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    const formData = allValues;
    props.onChange(formData);
  }
})(TodoItem);
