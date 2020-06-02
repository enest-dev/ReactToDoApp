import React from "react";

import MainNav from "./MainNav/MainNav";
import "./Layout.scss";

class Layout extends React.Component {
  public render() {
    return (
      <div className="content-wrapper">
        <MainNav />
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
