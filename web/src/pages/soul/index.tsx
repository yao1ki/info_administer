import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import type { FC } from 'react';
import React from 'react';
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

const tabList = [
  {
    key: 'god',
    tab: '天人',
  },
  {
    key: 'people',
    tab: '人间',
  },
  {
    key: 'shura',
    tab: '修罗',
  },
  {
    key: 'animal',
    tab: '畜生',
  },
  {
    key: 'ghoul',
    tab: '恶鬼',
  },
  {
    key: 'hell',
    tab: '地狱',
  },
];

const Search: FC<SearchProps> = (props) => {
  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'god':
        history.push(`${url}/god`);
        break;
      case 'people':
        history.push(`${url}/people`);
        break;
      case 'shura':
        history.push(`${url}/shura`);
        break;
      case 'animal':
        history.push(`${url}/animal`);
        break;
      case 'ghoul':
        history.push(`${url}/ghoul`);
        break;
      case 'hell':
        history.push(`${url}/hell`);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };
  // const constructor=(props:any)=>{
  //   super(props);
  //   this.state={
  //     name
  //   }

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
      {props.children}
    </PageContainer>
  );
};

export default Search;
