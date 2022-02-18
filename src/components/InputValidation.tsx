import styled from "styled-components";

const redAlert = styled.p`
  color: red;
`;

export default function InputValidation(probs: any) {
  let alertMessage = "";

  if (probs.showMes === "1") {
    if (probs.valid === "empty") {
      alertMessage = "Please enter " + probs.name + ".";
    }
    if (probs.valid === "wrong") {
      alertMessage = "Wrong " + probs.name + ".";
    }
    if (probs.valid === "alreadyused") {
      alertMessage = probs.name + " already used.";
    }
    if (probs.valid === "does not match") {
      alertMessage =
        "Your new password and confirm new password does not match.";
    }
  }

  return <p style={{ color: "red" }}>{alertMessage}</p>;
}
