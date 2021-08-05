import React, { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider, Button, Modal } from 'antd';
import { UserItem } from './data.d';
import OperationModal from './components/OperationModal';
import { useRequest, Link } from 'umi';
import service from './service';

const Personnel: FC<{}> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<UserItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);
  const potence = '1';
  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.list(potence);
    },
    {
      refreshDeps: [opFlag],
    },
  );

  const deleteItem = async (id: string) => {
    const res = await service.removeUser(id);
    if (!res.error) {
      message.success('删除成功！');
      setOpFlag(opFlag + 1);
    }
  };

  const confirmDelete = (current: UserItem) => {
    Modal.confirm({
      title: '删除用户',
      content: '确定删除该用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => deleteItem(JSON.stringify(current?.id)),
    });
  };

  const columns = [

    {
      title: '操作员',
      dataIndex: 'name',
      key: '',
      valueType: '',
    },
    {
      title: '操作',
      dataIndex: '',
      key: '',
      valueType: '',
    },
    {
      title: '日期',
      dataIndex: '',
      key: '',
      valueType: '',
    },
    {
      title: '姓名',
      dataIndex: '',
      key: '',
      valueType: '',
    },

  ];

  /* 添加current置空 */
  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };
  /* 编辑框将item传给current */
  const showEditModal = (item: UserItem) => {
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

  const handleJump = (page: number) => {
    setPagesize(page);
  };
  const pagination = {
    position: ['bottomRight'],
    showTotal: (total: number) => {
      return `共 ${total} 条记录 第 ${pagesize} / ${Math.ceil(total / 10)} 页`;
    },
    pageSize: 10,
    onChange: handleJump,
  };

  const action = (
    <>
      <Button onClick={showModal}>添加差吏</Button>
    </>
  );

  return (
    <PageContainer>
      <Card title="差吏列表" extra={action}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record: UserItem): number => record.id as number}
        />
      </Card>
      <OperationModal current={current} visible={visible} onOk={handleOk} onCancel={handleCancel} />
    </PageContainer>
  );
};

export default Personnel;