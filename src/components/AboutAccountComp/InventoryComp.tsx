import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react";
import ItemBlock from "../../components/Account/ItemBlock";
import Div from "../standard/Div";
import { H4, H5, H6 } from "../standard/H";

export default function InventoryComp(data: any) {
  const inventoryData: any = data.data;
  const [inventoryLenght, setInventoryLenght] = useState<any>();

  useEffect(() => {
    if (inventoryData) {
      setInventoryLenght(inventoryData.length);
    }
  }, [inventoryData]);

  function handleInventoryLength() {
    setInventoryLenght(inventoryLenght - 1);
  }

  if (inventoryData) {
    if (inventoryData.length === 0) {
      return (
        <Div
          dynamicPair={["#fff", "#212121"]}
          className="row mb-4 p-3"
          style={{ width: "100%", minHeight: "400px" }}
        >
          <div>
            <H4 className="d-inline-block me-3 mb-4">Inventory</H4>
            <H5 className="d-inline-block">({inventoryLenght})</H5>
          </div>
          <div>
            <a href="/app/additem">
              <h5 className="text-center">คุณยังไม่มีสิ่งของเลย เพิ่มสิ</h5>
            </a>
          </div>
        </Div>
      );
    } else {
      const myInventory = inventoryData.map((data: any, index: any) => {
        return (
          <ItemBlock
            data={data}
            key={index}
            manage="no"
            Noti={() => handleInventoryLength()}
          />
        );
      });
      return (
        <div>
          <Div
            dynamicPair={["#fff", "#212121"]}
            className="mx-auto mb-4 p-3"
            style={{ width: "100%", minHeight: "400px" }}
          >
            <div
              className="d-flex justify-content-between"
              style={{ padding: "0 12px" }}
            >
              <div>
                <H4 className="d-inline-block me-3 mb-4">Inventory</H4>
                <H5 className="d-inline-block">({inventoryLenght})</H5>
              </div>
              <a href="/app/additem" className="d-flex align-items-center">
                <H6>add item +</H6>
              </a>
            </div>
            <div style={{ padding: "0 12px" }}>{myInventory.reverse()}</div>
          </Div>
        </div>
      );
    }
  } else {
    return (
      <Div
        dynamicPair={["#fff", "#212121"]}
        className="mb-4 p-3 text-center"
        style={{ minHeight: "400px" }}
      >
        <Skeleton
          variant="rectangular"
          height={80}
          sx={{ margin: "40px 0", width: "100%", borderRadius: "10px" }}
        />
        <Skeleton
          variant="rectangular"
          height={80}
          sx={{ margin: "40px 0", width: "100%", borderRadius: "10px" }}
        />
        <Skeleton
          variant="rectangular"
          height={80}
          sx={{ margin: "40px 0", width: "100%", borderRadius: "10px" }}
        />
        <Skeleton
          variant="rectangular"
          height={80}
          sx={{ margin: "40px 0", width: "100%", borderRadius: "10px" }}
        />
      </Div>
    );
  }
}
