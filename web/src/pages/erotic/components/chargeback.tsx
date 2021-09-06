import React, { FC, useEffect, useState } from 'react';
import { useRequest, Link } from 'umi';
import { Modal, Form, Input, message } from 'antd';
import service from '../service';
import { GhostItem } from '../data.d';
import { ToolItem } from '../data.d';
import { ProFormSelect } from '@ant-design/pro-form';

import { Radio } from 'antd';
import moment from 'moment';
interface BackProps {
  visible: boolean;
  current: Partial<GhostItem> | undefined;
  onOk: () => void;
  onCancel: () => void;
}
interface opt {
  label: string;
  value: string;
}
var state = '';
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

// const { Option } = Select;

// const arr = [{id: '1',name:'唐玄奘'},{id: '2',name:'孙悟空'},{id: '3',name:'猪悟能'},{id: '4',name:'沙悟净'}];

const Back: FC<BackProps> = (props) => {
  let data = useRequest(async () => {
    return await service.listtool();
  });
  let options: opt[] = [];
  data.data === undefined
    ? ''
    : data.data.map((v: any, i: any) =>
    v.servicelife<=0||v.titles==0?'':
        options.push({
          label: v.name,
          value: i,
        }),
      );

  var nIntervId: any, intervalID;

  function myCallback() {
    setVisible(false);
    clearInterval(nIntervId);
  }

  const [visiable, setVisible] = useState<boolean>(false);

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
        reason: current.reason,
        state: current.state,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };
  const onChange = async (e: { [key: string]: any }) => {
    state = e.target.value;
    //setValue(e.target.value);
  };

  const toolFinish = async (values: { [key: string]: any }) => {
    let res;
    const i = values.value;
    const id = data.data[i].id;
    const time = data.data[i].servicelife-1;

    

    res = await service.updateTool(id, { servicelife: time+'' });

    if (!res.error) {
      message.success('刑具使用成功');
      onOk();
    }
  };
  const handleFinish = async (values: { [key: string]: any }) => {
    const id = current ? current.id : '';
    const name = current ? current.name : '';
    let res, les;
    if (id) {
      const lifetime = values.lifetime;
      res = await service.updateGhost(id, { lifetime: lifetime });
      les =
        parseInt(lifetime) - moment(moment().format()).diff(moment(values.time_end), 'days') <= 0
          ? await service.updateGhost(id, { state: '5', lifetime: '0' })
          : 'aa';
    }
    if (!res.error) {
      les == 'aa'
        ? message.success(name + '修改刑期成功！' + les)
        : message.success(name + '刑满释放');
      onOk();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const getModalContent = () => {
    return current ? (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="lifetime"
          label="受刑时间"
          rules={[{ required: true, message: '受刑时间' }]}
        >
          <Input placeholder="受刑时间" />
        </Form.Item>
      </Form>
    ) : (
      <Form {...formLayout} form={form} onFinish={toolFinish}>
        {
          <ProFormSelect
            name="value"
            label="选择刑具"
            rules={[{ required: true, message: '请选择刑具' }]}
            options={options}
            placeholder="请选择刑具"
          />
        }
      </Form>
    );
  };

  return (
    <div>
      <Modal
        title={`${current ? '更改刑期' : '使用刑具'}`}
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
    </div>
  );
};

export default Back;
