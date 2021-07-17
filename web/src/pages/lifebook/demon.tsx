import  { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider,  Modal } from 'antd';
import { GhostItem } from './data.d';
import OperationModal from './components/OperationModal';
import { useRequest} from 'umi';
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


const Personnel: FC<SearchProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<GhostItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);

  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.listGhost();
    },
    {
      refreshDeps: [opFlag],
    },
  );

  const deleteItem = async (id: number) => {
    const res = await service.removeGhost(id);
    if (!res.error) {
      message.success('删除成功！');
      setOpFlag(opFlag + 1);
    }
  };

  const confirmDelete = (currentItem: GhostItem) => {
    Modal.confirm({
      title: '删除',
      content: '确定删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => deleteItem(currentItem.id as number),
    });
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      valueType: 'textarea',
    },
    {
      title: '寿命',
      dataIndex: 'lifetime',
      key: 'lifetime',
      valueType: 'textarea',
    },
    {
      title: '死亡方式 ',
      dataIndex: 'cause',
      key: 'cause',
      valueType: 'textarea',
    },
    {
      title: '类别',
      dataIndex: 'sort',
      key: 'sort',
      valueType: 'textarea',
    },
    {
      title: '操作',
      key: 'action',
      render: (item: GhostItem) => (
        <span>
          <a
            onClick={() => {
              console.log(item);
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

  const tabList = [
    {
      key: 'live',
      tab: '阳寿未尽',
    },
    {
      key: 'ghost',
      tab: '孤魂野鬼',
    },
    {
      key: 'demon',
      tab: '投胎转世',
    },
    {
      key: 'mistake',
      tab: '已删除',
    },
  ];

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
      case 'live':
        history.push(`/lifebook/live`);
        break;
      case 'demon':
        history.push(`/lifebook/demon`);
        break;
      case 'ghost':
        history.push(`/lifebook/ghost`);
        break;
      case 'mistake':
        history.push(`/lifebook/mistake`);
        break;
      default:
        break;
    }
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
              style={{ maxWidth: 522, width: '100%' }}
            />
          </div>
        }
        tabList={tabList}
        tabActiveKey={getTabKey()}
        onTabChange={handleTabChange}
      >
        <Card >
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
