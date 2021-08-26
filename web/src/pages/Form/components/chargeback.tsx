import React, { FC, useEffect, useState } from 'react';

import { Modal, Form, Input,message } from 'antd';
import service from '../service';
import { GhostItem } from '../data.d';
import { Radio } from 'antd';

interface BackProps {
  visible: boolean;
  current: Partial<GhostItem> | undefined;
  onOk: () => void;
  onCancel: () => void;
}


var state = '';
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};


// const { Option } = Select;

// const arr = [{id: '1',name:'唐玄奘'},{id: '2',name:'孙悟空'},{id: '3',name:'猪悟能'},{id: '4',name:'沙悟净'}];

const Back: FC<BackProps> = (props) => {
  var nIntervId:any,intervalID;

  function myCallback()
  {
    setVisible(false);
    clearInterval(nIntervId)

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
        reason:current.reason,
        state:current.state,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };
  const onChange = async (e: { [key: string]: any }) => {
    state = e.target.value
    //setValue(e.target.value);
  };
  const handleFinish = async (values: { [key: string]: any }) => {
    const id = current ? current.id : '';
    let res;

    if (id) {
      values=values.lifetime?{"reason":values.reason ,"gnosis":values.gnosis, "state":"4","lifetime":values.lifetime}:{"reason":values.reason ,"gnosis":values.gnosis, "state":"5"}
      res= await service.updateGhost(id,values);
    }
    if (!res.error) {
      state=='4'?
      (setVisible(true),
      nIntervId = setInterval(myCallback, 500)):''
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
          name="lifetime"
          label="受刑时间"
          rules={[{ required: true, message: '受刑时间' }]}

        >
          <Input placeholder="受刑时间" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <div>
      <Modal
      title={`${current ? '更改刑期' : '添加'}`}
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
