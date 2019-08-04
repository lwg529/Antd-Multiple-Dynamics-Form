import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Row, Col, Input, Card
} from 'antd';
import MonthList from './month';
import './style.less';

const FormItem = Form.Item;

class CreateTodoList extends React.Component {
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const formItemSpecial = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 }
      }
    };
    return (
      <Form layout='horizontal' onSubmit={this.handleSubmit}>
        <Card title='待做事项'>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label='姓名'
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label='年龄'
              >
                <Input />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label='电话'
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label='邮箱'
              >
                <Input />
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title='每月任务' style={{ marginTop: 20 }}>
          <Row>
            <Col span={24}>
              <FormItem
                {...formItemSpecial}
                label='每月TODO'
              >
                <MonthList />
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  }

  handleSubmit = () => {
    const { form } = this.props;
    console.log('-----form value', form.getFieldsValue());
  }
}
CreateTodoList.propTypes = {
  form: PropTypes.object
};

export default Form.create()(CreateTodoList);
