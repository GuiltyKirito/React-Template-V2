import routes from './../../routes';

const menuData = [
  {
    name: 'home',
    icon: 'fa-tachometer',
    title: 'home',
  },
];

function combinePath(menuData) {
  const routeData = routes[0].routes[1].routes
    .map(route => {
      return {
        menu: route.menu,
        path: route.path,
      };
    })
    .filter(route => route.path !== '/');

  return menuData.map(item => {
    if (item.children) {
      return {
        ...item,
        children: combinePath(item.children),
      };
    } else {
      const data = routeData.find(route => route.menu === item.name);
      const path = data ? data.path : null;

      return {
        ...item,
        path,
      };
    }
  });
}

export const getMenuData = () => combinePath(menuData);
