import * as redirect from './constant';
import Notice from './Notice';
import SiderMenu from './SiderMenu';
import container from './container';
import renderAuthRoutes from './../../utils/renderAuthRoutes';
import { Avatar, Dropdown, Icon, Layout, Menu, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { Loading } from 'element-react';
import { enquireScreen } from 'enquire-js';
import { getMenuData } from './menu';
import { translate } from 'react-i18next';

import './Basic.module.css';
import logo from './images/logo.png';

let isMobile;
enquireScreen(mobile => (isMobile = mobile));

@translate(['layout'])
@container
class Basic extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.handleCollapsed = this.handleCollapsed.bind(this);
    this.handelItemClose = this.handelItemClose.bind(this);
    this.handelClear = this.handelClear.bind(this);

    props.setMobile(isMobile);
  }

  componentDidMount() {
    enquireScreen(isMobile => this.props.setMobile(isMobile));
  }

  logout() {
    this.props.logout();
    this.props.redirect(redirect.LOGIN);
  }

  handleCollapsed() {
    this.props.collapsed(!this.props.layout.collapsed);
  }

  handelItemClose(id) {
    this.props.spinning(true);
    this.props.deleteNotice(id).then(() => this.props.spinning(false));
  }

  handelClear(data) {
    this.props.spinning(true);
    this.props.clearNotice(data.map(item => item.id)).then(() => this.props.spinning(false));
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const { t, layout, routes, user } = this.props;

    const settingMenu = (
      <Menu>
        <Menu.Item key="logout">
          <a onClick={this.logout}>
            <i className="fa fa-sign-out" style={{ fontSize: 20 }} />&nbsp;{' '}
            {t('header.setting.logout')}
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        {layout.loading && <Loading fullscreen={layout.loading} />}
        <SiderMenu menuData={getMenuData()} />

        <Layout>
          <Header ref="header" styleName="header">
            {isMobile && [
              <Link to="/" styleName="logo" key="logo">
                <img src={logo} alt="logo" />
              </Link>,
              <Divider type="vertical" key="line" />,
            ]}

            <Icon
              styleName="trigger"
              type={layout.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.handleCollapsed}
              style={{ lineHeight: '64px' }}
            />

            <div styleName="right">
              <Notice
                styleName="action"
                spinning={layout.spinning}
                count={layout.notice.data.length}
              >
                <Notice.Tab
                  data={layout.notice.data}
                  title={t('notice.title')}
                  emptyText={t('notice.emptyText')}
                  onItemClose={this.handelItemClose}
                  onClear={this.handelClear}
                />
              </Notice>
              <Dropdown overlay={settingMenu} trigger={['click']} placement="bottomRight">
                <span styleName="action">
                  <Avatar size="large" icon="user" styleName="avatar" />
                  <span>{user.name}</span>
                </span>
              </Dropdown>
            </div>
          </Header>

          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <div style={{ minHeight: 'calc(100vh - 260px)' }}>{renderAuthRoutes(routes)}</div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>{t('footer.copyright')}</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Basic;
