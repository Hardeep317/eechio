import React, { useEffect, useState } from "react";
import {GiHamburgerMenu} from 'react-icons/gi'
import Navbar from "../Navbar/Navbar";
import "./Ui.css";
import styled from "styled-components";
import ReactSlider from "react-slider";
import { MdOutlinePermDataSetting } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 10px;
`;
const StyledSlider1 = styled(ReactSlider)`
  width: 100%;
  height: 10px;
`;
const StyledSlider2 = styled(ReactSlider)`
width: 100%;
height: 10px;
`;
const StyledThumb = styled.div`
  height: 17px;
  line-height: 17px;
  width: 17px;
  text-align: center;
  background-color: #4f90f7;
  color: transparent;
  margin-top: -3px;
  border-radius: 50%;
  cursor: pointer;
`;
const StyledThumb1 = styled.div`
  height: 17px;
  line-height: 17px;
  width: 17px;
  text-align: center;
  background-color: #4f90f7;
  color: transparent;
  margin-top: -3px;
  border-radius: 50%;
  cursor: pointer;
`;
const StyledThumb2 = styled.div`
  height: 17px;
  line-height: 17px;
  width: 17px;
  text-align: center;
  background-color: #4f90f7;
  color: transparent;
  margin-top: -3px;
  border-radius: 50%;
  cursor: pointer;
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);
const Thumb1 = (props, state) => (
  <StyledThumb1 {...props}>{state.valueNow}</StyledThumb1>
);
const Thumb2 = (props, state) => (
  <StyledThumb2 {...props}>{state.valueNow}</StyledThumb2>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "#ddd" : props.index === 1 ? "#4f90f7" : "#ddd"};
  border-radius: 999px;
`;
const StyledTrack1 = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "#ddd" : props.index === 1 ? "#4f90f7" : "#ddd"};
  border-radius: 999px;
`;
const StyledTrack2 = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "#ddd" : props.index === 1 ? "#4f90f7" : "#ddd"};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;
const Track1 = (props, state) => (
  <StyledTrack1 {...props} index={state.index} />
);
const Track2 = (props, state) => (
  <StyledTrack2 {...props} index={state.index} />
);

function UI() {
    const [users, setUsers] = useState([])
    const [platform, setPlaform] = useState(false)
    const [iplatform, setiPlaform] = useState(false)
    const [paid, setpaid] = useState(false)
    const [isbarter, setIsbarter] = useState(false)
    const [nano, setNano] = useState(false)
    const [sidebar, setSidebar] = useState(false);

    const toggleSideBar = () => {
        setSidebar(!sidebar)
    }

    const getUsers = () => {
         if(platform){ fetch(`http://localhost:4000/users?platform=Youtube`)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        }else if(iplatform){
            fetch(`http://localhost:4000/users?platform=Instagram`)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        }else if(platform && iplatform){
            fetch(`http://localhost:4000/users?platform=Instagram&platform=Youtube`)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        }else{
            fetch(`http://localhost:4000/users`)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        }

    }

    let count = 0;
    useEffect(() => {
        if(!nano){
        getUsers();
        }
        if(count == 0){
            count++;
            getUsers();
        }
    },[nano, platform, iplatform])

    const checkPaid = () => {
        if(paid){
            let output = users.filter((item) => item.subcategory === 'paid');
            setUsers(output)
        }else if(!paid){
            getUsers();
        }
    }

    const checkYoutube = () => {
        
    }

    const checkBarter = () => {
        if(isbarter){
            let output = users.filter((item) => item.subcategory === 'barter');
            setUsers(output)
        }else if(!isbarter){
            getUsers();
        }
    }
    let ncount = 1;
    const checkNano = (value) => {
        
        if(ncount === 1){
            let output = users.filter(item => item.popularity > 1000 && item.popularity < 9000 );
            setUsers(output)
            ncount++;
            console.log(ncount)
        }else{
            ncount = 1;
            getUsers();
        }
    }
    const styles = {
        left : `${sidebar ? '0' : '-100%'}`
    }
  return (
    <div className="ui-container">
        <p className="hamburger" onClick={toggleSideBar}>< GiHamburgerMenu /></p>
      <div className="sidebar" style={styles}>
        <p onClick={toggleSideBar} className="closeside"><AiOutlineClose /></p>
        <h4>Popularity</h4>
        <div className="filterUi">
          <div className="inputContainer">
            <input
              className="inputBox"
              type="checkbox"
              value="nano"
              name="nano"
              onChange={() => {
                setNano(!nano)
                checkNano(ncount)
              }}
            />
            <label htmlFor="nano">Nano(1k-9k)</label>
          </div>

          <div className="inputContainer">
            <input
              className="inputBox"
              type="checkbox"
              value="micro"
              name="micro"
            />
            <label htmlFor="micro">Micro(100k-999k)</label>
          </div>

          <div className="inputContainer">
            <input
              className="inputBox"
              type="checkbox"
              value="macro"
              name="macro"
            />
            <label htmlFor="macro">Macro(1M-10M)</label>
          </div>

          <div className="inputContainer">
            <input
              className="inputBox"
              type="checkbox"
              value="custom"
              name="custom"
            />
            <label htmlFor="custom">Custom</label>
          </div>

          <div className="inputContainer">
            <StyledSlider
              min={0}
              max={1000000}
              defaultValue={[50, 75000]}
              renderTrack={Track}
              renderThumb={Thumb}
            />
            <div className="sliderData">
              <p>0</p>
              <p>10M</p>
            </div>
          </div>
        </div>

        <h4>Campaign Reference</h4>

        <div className="filterUi">
          <div className="inputContainer">
            <input
              className="inputBox"
              type="checkbox"
              value="barter"
              name="barter"
              onChange={() => {
                setIsbarter(!isbarter)
                checkBarter();
            }}
            />
            <label htmlFor="barter">Barter</label>
          </div>

          <div className="inputContainer">
            <input
              className="inputBox"
              type="checkbox"
              value="paid"
              name="paid"
              onChange={() => {
                setpaid(!paid)
                checkPaid();
            }}
            />
            <label htmlFor="paid">Paid</label>
          </div>
        </div>
        <h4>Platform</h4>

        <div className="filterUi">
          <div className="inputContainer">
            <input
              className="inputBox"
              type="checkbox"
              value="Youtube"
              name="youtube"
              onChange={() => {
                setPlaform(!platform)
                getUsers();
            }}
            />
            <label htmlFor="youtube">Youtube</label>
          </div>

          <div className="inputContainer">
            <input
              className="inputBox"
              type="checkbox"
              value="Instagram"
              name="instagram"
              onChange={(e) => {
                setiPlaform(!iplatform)
                getUsers();
            }}
            />
            <label htmlFor="instagram">Instagram</label>
          </div>
        </div>

        <h4>ENGAGEMENT RATE</h4>
        <div className="filterUi">
          <div className="inputContainer">
            <StyledSlider1
              min={0}
              max={1000000}
              defaultValue={[50, 7500]}
              renderTrack={Track1}
              renderThumb={Thumb1}
            />
            <div className="sliderData">
              <p>0</p>
              <p>10M</p>
            </div>
          </div>
        </div>
        <h4>Average</h4>
        <div className="filterUi">
          <div className="inputContainer">
            <StyledSlider2
              min={0}
              max={1000000}
              defaultValue={[50, 75000]}
              renderTrack={Track2}
              renderThumb={Thumb2}
            />
            <div className="sliderData">
              <p>0</p>
              <p>10M</p>
            </div>
          </div>
        </div>

        <h4>Categories</h4>

        <div className="filterUi">
          <div className="inputContainer">
            <input
              className="search"
              type="text"
              name="search"
              placeholder="Search"
            />
          </div>
          <div className="filterUi">
            <div className="inputContainer">
              <input
                className="inputBox"
                type="checkbox"
                value="auto"
                name="auto"
              />
              <label htmlFor="autos">Autos & Vechiles</label>
            </div>

            <div className="inputContainer">
              <input
                className="inputBox"
                type="checkbox"
                value="animation"
                name="animation"
              />
              <label htmlFor="animation">Animation</label>
            </div>

            <div className="inputContainer">
              <input
                className="inputBox"
                type="checkbox"
                value="agriculture"
                name="agriculture"
              />
              <label htmlFor="agriculture">
                Agriculture and Allied Sectors
              </label>
            </div>

            <div className="inputContainer">
              <input
                className="inputBox"
                type="checkbox"
                value="art"
                name="art"
              />
              <label htmlFor="art">Art & Craft</label>
            </div>
            <div className="inputContainer">
              <input
                className="inputBox"
                type="checkbox"
                value="beauty"
                name="beauty"
              />
              <label htmlFor="beauty">Beauty</label>
            </div>
            <div className="inputContainer">
              <input
                className="inputBox"
                type="checkbox"
                value="blogs"
                name="blogs"
              />
              <label htmlFor="blogs">Blogs & Travel</label>
            </div>
          </div>
          <h4 className="more-categ">More Categories</h4>
        </div>
      </div>

      <div onClick={() => sidebar === true ? toggleSideBar() : null} className="conatiner">
        <div className="containerhead">
            <div className="conainer-buttons">
                <div>
                    <h3>Sort By</h3>
                    </div>
                <div className="head-button">
                    <button className="selectall">SELECT ALL</button>
                    <button className="invite">INVITE</button>
                    <button className="campaign-button">ADD CAMPAIGN</button>
                </div>
            </div>
            <div className="sort-buttons">
                <button className="sort-btns" onClick={() => console.log("first")}>High to Low</button>
                <button className="sort-btns">Low to Hight</button>
                <button className="sort-btns">Newest</button>
                <button className="popular">Popular</button>
            </div>
        </div>
        <div onClick={() => sidebar === true ? toggleSideBar() : null} className="user-container">
            {
                users.map((item) => {
                    return <div key={item.id} className="indi-user">
                        <div className="image-component"><img className="indi-image" src={item.pic} alt="user"/></div>
                        <div className="name-component"> <h3>{item.name}</h3>
                        <p className="item-body">{item.body}</p>
                        <p className="item-platform">{item.platform}</p>
                        <button className="accepted">Accepted</button>
                        <button className="barted-one">Barted</button>
                         </div>
                        <div className="button-indi-component">
                            <button className="campaign-button">DETAIL</button>
                            <button className="invite">INVITE</button>
                            <button className="selectall">ANALYSE</button>
                        </div>
                    </div>
                })
            }
        </div>
      </div>
    </div>
  );
}

export default UI;
