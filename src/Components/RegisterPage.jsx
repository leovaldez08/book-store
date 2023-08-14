import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "../Assets/Logo.png";

function RegisterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between px-4 py-6 bg-white border-b-2 border-gray-600">
        <NavLink to="/" className="flex items-center space-x-2">
          <ArrowBackIcon />
          <img className="w-42" src={Logo} alt="Logo" />
        </NavLink>
      </div>
      <div className="mt-10 flex flex-col items-center">
        <strong className="mb-4 text-xl font-semibold">
          Create Your Account
        </strong>
        {isSubmitted ? (
          <div className="p-6 text-center bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">
              Registration Successful!
            </h2>
            <p className="mb-4 text-gray-700">
              Enjoy browsing our library of books and discovering new titles.
            </p>
            <p className="font-semibold">Happy learning!</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full px-5 py-6 bg-white rounded-md shadow-md md:w-2/3 lg:w-1/3"
          >
            <div className="flex justify-between mb-6">
              <div className="flex">
                <input
                  type="text"
                  placeholder="First name"
                  className="border rounded-lg border-gray-400 h-12 pl-4 outline-none w-full"
                  {...register("firstName", {
                    required: true,
                    minLength: 3,
                    maxLength: 30,
                  })}
                />
                {errors.firstName && errors.firstName.type === "required" && (
                  <>
                    <span className="text-red-500">First name is required</span>
                    <br />
                  </>
                )}
                {errors.firstName && errors.firstName.type === "minLength" && (
                  <>
                    <span className="text-red-500">
                      First name should have a minimum of 3 characters
                    </span>
                    <br />
                  </>
                )}
                {errors.firstName && errors.firstName.type === "maxLength" && (
                  <>
                    <span className="text-red-500">
                      First name can only have maximum of 30 characters
                    </span>
                    <br />
                  </>
                )}
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Last name"
                  className="border rounded-lg border-gray-400 h-12 pl-4 outline-none w-full"
                  {...register("lastName", {
                    required: true,
                    minLength: 3,
                    maxLength: 30,
                  })}
                />
                {errors.lastName && errors.lastName.type === "required" && (
                  <>
                    <span className="text-red-500">Last name is required</span>
                    <br />
                  </>
                )}
                {errors.lastName && errors.lastName.type === "minLength" && (
                  <>
                    <span className="text-red-500">
                      Last name should have a minimum of 3 characters
                    </span>
                    <br />
                  </>
                )}
                {errors.lastName && errors.lastName.type === "maxLength" && (
                  <>
                    <span className="text-red-500">
                      Last name can only have maximum of 30 characters
                    </span>
                    <br />
                  </>
                )}
              </div>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="border rounded-lg mb-6 border-gray-400 h-12 pl-4 outline-none w-full"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <>
                  <span className="text-red-500">Email is required</span>
                  <br />
                </>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <>
                  <span className="text-red-500">Enter an valid email</span>
                  <br />
                </>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="border rounded-lg mb-6 border-gray-400 h-12 pl-4 outline-none w-full"
                {...register("password", {
                  required: true,
                  minLength: 10,
                  pattern: /.*[\W]+.*/i,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <>
                  <span className="text-red-500">Password is required</span>
                  <br />
                </>
              )}
              {errors.password && errors.password.type === "minlength" && (
                <>
                  <span className="text-red-500">
                    Password must be longer than 10 characters
                  </span>
                  <br />
                </>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <>
                  <span className="text-red-500">
                    Password should contain a special symbol
                  </span>
                  <br />
                </>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                className="border rounded-lg mb-6 border-gray-400 h-12 pl-4 outline-none w-full"
                {...register("confirmPassword", {
                  validate: (value) => value === watch("password"),
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500">Passwords must match</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full h-10 mt-4 px-4 py-2 bg-green-500 rounded text-white font-semibold disabled:bg-gray-400"
              disabled={Object.keys(errors).length > 0}
            >
              Sign up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
