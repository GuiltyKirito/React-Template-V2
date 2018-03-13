import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import * as action from './action';
import { logout } from './../Auth/action';

const mapStateToProps = state => ({
  user: state.user,
  layout: state.layout,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...action,
      logout,
      redirect: pathname => replace(pathname),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps);
