import MenuAccount from "../../templates/MenuAccount";

import "./ManageInventory.css";

import { AccountBlock } from "../../components/Account/AccountBlock";
import ItemBlock from "../../components/Account/ItemBlock";

import { BiCheck } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { useEffect, useState } from "react";
import useAuthorization from "../../hooks/useAuthorization";
import { useHistory } from "react-router";
import { defaultEmptyAccount, IAccount } from "../../interfaces/IUser";

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

  const item_data = listOfItem.map((data, index) => {
    return <ItemBlock data={data} key={index} manage="yes" />;
  });

  const { getUserData } = useAuthorization();
  const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
  const history = useHistory();

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
        <div className="container-manage">
          <h4>Manage Inventory</h4>
          <p>
            save changes
            <BiCheck />
          </p>
          <div className="data-manage">
            <a href="/app/additem">
              <AccountBlock padding="10px">
                <div className="add-block">
                  <br />
                  <p className="gr-add">
                    <GrAdd />
                  </p>
                  <p className="add">Add</p>
                </div>
              </AccountBlock>
            </a>
            {item_data}
          </div>
        </div>
      </MenuAccount>
    </>
  );
}
