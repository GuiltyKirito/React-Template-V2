import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
// import { notification } from 'antd';

const socketio = WrappedComponent => {
  @connect(state => ({ token: state.user.token }))
  class WithSubscription extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    componentWillMount() {
      /*
      const ws = new WebSocket(`${process.env.REACT_APP_WEBSOCKET}?token=${this.props.token}`);

      ws.onmessage = e => {
        if (e.data !== '') {
          if (e.data === 'create' || e.data === 'edit') {
            notification.open({
              message: '通知',
              description: '您有一則新訊息。',
              placement: 'bottomRight',
            });
          }
        }
      };
      */
    }

    render() {
      const { token, ...passThroughProps } = this.props;

      return <WrappedComponent {...passThroughProps} />;
    }
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WithSubscription.displayName = `WithSubscription(${displayName})`;

  hoistNonReactStatic(WithSubscription, WrappedComponent);

  return WithSubscription;
};

export default socketio;
