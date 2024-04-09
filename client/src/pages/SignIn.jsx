import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector} from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      let errorMessage = 'Network Error. Please check your connection and try again.';
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        // It's a network error
        dispatch(signInFailure({message: errorMessage}));
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-slate-50">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-transparent text-slate-400 p-3 rounded-lg border-2 border-slate-300 focus:text-slate-50"
          onChange={handleChange}
          
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-transparent text-slate-400 p-3 rounded-lg border-2 border-slate-300 focus:text-slate-50"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-white border-2 border-slate-50 text-black font-medium mt-5 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>

      <div className=" flex gap-2 mt-5 text-slate-50">
        <p> Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-cyan-300">Sign up</span>
        </Link>
      </div>
      <p className="text-red-500 mt-5">
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
    </div>
  );
}
