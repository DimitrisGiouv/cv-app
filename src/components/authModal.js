import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthInput } from "../components/FormInput";
import "../styles/modal.css";

export default function AuthModal() {
  const [mode, setMode] = useState("login");
  const [show, setShow] = useState(false);

  const {register, handleSubmit,formState: { errors },} = useForm();
  const handleRegister = (data) => {
    console.log("Register Data:", data);
  };

  const handleLogin = () => {
    alert("Logging in...");
  };

  return (
    <>
      <button onClick={() => setShow(true)}>Login</button>

      {show && (
        <div className="modal-background" onClick={() => setShow(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{mode === "login" ? "Login" : "Register"}</h2>

            {mode === "login" ? (
            <>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <AuthInput
                        placeholder="Username"
                        error={errors.loginUsername?.message}
                        registerProps={register("loginUsername", { required: "Username is required" })}
                    />
                    <AuthInput
                        placeholder="Password"
                        error={errors.loginPassword?.message}
                        registerProps={register("loginPassword", { required: "Password is required" })}
                    />
                    <button type="submit" className="modal-button">Login</button>
                    </form>
                    <p className="text-sm mt-3">
                    Don’t have an account?{" "}
                    <span
                        className="register-color cursor-pointer"
                        onClick={() => setMode("register")}
                    >
                        Register
                    </span>
                    </p>
                </>
                ): (
                <>
                <form onSubmit={handleSubmit(handleRegister)}>
                  <AuthInput
                    placeholder="Username"
                    error={errors.username?.message}
                    registerProps={register("username", { required: "Username is required" })}
                  />
                  <AuthInput
                    placeholder="Email"
                    error={errors.email?.message}
                    registerProps={register("email", { required: "Email is required" })}
                  />
                  <AuthInput
                    placeholder="Password"
                    error={errors.password?.message}
                    registerProps={register("password", { required: "Password is required" })}
                  />
                  <AuthInput
                    placeholder="Password Confirmation"
                    error={errors.passwordConfirmation?.message}
                    registerProps={register("passwordConfirmation", {
                      required: "Password confirmation is required",
                    })}
                  />
                  <button type="submit" className="modal-button">Register</button>
                </form>
                <p className="text-sm mt-3">
                  Already have an account?{" "}
                  <span
                    className="register-color cursor-pointer"
                    onClick={() => setMode("login")}
                  >
                    Login
                  </span>
                </p>
            </>
            )}
          </div>
        </div>
      )}
    </>
  );
}