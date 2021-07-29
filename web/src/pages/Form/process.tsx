import { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider, Modal } from 'antd';
import { GhostItem } from './data.d';
import OperationModal from './components/OperationModal';
import { useRequest } from 'umi';
import service from './service';
import { Input } from 'antd';
import { history } from 'umi';

const state = '2';
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
  const [current] = useState<Partial<GhostItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);
  const [params, setParams] = useState<string>('');
  //获取数据
  let { data } = useRequest(
    async () => {
      console.log(params)
      return await service.list(state,params);
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
      onOk: () => showEditModal(JSON.stringify(current?.id)),
    });
  };
  const showEditModal = async (id: any) => {
    const res = await service.updateGhost(id,{"state":"3"});
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
      valueType: 'textarea'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
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
            确认已勾魂
          </a>
          <Divider type="vertical" />
        </span>
      ),
    },
  ];


  /* 编辑框将item传给current */
;

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

    </div>
  );
};

export default Personnel;
