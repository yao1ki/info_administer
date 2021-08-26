import { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider, Modal } from 'antd';
import { GhostItem } from './data.d';
import Back from './components/checkout';
import { useRequest } from 'umi';
import service from './service';
import { Input } from 'antd';
import { history } from 'umi';
import { values } from 'lodash';
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
    tab: '阎王验收',
  },
  {
    key: 'chargeback',
    tab: '受刑中',
  },
];
const state = '3';
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
      return await service.list(state, params);
    },
    {
      refreshDeps: [opFlag],
    },
  );


  const columns = [
    {
      title: '灵魂ID',
      dataIndex: 'id',
      key: 'id',
      valueType: 'textarea',
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
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (item: GhostItem) => (
        <span >
      

          <a
            onClick={() => {
              showEditModal(item);
            }}
          >
           阎王审判
          </a>
        </span>
      ),
    },
  ];
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
    switch (key) {
      case 'order':
        history.push(`/Form/index.tsx`);
        break;
      case 'process':
        history.push(`/Form/process.tsx`);
        break;
      case 'checkout':
        history.push(`/Form/checkout.tsx`);
        break;
      case 'chargeback':
        history.push(`/Form/chargeback.tsx`);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (value: string) => {
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
      <Back current={current} visible={visible} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
};

export default Personnel;
