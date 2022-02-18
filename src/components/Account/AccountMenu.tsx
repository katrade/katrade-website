import {
  BsPersonFill,
  BsBookmarkFill,
  BsStarFill,
  BsBagFill,
} from "react-icons/bs";
import { BiHistory } from "react-icons/bi";

function AccountMenu(props: any) {
  return (
    <div>
      <p
        className="d-flex align-items-center fs-4 fw-bold mb-0"
        style={{ color: "black" }}
      >
        <BsPersonFill />
        &nbsp;&nbsp;My Account
      </p>
      <div className="mb-3 ms-4">
        <a
          href="/app/account"
          className="d-block"
          style={{ color: "black", textDecoration: "none" }}
        >
          Account
        </a>
        <a
          href="/app/changepassword"
          className="d-block"
          style={{ color: "black", textDecoration: "none" }}
        >
          Change Password
        </a>
      </div>
      <p
        className="d-flex align-items-center fs-4 fw-bold mb-0"
        style={{ color: "black" }}
      >
        <BsBookmarkFill />
        &nbsp;&nbsp;Follow
      </p>
      <div className="mb-3 ms-4">
        <a
          href="/app/following"
          className="d-block"
          style={{ color: "black", textDecoration: "none" }}
        >
          Following
        </a>
        <a
          href="/app/followers"
          className="d-block"
          style={{ color: "black", textDecoration: "none" }}
        >
          Followers
        </a>
      </div>
      <a
        href="/app/favorite"
        className="d-flex align-items-center fs-4 fw-bold mb-3"
        style={{ color: "black", textDecoration: "none" }}
      >
        <BsStarFill />
        &nbsp;&nbsp;My Favorite
      </a>
      <a
        href="/app/inventory"
        className="d-flex align-items-center fs-4 fw-bold mb-3"
        style={{ color: "black", textDecoration: "none" }}
      >
        <BsBagFill />
        &nbsp;&nbsp;Inventory
      </a>
      <a
        href="/app/history"
        className="d-flex align-items-center fs-4 fw-bold mb-3"
        style={{ color: "black", textDecoration: "none" }}
      >
        <BiHistory />
        &nbsp;&nbsp;History
      </a>
    </div>
  );
}

export default AccountMenu;
