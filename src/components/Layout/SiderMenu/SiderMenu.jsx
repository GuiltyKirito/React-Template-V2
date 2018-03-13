import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import container from './../container';
import check from './../../Auth/check';

import './SiderMenu.module.css';
import logo from './../images/logo.png';

@compose(container, translate(['layout']), check)
class SiderMenu extends React.Component {
  constructor(props) {
    super(props);

    this.menus = props.menuData;

    this.handleOpenChange = this.handleOpenChange.bind(this);
    this.handleCollapsed = this.handleCollapsed.bind(this);

    this.state = {
      openKeys: [],
    };
  }

  handleOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    this.setState({
      openKeys: latestOpenKey ? [latestOpenKey] : [],
    });
  }

  handleCollapsed(collapsed) {
    if (this.props.isMobile) {
      this.props.collapsed(false);
    } else {
      this.props.collapsed(collapsed);
    }
  }

  getNavMenuItems(menusData) {
    if (!menusData) {
      return [];
    }

    return menusData
      .filter(item => item.name)
      .filter(item => this.props.checkPermission(item.name))
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => !!item);
  }

  getSubMenuOrItem(item) {
    if (item.children && item.children.some(child => child.name)) {
      return (
        <Menu.SubMenu
          key={item.name}
          title={
            item.icon ? (
              <span>
                {this.getIcon(item.icon)}
                <span>{this.props.t(`sidebar.${item.title}`)}</span>
              </span>
            ) : (
              this.props.t(`sidebar.${item.title}`)
            )
          }
        >
          {this.getNavMenuItems(item.children)}
        </Menu.SubMenu>
      );
    } else {
      return <Menu.Item key={item.name}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  }

  getMenuItemPath(item) {
    if (item.path) {
      return (
        <Link to={item.path}>
          {this.getIcon(item.icon)}
          <span>{this.props.t(`sidebar.${item.title}`)}</span>
        </Link>
      );
    } else {
      return (
        <a>
          {this.getIcon(item.icon)}
          <span>{this.props.t(`sidebar.${item.title}`)}</span>
        </a>
      );
    }
  }

  getIcon(icon) {
    if (typeof icon === 'string' && icon.indexOf('fa') === 0) {
      return <i className={classNames('fa', icon)} style={{ fontSize: 20 }} />;
    }

    if (typeof icon === 'string') {
      return <Icon type={icon} />;
    }

    return icon;
  }

  render() {
    const { Sider } = Layout;

    const menuProps = this.props.layout.collapsed
      ? {}
      : {
          openKeys: this.state.openKeys,
        };

    return (
      <Sider
        breakpoint="md"
        collapsed={this.props.layout.collapsed}
        collapsible
        onCollapse={this.handleCollapsed}
        styleName="sider"
        trigger={null}
        width={256}
      >
        <div styleName="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{this.props.t('header.logo')}</h1>
          </Link>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          {...menuProps}
          selectedKeys={[this.props.layout.sidebar.current]}
          onOpenChange={this.handleOpenChange}
          onClick={({ keyPath }) => keyPath.length === 1 && this.setState({ openKeys: [] })}
          style={{ margin: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(this.menus)}
        </Menu>
      </Sider>
    );
  }
}

SiderMenu.propTypes = {
  menuData: PropTypes.array.isRequired,
};

export default SiderMenu;
