
import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon, Modal, Checkbox, Button
} from 'antd';
import ListItem from './listItem';
import AddMonthModal from './addMonthModal';
import { differenceBy } from 'lodash';
import './style.less';

const { confirm } = Modal;
const FormItem = Form.Item;

const initialMonth = {
  monthName: '',
  monthDays: '30'
};

let listUuid = 0;

class MonthList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      addModalVisible: false,
      selectRowKeys: []
    };
  }

  get content () {
    const { form: { getFieldDecorator, getFieldValue }, value } = this.props;
    const keys = getFieldValue('lists');
    const { selectRowKeys } = this.state;
    // const { addResourceType } = this.state;
    const contentItem = keys.map((k, index) => (
      <div className='monthItemWrapper'>
        <Checkbox
          key={`removeSelect${k}`}
          checked={selectRowKeys.includes(k)}
          className='itemSelect'
          onChange={(e) => this.removeSelect(e, k)}
        />
        <FormItem
          key={k}
          className='monthItemContainer'
        >
          {getFieldDecorator(`month[${k}]`, {
            initialValue: value[index] || initialMonth
          })(
            <ListItem wrappedComponentRef={(form) => { this[`form${k}`] = form; }} />
          )}
        </FormItem>
        <span className='itemDeleteContainer'>
          <Icon
            className='itemDelete'
            type='close-circle'
            theme='filled'
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </span>
      </div>
    ));
    return contentItem;
  }

  render () {
    const { addModalVisible, selectRowKeys } = this.state;
    const { value, form: { getFieldDecorator, getFieldValue } } = this.props;
    const InitialKeys = getFieldValue('lists') || this.getInitialKeys(value);
    getFieldDecorator('lists', { initialValue: InitialKeys });
    // console.log('-----addModalVisible', addModalVisible);
    return (
      <div className='monthContainer'>
        {
          addModalVisible && <AddMonthModal
            type='add'
            addModalVisible={addModalVisible}
            handleCancle={this.cancleAdd}
            handleOk={this.addMonth}
          />
        }
        <div className='monthActions'>
          <Button
            type='primary'
            className='actionButton'
            onClick={this.handleAddMonth}
            style={{ marginRight: 16 }}
          >
            新建任务
          </Button>
          <Button
            type='primary'
            className='actionButton'
            onClick={this.patchRemove}
            disabled={selectRowKeys.length === 0}
          >
            批量删除
          </Button>
        </div>
        <div className='monthContentWrapper'>
          {this.content}
        </div>
      </div>
    );
  }

  removeSelect = (e, k) => {
    const { selectRowKeys } = this.state;
    let newKeys = selectRowKeys;
    if (e.target.checked) {
      newKeys.push(k);
    } else {
      newKeys = newKeys.filter(item => item !== k);
    }
    // console.log('------kkkk', k, newKeys);
    this.setState({
      selectRowKeys: newKeys
    });
  }

  patchRemove = () => {
    const { selectRowKeys } = this.state;
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const lists = getFieldValue('lists');
    const newLists = differenceBy(lists, selectRowKeys);
    // console.log('----newLists', newLists, lists, selectRowKeys);
    confirm({
      title: '确认批量删除选中的月份?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        setFieldsValue({
          lists: newLists
        });
        this.setState({
          selectRowKeys: []
        });
      },
      onCancel: () => {
        // console.log('Cancel');
      }
    });
  }

  getInitialKeys = (value) => {
    listUuid = 0;
    let nextKeys = [1];
    for (let i = 1; i < value.length; i++) {
      nextKeys = nextKeys.concat(listUuid++);
    }
    return nextKeys;
  }

  // 关闭弹窗
  cancleAdd = () => {
    this.setState({
      addModalVisible: false
    });
  }

  // 点击批量添加月份
  handleAddMonth = () => {
    this.setState({
      addModalVisible: true
    });
  }

  // 增加一条
  addMonth = () => {
    const { form } = this.props;
    const lists = form.getFieldValue('lists');
    const nextlists = lists.concat(listUuid++);
    // console.log('----nextlists', nextlists);
    form.setFieldsValue({
      lists: nextlists
    });
  }

  remove = (k) => {
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const lists = getFieldValue('lists');
    confirm({
      title: '确认删除该月份?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk () {
        setFieldsValue({
          lists: lists.filter(key => key !== k)
        });
      },
      onCancel () {
        // console.log('Cancel');
      }
    });
  }
}

MonthList.propTypes = {
  form: PropTypes.object.isRequired,
  value: PropTypes.array
};

MonthList.defaultProps = {
  value: []
};

export default Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    let formData = allValues.month || [];
    // 增加一条
    if ((!allValues.month) || (allValues.lists.length > allValues.month.length)) {
      formData = formData.concat(initialMonth);
    } else {
      // 删除或者编辑
      formData = allValues.lists.map(item => {
        return allValues.month[item];
      });
    }
    props.onChange(formData);
  }
})(MonthList);
