import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import service from '../service';
import { GhostItem } from '../data.d';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { useRequest, Link } from 'umi';

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


const { Option } = Select;

// const arr = ['唐玄奘','孙悟空','猪悟能','沙悟净'];

const OperationModal: FC<OperationModalProps> = (props) => {
  let data  = useRequest(
    async () => {
      const data = await service.userlist();
    //  console.log(data)
      return  data;

    },

  );
  
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
        ghost_id:current.ghost_id,
        state:current.state,
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
      res = await service.updateGhost(id, values);
    } else {
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
          name="user_id"
          label="勾魂使者"
          rules={[{ required: true, message: '勾魂使者----' }]}
          key="1"
        >
          <Select>
          {(data.data===undefined)?"":data.data.map(((v:any,i:any) => (<Option value={i-1}>{v.name}</Option>)))}
          </Select>
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
