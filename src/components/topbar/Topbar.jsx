import "./topbar.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import { useHistory } from "react-router-dom";

function TopbarIcon({ url, icon, badgeNumber }) {
  return (
    <Link className="topbarIconItem" to={url}>
      <div className="topbarSvgWrap">
        {icon}
        <span className="topbarIconBadge">{badgeNumber}</span>
      </div>
    </Link>
  );
}

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const gotoMessages = () => {
    try {
      history.push("/messenger");
      //axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {
      alert("Invalid link");
    }
  };


  /**
   * 
   * 
          <span className="topbarLink button" onClick={toSignup}>
            Register
          </span>
   * 
   */
  const toSignup = () => {
    window.open("https://www.w3schools.com"); 
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none", padding: "16px"}}>
          <img src="../../assets/images/uniconTitle2.png" style={{margin: "8px",height: "48px"}}/>
          {/* <span className="logo">UNICON 2022</span> */}
        </Link>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link className="topbarLink" to="/about">About UNICON</Link>
          <Link className="topbarLink" to="/agenda">Agenda</Link>
          <Link className="topbarLink" to="/speakers">Speakers</Link>
          <Link className="topbarLink" to="/tigerlaunch">TigerLaunch</Link>
          <Link className="topbarLink" to="/pricing">Pricing</Link>
          <Link className="topbarLink" to="/contact">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
//https://dev.to/iwaniukooo11/send-e-mails-directly-from-front-end-with-js-5d7d
