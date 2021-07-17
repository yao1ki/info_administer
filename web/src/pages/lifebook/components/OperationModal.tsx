import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import service from '../service';
import { GhostItem } from '../data.d';

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
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = async (values: { [key: string]: any }) => {
    const id = current ? current.id : '';
    console.log(id)
    let res;
    if (id) {
      console.log("修改")

      res = await service.updateGhost(id, values);
    } else {
      console.log("添加")
      values = Object.assign(values);
      res = await service.createGhost(values);
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
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
          key="1"
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="lifetime"
          label="阳寿"
          rules={[{ required: true, message: '请输入阳寿' }]}
          key="2"
        >
          <Input placeholder="请输入阳寿" />
        </Form.Item>
        <Form.Item
          name="cause"
          label="死因"
          rules={[{ required: true, message: '请输入死因' }]}
          key="3"
        >
          <Input placeholder="请输入死因" />
        </Form.Item>
        <Form.Item
          name="sort"
          label="生肖"
          rules={[{ required: true, message: '请输入生肖' }]}
          key="4"
        >
          <Input placeholder="请输入生肖" />
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
