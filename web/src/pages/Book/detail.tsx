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
      return await service.showBook(id);
    },
    {
      refreshDeps: [opFlag],
    },
  );

  return (
    <PageContainer>
      <Descriptions title="Book Info" layout="vertical">
        <Descriptions.Item label="BookName">
          {data === undefined ? '' : data.name}
        </Descriptions.Item>
        <Descriptions.Item label="author">
          {data === undefined ? '' : data.author}
        </Descriptions.Item>
        <Descriptions.Item label="intro">{data === undefined ? '' : data.intro}</Descriptions.Item>
        <Descriptions.Item label="category">
          {data === undefined ? '' : data.category}
        </Descriptions.Item>
      </Descriptions>
    </PageContainer>
  );
};

export default Test;
