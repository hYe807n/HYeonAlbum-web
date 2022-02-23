import {
  Divider,
  Form,
  Input,
  Button,
  Upload,
  Descriptions,
  Result,
  message,
} from "antd";
import "./index.css";
import { useHistory } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import { useState } from "react";
import MainPage from "../main";
import { API_URL } from "../config/constants.js";
import axios from "axios";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/selfies`, {
        weather: values.weather,
        short: values.short,
        place: values.place,
        description: values.description,
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
        history.replace("/");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">앨범 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" />
                <span>이미지를 업로드 해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          name="short"
          label={<div className="upload-label">제목</div>}
          rules={[{ required: true, message: "앨범 제목을 입력해주세요." }]}
        >
          <Input
            className="upload-place"
            size="large"
            placeholder="제목을 입력해주세요."
          ></Input>
        </Form.Item>
        <Divider />
        <Form.Item
          name="weather"
          label={<div className="upload-label">날씨</div>}
          rules={[{ required: true, message: "날씨를 입력해주세요." }]}
        >
          <Input
            className="upload-place"
            size="large"
            placeholder="날씨를 입력해주세요."
          ></Input>
        </Form.Item>
        <Divider />

        <Form.Item
          name="description"
          label={<div className="upload-label">사진 설명</div>}
          rules={[{ required: true, message: "앨범 설명을 입력해주세요." }]}
        >
          <Input.TextArea
            id="selfie-description"
            size="large"
            placeholder="사진 설명을 입력해주세요."
            showCount
            maxLength={300}
          ></Input.TextArea>
        </Form.Item>
        <Divider />
        <Form.Item
          label={<div className="upload-label">장소</div>}
          name="place"
          rules={[{ required: true, message: "장소를 입력해주세요" }]}
        >
          <Input
            className="upload-place"
            size="large"
            placeholder="장소를 입력해주세요."
          ></Input>
        </Form.Item>

        <Form.Item>
          <Button
            icon={<CheckOutlined />}
            id="submit-button"
            size="large"
            htmlType="submit"
          >
            앨범 등록
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
