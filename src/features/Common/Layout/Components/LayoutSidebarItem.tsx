import { MouseEventHandler, ReactElement, useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SidebarItemType } from '@interfaces/Common/commonTypes';

import LayoutSidebarItemChildren from './LayoutSidebarItemChildren';
import LayoutSidebarItemContent from './LayoutSidebarItemContent';

interface LayoutSidebarItemProps {
  icon: ReactElement;
  label: string;
  to: string;
  childrenItems?: SidebarItemType[];
}

const LayoutSidebarItem = ({ icon, label, to, childrenItems }: LayoutSidebarItemProps) => {
  const { pathname } = useLocation();

  const [isShowChildren, setIsShowChildren] = useState(false);

  const isActive = useMemo(() => {
    if (pathname === to) {
      return true;
    }

    if (childrenItems?.length) {
      const isChildrenActive = childrenItems.some((item) => item.to === pathname);

      if (isChildrenActive) {
        setIsShowChildren(true);
      } else {
        setIsShowChildren(false);
      }

      return isChildrenActive;
    }

    return false;
  }, [pathname, to, setIsShowChildren]);

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    e.preventDefault();
    setIsShowChildren((prevState) => !prevState);
  }, []);

  if (!childrenItems?.length) {
    return (
      <Link to={to}>
        <LayoutSidebarItemContent
          icon={icon}
          label={label}
          hasChildren={Boolean(childrenItems?.length)}
          isActive={isActive}
          isShowChildren={isShowChildren}
        />
        {childrenItems?.length && <LayoutSidebarItemChildren items={childrenItems} isShow={isShowChildren} />}
      </Link>
    );
  }

  return (
    <div onClick={handleClick}>
      <LayoutSidebarItemContent
        icon={icon}
        label={label}
        hasChildren={Boolean(childrenItems?.length)}
        isActive={isActive}
        isShowChildren={isShowChildren}
      />
      {childrenItems?.length && <LayoutSidebarItemChildren items={childrenItems} isShow={isShowChildren} />}
    </div>
  );
};

export default LayoutSidebarItem;
