import "./index.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Carousel } from "antd";
import { API_URL } from "../config/constants.js";
import { ApiFilled } from "@ant-design/icons";

dayjs.extend(localizedFormat);

function MainPage() {
  const [selfies, setSelfies] = React.useState([]);
  const [banners, setBanners] = React.useState([]);

  React.useEffect(function () {
    axios
      .get(`${API_URL}/selfies`)
      .then(function (result) {
        const selfies = result.data.selfies;
        setSelfies(selfies);
      })
      .catch(function (error) {
        console.log("에러발생: ", error);
      });

    axios
      .get(`${API_URL}/banners`)
      .then(function (result) {
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
  }, []);

  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000} key="index">
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageUrl}`} />
              </div>
            </Link>
          );
        })}
      </Carousel>
      <h1 id="list-title">하연이의 사진들</h1>
      <div id="selfie-list">
        {selfies.map(function (selfie, index) {
          return (
            <div className="selfie-card" key={index}>
              {selfie.feeling === "1" && <div className="selfie-blur" />}
              <Link className="selfie-link" to={`selfies/${selfie.id}`}>
                <div className="img-cover">
                  <img
                    className="selfie-img"
                    src={`${API_URL}/${selfie.imageUrl}`}
                  ></img>
                </div>
                <div className="selfie-contents">
                  <span className="selfie-date">
                    {dayjs(selfie.createdAt).format("YY.MM.DD LT")}
                  </span>
                  <span className="selfie-short">{selfie.short}</span>
                  <div className="selfie-footer">
                    <div className="selfie-place">
                      <img
                        className="selfie-avatar"
                        src="images/icons/avatar.png"
                      ></img>
                      <span>{selfie.place}</span>
                    </div>
                    <span className="selfie-weather">
                      날씨 : {selfie.weather}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
