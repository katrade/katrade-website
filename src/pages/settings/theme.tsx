import { ThemeContext } from "../../contexts/Theme";
import P from "../../components/standard/P";
import { H4 } from "../../components/standard/H";
import { FiSun } from "react-icons/all";
import moon from "../../pics/moon.png";
import { useContext } from "react";
const buttonStyle = {
  width: "100%",
  height: "50px",
  fontSize: "25px",
  display: "inline-block",
};

export default function ThemeSetting() {
  const { setTheme } = useContext(ThemeContext);

  return (
    <div>
      <H4>Theme</H4>
      <div className="d-flex align-items-center full-width">
        <P className="me-5">Select the theme</P>
        <div
          className="row p-0"
          style={{
            width: "50%",
            maxWidth: "600px",
            boxShadow: "0 0 5px rgba(0,0,0,0.06)",
          }}
        >
          <div className="col p-0">
            <button
              className="rounded-left pointer"
              style={{
                ...buttonStyle,
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
              onClick={() => setTheme("light")}
            >
              <FiSun className="me-1" style={{ height: "20px" }} />
              Light mode
            </button>
          </div>
          <div className="col p-0">
            <button
              className="rounded-right pointer"
              style={{
                ...buttonStyle,
                backgroundColor: "#000000",
                color: "#ffe785",
              }}
              onClick={() => setTheme("dark")}
            >
              <img src={moon} height="20px" className="me-1" />
              Dark mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
