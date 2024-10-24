import React, { useState, useEffect } from "react";
import {
  Label,
  TextInput,
  Textarea,
  Button,
  Select,
  FileInput,
} from "flowbite-react";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import { getUserNamesServices } from "../../services/user.api";
import { createNewBugServices } from "../../services/bugs.api";

const CreateBug = () => {
  const [details, setdetails] = useState({
    title: "",
    component: "",
    priority: "",
    description: "",
    assignedTo: "",
    loading: false,
  });

  const [bugImage, setbugImage] = useState({ imageData: null, preview: null });

  const [usersOptions, setusersOptions] = useState(null);

  useEffect(() => {
    fetchNamesOptionsList();
  }, []);

  const handleOnChangeFunction = (e) => {
    const { value, name } = e.target;
    setdetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchNamesOptionsList = async () => {
    const response = await getUserNamesServices();
    if (response.success) {
      setusersOptions(response.data);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setbugImage({ imageData: file, preview: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setdetails((prev) => ({ ...prev, loading: true }));

    const newform = new FormData();

    for (let keys in details) {
      if (keys !== "loading") {
        newform.append(keys, details[keys]);
      }
    }

    if (bugImage.imageData) {
      newform.append("bugImage", bugImage.imageData);
    }

    const response = await createNewBugServices(newform);
    if (!response.success) {
      toast.error(response.message);
      setdetails((prev) => ({ ...prev, loading: false }));
    } else {
      toast.success(response.message);
      setdetails((prev) => ({
        ...prev,
        title: "",
        component: "",
        priority: "",
        description: "",
        assignedTo: "",
        loading: false,
      }));
      setbugImage({ imageData: null, preview: null });
    }
  };

  return (
    <div className="createbug">
    <MainLayout>
      <div className="h-full w-full flex justify-center p-8 mb-4">
        <form
          className="flex w-2/3 max-md:w-full flex-col gap-4 h-auto"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <h1 className="text-4xl font-bold text-center">Report a Bug</h1>

          <div>
            <Label htmlFor="title" value="Bug Title" />
            <TextInput
              id="title"
              name="title"
              type="text"
              placeholder="Enter bug title"
              value={details.title}
              onChange={handleOnChangeFunction}
              required
            />
          </div>

          <div>
            <Label htmlFor="component" value="Component" />
            <TextInput
              id="component"
              name="component"
              type="text"
              placeholder="Component name"
              value={details.component}
              onChange={handleOnChangeFunction}
              required
            />
          </div>

          <div>
            <Label htmlFor="priority" value="Priority" />
            <Select
              id="priority"
              name="priority"
              value={details.priority}
              onChange={handleOnChangeFunction}
              required
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </div>

          {usersOptions && (
            <div>
              <Label htmlFor="assignedTo" value="Assigned To" />

              <Select
                id="assignedTo"
                name="assignedTo"
                value={details.assignedTo}
                onChange={handleOnChangeFunction}
                required
              >
                <option value="" disabled>
                  Select priority
                </option>
                {usersOptions.map((singleOption) => (
                  <option value={singleOption?._id} key={singleOption?._id}>
                    {singleOption?.name}
                  </option>
                ))}
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="description" value="Description" />
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the bug"
              value={details.description}
              onChange={handleOnChangeFunction}
              rows={4}
            />
          </div>

          <div>
            {bugImage.preview ? (
              <div className="w-full">
                <img
                  className="h-60 w-full rounded-lg"
                  src={bugImage.preview}
                  alt=""
                />
              </div>
            ) : (
              <FileInput
                id="file-upload-helper-text"
                accept=".jpg, .jpeg, .png"
                helperText="PNG, JPG or JPEG "
                onChange={handleImageChange}
                disabled={details.loading}
              />
            )}
          </div>

          <Button type="submit" disabled={details.loading} color="purple">
            {details.loading ? "Submitting..." : "Submit Bug"}
          </Button>
        </form>
      </div>
    </MainLayout>
    </div>
  );
};

export default CreateBug;
