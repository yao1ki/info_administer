import React, { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider, Button, Modal } from 'antd';
import { GhostItem } from './data.d';
import OperationModal from './components/OperationModal';
import { useRequest, Link } from 'umi';
import service from './service';
import { Input } from 'antd';
import { history } from 'umi';
import { values } from 'lodash';

import { Select } from 'antd';
const state = '1';
const { Option } = Select;
type SearchProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};
const tabList = [
  {
    key: 'order',
    tab: '未处理',
  },
  {
    key: 'process',
    tab: '勾魂中',
  },
  {
    key: 'checkout',
    tab: '孟婆验收',
  },
  {
    key: 'chargeback',
    tab: '退单',
  },
];

const Personnel: FC<SearchProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<GhostItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);
  const [params, setParams] = useState<string>('');
  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.list();
    },
    {
      refreshDeps: [opFlag],
    },
  );
  const confirmDelete = (current: GhostItem) => {
    Modal.confirm({
      title: '确认勾魂',
      content: '确定勾对人了吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => deleteItem(JSON.stringify(current?.id)),
    });
  };
  const deleteItem = async (id: any) => {
    const res = await service.removeOrder(id);
    if (!res.error) {
      message.success('确认成功！');
      setOpFlag(opFlag + 1);
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ghost_id',
      key: 'id',
      valueType: 'textarea',
      // render: (_:any, record:any) => {
      //   return record.ghost.name;
      // }
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      valueType: 'textarea',
      // render: (_: any, record: any) => {
      //   return record.ghost.name;
      // },
    },
    {
      title: '勾魂使者',
      dataIndex: 'name',
      key: 'name',
      valueType: 'textarea',
      render: (_: any, record: any) => {
        return record.orders.map((v: any, i: any) => {
          if (i < record.orders.length - 1) {
            return v.user.name + '、';
          } else {
            return v.user.name;
          }
        });
        //return record.ghost.name;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (item: GhostItem) => (
        <span>
          <a
            onClick={() => {
              confirmDelete(item);
            }}
          >
            确认
          </a>
          <Divider type="vertical" />

          <a
            onClick={() => {
              showEditModal(item);
            }}
          >
            退单
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
  const showEditModal = (item: GhostItem) => {
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
  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'order':
        history.push(`/order/index.tsx`);
        break;
      case 'process':
        history.push(`/order/process`);
        break;
      case 'checkout':
        history.push(`/order/checkout`);
        break;
      case 'chargeback':
        history.push(`/order/chargeback`);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    setParams(value);
    setOpFlag(opFlag + 1);
  };

  const getTabKey = () => {
    const { match, location } = props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  return (
    <div>
      <PageContainer
        content={
          <div style={{ textAlign: 'center' }}>
            <Input.Search
              placeholder="请输入"
              enterButton="搜索"
              size="large"
              onSearch={handleFormSubmit}
              style={{ maxWidth: 522, width: '100%' }}
            />
          </div>
        }
        tabList={tabList}
        tabActiveKey={getTabKey()}
        onTabChange={handleTabChange}
      >
        <Card>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record: GhostItem): number => record.id as number}
          />
        </Card>
      </PageContainer>
      <OperationModal current={current} visible={visible} onOk={handleOk} onCancel={handleCancel} />
      {/* <Select>
        {arr.data === undefined
          ? ''
          : arr.data.map((v: any) => <Option value={v.name}>{v.name}</Option>)}
      </Select> */}
    </div>
  );
};

export default Personnel;
