import { useState } from "react";
import { API_URL } from "../../config/api";
import axios from "axios";

const AddMentorForm = () => {
  const [mentor, setMentor] = useState({
    name: "",
    age: 0,
    description: "",
  });
  const [open, setOpen] = useState(false);

  const addMentor = async (mentor: {}) => {
    axios.post(`${API_URL}/mentor`, mentor).then((res) => {
      console.log(res.data);
    });
  };

  const onMentorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMentor({ ...mentor, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-10">
      <button
        onClick={() => setOpen(true)}
        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-32 rounded"
      >
        Add mentor
      </button>
      <div
        className={` ${
          open ? "" : "hidden"
        }   w-1/2 translate-x-1/2 flex flex-col text-center justify-center  border-slate-400 z-10 `}
      >
        <div className="absolute top-10 w-full p-6 m-auto border-4 bg-gray-200 rounded-md shadow-xl lg:max-w-xl">
          <div
            onClick={() => {
              setMentor({ name: "", age: 0, description: "" });
              setOpen(false);
            }}
            className="absolute right-4 font-bold  hover:cursor-pointer"
          >
            x
          </div>
          <form className="mt-6">
            <div className="mb-2">
              <label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-md"
                  onChange={onMentorChange}
                  placeholder="Mentor name"
                  formNoValidate
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <input
                  type="number"
                  name="age"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-md"
                  onChange={onMentorChange}
                  placeholder="Age"
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <input
                  type="text"
                  name="description"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-md"
                  onChange={onMentorChange}
                  placeholder="Description"
                />
              </label>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                onClick={() => {
                  setMentor({
                    name: mentor.name,
                    age: mentor.age,
                    description: mentor.description,
                  });
                  addMentor(mentor);
                  setOpen(false);
                }}
                className="h-10 px-5 mx-auto text-white  duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMentorForm;
