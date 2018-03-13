import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'antd';

import './NoticeList.module.css';
import notFound from './../images/notfound.svg';

const NoticeList = ({ data, title, emptyText, locale, onClose, onItemClick, onClear }) => {
  if (data.length === 0) {
    return (
      <div styleName="notFound">
        <img src={notFound} alt="Not Found" />
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }

  return [
    <List
      key="list"
      styleName="list"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item
          className="notice-item"
          styleName="item"
          actions={[<Icon type="close-circle" onClick={() => onClose(item.id)} />]}
        >
          <List.Item.Meta
            styleName="meta"
            avatar={null}
            title={null}
            onClick={() => onItemClick(item)}
            description={
              <div styleName="description" title={item.content}>
                {item.content}
              </div>
            }
          />
        </List.Item>
      )}
    />,
    <div key="clear" styleName="clear" onClick={onClear}>
      {`${locale.clear}${title}`}
    </div>,
  ];
};

NoticeList.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  emptyText: PropTypes.string,
  locale: PropTypes.shape({
    emptyText: PropTypes.string,
    clear: PropTypes.string,
  }),
  onClose: PropTypes.func,
  onItemClick: PropTypes.func,
  onClear: PropTypes.func,
};

export default NoticeList;
