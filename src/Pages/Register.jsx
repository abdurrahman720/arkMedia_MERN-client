import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from "../assets/png/logo-color.png";
import { UserContext } from "../Context/UserProvider";

const Register = () => {
  const { emailSignUp, updateName, googleSign, isLoading } = useContext(UserContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signError, setSignError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const imgHostKey = process.env.REACT_APP_imgbb;


  const handleSignIn = (data) => {
    setSignError("");
    console.log(data);
    //firebase authentication
    emailSignUp(data.email, data.password)
      .then(userCredentials => {
        const signedInUser = userCredentials.user;
        console.log(signedInUser);
        updateName(data.name)
          .then(() => {
            console.log("name updated");
            //store image to imgbb
            const img = data.userImage[0];
            console.log(img);
            const formData = new FormData();
            formData.append("image", img);
            const url = `https://api.imgbb.com/1/upload?&key=${imgHostKey}`;
            fetch(url, {
              method: 'POST',
              body: formData
            })
              .then((res) => res.json())
              .then((imageData) => {
                console.log(imageData);
                if (imageData.success) {
                  console.log(imageData.data.url);
                  // add to database
                  const user = {
                    userName: data.name,
                    userEmail: data.email,
                    userImage: imageData.data.url,
                    university: data.university,
                    location: data.location,
                    friends:[]
                  }
                  fetch(`http://localhost:5003/add-users`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(user)
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.acknowledged) {
                        console.log(user?.userEmail);
                      //jwt token
                        fetch(`http://localhost:5003/jwt?email=${user?.userEmail}`)
                          .then((response) => response.json())
                          .then((data) => {
                            localStorage.setItem("arkMEDIA", data.accessToken);
                            toast.success("Registration Success!")
                        })
                    }
                  })

                }
            })
          });
        
    })
  }


  return (
    <div
      className="hero min-h-screen bg-bgColor"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bg-opacity-90">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleSignIn)}>
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

            <div className="form-control w-full max-w-xs mt-2">
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
            <div className="form-control w-full max-w-xs mt-2">
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
            <div className="form-control w-full max-w-xs mt-2">
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
            <div className="form-control w-full max-w-xs mt-2">
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
            <div className="form-control w-full max-w-xs mt-2  ">
          <label className="label">
            <span className="label-text">User Image</span>
          </label>
          <input
            type="file"
            className="input input-bordered"
            {...register("userImage", { required: "photo is required" })}
            placeholder=""
          />
          {errors.userImage && (
            <p className="text-red-600" role="alert">
              {errors.userImage?.message}
            </p>
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
