import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import service from '../service';
import { GhostItem } from '../data.d';
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
    let res,les,tes,fes;
    tes = await service.orderlist(id);
    if (id) {
    res = await service.updateGhost(id, values);
    les = await service.updateGhost(id,{state:"1"});
    (tes.data===undefined)?"":tes.data.map(async (v:any,i:any)=>{
      fes = await service.update(v.id,{state:"2"})
    })

    }
    if (!res.error&&!les.error
    ) {
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
        <Form.Item
          name="lifetime"
          label="阳寿"
          rules={[{ required: true, message: '请输入阳寿' }]}
          key="3"
        >
          <Input placeholder="请输入阳寿" />
        </Form.Item>
          <ProFormSelect
            name="cause"
            label="死亡方式"
            rules={[{ required: true, message: '请选择死亡方式' }]}
            options={[
              {
                label: '善终',
                value: '善终',
              },
              
              {
                label: '惨死',
                value: '惨死',
              },
            ]}
            placeholder="请选择死亡方式"
          />  
        <ProFormSelect
          name="sort"
          label="生肖"
          rules={[{ required: true, message: '请选择生肖' }]}
          options={[
            {
              label: '鼠',
              value: '鼠',
            },
            {
              label: '牛',
              value: '牛',
            },
            {
              label: '虎',
              value: '虎',
            },
            {
              label: '兔',
              value: '兔',
            },
            {
              label: '龙',
              value: '龙',
            },
            {
              label: '蛇',
              value: '蛇',
            },
            {
              label: '马',
              value: '马',
            },
            {
              label: '羊',
              value: '羊',
            },
            {
              label: '猴',
              value: '猴',
            },
            {
              label: '鸡',
              value: '鸡',
            },
            {
              label: '狗',
              value: '狗',
            },
            {
              label: '猪',
              value: '猪',
            },
          ]}
          placeholder="请选择生肖"
        />

      </Form>
    );
  };

  return (
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
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
