import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Popover, Tabs, Badge, Spin, Icon, Modal } from 'antd';
import List from './NoticeList';
import { compose } from 'recompose';
import { translate } from 'react-i18next';
import socketio from './socketio';

import './index.module.css';

const { TabPane } = Tabs;

class Notice extends React.Component {
  static Tab = TabPane;

  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);

    this.state = {
      modalVisible: false,
      visible: false,
    };
  }

  handleItemClick(item) {
    if (this.state.modalVisible === false) {
      const { t } = this.props;
      this.setState({ modalVisible: true });

      Modal.info({
        title: `${t('notice.item.title')} (${t('notice.item.sender')}: ${item.sender})`,
        content: <span style={{ wordBreak: 'break-all' }}>{item.content}</span>,
        okText: t('notice.item.ok'),
        onOk: () => this.setState({ modalVisible: false }),
        onCancel: () => this.setState({ modalVisible: false }),
      });
    }
  }

  handleClose(id, onItemClose) {
    if (this.state.modalVisible === false) {
      const { t } = this.props;
      this.setState({ modalVisible: true });

      Modal.confirm({
        title: t('notice.close.title'),
        content: t('notice.close.content'),
        okType: 'danger',
        onOk: () => {
          onItemClose(id);
          this.setState({ modalVisible: false });
        },
        onCancel: () => this.setState({ modalVisible: false }),
      });
    }
  }

  handleClear(data, onClear) {
    if (this.state.modalVisible === false) {
      const { t } = this.props;
      this.setState({ modalVisible: true });

      Modal.confirm({
        title: t('notice.clear.title'),
        content: t('notice.clear.content'),
        okType: 'danger',
        onOk: () => {
          onClear(data);
          this.setState({ modalVisible: false });
        },
        onCancel: () => this.setState({ modalVisible: false }),
      });
    }
  }

  handleVisibleChange(visible) {
    this.setState({ visible: this.state.modalVisible || visible });
  }

  getNotificationBox() {
    const { t, children, spinning } = this.props;

    if (!children) {
      return null;
    }

    const panes = React.Children.map(children, (child, key) => {
      const { data, title, onItemClose, onClear } = child.props;
      const tab = data && data.length > 0 ? `${title} (${data.length})` : title;

      return (
        <TabPane tab={tab} key={key}>
          <List
            {...child.props}
            data={data}
            title={title}
            locale={{ emptyText: t('notice.list.emptyText'), clear: t('notice.list.clear') }}
            onClose={id => this.handleClose(id, onItemClose)}
            onItemClick={this.handleItemClick}
            onClear={() => this.handleClear(data, onClear)}
          />
        </TabPane>
      );
    });

    return (
      <Spin spinning={spinning} delay={0}>
        <Tabs className="notice-tabs">{panes}</Tabs>
      </Spin>
    );
  }

  render() {
    const { styleName, className, count } = this.props;
    const notificationBox = this.getNotificationBox();

    const NoticeIcon = (
      <span
        className={classNames(className)}
        styleName={classNames({ 'notice-icon': true }, styleName)}
      >
        <Badge count={count}>
          <Icon type="bell" />
        </Badge>
      </span>
    );

    if (!notificationBox) {
      return NoticeIcon;
    }

    return (
      <Popover
        placement="bottomRight"
        popupClassName="notice-popover"
        content={notificationBox}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter
      >
        {NoticeIcon}
      </Popover>
    );
  }
}

Notice.propTypes = {
  count: PropTypes.number.isRequired,
  spinning: PropTypes.bool,
};

Notice.defaultProps = {
  spinning: false,
};

export default compose(translate(['layout']), socketio)(Notice);
