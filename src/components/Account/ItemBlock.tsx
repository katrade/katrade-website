import useAuthorization from "../../hooks/useAuthorization";
import { useHistory } from "react-router";

import "./ItemBlock.css";

import { AccountBlock } from "./AccountBlock";

import { FaPen } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useState } from "react";
import { H5 } from "../standard/H";
import P from "../standard/P";

const backgroundImageStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default function ItemBlock(props: any) {
  const { data, index, manage, Noti } = props;
  const history = useHistory();
  const { deleteMyProduct } = useAuthorization();
  const dataTag = data.require.map((dataTag: any) => {
    return (
      <div
        className="d-flex mx-2 px-2 "
        style={{ backgroundColor: "rgb(21, 199, 119)", borderRadius: "8px" }}
      >
        <p className="m-0 text-white">{dataTag.reqCat.parentCategoryEn} :</p>
        <p className="m-0 text-white">&nbsp;{dataTag.reqCat.childCategoryEn}</p>
      </div>
    );
  });

  function detailProduct() {
    history.push(`/app/product?product_id=${data._id}`);
  }

  function handleDelete() {
    if (window.confirm(`ต้องการลบ ${data.name} อีหลีถิ?`)) {
      Noti();
      setHandleDeleteInventory(true);
      // เก็บไว้ในใจเธอ
      deleteMyProduct(data._id);
    }
  }

  function handleEdit() {
    history.push(`/app/edititem?product_id=${data._id}`);
  }

  const [handleDeleteInventory, setHandleDeleteInventory] =
    useState<boolean>(false);
  return (
    <div className={handleDeleteInventory ? "d-none" : ""}>
      <AccountBlock padding="15px">
        <div className="d-flex flex-wrap position-relative">
          <div
            className="p-0"
            onClick={detailProduct}
            style={{
              width: "170px",
              height: "110px",
              cursor: "pointer",
              ...backgroundImageStyles,
              backgroundImage: `url(${data.pictures[0]})`,
            }}
          />
          <div
            className="ps-3 text-start col-md-9"
            style={{ borderRadius: "8px", cursor: "pointer" }}
            onClick={detailProduct}
          >
            <H5 className="mb-3">{data.name}</H5>
            <div className="d-flex flex-wrap">
              <P className="m-0">require : </P>
              {dataTag}
            </div>
          </div>
          <div className="position-absolute" style={{ top: "0", right: "0" }}>
            <P
              className="m-0"
              onClick={() => {
                handleEdit();
              }}
              style={{ cursor: "pointer" }}
            >
              edit
            </P>
            <P
              className="m-0"
              onClick={() => {
                handleDelete();
              }}
              style={{ cursor: "pointer" }}
            >
              delete
            </P>
          </div>
        </div>
      </AccountBlock>
    </div>
  );
}
