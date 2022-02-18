import { AccountBlock } from "./AccountBlock";

import { IoMdSwap } from "react-icons/io";

const ItemStlye = {
  width: "43%",
  padding: "20px",
  backgroundColor: "#d7d7d7",
  borderRadius: "10px",
};

export default function HistoryBlock(props: any) {
  const { data, UidUser } = props;
  const timeStamp = data.timeStamp.split("T")[0].split("-").reverse().join("-");
  function leftBlock() {
    if (UidUser == data.sourceUserId) {
      return (
        <div>
          <h5 className="text-left text-truncate">
            {data.sourceInventoryName}
          </h5>
          <p className="text-left text-truncate">{data.sourceUsername}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h5 className="text-left text-truncate">
            {data.targetInventoryName}
          </h5>
          <p className="text-left text-truncate">{data.targetUsername}</p>
        </div>
      );
    }
  }
  function rigthBlock() {
    if (UidUser != data.sourceUserId) {
      return (
        <div>
          <h5 className="text-left text-truncate">
            {data.sourceInventoryName}
          </h5>
          <p className="text-left text-truncate">{data.sourceUsername}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h5 className="text-left text-truncate">
            {data.targetInventoryName}
          </h5>
          <p className="text-left text-truncate">{data.targetUsername}</p>
        </div>
      );
    }
  }
  return (
    <div>
      <div
        className=""
        style={{
          backgroundColor: "#15C777",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <p className="mb-0 me-3 text-right text-white">{timeStamp}</p>
      </div>
      <AccountBlock
        padding="10px"
        borderTop="none"
        borderTopLeftRadius="0px"
        borderTopRightRadius="0px"
      >
        <div className="d-flex flex-wrap justify-content-between">
          <div className="d-inline-block" style={ItemStlye}>
            {leftBlock()}
          </div>
          <div className="" style={{ fontSize: "35px", margin: "auto 0" }}>
            <IoMdSwap />
          </div>
          <div className="d-inline-block" style={ItemStlye}>
            {rigthBlock()}
          </div>
        </div>
      </AccountBlock>
    </div>
  );
}
