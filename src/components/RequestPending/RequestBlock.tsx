import "./RequestBlock.css";
import useAuthorization from "../../hooks/useAuthorization";
import { useState } from "react";
import { useHistory } from "react-router";

import { TransparentButton } from "../standard/Button";

import { IoMdSwap } from "react-icons/io";
import { BsFillChatDotsFill } from "react-icons/bs";
import P from "../standard/P";
import Div from "../standard/Div";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/Theme";
import { H5 } from "../standard/H";

export default function RequestBlock({ data, component, status, index }: any) {
  const history = useHistory();
  const {
    deleteMyRequestPending,
    acceptRequest,
    deleteMyLockRequestPending,
    finishTrade,
  } = useAuthorization();
  const handleFinishBtn = () => {
    if (window.confirm("ต้องการกด finish ใช่มั้ย")) {
      finishTrade(data.requestId);
    }
  };

  function findUserNameAndId() {
    if (data.userStatus == "source") {
      history.push(
        `/app/chat?duo_id=${data.targetInventory.owner}&duo_username=${data.targetInventory.username}`
      );
    } else {
      history.push(
        `/app/chat?duo_id=${data.sourceInventory.owner}&duo_username=${data.sourceInventory.username}`
      );
    }
  }

  function btnRPI() {
    if (status == 0) {
      return (
        <div>
          <TransparentButton
            onClick={() => acceptRequest(data.requestId)}
            buttonColor="limegreen"
          >
            Accept Request
          </TransparentButton>
          <TransparentButton
            onClick={() => askingDeleteRequest()}
            buttonColor="red"
          >
            Cancel Request
          </TransparentButton>
        </div>
      );
    } else if (status == 1) {
      return (
        <TransparentButton
          onClick={() => askingDeleteRequest()}
          buttonColor="red"
        >
          Cancel Request
        </TransparentButton>
      );
    } else if (data.state == 1) {
      return (
        <div className="d-flex align-items-center">
          <p className="fs-5 m-0">
            Please deal and confirm for trading in your personal chat
          </p>
          <TransparentButton
            width="100px"
            onClick={findUserNameAndId}
            buttonColor="blue"
          >
            Chat
          </TransparentButton>
        </div>
      );
    } else if (data.state == 2) {
      return (
        <div>
          <TransparentButton
            className={data.userFinish ? `d-none` : ``}
            onClick={() => {
              handleFinishBtn();
            }}
            buttonColor="limegreen"
          >
            สำเร็จ
          </TransparentButton>
          <TransparentButton
            className={data.userFinish ? `d-none` : ``}
            onClick={() => askingDeleteLockRequest()}
            buttonColor="red"
          >
            ล้มเหลว
          </TransparentButton>
        </div>
      );
    } else {
      return <p className="fs-5 m-0">Error</p>;
    }
  }

  function askingDeleteRequest() {
    if (window.confirm("ต้องการลบคำขออีหลีถิ?")) {
      setHandleCancel(true);
      deleteMyRequestPending(data.requestId);
    }
  }

  function askingDeleteLockRequest() {
    if (window.confirm("การแลกเปลี่ยนล้มเหลว?")) {
      setHandleCancel(true);
      deleteMyLockRequestPending(data.requestId);
    }
  }

  function detailProduct(data_id: any) {
    history.push(`/app/product?product_id=${data_id}`);
  }

  function myProductLeft(position: any) {
    if (position == "my" && data.userStatus == "source") {
      return (
        <Div
          dynamicPair={["#E2E2E2", "#3a3b3c"]}
          className="d-flex myItem-request handleHover"
        >
          <img
            src={data.sourceInventory.pictures[0]}
            style={{ width: "150px", height: "100px", marginRight: "20px" }}
          />
          <div>
            <H5>{data.sourceInventory.name}</H5>
            <P>{data.sourceInventory.username}</P>
          </div>
        </Div>
      );
    } else if (position == "my" && data.userStatus == "target") {
      return (
        <Div
          dynamicPair={["#E2E2E2", "#3a3b3c"]}
          className="d-flex myItem-request handleHover"
        >
          <img
            src={data.targetInventory.pictures[0]}
            style={{ width: "150px", height: "100px", marginRight: "20px" }}
          />
          <div>
            <H5>{data.targetInventory.name}</H5>
            <P>{data.targetInventory.username}</P>
          </div>
        </Div>
      );
    } else if (position == "another" && data.userStatus == "source") {
      return (
        <Div
          dynamicPair={["#F5F5F5", "#595959"]}
          className="d-flex yourItem-request handleHover"
        >
          <img
            src={data.targetInventory.pictures[0]}
            style={{ width: "150px", height: "100px", marginRight: "20px" }}
          />
          <div>
            <H5>{data.targetInventory.name}</H5>
            <P>{data.targetInventory.username}</P>
          </div>
        </Div>
      );
    } else if (position == "another" && data.userStatus == "target") {
      return (
        <Div
          dynamicPair={["#F5F5F5", "#595959"]}
          className="d-flex yourItem-request handleHover"
        >
          <img
            src={data.sourceInventory.pictures[0]}
            style={{ width: "150px", height: "100px", marginRight: "20px" }}
          />
          <div>
            <H5>{data.sourceInventory.name}</H5>
            <P>{data.sourceInventory.username}</P>
          </div>
        </Div>
      );
    }
  }

  const [handleCancel, setHandleCancel] = useState<any>(false);
  const { theme } = useContext(ThemeContext);

  function Description() {
    if (status == 0) {
      return "ลองเลือกสิ่งของที่สนใจดูสิ";
    } else if (status == 1) {
      return "รออีกฝ่ายกดดำเนินการ";
    } else if (data.state == 1) {
      return "ลองไปพูดคุยกัน";
    } else if (data.state == 2) {
      if (data.userFinish) {
        return "รออีกฝ่ายกดดำเนินการ";
      } else {
        return "รอดำเนินการแลกเปลี่ยน";
      }
    }
  }

  return (
    <div className={handleCancel ? "d-none" : ""}>
      <div className="outline p-3 mb-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            {/* <img src="https://www.ishida.com/images/popcorn-640x480.gif" style={{width:"45px",height:"45px",borderRadius:"50%"}}/> */}
            <P style={{ margin: "0 20px" }}>
              {data.userStatus == "source"
                ? data.targetInventory.username
                : data.sourceInventory.username}
            </P>
            <BsFillChatDotsFill
              onClick={findUserNameAndId}
              style={{
                width: "24px",
                height: "24px",
                cursor: "pointer",
                color: theme === "light" ? "black" : "white",
              }}
            />
          </div>
          <P>{Description()}</P>
        </div>

        <hr style={{ backgroundColor: "#c7c7c7" }} />
        <div className="d-flex align-items-center justify-content-center flex-wrap zoneItem">
          <Div
            dynamicPair={["#E2E2E2", "#3a3b3c"]}
            className="d-flex content-item handleHover"
            onClick={() => detailProduct(data.sourceInventory._id)}
          >
            {myProductLeft("my")};
          </Div>
          <div
            style={{ minWidth: "5%", textAlign: "center", fontSize: "30px" }}
          >
            <IoMdSwap
              style={{ color: theme === "light" ? "black" : "white" }}
            />
          </div>
          <Div
            dynamicPair={["#F5F5F5", "#595959"]}
            className="d-flex content-item handleHover"
            onClick={() => detailProduct(data.targetInventory._id)}
          >
            {myProductLeft("another")};
          </Div>
        </div>
        <div className="d-flex justify-content-end mt-3">{btnRPI()}</div>
      </div>
    </div>
  );
}
