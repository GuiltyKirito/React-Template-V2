import { Redirect, Switch } from 'react-router-dom';
import stores from './../stores';
import * as redirect from './../constant/redirect';
import EnhancedRoute from './EnhancedRoute';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import Exception from './../components/Exception';

export const reducePermissions = (permissions, menu) =>
  permissions
    .filter(permission => permission.match(/^(all|read)/i) && permission.match(menu))
    .map(permission => permission.replace(/^(all|read)\./i, ''));

export const renderAuthRoutes = routes =>
  routes ? (
    <Switch>
      {routes.map(({ component: Component, auth, menu, ...rest }, key) => {
        return (
          <EnhancedRoute
            key={key}
            {...rest}
            menu={menu}
            render={props => {
              if (auth !== undefined) {
                const { login, permissions } = stores.getState().user;
                if (login === auth) {
                  if (!!menu && permissions) {
                    const havePermission = reducePermissions(permissions, menu);
                    const Authorized = RenderAuthorized(menu);

                    return (
                      <Authorized authority={havePermission} noMatch={<Exception type={403} />}>
                        <Component {...rest} menu={menu} {...props} />
                      </Authorized>
                    );
                  } else {
                    return <Component {...rest} menu={menu} {...props} />;
                  }
                } else {
                  const pathname = login ? redirect.BASE : redirect.LOGIN;

                  return <Redirect to={{ pathname: pathname, from: props.location }} />;
                }
              } else {
                return <Component {...rest} {...props} />;
              }
            }}
          />
        );
      })}
    </Switch>
  ) : null;

export default renderAuthRoutes;
