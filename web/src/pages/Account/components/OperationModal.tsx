import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import service from '../service';
import { UserItem } from '../data.d';

interface OperationModalProps {
  visible: boolean;
  current: Partial<UserItem> | undefined;
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
        username: current.username,
        name: current.name,
        password: current.password,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = async (values: { [key: string]: any }) => {
    const id = current ? current.id : '';
    let res;
    if (id) {
      res = await service.updateUser(id, values);
    } else {
      values = Object.assign(values);
      res = await service.createUser(values);
    }
    if (!res.error) {
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
          name="username"
          label="登录账号"
          rules={[{ required: true, message: '请输入登录账号' }]}
          key="1"
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
          key="2"
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item name="password" label="密码" key="3">
          <Input.Password placeholder="请输入密码" visibilityToggle={false} />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={`员工${current ? '编辑' : '添加'}`}
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
