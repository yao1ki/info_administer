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
import { ModalForm, ProFormSelect,ProFormDatePicker } from '@ant-design/pro-form';
interface OperationModalProps {
  visible: boolean;
  current: Partial<GhostItem> | undefined;
  onOk: () => void;
  onCancel: () => void;
}
let times = moment().format("YYYY-MM-DD HH:mm:ss"); 
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
 
    if (id) {
      res = await service.updateGhost(id, values);
      const aa = Object.assign(
        { time_end: values.time_end._d },
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
        <ProFormDatePicker
          label="死亡时间"
          name="time_end"
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
