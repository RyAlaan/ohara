import clsx from "clsx";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const path = useLocation();
  const lastPath = path.pathname.split("/").pop();
  const { handleLogin, handleRegister, isLoading } = useAuth();

  return (
    <form
      className={clsx(
        "max-w-3xl w-full xl:w-1/2 px-12 md:px-24 flex flex-col justify-center gap-y-12"
      )}
      onSubmit={
        lastPath === "login" ? (e) => handleLogin(e) : (e) => handleRegister(e)
      }
    >
      <div className="header flex flex-col gap-y-5">
        <h1 className="font-bold text-4xl">
          {lastPath === "login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-slate-400 max-w-64">
          {lastPath === "login"
            ? "Welcome back! please login to your account."
            : "Howdy! please insert your data."}
        </p>
      </div>
      <div className="flex flex-col gap-y-10">{children}</div>
      <button
        className={clsx(
          isLoading ? "bg-purple-700" : "bg-lightPrimary",
          "w-full text-white rounded px-2 py-3 font-semibold uppercase hover:bg-purple-700 click:bg-lightPrimary transition-all duration-200"
        )}
      >
        {lastPath === "login" ? "Login" : "Sign Up"}
      </button>
      <div className="flex flex-row gap-x-2">
        {lastPath === "login" ? (
          <>
            <p className="text-slate-400">New User?</p>
            <Link
              to={"/auth/register"}
              className="text-lightPrimary font-bold text-base"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <p className="text-slate-400">Already Have An Account?</p>
            <Link
              to={"/auth/login"}
              className="text-lightPrimary font-bold text-base"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </form>
  );
};

export default AuthLayout;
