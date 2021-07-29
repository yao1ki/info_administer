import  { FC, useEffect } from 'react';
import { Modal, Form, Input,message } from 'antd';
import service from '../service';
import { GhostItem } from '../data.d';
interface BackProps {
  visible: boolean;
  current: Partial<GhostItem> | undefined;
  onOk: () => void;
  onCancel: () => void;
}



const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};


// const { Option } = Select;

// const arr = [{id: '1',name:'唐玄奘'},{id: '2',name:'孙悟空'},{id: '3',name:'猪悟能'},{id: '4',name:'沙悟净'}];

const Back: FC<BackProps> = (props) => {


  
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

  const handleFinish = async (values: { [key: string]: any }) => {
    const id = current ? current.id : '';

    let res;
    if (id) {
      values={"reason":values.reason , "state":"4"}
      res= await service.updateGhost(id,values);
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
          name="reason"
          label="退单理由"
          rules={[{ required: true, message: '请输入理由' }]}

        >
          <Input placeholder="请输入理由" />
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

export default Back;
