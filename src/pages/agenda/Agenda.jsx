import Topbar from "../../components/topbar/Topbar";
import Footer from "../home/footer/Footer";
import TicketOverlay from "../../components/ticketOverlay/TicketOverlay"
import Particles from "react-tsparticles";
import { useEffect, useState,useRef } from "react";
import { agendaConsts } from "./AgendaConstants";
import { useSpring, animated } from "react-spring";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "./Agenda.scss";

export default function Agenda() {
  const [day, setDay] = useState(1);
  const parallaxRef = useRef(); //true

  const AgendaItem = (props) => {
    const [isExpanded, setExpand] = useState(false);
    let val = props.val;
    let startObj = new Date(val["startTime"])
    let endObj = new Date(val["endTime"])
    let curObj = new Date()
    // console.log(curObj<startObj)   // works
    let isActive = curObj >= startObj && curObj <= endObj
    return (
      <div
        className={`agendaItem  ${isActive? "active":""}`}
        onMouseEnter={() => setExpand(true)}
        onMouseLeave={() => setExpand(false)}
      >
        <div className="agenda-title">{val["topic"]}</div>
        <div className={`agenda-time`}>
          {val["startTime"]} - {val["endTime"]}
        </div>
        {isExpanded && val["description"] && (
          <div className="description">{val["description"]}</div>
        )}
      </div>
    );
  };

  const DayAgenda = (props) => {
    let day = props.day || 1;
    let agenda = agendaConsts[day];
    return agenda.map((val) => <AgendaItem val={val} />);
  };

  return (
      <>
    <Topbar />
    <div id="agendaPage">
      
      <Parallax pages={2.5} className="parallax-scroll-hook" ref={parallaxRef}>
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={2.25}
          style={{
            background: "#2E383B"}}
        >
          <Particles
            style={{height: "100%"}}
            options={{
              fpsLimit: 30,
              fullScreen: { enable: true },
              particles: {
                color: {
                  value: "#F7904C",
                },
                links: {
                  color: "#F7904C",
                  distance: 200,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                number: {
                  value: 35,
                  density: {
                    enable: true,
                    value_area: 1000,
                  },
                },
                move: {
                  enable: true,
                  speed: 2.5,
                  direction: "top",
                  outMode: "bounce",
                },
              },
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={1} factor={1} onClick={() => parallaxRef.current.scrollTo(1)}>
          <div className="agendaWrap">
            <div className="agenda">
              <div className="main-title">UNICON 2022</div>
              <div id="dayHeader">
                <div
                  className={day == 1 ? "active" : ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDay(1);
                  }}
                >
                  Day 1, Jan 15
                </div>
                <div
                  className={day == 2 ? "active" : ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDay(2);
                  }}
                >
                  Day 2, Jan 16
                </div>
              </div>
              <div className="agendaContainer">
                <DayAgenda day={day} />
              </div>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1} factor={1} onClick={() => parallaxRef.current.scrollTo(0)}>
          <div className="main-title">HIGHLIGHTS FOR UNICON 2022</div>
          <div className="highlights">
            <div className="highlight-row">
                <div className="highlight-col">
                <div className="highlight-icon">
                    <i class="fa fa-bullhorn" aria-hidden="true"></i>
                </div>
                <div className="highlight-details">
                    <div className="highlight-header">Panel Discussion</div>
                    <div className="highlight-info">Seed to Unicorn</div>
                </div>
                </div>
                <div className="highlight-col">
                <div className="highlight-icon">
                    <i class="fa fa-bullhorn" aria-hidden="true"></i>
                </div>
                <div className="highlight-details">
                    <div className="highlight-header">Panel Discussion</div>
                    <div className="highlight-info">Securing Funding</div>
                </div>
                </div>
            </div>
            <div className="highlight-row">
                <div className="highlight-col">
                <div className="highlight-icon">
                <i class="fas fa-fire"></i>
                </div>
                <div className="highlight-details">
                    <div className="highlight-header">Keynote Speaker</div>
                    <div className="highlight-info">Startup to IPO</div>
                </div>
                </div>
                <div className="highlight-col">
                <div className="highlight-icon">
                    {/* TO DO: Change to tiger launch */}
                <i class="fas fa-fire"></i>   
                </div>
                <div className="highlight-details">
                    <div className="highlight-header">TigerLaunch Singapore</div>
                    <div className="highlight-info">Big opportunities await</div>
                </div>
                </div>
            </div>
          </div>
        </ParallaxLayer>
      
        <ParallaxLayer offset={2} speed={0} factor={0.5} onClick={() => parallaxRef.current.scrollTo(0)}>
            <div
              id="footerWrap"
              style={{ height: "100%", position: "relative" }}
            >
              <Footer />
            </div>
        </ParallaxLayer>
      
      </Parallax>
      <TicketOverlay />
    </div>
    </>
  );
}
