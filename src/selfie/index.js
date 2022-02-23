import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs";
import { Button, message } from "antd";

function SelfiePage() {
  const { id } = useParams();
  const [selfie, setSelfie] = useState(null);

  const getSelfie = () => {
    axios
      .get(`${API_URL}/selfies/${id}`)
      .then(function (result) {
        setSelfie(result.data.selfie);
        console.log(result);
      })
      .catch(function (error) {
        console.log("오류 발생: " + error);
      });
  };

  useEffect(function () {
    getSelfie();
  }, []);

  if (selfie === null) {
    return <h1>사진 정보를 받고 있습니다...</h1>;
  }

  const onClickPerfectday = () => {
    axios
      .post(`${API_URL}/goodday/${id}`)
      .then((result) => {
        message.info("완벽한 하루로 설정되었습니다.");
        getSelfie();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  const onClickPerfectdayCancel = () => {
    axios
      .post(`${API_URL}/notgoodday/${id}`)
      .then((result) => {
        message.info("완벽한 하루가 취소됐습니다.");
        getSelfie();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${selfie.imageUrl}`} />
      </div>
      <div id="profile-box">
        <span id="short">{selfie.short}</span>
      </div>
      <div id="contents-box">
        <div id="createAt">{dayjs(selfie.createdAt).format("YY.MM.DD LT")}</div>

        {selfie.feeling == "0" ? (
          <Link to="/">
            <Button
              id="perfect"
              size="middle"
              type="primary"
              onClick={onClickPerfectday}
            >
              완벽한 하루
            </Button>
          </Link>
        ) : (
          <Link to="/">
            <Button
              id="perfect"
              size="middle"
              type="primary"
              onClick={onClickPerfectdayCancel}
            >
              완벽한 하루
            </Button>
          </Link>
        )}

        <div id="weather">날씨 : {selfie.weather}</div>
        <pre id="description">{selfie.description}</pre>
        <div id="icon">
          <img src="/images/icons/avatar.png"></img>
          <span>{selfie.place}</span>
        </div>
      </div>
    </div>
  );
}

export default SelfiePage;
