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
  var cc= 0;
  return (
    <PageContainer>
      <div style={{color:'red',fontSize:'32px',marginLeft:'45%'}}>灵魂ID:  {shop.id}</div>
      <Descriptions layout="vertical"size='default' style={{backgroundColor:"	GhostWhite"}}>
       
        <Descriptions.Item label="当前姓名">{shop.name}</Descriptions.Item>
        <Descriptions.Item label="死因">{shop.cause}</Descriptions.Item>
        <Descriptions.Item label="死亡时间">{moment(shop.time_end).format('YYYY年MM月DD号ah:mm:ss')}</Descriptions.Item>
        
      </Descriptions>
      {shop.orders === undefined
        ? ''
        : shop.orders.map((v: any, i: any) =>
           aa==v.state&&aa>0 ? ( cc = bb-aa--,
            cc%2==1? <Descriptions layout="vertical"  style={{backgroundColor:'#E6E6FA'}}>
                <Descriptions.Item label={'第' + (cc) + '世的姓名'}>{v.name}</Descriptions.Item>
                <Descriptions.Item label="勾魂使者">
                  {shop.orders === undefined
                    ? ''
                    : shop.orders.map((v: any, i: any) => (v.state == aa+1 ? v.user.name + ' ' : ''))}
                </Descriptions.Item>
                <Descriptions.Item label={'第' + (cc) + '世的轮回'}>{v.rein_name}道</Descriptions.Item>

              </Descriptions>:
              <Descriptions layout="vertical"  style={{backgroundColor:'#F8F8FF'}}>
              <Descriptions.Item label={'第' + (cc) + '世的姓名'}>{v.name}</Descriptions.Item>
              <Descriptions.Item label="勾魂使者">
                {shop.orders === undefined
                  ? ''
                  : shop.orders.map((v: any, i: any) => (v.state == aa+1 ? v.user.name + ' ' : ''))}
              </Descriptions.Item>
              <Descriptions.Item label={'第' + (cc) + '世的轮回'}>{v.rein_name}道</Descriptions.Item>

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
