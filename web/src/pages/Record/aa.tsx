import  { FC, useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { useRequest } from 'umi';
import { Checkbox } from 'antd';
const potence="1";
interface OperationModalProps {
  visible: boolean;
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



  const [form] = Form.useForm();

 

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };


    let res;

  const getModalContent = () => {
    return (
      <Form >
{        <Form.Item
          name="user_id"
          label="勾魂使者"
          rules={[{ required: true, message: '勾魂使者----' }]}
          key="1"
        >
         aaaaaaaaaaaaaaaa
        </Form.Item>}
      </Form>
    );
  };

  return (
    <Modal
    
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
