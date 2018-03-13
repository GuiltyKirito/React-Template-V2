import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';

const check = WrappedComponent => {
  @connect(state => ({ roles: state.user.roles, permissions: state.user.permissions }))
  class WithSubscription extends React.Component {
    constructor(props) {
      super(props);

      this.checkRole = this.checkRole.bind(this);
      this.checkPermission = this.checkPermission.bind(this);
    }

    checkRole(value) {
      if (!!this.props.roles) {
        return this.props.roles.findIndex(role => role === value) > -1;
      }

      return false;
    }

    checkPermission(value) {
      if (!!this.props.permissions) {
        return (
          this.props.permissions.filter(
            permission => permission.match(/^(all|read)/i) && permission.match(value),
          ).length > 0
        );
      }

      return false;
    }

    render() {
      const { roles, permissions, ...passThroughProps } = this.props;

      return (
        <WrappedComponent
          checkRole={this.checkRole}
          checkPermission={this.checkPermission}
          {...passThroughProps}
        />
      );
    }
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WithSubscription.displayName = `WithSubscription(${displayName})`;

  hoistNonReactStatic(WithSubscription, WrappedComponent);

  return WithSubscription;
};

export default check;
