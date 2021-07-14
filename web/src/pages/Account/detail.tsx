import { Descriptions } from 'antd';
import { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams, useRequest } from 'umi';
import service from './service';
interface params {
  id: string;
}

const Test: FC<{}> = () => {
  /* current作为修改值可能存在部分属性 */
  const [opFlag] = useState<number>(0);

  const params: params = useParams();

  const id = params.id;

  let { data } = useRequest(
    async () => {
      return await service.showUser(id);
    },
    {
      refreshDeps: [opFlag],
    },
  );

  return (
    <PageContainer>
      <Descriptions title="User Info" layout="vertical">
        <Descriptions.Item label="UserName">
          {data === undefined ? '' : data.username}
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
    </PageContainer>
  );
};

export default Test;
