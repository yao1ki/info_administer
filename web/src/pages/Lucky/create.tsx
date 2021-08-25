import  { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table} from 'antd';
import { GhostItem } from './data';
import GodModal from './components/GodModal';
import OperationModal from './components/OperationModal';
import { useRequest, Link } from 'umi';
import service from './service';
import { Input } from 'antd';
import { history } from 'umi';

type SearchProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const state = '6';

const Personnel: FC<SearchProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<GhostItem> | undefined>(undefined);

  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);
  const [params, setParams] = useState<string>('');
  var aa;

  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.querystate(state, params);
    },
    {
      refreshDeps: [opFlag],
    },
  );
  const tabList = [
    {
      key: 'rein',
      tab: '投胎管理',
    },
    {
      key: 'create',
      tab: '已投胎',
    },
 
  ];
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ghost_id',
      key: 'ghost_id',
      valueType: 'textarea',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      valueType: 'textarea',
    },
    {
      title: '投胎转世',
      dataIndex: 'rein',
      key: 'rein',
      valueType: 'textarea',
      render: (_: any, record: any) => {
        return record.rein.name
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (item: GhostItem) => (
        <span>
          <a
            onClick={() => {
              aa=item.rein_id;
              showEditModal(item);
            }}
          >
            分配命运
          </a>
        </span>
      ),
    },
  ];

  const showEditModal = (item: GhostItem) => {
    setVisible(true);
    setCurrent({id:item.id,rein_id:item.rein_id});
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
  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'rein':
        history.push(`/Rein`);
        break;
      case 'create':
        history.push(`/Create`);
        break;
      default:
        break;
    }
  };
  const pagination = {
    position: ['bottomRight'],
    showTotal: (total: number) => {
      return `共 ${total} 条记录 第 ${pagesize} / ${Math.ceil(total / 10)} 页`;
    },
    pageSize: 10,
    onChange: handleJump,
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
