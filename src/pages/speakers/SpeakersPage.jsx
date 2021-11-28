import Topbar from "../../components/topbar/Topbar";
import Footer from "../home/footer/Footer";
import Particles from "react-tsparticles";
import TicketOverlay from "../../components/ticketOverlay/TicketOverlay";
import { useEffect, useState, useMemo, useRef, createRef } from "react";
import { Link } from "react-router-dom";
import { throttle } from "lodash";
import { ReactCSSTransitionGroup } from 'react-transition-group'; 
import "./SpeakersPage.scss";

import { speakerInfo2021, speakerInfo2019 } from "./SpeakerInfo";

// const uniconDP =
//   "https://instagram.fsin5-1.fna.fbcdn.net/v/t51.2885-19/s320x320/244412855_1186787335131880_688207572625348860_n.jpg?_nc_ht=instagram.fsin5-1.fna.fbcdn.net&_nc_ohc=4sY4bxNQescAX8yxB0i&edm=ABfd0MgBAAAA&ccb=7-4&oh=6089230ed54c72498ab5c9f4b2a44b88&oe=6188F921&_nc_sid=7bff83";

const uniconDP = "/assets/images/uniconInstaDp.jpg";

const uniconInsta = "https://www.instagram.com/nesunicon/";

const ProfilePic = () => {
  return (
    <div className="profilePic">
      <div className="profilePic__ring">
        <InstaStoryCircle />
      </div>
      <div className="profilePic__img">
        <img
          src={uniconDP}
          style={{ width: "90%", height: "90%", borderRadius: "50%" }}
          onClick={() => {
            window.open(uniconInsta);
          }}
        />
      </div>
    </div>
  );
};

const InstaStoryCircle = () => {
  return (
    <svg viewBox="0 0 245 245" className={"InstaStoryCircle"}>
      <linearGradient id="linearColors1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#CA48A0" />
        <stop offset="100%" stopColor="#F9A75F" />
      </linearGradient>
      <linearGradient id="linearColors2" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#F9A75F" />
        <stop offset="100%" stopColor="#CA48A0" />
      </linearGradient>
      {/* <path
        d="M122.5 2.5 a120 120 0 0 1 0 240"
        fill="none"
        stroke="url(#linearColors1)"
        strokeWidth="5"
      />
      <path
        d="M122.5 242.5 a120 120 0 0 1 0 -240"
        fill="none"
        stroke="url(#linearColors2)"
        stroke-width="5"
      /> */}
      <circle
        id="firstCircle"
        cx="122.5"
        cy="122.5"
        r="120"
        stroke="url(#linearColors1)"
        stroke-width="3"
      ></circle>
    </svg>
  );
};

export default function SpeakersPage({ win_width, win_height, is_mobile }) {
  const postListRef = useRef(null); //true
  const [year, setYear] = useState(2021);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [speakerList, setSpeakerList] = useState(speakerInfo2021);

  // const [openMoreInfo, setOpenMoreInfo] = useState(false);
  // const [curPersonInfo, setCurPersonInfo] = useState(0)
  // let post_els = useRef([]);
  // const [post_els, setPost_els] = useState(Array(speakerList.length).fill().map((_, i) => createRef()));
  const postRefs = useRef([])
  let postlistEl = null
  let postlistOffsetTop = 0
  // useEffect(()=>{
    // setPost_els(elRefs => (
    //   Array(speakerList.length).fill().map((_, i) => elRefs[i] || createRef())
    // ));
    //postRefs.current[i] || 
  postRefs.current = Array(speakerList.length).fill().map((_, i) => postRefs.current[i] || createRef());
  // } ,[postRefs.current.length])
  const setOpenMoreInfo = (idx) => {
    console.log("setOpenMoreInfo")
    // console.log(postRefs.current)
    // post_els = document.querySelectorAll(".post")
    // if (!post_els || post_els.length == 0) return
    let curPost = postRefs.current[idx].current
    console.log(curPost)
    let curTop = curPost.offsetTop
    // console.log(`curTop: ${curTop}`)
    postlistEl.scrollTo(0,curTop - postlistOffsetTop);

    const post_list = postListRef.current
    post_list.classList.add('active')

    // setTimeout(()=>{
    //   const post_list = postListRef.current
    //   post_list.classList.toggle('active')
    // }, 500)
    //add("active");//
  }

  const closeMoreInfo = () => {
    const post_list = postListRef.current
    post_list.classList.remove('active')
  }

  //   React.useEffect(() => {
  function handleResize() {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }
  useEffect(() => {
    if (year == 2021) {
      setSpeakerList(speakerInfo2021);
    } else {
      setSpeakerList(speakerInfo2019);
    }
  }, [year]);
  // }


  // useEffect(() => {
  //   const post_els = document.querySelectorAll(".post")
  //   if (!post_els || post_els.length == 0) return
  //   let curPost = post_els[curPersonInfo]
  //   curPost.scrollIntoView();
  // }, [openMoreInfo])

  const throttleResizeHandler = useMemo(() => throttle(handleResize, 200), []);

  window.addEventListener("resize", throttleResizeHandler);

  const Post = ({id, item, year}) => {
    return(
      <div className="post">
        <div className="post__info">
          {item.title ? (
            <div className="post__info__title">{item.title}</div>
          ) : (
            ""
          )}
          <img src={item.imgsrc || ""} />
          
          <div className="infoWrap">
            {item.subtitle ? (
              <div className="post__info__subtitle">{item.subtitle}</div>
            ) : (
              ""
            )}
            { item.info ? (
              <div className="post__info__info">{item.info}</div>
            ) : (
              "Good speaker"
            )}
          
            <div className="post__info__year">{year}</div>
          </div>
        </div>
      </div>
    )
  }

  const PostList = ({vals, year}) => {
    useEffect(()=>{
      postlistEl = document.getElementsByClassName("post-list")[0]
      postlistOffsetTop = postlistEl.offsetTop
    },[])
    
    return(
      <>
        <div className="post-list__header">
          <div className="backBtn" onClick={closeMoreInfo}>
            <i class="fas fa-arrow-left"></i>
          </div>
          <div>
            Speakers
          </div>
        </div>
        <div className="post-list">
          {vals.map((item, index) => (
            <div className="refWrap" ref={postRefs.current[index]}>
              <Post  key={index.toString()} id={index} item={item} year={year} />
            </div>
          ))}
        </div>
      </>
    )

  }



  const GridItem = (props) => {
    
    let itemKey = parseInt(props.id);
    // console.log(`itemKey: ${itemKey}`)
    const [isHover, setHover] = useState(false);

    let item = props.item;
    return (
      <div
        className={"grid-item"}
        onMouseEnter={() => {
          if (!is_mobile){
            setHover(true);
          }
        }}
        onMouseLeave={() => {
          if (!is_mobile && item.imgsrc){
            setHover(false);
          }
        }}
        onClick={() => {
          if (is_mobile && item.imgsrc){
            setHover(!isHover);
          }
        }}
      >
        {item.imgsrc && <img src={item.imgsrc || ""} />}
        {item.imgsrc && is_mobile && isHover && setOpenMoreInfo(itemKey)}
        {(!is_mobile && isHover) && (
          <div className="grid-item__overlay">
            <div className="grid-item__info">
              {item.title ? (
                <div className="grid-item__info__title">{item.title}</div>
              ) : (
                ""
              )}
              {item.subtitle ? (
                <div className="grid-item__info__subtitle">{item.subtitle}</div>
              ) : (
                ""
              )}
              {!is_mobile && item.info ? (
                <div className="grid-item__info__info">{item.info}</div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const GridRow = (props) => { 
    let rowKey = parseInt(props.id);
    // console.log(`rowKey: ${rowKey}`)
    let vals = props.vals;
    let numPerRow = props.numPerRow;
    if (vals.length < numPerRow) {
      for (let i = vals.length; i < numPerRow; i += 1) {
        vals.push({});
      }
    }
    return (
      <div className={"grid-row"} style={{maxHeight:(win_width/3), marginBottom:is_mobile?"0px":"28px"}}>
        {vals.map((item, index) => (
          <GridItem key={(rowKey + index).toString()} id={(rowKey + index)}  item={item} />
        ))}
      </div>
    );
  };

  const GridGallery = (props) => {
    let vals = props.vals;
    // console.log(dimensions);
    let defaultItemNum = 6;
    let itemPerRow = 6;
    // const [itemPerRow, setItemPerRow] = useState(defaultItemNum)
    if (dimensions.width < 1500) {
      defaultItemNum = 3;
    } else if (dimensions.width < 1800) {
      defaultItemNum = 4;
    } else if (dimensions.width < 2100) {
      defaultItemNum = 5;
    }
    let gridrows = [];
    itemPerRow = defaultItemNum;
    // setItemPerRow(defaultItemNum)

    // useEffect(()=>{
    //     gridrows = []
    //     for (let i = 0; i < vals.length; i += itemPerRow) {
    //         gridrows.push(
    //           <GridRow key={rowKey} vals={vals.slice(i, i + itemPerRow)} />
    //         );
    //       }
    // })
    for (let i = 0; i < vals.length; i += itemPerRow) {
      gridrows.push(
        <GridRow
          key={i.toString()}
          id={i}
          vals={vals.slice(i, i + itemPerRow)}
          numPerRow={itemPerRow}
        />
      );
    }

    return (
      <div className="grid-gallery">
        <div>
          <div
            style={{
              flexDirection: "column",
              paddingBottom: "0px",
              paddingTop: "0px",
            }}
          >
            {gridrows}
          </div>
        </div>
      </div>
    );
  };

  return (
    // <div style={{"overflow":"hidden"}}>
    <>
      <Topbar is_mobile={is_mobile} />
      <div id="SpeakerPage" className={`${is_mobile ? "mobile" : ""}`}>
        <div className="SpeakerPage__content">
          {!is_mobile ? (
            <div
              className="profileDetails"
              style={{
                display: "flex",
              }}
            >
              <div className="profileDetails__lcol">
                <ProfilePic />
              </div>
              <div className="profileDetails__rcol">
                <h2 className="username">Our UNICON Speakers</h2>
                <div className="text">
                  <span style={{ fontWeight: "500" }}>100+</span> Profiles!
                </div>
                <h2 className="text" style={{ fontWeight: "700" }}>
                  NES UNICON 2022
                </h2>
                <div className="text selfLabel">Entrepreneur</div>
                <div className="text">
                  Asia's Largest & Craziest Entrepreneurship & Tech Student
                  Conference, from 15th to 16th January 2022!
                </div>
                <div className="text">
                  By{" "}
                  <span
                    className="tag noselect"
                    onClick={() => {
                      window.open(uniconInsta);
                    }}
                  >
                    @nusentresoc
                  </span>
                </div>
                <a
                  className="link noselect"
                  onClick={() => {
                    window.open("https://linktr.ee/nesunicon");
                  }}
                >
                  linktr.ee/nesunicon
                </a>
              </div>
            </div>
          ) : (
            <div className="profileDetails">
              <div
                className="profileDetails__row"
                style={{
                  display: "flex",
                }}
              >
                <div className="profileDetails__lcol">
                  <ProfilePic />
                </div>
                <div className="profileDetails__rcol">
                  <h2 className="username">Our UNICON Speakers</h2>
                </div>
              </div>
              <div className="profileDetails__row">
                <div className="text">
                  <span style={{ fontWeight: "500" }}>100+</span> Profiles!
                </div>
                <h2 className="text" style={{ fontWeight: "700" }}>
                  NES UNICON 2022
                </h2>
                <div className="text selfLabel">Entrepreneur</div>
                <div className="text">
                  Asia's Largest & Craziest Entrepreneurship & Tech Student
                  Conference, from 15th to 16th January 2022!
                </div>
                <div className="text">
                  By{" "}
                  <span
                    className="tag noselect"
                    onClick={() => {
                      window.open(uniconInsta);
                    }}
                  >
                    @nusentresoc
                  </span>
                </div>
                <a
                  className="link noselect"
                  onClick={() => {
                    window.open("https://linktr.ee/nesunicon");
                  }}
                >
                  linktr.ee/nesunicon
                </a>
              </div>
            </div>
            
          )}
          {/* <div className="yearSelectionWrap"> */}
          <div className="yearSelection">
            <div className="yearBtnWrap">
              <div
                className={`yearBtn ${year == 2021 ? "active " : ""}`}
                onClick={() => {
                  setYear(2021);
                }}
              >
                2021
              </div>
            </div>
            <div className="yearBtnWrap">
              <div
                className={`yearBtn ${year == 2019 ? "active " : ""}`}
                onClick={() => {
                  setYear(2019);
                }}
              >
                2019
              </div>
            </div>
          </div>
          {/* </div> */}
          <GridGallery vals={speakerList} />
          
        </div>
        <div className="footerWrap">
          <Footer />
        </div>
        <TicketOverlay />
      </div>
      {is_mobile &&
          <div ref={postListRef} className={`postlist_wrap`}>  
            <PostList vals={speakerList} year={year}/>
          </div>
      }
    </>
    
  );
}
{/* </div> */}