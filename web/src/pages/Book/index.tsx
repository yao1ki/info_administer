import React, { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider, Button, Modal } from 'antd';
import { BookItem } from './data.d';
import OperationModal from './components/OperationModal';
import { useRequest, Link } from 'umi';
import service from './service';
import { Select } from 'antd';
const { Option } = Select;
const Personnel: FC<{}> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<BookItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
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

  const deleteItem = async (id: number) => {
    const res = await service.removeBook(id);
    if (!res.error) {
      message.success('删除成功！');
      setOpFlag(opFlag + 1);

    }
  };

  const confirmDelete = (currentItem: BookItem) => {
    Modal.confirm({
      title: '删除书籍',
      content: '确定删除该书籍吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => deleteItem(currentItem.id as number),
    });
  };

  const columns = [
    {
      title: '书籍信息',
      key: 'action',
      render: (_: any, record: any) => (
        <span>
          <span>
            <Link to={`/Book.detail/${record.id}`}>{record.name}</Link>
          </span>
        </span>
      ),
    },

    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      valueType: 'textarea',
    },

    {
      title: '操作',
      key: 'action',
      render: (item: BookItem) => (
        <span>
          <a
            onClick={() => {
              console.log(item)
              showEditModal(item);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              confirmDelete(item);
            }}
          >
            删除
          </a>
        </span>
      ),
    },
  ];
  /* 添加current置空 */
  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  /* 编辑框将item传给current */
  const showEditModal = (item: BookItem) => {
    setVisible(true);
    setCurrent({ ...item });
  };
  const showDetail = (item: BookItem) => {
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
      <Button onClick={showModal}>添加书籍</Button>
    </>
  );
  return (
    
    <div>
      <PageContainer>
        <Card title="书籍列表" extra={action}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record: BookItem): number => record.id as number}
          />
        </Card>
      </PageContainer>
      <OperationModal current={current} visible={visible} onOk={handleOk} onCancel={handleCancel} />
      <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
      <Option value="lucy">Lucy</Option>
    </Select>
    </div>
  );
};

export default Personnel;
