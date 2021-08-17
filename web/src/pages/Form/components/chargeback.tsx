import  { FC, useEffect } from 'react';
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
    console.log('radio checked', e.target.value);
    state = e.target.value
    //setValue(e.target.value);
  };
  const handleFinish = async (values: { [key: string]: any }) => {
    const id = current ? current.id : '';
    let res;

    if (id) {
      console.log("=======>",values)
      values={"reason":values.reason ,"gnosis":values.gnosis, "state":state}
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
          label="审判记录"
          rules={[{ required: true, message: '请输入生平' }]}

        >
          <Input placeholder="请输入生平" />
        </Form.Item>
        <Form.Item
          name="gnosis"
          label="人生感悟"
          rules={[{ required: true, message: '请输入感悟' }]}

        >
          <Input placeholder="请输入感悟" />
        </Form.Item>
        <Radio.Group    name='state' onChange={onChange} >
      <Radio style={{left: '80%'}} value={5}>允许投胎</Radio>
      <Radio style={{left: '120%'}} value={4}>逐出六道</Radio>
    </Radio.Group>
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
