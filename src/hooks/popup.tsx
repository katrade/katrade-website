import { render } from "react-dom";
import { useState } from "react";
import Popup from "../components/Popup";
export default function usePopup(children: any): [() => void] {
  /*  Your popup will set as closed by default , 
        use show to pop the window up.
    */
  const portal = document.getElementById("portal");
  const [c, sc] = useState(0);

  function show() {
    render(<Popup reset={c + 1}>{children}</Popup>, portal);
    sc(c + 1);
  }

  return [show];
}
