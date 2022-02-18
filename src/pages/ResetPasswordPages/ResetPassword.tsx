import {
  ForgotPasswordForm,
  AfterEnterEmailForm,
  ResetPasswordForm,
  CompleteResetPasswordForm,
} from "../../components/ResetPassword/ResetPasswordForm";
import StaticNav from "../../components/StaticNav";
import Block from "../../components/Block";

export function ForgotPassword() {
  return (
    <>
      <StaticNav />
      <Block
        height="100vh"
        backgroundColor="#f7fafc"
        darkBackgroundColor="#141414"
      >
        <ForgotPasswordForm />
      </Block>
    </>
  );
}

export function AfterEnterEmail() {
  return (
    <>
      <StaticNav />
      <Block
        height="100vh"
        backgroundColor="#f7fafc"
        darkBackgroundColor="#141414"
      >
        <AfterEnterEmailForm />
      </Block>
    </>
  );
}

export function ResetPassword() {
  return (
    <>
      <StaticNav />
      <Block
        height="100vh"
        backgroundColor="#f7fafc"
        darkBackgroundColor="#141414"
      >
        <ResetPasswordForm />
      </Block>
    </>
  );
}

export function CompleteResetPassword() {
  return (
    <>
      <StaticNav />
      <Block
        height="100vh"
        backgroundColor="#f7fafc"
        darkBackgroundColor="#141414"
      >
        <CompleteResetPasswordForm />
      </Block>
    </>
  );
}
