import { Route } from 'react-router-dom';
import * as types from './../components/Layout/actionType';
import stores from './../stores';

class EnhancedRoute extends Route {
  componentDidMount() {
    if (this.props.menu) {
      stores.dispatch({
        type: types.CHANGE_ACTIVE,
        current: this.props.menu,
      });
    }
  }
}

export default EnhancedRoute;
