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
import moment from 'moment';

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
    key: 'live',
    tab: '阳寿未尽',
  },
  {
    key: 'ghost',
    tab: '阳寿已尽',
  },
  {
    key: 'birth',
    tab: '投胎转世',
  },
  {
    key: 'mistake',
    tab: '永世不得轮回',
  },
];
const state ="3";

const Personnel: FC<SearchProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<GhostItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);
  const [key, setKey] = useState<string>('live');
  const [params, setParams] = useState<string>('');

  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.querystate(state,params);
    },
    {
      refreshDeps: [opFlag],
    },
  );
  
  const deleteItem = async (id: number) => {
    const res = await service.removeGhost(id);
    if (!res.error) {
      message.success('放逐成功！');
      setOpFlag(opFlag + 1);
    }
  };

  const confirmDelete = (currentItem: GhostItem) => {
    Modal.confirm({
      title: '放逐',
      content: '确定放逐？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => deleteItem(currentItem.id as number),
    });
  };


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
      title: '出生日期',
      dataIndex: 'time_start',
      key: 'lifetime',
      valueType: 'textarea',
      render: (_: any, record: any) => {
        return moment(record.time_start).format('YYYY年MM月DD日');
      },
    },
    {
      title: '死亡日期',
      key: 'lifetime',
      valueType: 'textarea',
      render: (_: any, record: any) => {
        return moment(record.time_end).format('YYYY年MM月DD日');
      },
    },
    {
      title: '死亡方式 ',
      dataIndex: 'cause',
      key: 'cause',
      valueType: 'textarea',
    },
    {
      title: '生肖',
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
      case 'birth':
        history.push(`/lifebook/birth`);
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



  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    setParams(value);
    setOpFlag(opFlag+1);
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
