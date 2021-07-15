import { Descriptions, Button, Card } from 'antd';
import { FC, useState } from 'react';
import { BookItem } from './data.d';
import OperationModal from './components/OperationModal';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams, useRequest } from 'umi';
import service from './service';
interface params {
  id: string;
}

const Test: FC<{}> = () => {
  /* current作为修改值可能存在部分属性 */
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BookItem> | undefined>(undefined);
  const [opFlag, setOpFlag] = useState<number>(0);

  const params: params = useParams();

  const id = params.id;
  const showEditModal = (item: BookItem) => {
    setVisible(true);
    setCurrent({ ...item });
  };
  const handleOk = () => {
    setVisible(false);
    setOpFlag(opFlag + 1);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  let { data } = useRequest(
    async () => {
      return await service.showBook(id);
    },
    {
      refreshDeps: [opFlag],
    },
  );

  const action = (
    <>
      <Button onClick={() => {
              showEditModal(data)}}>书籍编辑</Button>
    </>
  );

  return (
    <PageContainer>
      <Descriptions title="书籍详情" extra={action}></Descriptions>
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
    <OperationModal current={current} visible={visible} onOk={handleOk} onCancel={handleCancel}  />

    </PageContainer>
    
  );
};

export default Test;
