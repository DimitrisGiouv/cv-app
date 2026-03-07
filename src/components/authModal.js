import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { AuthInput } from "../components/FormInput";

export default function AuthModal() {
  const { t } = useTranslation();
  const [mode, setMode] = useState("login");
  const [show, setShow] = useState(false);

  const {register, handleSubmit,formState: { errors },} = useForm();
  const handleRegister = (data) => {
    console.log("Register Data:", data);
  };

  const handleLogin = () => {
    alert(t('auth.loggingIn'));
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="px-3 py-1.5 rounded-md text-sm font-medium bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        {t('auth.login')}
      </button>

      {show && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShow(false)}
        >
          <div
            className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">{mode === "login" ? t('auth.login') : t('auth.register')}</h2>

            {mode === "login" ? (
            <>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <AuthInput
                      placeholder={t('auth.username')}
                        error={errors.loginUsername?.message}
                      registerProps={register("loginUsername", { required: t('auth.usernameRequired') })}
                    />
                    <AuthInput
                      placeholder={t('auth.password')}
                        error={errors.loginPassword?.message}
                      registerProps={register("loginPassword", { required: t('auth.passwordRequired') })}
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                    >
                      {t('auth.login')}
                    </button>
                    </form>
                    <p className="text-sm mt-3">
                    {t('auth.noAccount')} {" "}
                    <span
                        className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        onClick={() => setMode("register")}
                    >
                        {t('auth.register')}
                    </span>
                    </p>
                </>
                ): (
                <>
                <form onSubmit={handleSubmit(handleRegister)}>
                  <AuthInput
                    placeholder={t('auth.username')}
                    error={errors.username?.message}
                    registerProps={register("username", { required: t('auth.usernameRequired') })}
                  />
                  <AuthInput
                    placeholder={t('auth.email')}
                    error={errors.email?.message}
                    registerProps={register("email", { required: t('auth.emailRequired') })}
                  />
                  <AuthInput
                    placeholder={t('auth.password')}
                    error={errors.password?.message}
                    registerProps={register("password", { required: t('auth.passwordRequired') })}
                  />
                  <AuthInput
                    placeholder={t('auth.passwordConfirmation')}
                    error={errors.passwordConfirmation?.message}
                    registerProps={register("passwordConfirmation", {
                      required: t('auth.passwordConfirmationRequired'),
                    })}
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    {t('auth.register')}
                  </button>
                </form>
                <p className="text-sm mt-3">
                  {t('auth.haveAccount')} {" "}
                  <span
                    className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    onClick={() => setMode("login")}
                  >
                    {t('auth.login')}
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