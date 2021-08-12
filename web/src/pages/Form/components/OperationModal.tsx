import  { FC, useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import service from '../service';
import { GhostItem } from '../data.d';
import { useRequest } from 'umi';
import { Checkbox } from 'antd';
const potence="1";
interface OperationModalProps {
  visible: boolean;
  current: Partial<GhostItem> | undefined;
  onOk: () => void;
  onCancel: () => void;
}


interface opt{
  label: string;
  value: string;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};


// const { Option } = Select;

// const arr = [{id: '1',name:'唐玄奘'},{id: '2',name:'孙悟空'},{id: '3',name:'猪悟能'},{id: '4',name:'沙悟净'}];

const OperationModal: FC<OperationModalProps> = (props) => {
  let data  = useRequest(
    async () => {
      const data = await service.userlist(potence);
    //  console.log(data)
      return  data;

    },

  );

  let options: opt[] = [];
  for(let i = 0;(data.data===undefined)?"":i < data.data.length;i++){
    options.push({label: data.data[i].name,value: data.data[i].id});
  }

  
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
    const name = current ? current.name : '';
    let res;
    if (id) {
       res = await service.updateGhost(id,{"state":"2"});
      (values.user_id===undefined)?"":values.user_id.map(async (v:any,i:any)=>{
        values = Object.assign({user_id:v},{ghost_id: id},{name:name});
        await service.createOrder(values);
      })
      
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
{        <Form.Item
          name="user_id"
          label="勾魂使者"
          rules={[{ required: true, message: '勾魂使者----' }]}
          key="1"
        >
          <Checkbox.Group options={options} />
        </Form.Item>}
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
