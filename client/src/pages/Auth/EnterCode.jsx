import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyCodeResetPasswordAction,
  verifyEmailAction,
} from "../../redux/actions/authActions";

const EnterCode = (props) => {
  const email = props.location.state ? props.location.state[0] : "";
  const isForgotPassword = props.location.state ? props.location.state[1] : false;

  const { register, handleSubmit } = useForm();
  const isVerified = useSelector((state) => state.auth.isVerified);
  const isVerifyCodeResetPassword = useSelector(
    (state) => state.auth.isVerifyCodeResetPassword
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleNumberInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
  };

  const onSubmitVerifyEmail = (data) => {
    dispatch(verifyEmailAction(data));
  };

  const onSubmitForgotPassword = (data) => {
    dispatch(verifyCodeResetPasswordAction(data));
  };

  const resendCode = (e) => {
    e.preventDefault();
    console.log("Resend code clicked");
  };

  useEffect(() => {
    if (isVerified) {
      history.push("/verified-email", isVerified);
    }
  }, [history, isVerified]);

  useEffect(() => {
    if (isVerifyCodeResetPassword) {
      history.push("/reset-password", isVerifyCodeResetPassword);
    }
  }, [history, isVerifyCodeResetPassword]);

  if (!email) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row align-items-center g-lg-5">
        <div className="col-lg-7 text-start">
          <img
            className="w-75"
            alt="cgv-cinemas-logo"
            src="https://i.imgur.com/Lo5FKd6.png"
          />
          <p className="text-lg-start mt-3 fw-bold">
            Experience the best cinema quality at CGV locations nationwide. <br />
            Find schedules, trailers, and the latest movie information at CGV Cinemas Vietnam.
          </p>
        </div>

        <div className="col-md-10 mx-auto col-lg-5">
          <form
            onSubmit={
              isForgotPassword
                ? handleSubmit(onSubmitForgotPassword)
                : handleSubmit(onSubmitVerifyEmail)
            }
            className="p-4 p-md-5 border rounded-3 bg-light"
          >
            <h3>{isForgotPassword ? "Reset Password" : "Verify Email"}</h3>
            <p>
              Enter the code we sent to <span className="fw-bold">{email}</span>. If you didn't
              receive the email, check your spam folder or{" "}
              <a
                className="text-link color-link-primary"
                id="resendCodeLink"
                onClick={resendCode}
                href="/"
              >
                try again.
              </a>
            </p>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="codeInput"
                onInput={handleNumberInput}
                {...register("code")}
                maxLength="6"
                placeholder="000000"
                required
              />
              <label htmlFor="codeInput">Enter code</label>
            </div>

            <button
              className="w-100 btn btn-lg btn-primary color-primary"
              type="submit"
            >
              Next
            </button>

            <hr className="my-4" />

            <div className="d-flex justify-content-center">
              <a className="text-link color-link-primary" href="/register">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-arrow-left-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterCode;
