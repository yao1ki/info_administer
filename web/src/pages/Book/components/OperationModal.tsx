import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import service from '../service';
import { BookItem } from '../data.d';

interface OperationModalProps {
  visible: boolean;
  current: Partial<BookItem> | undefined;
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
        author: current.author,
        category: current.category,
        intro: current.intro,
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

      res = await service.updateBook(id, values);
    } else {
      values = Object.assign(values);
      res = await service.createBook(values);
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
          label="书籍"
          rules={[{ required: true, message: '请输入书籍名' }]}
          key="1"
        >
          <Input placeholder="请输入书籍名" />
        </Form.Item>
        <Form.Item
          name="author"
          label="作者"
          rules={[{ required: true, message: '请输入作者姓名' }]}
          key="2"
        >
          <Input placeholder="请输入作者姓名" />
        </Form.Item>
        <Form.Item
          name="category"
          label="类别"
          rules={[{ required: true, message: '请输入类别' }]}
          key="3"
        >
          <Input placeholder="请输入类别" />
        </Form.Item>
        <Form.Item
          name="intro"
          label="简介"
          rules={[{ required: true, message: '请输入简介' }]}
          key="4"
        >
          <Input placeholder="请输入简介" />
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
