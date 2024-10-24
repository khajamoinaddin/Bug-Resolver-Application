import React, { useState, useContext, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import AppContext from "../../context/ContextWrapper";
import { updateMyProfileServices } from "../../services/user.api";
import MainLayout from "../layouts/MainLayout";

const MyProfile = ({ user }) => {
  const { profileState, setprofileState } = useContext(AppContext);

  const [details, setdetails] = useState({
    email: profileState?.email || "",
    name: profileState?.name || "",
    phone: profileState?.phone || "",
    address: profileState?.address || "",
    loading: false,
    isChange: false,
    profilePicture: profileState?.profilePicture || "", // Initial profile picture from context
  });

  useEffect(() => {
    // Load profile picture from local storage
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      setdetails((prev) => ({ ...prev, profilePicture: savedProfilePicture }));
    }

    if (profileState) {
      setdetails((prev) => ({
        ...prev,
        email: profileState?.email || "",
        name: profileState?.name || "",
        phone: profileState?.phone || "",
        address: profileState?.address || "",
      }));
    }
  }, [profileState]);

  const handleOnChangeFunction = (e) => {
    if (!details.isChange) {
      setdetails((prev) => ({
        ...prev,
        isChange: true,
      }));
    }
    const { value, name } = e.target;
    setdetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setdetails((prev) => ({
          ...prev,
          profilePicture: reader.result, // Update the profile picture state
        }));
        // Save the new profile picture to local storage
        localStorage.setItem("profilePicture", reader.result);
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  const updateDetailsHandler = async (e) => {
    if (!details.isChange) return;
    setdetails((prev) => ({ ...prev, loading: true }));
    const json = {
      name: details.name,
      phone: details.phone,
      profilePicture: details.profilePicture, // Include the profile picture in the update
    };
    const response = await updateMyProfileServices(json);
    if (!response.success) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      setprofileState((prev) => ({ ...prev, ...response.data }));
    }
    setdetails((prev) => ({ ...prev, loading: false }));
  };

  return (
    <div className="createbug">
      <MainLayout>
        <div className="h-full w-full flex items-center justify-center p-8">
          <div className="flex w-1/3 max-md:w-full flex-col gap-4">
            <h1 className="text-4xl font-bold text-center">My Profile Details</h1>

            {/* User Photo Section */}
            <div className="flex flex-col items-center mb-4">
              <div
                className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: `url(${details.profilePicture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {!details.profilePicture && <span className="text-gray-500">User Photo</span>}
              </div>
              <Button
                type="button"
                className="mt-2"
                onClick={() => document.getElementById('file-input').click()}
              >
                Choose Photo
              </Button>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

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
                disabled={true}
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

            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="Employee ID" />
              </div>
              <TextInput
                id="address"
                type="text"
                placeholder="Your Employee ID"
                value={details.address}
                name="address"
                onChange={handleOnChangeFunction}
                required
              />
            </div>

            <Button
              type="button"
              disabled={details?.loading}
              isProcessing={details?.loading}
              color="purple"
              onClick={updateDetailsHandler}
            >
              Update
            </Button>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default MyProfile;
