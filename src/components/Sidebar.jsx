import logo from "../asset/logo.png";
import "./sidebar.css";
import React, { useState } from "react";
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaPlus,
  FaCertificate,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const menuItem = [
    {
      path: "/addCertificates",
      name: "AddCertificates",
      icon: <FaPlus />,
    },
    {
      path: "/certificates",
      name: "Certificates",
      icon: <FaCertificate />,
    },
    {
      path: "/",
      name: "Logout",
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <div className={`container ${isOpen ? "open" : ""}`}>
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <Link to="/dashboard" onClick={toggle} className="logo">
            <img
              src={logo}
              alt="Logo"
              style={{ display: isOpen ? "block" : "none" }}
            />
          </Link>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            {isOpen ? (
              <FaAngleDoubleLeft onClick={toggle} />
            ) : (
              <FaAngleDoubleRight onClick={toggle} />
            )}
          </div>
        </div>

        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
