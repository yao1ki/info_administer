import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import service from '../service';
import { GhostItem } from '../data.d';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';

import { ModalForm, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-form';
interface OperationModalProps {
  visible: boolean;
  current: Partial<GhostItem> | undefined;
  onOk: () => void;
  onCancel: () => void;
}
let times = moment().format(); 
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, current, onOk, onCancel } = props;
  const ee = current?.rein_id;
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
    let res, les, tes, fes;
    tes = await service.Order();
    const id = current ? current.id : '';

    let a = moment(values.times).format('YYYY');
    let b = parseInt(moment(values.times).format('MM'));
    let c = parseInt(moment(values.times).format('DD'));
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

    if (id) {
      res = await service.updateGhost(id, values);

      tes.data === undefined
        ? ''
        : tes.data.map(async (v: any, i: any) => {
            v.state = parseInt(v.state);

            v.ghost_id == id ? (fes = await service.update(v.id, { state: v.state + 1 })) : '';
          });
      const aa = Object.assign(
        { time_start: times },
        { time_end: values.time._d },
        { sort: cc },
        { constellation: dd },
      );
      les = await service.updateGhost(id, aa);
      les = await service.updateGhost(id, { state: '1', reason: '' });
    }
    if (!res.error && !les.error) {
      message.success('操作成功！');
      onOk();
    }
  };
  const handleCancel = () => {
    onCancel();
  };
  const getanimalModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>

        <Form.Item
          name="name"
          label="种族"
          rules={[{ required: true, message: '请输入种族' }]}
          key="2"
        >
          <Input placeholder="请输入种族" />
        </Form.Item>
        <ProFormDatePicker
          label="出生/死亡时间"
          name="time"
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          rules={[{ required: true, message: '请选择日期' }]}
        />
        <Form.Item
          name="cause"
          label="死因"
          rules={[{ required: true, message: '请输入死亡方式' }]}
        >
          <Input placeholder="请输入死因" />
        </Form.Item>
      </Form>
    );
  };
  const getgodModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>

        <Form.Item
          name="name"
          label="称号"
          rules={[{ required: true, message: '请输入称号' }]}
          key="2"
        >
          <Input placeholder="请输入称号" />
        </Form.Item>
        <ProFormDatePicker
          label="陨落时间"
          name="time"
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          rules={[{ required: true, message: '请选择日期' }]}
        />
                <Form.Item
          name="cause"
          label="陨落原因"
          rules={[{ required: true, message: '请输入陨落方式' }]}
        >
          <Input placeholder="请输入陨落原因" />
        </Form.Item>
      </Form>
    );
  };
  const getpeopleModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>

        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
          key="2"
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <ProFormDatePicker
          label="出生/死亡时间"
          name="time"
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          rules={[{ required: true, message: '请选择日期' }]}
        />
        <Form.Item
          name="cause"
          label="死因"
          rules={[{ required: true, message: '请输入死亡方式' }]}
        >
          <Input placeholder="请输入死因" />
        </Form.Item>

      </Form>
    );
  };
  return (
    <div>
      <Modal
        title={'分配命运'}
        width={640}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        okText="保存"
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        {ee == '1' ? getgodModalContent():ee=="2"? getpeopleModalContent():ee=="3"? getanimalModalContent(): getpeopleModalContent()}
      </Modal>
    </div>
  );
};

export default OperationModal;
