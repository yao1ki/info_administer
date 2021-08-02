import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '转轮王技术部出品',
  });

  return (
    <DefaultFooter 
      copyright={`2021 ${defaultMessage}`}
      links={[
        {
          key: 'the nether world',
          title: 'the nether world',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Hell',
          title: 'Hell',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};
