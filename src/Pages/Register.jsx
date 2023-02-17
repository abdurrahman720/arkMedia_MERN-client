import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import image from "../assets/png/logo-color.png";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signError, setSignError] = useState("");

  return (
    <div
      className="hero min-h-screen bg-bgColor"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bg-opacity-90">
        <div className="card-body">
          <form onSubmit={handleSubmit()}>
            <h2 className="text-2xl text-center">Register</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-600">{errors.name?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-sm">
              <label>
                <span className="label-text">University</span>
              </label>
              <input
                type="text"
                {...register("university", {
                  required: "University name is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-sm">
              <label>
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                {...register("Location", {
                  required: "Location is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email Address is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
              />

              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
            </div>
            <input
              className="btn btn-accent w-full mt-5"
              value="Register"
              type="submit"
            />
            <div>
              {signError && <p className="text-red-600">{signError}</p>}
            </div>
          </form>
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="text-secondary" to="/login">
              Login
            </Link>
          </p>
          <div className="divider">OR</div>
          <button
            // onClick={handleGoogleSign}
            className="btn btn-outline btn-secondary w-full"
          >
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
