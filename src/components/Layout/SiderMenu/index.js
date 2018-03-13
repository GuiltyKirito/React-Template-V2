import 'rc-drawer-menu/assets/index.css';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from './SiderMenu';
import container from './../container';

export default container(
  props =>
    props.layout.isMobile ? (
      <DrawerMenu
        parent={null}
        level={null}
        iconChild={null}
        open={!props.layout.collapsed}
        onMaskClick={() => props.collapsed(true)}
        width="256px"
      >
        <SiderMenu {...props} />
      </DrawerMenu>
    ) : (
      <SiderMenu {...props} />
    ),
);
