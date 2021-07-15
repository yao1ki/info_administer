import { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams, useRequest } from 'umi';
import service from './service';
import { Descriptions, Button, Card } from 'antd';
import { UserItem } from './data.d';
import OperationModal from './components/OperationModal';
interface params {
  id: string;
}

const Test: FC<{}> = () => {
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<UserItem> | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);
  const [opFlag, setOpFlag] = useState<number>(0);
  const handleCancel = () => {
    setVisible(false);
  };
  const showEditModal = (item: UserItem) => {
    setVisible(true);
    setCurrent({ ...item });
  };
  const params: params = useParams();
  const handleOk = () => {
    setVisible(false);
    setOpFlag(opFlag + 1);
  };
  const id = params.id;

  let { data } = useRequest(
    async () => {
      return await service.showUser(id);
    },
    {
      refreshDeps: [opFlag],
    },
  );

  const action = (
    <>
      <Button onClick={() => {
              showEditModal(data)}}>用户编辑</Button>
    </>
  );
    
  return (
    <PageContainer>
      <Descriptions title="用户详情" extra={action}></Descriptions>
      <Descriptions title="User Info" layout="vertical">
        <Descriptions.Item label="UserName">
          {data === undefined ? '' : data.username}
        </Descriptions.Item>
        <Descriptions.Item label="Name">
          {data === undefined ? '' : data.name}
        </Descriptions.Item>
        <Descriptions.Item label="Telephone">
          {data === undefined ? '' : data.telephone}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {data === undefined ? '' : data.address}
        </Descriptions.Item>
        <Descriptions.Item label="E-mile">
          {data === undefined ? '' : data.e_mile}
        </Descriptions.Item>
      </Descriptions>
    <OperationModal current={current} visible={visible} onOk={handleOk} onCancel={handleCancel}  />
    </PageContainer>
    
  );
};

export default Test;
