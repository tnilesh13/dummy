import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupRequestThunk } from "../../redux/thunk/AuthThunk";
import { getTokenFromLocalStorage } from "../../utils/storageUtility";
import bgImage from "../../assets/login_background.jpg";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector(
    (state) => state.AuthReducer,
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      navigate("/chat"); // /dashboard
    }
  }, [navigate]);

  // useEffect(() => {
  //   if (isLoading) { // && token) {
  //     // navigate("/chat"); // /dashboard
  //     navigate("/login"); // /dashboard
  //   }
  // }, [isLoading, token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName) {
      toast.error("Full name is required", { id: '1' });
    } else if (!email.trim()) {
      toast.error("Email is required", { id: '1' });
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error("Invalid email format", { id: '1' });
    } else if (!password || !confirmPassword) {
      toast.error("Password and confirmation are required", { id: '1' });
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match", { id: '1' });
    } else {
      dispatch(signupRequestThunk({ fullName, email, password }));
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-black via-gray-900 to-black">
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
      />
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="bg-[#03003d] p-3 rounded-full shadow-md">
              <span className="text-white text-2xl font-bold">
                <UserPlus />
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-[#f6f5ff] mb-2">
            Create an Account
          </h2>
          <p className="text-gray-400">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-md bg-[#1f1f26] border border-[#3a3a42] text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#03003d] focus:border-[#03003d] transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md bg-[#1f1f26] border border-[#3a3a42] text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#03003d] focus:border-[#03003d] transition"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 rounded-md bg-[#1f1f26] border border-[#3a3a42] text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#03003d] focus:border-[#03003d] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-[#03003d] text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 rounded-md bg-[#1f1f26] border border-[#3a3a42] text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#03003d] focus:border-[#03003d] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-[#03003d] text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#03003d] hover:bg-[#050055] transition font-semibold text-white hover:scale-105 shadow-md"
          >
            {isLoading ? "Loading..." : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#eae9ff] hover:underline font-semibold"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
