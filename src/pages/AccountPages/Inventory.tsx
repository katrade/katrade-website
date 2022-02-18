import MenuAccount from "../../templates/MenuAccount";
import { useHistory } from "react-router";
import "./Inventory.css";

import ItemBlock from "../../components/Account/ItemBlock";
import { CgPlayListAdd } from "react-icons/cg";
import { useEffect, useState } from "react";
import { defaultEmptyAccount, IAccount } from "../../interfaces/IUser";
import useAuthorization from "../../hooks/useAuthorization";

export default function Account() {
  let listOfItem = [
    {
      name: "gun",
      image: "https://source.unsplash.com/random?sig=1",
      tag: ["Weapon", "Fruit", "Shoes"],
    },
    {
      name: "Jacky",
      image: "https://source.unsplash.com/random?sig=1",
      tag: ["Human"],
    },
    {
      name: "เรือดำน้ำ",
      image: "https://source.unsplash.com/random?sig=1",
      tag: ["Weapon", "ยานพาหนะ", "Shoes"],
    },
    {
      name: "รถถัง",
      image: "https://source.unsplash.com/random?sig=1",
      tag: ["Weapon", "ของเล่น"],
    },
    {
      name: "gun",
      image: "https://source.unsplash.com/random?sig=1",
      tag: ["Weapon", "Fruit", "Shoes"],
    },
  ];
  const history = useHistory();
  const item_data = listOfItem.map((data, index) => {
    return <ItemBlock data={data} key={index} manage="no" />;
  });

  const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
  const { getUserData } = useAuthorization();
  useEffect(() => {
    async function init() {
      var a = await getUserData();
      if (a) {
        setAccount(a);
      } else {
        console.clear();
        history.push("/app/signin");
      }
    }
    init();
  }, []);

  return (
    <>
      <MenuAccount data={account}>
        <div className="container-inventory">
          <div className="inventory-head">
            <h4>
              Your items<span className="span">({listOfItem.length})</span>
            </h4>
            <a href="/app/manageInventory">
              Manage Inventory
              <CgPlayListAdd />
            </a>
          </div>
          <div className="data-inventory">{item_data}</div>
        </div>
      </MenuAccount>
    </>
  );
}

function getUserData() {
  throw new Error("Function not implemented.");
}
