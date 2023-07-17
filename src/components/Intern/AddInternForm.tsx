import { useState } from "react";
import { API_URL } from "../../config/api";
import axios from "axios";
import { Mentor } from "../Mentor/MentorLayout";
type Props = {
  mentors: Mentor[];
};
const AddInternForm: React.FC<Props> = (props) => {
  const { mentors } = props;
  const [intern, setIntern] = useState({
    name: "",
    age: 0,
    description: "",
    mentor: {
      id: 0,
    },
  });
  const [open, setOpen] = useState(false);

  const addIntern = async (intern: {}) => {
    console.log(intern);
    axios.post(`${API_URL}/intern`, intern).then((res) => {
      console.log(res.data);
    });
    setIntern({ name: "", age: 0, description: "", mentor: { id: 0 } });
  };

  const onInternChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntern({ ...intern, [e.target.name]: e.target.value });
  };

  const onSelectMentorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIntern((intern) => ({
      ...intern,
      mentor: {
        ...intern.mentor,
        id: +e.target.value, //convert string to number
      },
    }));
    console.log(intern);
  };

  return (
    <div className="mx-10">
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-32 rounded"
      >
        Add intern
      </button>
      <div
        className={` ${
          open ? "" : "hidden"
        }   w-1/2 translate-x-1/2 flex flex-col justify-center text-center border-slate-400 z-1 `}
      >
        <div className="absolute top-10 w-full p-6  border-4 bg-gray-200 rounded-md shadow-xl lg:max-w-xl">
          <div
            onClick={() => {
              setIntern({ name: "", age: 0, description: "", mentor: { id: 0 } });
              setOpen(false);
            }}
            className="absolute right-4 font-bold hover:cursor-pointer"
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
                  onChange={onInternChange}
                  placeholder="Intern name"
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <input
                  type="number"
                  name="age"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-md"
                  onChange={onInternChange}
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
                  onChange={onInternChange}
                  placeholder="Description"
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <select
                  onChange={onSelectMentorChange}
                  placeholder="Mentor"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-md"
                >
                  <option defaultValue="Choose a mentor">--Choose a mentor--</option>
                  {mentors.map((mentor) => (
                    <option value={mentor.id} key={mentor.id}>
                      {mentor.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                onClick={() => {
                  setIntern({
                    name: intern.name,
                    age: intern.age,
                    description: intern.description,
                    mentor: { id: intern.mentor.id },
                  });
                  addIntern(intern);
                  setOpen(false);
                }}
                className="h-10 px-5 text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
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

export default AddInternForm;
