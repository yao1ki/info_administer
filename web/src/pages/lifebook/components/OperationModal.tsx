import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import service from '../service';
import { GhostItem } from '../data.d';
import moment from 'moment';

import ProForm, {
  ProFormDateRangePicker,
  ProFormText,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
interface OperationModalProps {
  visible: boolean;
  current: Partial<GhostItem> | undefined;
  onOk: () => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, current, onOk, onCancel } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        name: current.name,
        lifetime: current.lifetime,
        cause: current.cause,
        sort: current.sort,
        ghost_id: current.ghost_id,
        state: current.state,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = async (values: { [key: string]: any }) => {
    const id = current ? current.id : '';
    let res, les;

    let a = moment(values.time[0]._d).format('YYYY');
    let b = parseInt(moment(values.time[0]._d).format('MM'));
    let c = parseInt(moment(values.time[0]._d).format('DD'));
    let bb = parseInt(a) % 12;
    let cc =
      bb == 0
        ? '猴'
        : bb == 1
        ? '鸡'
        : bb == 2
        ? '狗'
        : bb == 3
        ? '猪'
        : bb == 4
        ? '鼠'
        : bb == 5
        ? '牛'
        : bb == 6
        ? '虎'
        : bb == 7
        ? '兔'
        : bb == 8
        ? '龙'
        : bb == 9
        ? '蛇'
        : bb == 10
        ? '马'
        : '羊';
    let dd =
      (b == 1 && c <= 19) || (b == 12 && c >= 22)
        ? '摩羯座'
        : (b == 2 && c <= 18) || (b == 1 && c >= 20)
        ? '水瓶座'
        : (b == 3 && c <= 20) || (b == 2 && c >= 19)
        ? '双鱼座'
        : (b == 4 && c <= 19) || (b == 3 && c >= 21)
        ? '白羊座'
        : (b == 5 && c <= 20) || (b == 4 && c >= 20)
        ? '金牛座'
        : (b == 6 && c <= 21) || (b == 5 && c >= 21)
        ? '双子座'
        : (b == 7 && c <= 22) || (b == 6 && c >= 22)
        ? '巨蟹座'
        : (b == 8 && c <= 22) || (b == 7 && c >= 23)
        ? '狮子座'
        : (b == 9 && c <= 22) || (b == 8 && c >= 23)
        ? '处女座'
        : (b == 10 && c <= 23) || (b == 9 && c >= 23)
        ? '天秤座'
        : (b == 11 && c <= 22) || (b == 10 && c >= 24)
        ? '天蝎座'
        : '射手座';
        console.log("_________>",cc)
        console.log("_________>",dd)

    if (id) {
      res = await service.updateGhost(id, values);
      const aa = Object.assign(
        { time_start: values.time[0]._d },
        { time_end: values.time[1]._d },
        { sort: cc },
        {constellation:dd}
      );
      les = await service.updateGhost(id, aa);
    } else {
      res = await service.createGhost(values);
    }
    if (!res.error && !les.error) {
      message.success('操作成功！');
      onOk();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="ghost_id"
          label="ID"
          rules={[{ required: true, message: '请输入ID' }]}
          key="1"
        >
          <Input placeholder="请输入ID" />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
          key="2"
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <ProFormDateRangePicker
          label="死亡时间"
          name="time"
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          rules={[{ required: true, message: '请选择生效日期' }]}
        />
        <Form.Item
          name="cause"
          label="死因"
          rules={[{ required: true, message: '请输入死亡方式' }]}
        >
          <Input placeholder="请输入死因" />
        </Form.Item>

        {/* <ProFormSelect
          name="state"
          label="类别"
          rules={[{ required: true, message: '请选择类别' }]}
          options={[
            {
              label: '阳寿未尽',
              value: '1',
            },
            {
              label: '阳寿已尽',
              value: '2',
            },
            {
              label: '投胎转世',
              value: '3',
            },
          ]}
          placeholder="请选择类别"
        /> */}
      </Form>
    );
  };

  return (
    <Modal
      title={`${current ? '编辑' : '添加'}`}
      width={640}
      bodyStyle={{ padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      okText="保存"
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
