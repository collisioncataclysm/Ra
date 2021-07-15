import React from "react";
import classnames from "classnames";
import { VscClose } from "react-icons/vsc";
import MenuBar from "../MenuBar/MenuBar";

import css from "./tabBar.module.css";

const Tab = (props) => {
  const title = `${props.type}- ${props.name}`;
  const tabClass = classnames({
    [css["tabbar-tab"]]: true,
    [css["active"]]: props.active,
    [css["inactive"]]: !props.active,
  });
  return (
    <div className={tabClass}>
      <p>{title}</p>
      <span>
        <VscClose />
      </span>
    </div>
  );
};

const TabBar = ({ tabs }) => {
  return (
    <div className={css["th-tabbar"]}>
      <div className={css["tabbar-section"]}>
        <MenuBar />
      </div>
      <div className={css["tabbar-section"]}>
        {tabs && tabs.map((tab, i) => <Tab {...tab} key={i} />)}
      </div>
    </div>
  );
};

export default TabBar;
