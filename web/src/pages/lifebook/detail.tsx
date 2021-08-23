import { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams, useRequest } from 'umi';
import service from './service';
import { Descriptions, Button, Card } from 'antd';
import { GhostItem } from './data.d';
import OperationModal from './components/OperationModal';
import moment from 'moment';

interface params {
  id: string;
}

const Test: FC<{}> = () => {
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<GhostItem> | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);
  const [opFlag, setOpFlag] = useState<number>(0);
  const handleCancel = () => {
    setVisible(false);
  };
  const showEditModal = (item: GhostItem) => {
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
      return await service.showorder(id);
    },
    {
      refreshDeps: [opFlag],
    },
  );
  const shop = data === undefined ? '' : data[0];
  var aa = 0;

  {
    shop.orders === undefined
      ? ''
      : shop.orders.map((v: any, i: any) => {
          aa < v.state ? (aa = v.state) : '';
        });
  }
  aa = Number(aa);
  var bb=aa+1;
  return (
    <PageContainer>
      <Descriptions title="详情"></Descriptions> 
      <Descriptions layout="vertical" style={{backgroundColor:"	GhostWhite",fontSize:"150%"}}>
        <Descriptions.Item label="ID" style={{fontSize:"150%"}}>{shop.ghost_id}</Descriptions.Item>
        <Descriptions.Item label="Name">{shop.name}</Descriptions.Item>
      </Descriptions>
      {shop.orders === undefined
        ? ''
        : shop.orders.map((v: any, i: any) =>
           aa==v.state&&aa>0 ? (
              <Descriptions layout="vertical">
                <Descriptions.Item label={'第' + (bb-aa--) + '世的姓名'}>{v.name}</Descriptions.Item>
                <Descriptions.Item label="勾魂使者">
                  {shop.orders === undefined
                    ? ''
                    : shop.orders.map((v: any, i: any) => (v.state == aa ? v.user.name + ' ' : ''))}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              ''
            ),
          )}

      <OperationModal current={current} visible={visible} onOk={handleOk} onCancel={handleCancel} />
    </PageContainer>
  );
};

export default Test;
