import React from 'react';
import { useAccess, Access } from 'umi';
import { Modal, Button, Space } from 'antd';

const PageA = (props:any) => {

  function info() {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  }
  
  function success() {
    Modal.success({
      content: 'some messages...some messages...',
    });
  }
  
  function error() {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...',
    });
  }
  
  function warning() {
<Modal>aaaa</Modal>
  }
  
  return(
    <Space>
      <Button onClick={info}>Info</Button>
      <Button onClick={success}>Success</Button>
      <Button onClick={error}>Error</Button>
      <Button onClick={warning}>Warning</Button>
    </Space>
  );
}
export default PageA;
