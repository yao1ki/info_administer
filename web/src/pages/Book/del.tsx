import React, { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider, Button, Modal } from 'antd';
import { BookItem } from './data.d';
import OperationModal from './components/OperationModal';
import { useRequest,Link } from 'umi';
import service from './service';

const Personnel: FC<{}> = () => {
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<BookItem> | undefined>(undefined);
  const [opFlag, setOpFlag] = useState<number>(0);

  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.listBooks();
    },
    {
      refreshDeps: [opFlag],
    },
  );





   const columns = [
    {
      title: '书籍信息',
      key: 'action',
      dataIndex: 'name',
      valueType: 'textarea',

    },

    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
      valueType: 'textarea',
    },
    
  ];



  return (
      <PageContainer>
        <Card title="书籍详情" >
          <Table
            columns={columns}
            dataSource={data}
          />
        </Card>
      </PageContainer>
  );
};

export default Personnel;
