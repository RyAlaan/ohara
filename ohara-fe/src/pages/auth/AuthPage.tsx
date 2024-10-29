import { useLocation } from "react-router-dom";
import InputComponent from "../../components/Input/Input";
import { clsx } from "clsx";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { Alert } from "@mui/material";

const AuthPage = () => {
  const path = useLocation();
  const lastPath = path.pathname.split("/").pop();
  const { message } = useAuth();

  return (
    <div
      className={clsx(
        { "xl:justify-end": lastPath == "register" },
        { "xl:justify-start": lastPath == "login" },
        "relative font-poppins min-h-screen flex flex-row justify-center items-center"
      )}
    >
      <Alert
        className={clsx(
          lastPath === "login"
            ? "left-1/2 -translate-x-1/2 xl:left-1/4 xl:-translate-x-1/2 "
            : "right-1/2 translate-x-1/2 xl:right-1/4 xl:translate-x-1/2",
          { "translate-y-40": message },
          "absolute -top-20  max-w-96 w-full text-justify transition-all duration-500 ease-linear"
        )}
        variant="filled"
        severity="error"
      >
        {message}
      </Alert>
      <AuthLayout>
        {lastPath === "login" ? (
          <>
            <InputComponent className="w-full" type="text" name="email" />
            <InputComponent
              className="w-full"
              type="password"
              name="password"
            />
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-y-10 gap-x-10">
              <InputComponent
                className="xl:max-w-56 min-w-56 w-full"
                type="text"
                name="username"
              />
              <InputComponent
                className="xl:max-w-56 w-full"
                type="text"
                name="email"
              />
            </div>
            <InputComponent
              className="w-full"
              type="password"
              name="password"
            />
          </>
        )}
      </AuthLayout>
      <div
        className={clsx(
          "blob absolute top-0 left-0 hidden xl:flex bg-purple-700 w-1/2 min-h-screen items-center justify-center transition-all duration-500",
          lastPath == "login" ? "translate-x-full" : "-translate-x-0"
        )}
      >
        <svg
          width="469"
          height="478"
          viewBox="0 0 469 478"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#8652FF">
            <animate
              attributeName="d"
              dur={"10s"}
              repeatCount="indefinite"
              values="
            M311.681 64.6624C348.981 98.9624 381.481 132.462 414.081 178.662C446.581 224.962 479.081 283.862 464.881 327.662C450.581 371.462 389.681 400.062 336.181 426.362C282.681 452.662 236.581 476.562 189.781 477.662C142.981 478.762 95.3806 456.962 68.5806 421.962C41.8806 386.962 35.9806 338.862 23.7806 294.362C11.5806 249.962 -6.81939 209.162 2.58061 176.662C11.9806 144.062 49.2806 119.762 85.2806 85.0624C121.181 50.4624 155.881 5.46237 194.181 0.462371C232.481 -4.43763 274.481 30.4624 311.681 64.6624Z;

            M342.907 8.58607C380.007 30.1861 388.107 97.0861 407.207 159.486C426.307 221.986 456.407 279.986 438.407 318.286C420.407 356.686 354.307 375.386 302.207 396.686C250.007 418.086 211.807 442.186 174.907 440.486C137.907 438.686 102.307 411.086 70.9067 382.986C39.5067 354.886 12.4067 326.186 3.50669 292.886C-5.39331 259.686 3.80669 221.886 18.1067 188.086C32.3067 154.286 51.5067 124.486 78.3067 99.5861C105.007 74.5861 139.307 54.3861 189.507 32.4861C239.707 10.5861 305.907 -13.1139 342.907 8.58607Z;

            M271.674 100.874C300.074 130.774 323.274 158.474 359.974 198.874C396.774 239.374 446.974 292.574 439.074 329.974C431.174 367.374 365.174 388.974 311.674 415.574C258.174 442.174 217.174 473.874 175.874 474.374C134.574 474.874 92.7738 444.374 61.0738 410.674C29.3738 376.974 7.77383 340.074 1.87383 302.674C-4.02617 265.274 5.87382 227.274 6.07382 173.574C6.17382 119.874 -3.42617 50.3742 23.3738 19.9742C50.0738 -10.5258 113.174 -2.02584 161.474 18.3742C209.774 38.6742 243.274 70.8742 271.674 100.874Z;
            
            M311.681 64.6624C348.981 98.9624 381.481 132.462 414.081 178.662C446.581 224.962 479.081 283.862 464.881 327.662C450.581 371.462 389.681 400.062 336.181 426.362C282.681 452.662 236.581 476.562 189.781 477.662C142.981 478.762 95.3806 456.962 68.5806 421.962C41.8806 386.962 35.9806 338.862 23.7806 294.362C11.5806 249.962 -6.81939 209.162 2.58061 176.662C11.9806 144.062 49.2806 119.762 85.2806 85.0624C121.181 50.4624 155.881 5.46237 194.181 0.462371C232.481 -4.43763 274.481 30.4624 311.681 64.6624Z;
            "
            ></animate>
          </path>
        </svg>
      </div>
    </div>
  );
};

export default AuthPage;
