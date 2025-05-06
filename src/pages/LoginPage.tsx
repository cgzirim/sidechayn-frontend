import { FC } from 'react';
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login: FC = () => {
  return (
    <div className="login py-10 flex justify-center items-center h-screen">
      <div className="container">
        <div className="card w-5xl max-w-full mx-auto rounded-[20px] bg-[#232323] p-10">
          <Link to="/register">
            <button className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md">
              Don’t have an account? <b>Register</b>
            </button>
          </Link>

          <div className="mt-6">
            <p className="text-gray-400">Login with:</p>

            <div className="grid my-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              <button className="btn btn-primary bg-[#3d3d38] google text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                <FaGoogle className="text-white mr-2" />
                Google
              </button>
              <button className="btn btn-primary bg-[#3d3d38] fb text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                <FaFacebookF className="text-white mr-2" />
                Facebook
              </button>
              <button className="btn btn-primary bg-[#3d3d38] insta text-white w-full px-6 py-2 rounded-md flex justify-center items-center">
                <FaInstagram className="text-white mr-2" />
                Instagram
              </button>
            </div>

            <div className="form_line-box my-5 flex items-center gap-2">
              <div className="form_line flex-1 h-px bg-gray-600" />
              <div className="text-sm text-gray-400">Or</div>
              <div className="form_line flex-1 h-px bg-gray-600" />
            </div>

            <form className="grid gap-6">
              <div>
                <label htmlFor="email" className="text-gray-300 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                  placeholder=""
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-300 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="input input-bordered w-full bg-[#3d3d38] py-2 px-3 text-white rounded-md mt-2"
                  placeholder=""
                />
                <span className="text-xs text-gray-400">
                  Forgot your password?{' '}
                  <Link to="/reset" className="text-gray-300 underline">
                    Reset it
                  </Link>
                </span>
              </div>
              <div>
                <button className="btn btn-primary bg-[#5634FE] text-white w-full px-6 py-2 rounded-md">
                  Login
                </button>
              </div>
              <span className="text-xs text-gray-400">
                By logging in, you agree to our{' '}
                <Link className="text-gray-300 underline" to="/">
                  terms of service
                </Link>
                .
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
