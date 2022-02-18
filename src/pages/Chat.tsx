import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import useAuthorization from "../hooks/useAuthorization";

import { TransparentButton } from "../components/standard/Button";
import { HiStop } from "react-icons/hi";

const queryString = require("query-string");

function Chat() {
  const history = useHistory();
  const { search } = useLocation();
  const { request_id, product_id } = queryString.parse(search);
  const { LockRequest, deleteMyRequestPending } = useAuthorization();

  function askingDeleteRequest(data: any) {
    if (window.confirm(`ต้องการลบคำขออีหลีถิ?`)) {
      deleteMyRequestPending(request_id);
    }
  }

  return (
    <div>
      <h3 className="text-center mt-3">หน้าเทรดแบบหลอกๆ</h3>
      <p className="text-center m-0 text-muted">
        สถานการณ์ที่เกิดขึ้น เป็นเพียงเรื่องสมมติ
      </p>
      <div className="d-flex justify-content-around" style={{ width: "100%" }}>
        <img
          src="https://www.brighttv.co.th/wp-content/uploads/2018/10/44681535_10158287055296840_3012042792110129152_n.jpg"
          style={{ width: "200px", height: "auto" }}
        />
        <div
          className="p-4 overflow-auto"
          style={{
            width: "800px",
            height: "300px",
            backgroundColor: "#c7c7c7",
          }}
        >
          <p className="text-right">อยากได้อาหารหมามั้ย เหมียว</p>
          <p>อยากได้ โบร๋วววว</p>
          <p className="text-right">งั้นนายว่างกี่โมง เหมียว</p>
          <p>ว่างวันพรุ่งนี้ ประมาณ 5 โมงเย็น</p>
          <p>ต้องรอเจ้านายกลับบ้านก่อน โบร๋วววว</p>
          <p className="text-right">โอเค เหมียว</p>
          <p className="text-right">งั้นเจอกันตอน 2 ทุ่มละกันเหมี่ยววว</p>
        </div>

        <img
          src="data:image/jpeg;base64,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"
          style={{ width: "200px" }}
        />
      </div>
      <div className="text-center my-3">
        <TransparentButton
          buttonColor="limegreen"
          onClick={() => {
            LockRequest(request_id, product_id);
            alert("Lock สิ่งของไว้ให้คุณเรียบร้อยแล้ว");
          }}
        >
          Lock
        </TransparentButton>
        <TransparentButton
          onClick={() => askingDeleteRequest(request_id)}
          buttonColor="red"
        >
          Cancel Request
        </TransparentButton>
      </div>
      <div className="text-center my-5">
        <TransparentButton
          buttonColor="orange"
          onClick={() => history.push("/app/request")}
        >
          Go back to Inprogress page
        </TransparentButton>
      </div>
    </div>
  );
}

export default Chat;
