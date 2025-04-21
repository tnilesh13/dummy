import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/thunk/AuthThunk";
import InputField from "../../components/InputText";
import { setAuthStatus } from "../../redux/slice/AuthSlice";
import bgImage from "../../assets/login_background.jpg";
import * as ErrorCss from "../../css/ErrorCss";
import { setTokenToLocalStorage } from "../../utils/storageUtility";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, isLoading, error, token } = useSelector(
    (state) => state.AuthReducer
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setValidationErrors("Valid email is required");
    } else if (!password) {
      setValidationErrors("Password is required");
    } else {
      setValidationErrors("");
      dispatch(loginUser({ email, password }));
    }
  };

  useEffect(() => {
    if (isLogin && token) {
      navigate("/dashboard");
    }
  }, [isLogin, token, navigate]);

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h2 className="text-[20px] font-medium mb-4 text-center text-white">
        Login
      </h2>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="bg-white bg-transparent text-center rounded-xl shadow-lg h-[225px] w-[364px]  flex flex-col items-center justify-center gap-5">
            <div className="">
              <InputField
                id="username"
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <InputField
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!error && validationErrors && (
              <p className={`mt-2 flex justify-center ${ErrorCss.errorColor}`}>
                {validationErrors}
              </p>
            )}
            {error && (
              <p className={`mt-2 flex justify-center ${ErrorCss.errorColor}`}>
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center mt-5">
            <button
              className=" text-black bg-white w-[150px] h-[28px] py-1 px-4 rounded-lg text-[12px] focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLoading ? "Loading..." : "Login to your account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
