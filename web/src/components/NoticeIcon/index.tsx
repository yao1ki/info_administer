import { useEffect, useState } from 'react';
import { Tag, message, Table } from 'antd';
import { groupBy } from 'lodash';
import moment from 'moment';
import { useModel } from 'umi';
import { getNotices } from '@/services/ant-design-pro/api';
import { useRequest, Link } from 'umi';
import service from './service';
import { GhostItem } from './data.d';
import { history } from 'umi';

import NoticeIcon from './NoticeIcon';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
};

const getNoticeData = (notices: API.NoticeIconItem[]): Record<string, API.NoticeIconItem[]> => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    if (newNotice.datetime) {
      newNotice.datetime = moment(notice.datetime as string).fromNow();
    }

    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }

    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag
          color={color}
          style={{
            marginRight: 0,
          }}
        >
          {newNotice.extra}
        </Tag>
      ) as any;
    }

    return newNotice;
  });
  return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData: Record<string, API.NoticeIconItem[]>) => {
  const unreadMsg: Record<string, number> = {};

  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => !item.read).length;
    }
  });
  return unreadMsg;
};

const NoticeIconView = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [notices, setNotices] = useState<API.NoticeIconItem[]>([]);
  const [params, setParams] = useState<string>('');

  let { data } = useRequest(async () => {
    return await service.list();
  });

  useEffect(() => {
    getNotices().then(({ data }) => setNotices(data || []));
  }, []);

  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});

  const changeReadState = (id: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.id === id) {
          notice.read = true;
        }
        return notice;
      }),
    );
  };

  const clearReadState = (title: string, key: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.type === key) {
          notice.read = true;
        }
        return notice;
      }),
    );
    message.success(`${'清空了'} ${title}`);
  };
  const aa = [
    {
      id: '000000005',
      title: '内容不要超过两行字，超出时自动截断',
      datetime: '2017-08-07',
      description: '描述信息描述信息描述信息',
      extra: '',
      status:'',
      ghostid:''
    },
  ];
  data === undefined
    ? ''
    : data.map(
        (v: any, i: any) =>
          aa.push({status:v.state,
            ghostid:v.id,
            extra:
              v.state == 1
                ? '待处理'
                : v.state == 2
                ? '待确认'
                : v.state == 3
                ? '待验收'
                : v.state == 5
                ? '待投胎'
                : '待分配命运',
            id: i,
            title: v.name,
            datetime: '死亡时间' + moment(v.time_end).format('YYYY年MM月DD日HH时'),
            description: '类别' + v.rein === undefined ? '' : v.rein.name,
          }),
        aa.shift(),
      );

  return (

    <NoticeIcon
      className={styles.action}
      count={aa && aa.length}
      onItemClick={(item) => {console.log("1111111111",item),
        (item.status=='1'?
        history.push(`/erotic/undispose`):
        item.status=='2'?
        history.push(`/erotic/process`):
        item.status=='3'?
        history.push(`/erotic/checkout`):
        item.status=='5'?
        history.push(`/Lucky/rein`):
        item.status=='6'?
        history.push(`/Lucky/birth`):'')
      }}
      loading={false}
    >
      <NoticeIcon.Tab
        style={{ textAlign: 'center' }}
        tabKey="event"
        title="未处理"
        emptyText="你已完成所有任务"
        list={aa}
      />
      <NoticeIcon></NoticeIcon>
    </NoticeIcon>
  );
};

export default NoticeIconView;
