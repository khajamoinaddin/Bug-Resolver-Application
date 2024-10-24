import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import { PostRegisterServices } from "../../services/auth.api";
import { Link } from "react-router-dom";
import logo from "../layouts/images/logo.jpg";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Importing eye icons

const RegisterPage = () => {
  const [details, setdetails] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    loading: false,
  });

  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleOnChangeFunction = (e) => {
    const { value, name } = e.target;
    setdetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setdetails((prev) => ({ ...prev, loading: true }));
    const json = {
      email: details.email,
      password: details.password,
      name: details.name,
      phone: details.phone,
    };
    const response = await PostRegisterServices(json);
    if (!response.success) {
      toast.error(response.message);
      setdetails((prev) => ({ ...prev, loading: false }));
    } else {
      toast.success(response.message);
      setdetails((prev) => ({
        ...prev,
        email: "",
        name: "",
        phone: "",
        password: "",
        loading: false,
      }));
    }
  };

  return (
    <div className="homedesignnew">
    <div className="h-full w-full flex items-center justify-center p-8">
    
    <div className="backbtn">
       <button className="btn-back"><Link to="/abhishyandh"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-start-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M10.229 5.055a.5.5 0 0 0-.52.038L7 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407v-5a.5.5 0 0 0-.271-.445"/>
</svg>Back To Home Page</Link></button>
    </div>
      <div className="registerjs">
        <img src={logo} alt="logo" className="imagelogo" />
        <h1>Abhishyandh's Bug Resolver Tool</h1>
        <p className="paragraphjs">
          Abhishyandh's Bug Resolver Tool: Elevate your testing capabilities and streamline your workflow with our innovative software. Designed to simplify bug tracking and resolution, this tool empowers teams to address issues more efficiently, enhancing collaboration and productivity.
        </p>
      </div>
      <form
        className="flex w-1/3 max-md:w-full flex-col gap-4"
        onSubmit={submitHandler}
      >
        <h1 className="text-4xl font-bold text-center">Register</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="email@gmail.com"
            value={details.email}
            name="email"
            onChange={handleOnChangeFunction}
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="Name"
            value={details.name}
            name="name"
            onChange={handleOnChangeFunction}
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Your Phone" />
          </div>
          <TextInput
            id="phone"
            type="text"
            placeholder="phone number"
            value={details.phone}
            name="phone"
            onChange={handleOnChangeFunction}
            required
          />
        </div>

        <div className="relative">
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type={showPassword ? "text" : "password"}  
            value={details.password}
            name="password"
            placeholder="*********"
            onChange={handleOnChangeFunction}
            required
          />
          <br/>
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center"  
            onClick={() => setShowPassword(!showPassword)}  
          >
            {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex justify-end">
          <Link
            to={"/login"}
            className="cursor-pointer underline text-gray-500 text-sm"
          >
            Already Registered?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={details?.loading}
          isProcessing={details?.loading}
          color="purple"
        >
          Register
        </Button>
      </form>
    </div>
    </div>
  );
};

export default RegisterPage;
