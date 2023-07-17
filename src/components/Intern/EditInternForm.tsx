import { useState } from "react";
import { API_URL } from "../../config/api";
import axios from "axios";
import { Intern } from "./InternLayout";
import { Mentor } from "../Mentor/MentorLayout";
type Props = {
  getInterns(): void;
  close(): void;
  internBeEdit?: Intern;
  mentors: Mentor[];
};

const EditInternForm: React.FC<Props> = (props) => {
  const { getInterns, close, internBeEdit, mentors } = props;
  const [intern, setIntern] = useState({
    id: internBeEdit ? internBeEdit.id : 0,
    name: internBeEdit ? internBeEdit.name : "",
    age: internBeEdit ? internBeEdit.age : 0,
    description: internBeEdit ? internBeEdit.description : "",
    mentor: {
      id: 0,
    },
  });

  const editIntern = async (intern: {
    id: number;
    name: string;
    age: number;
    description: string;
    mentor: { id: number };
  }) => {
    try {
      await axios.put(`${API_URL}/intern/${intern.id}`, intern);
      getInterns();
    } catch (err) {
      console.log(err);
    }
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
    <div className="">
      <div
        className={` w-1/2 bottom-0 translate-x-1/2 flex flex-col justify-center  border-slate-400 z-10 `}
      >
        <div className="absolute top-10 w-full p-6 m-auto border-4 text-center bg-gray-200 rounded-md shadow-xl lg:max-w-xl">
          <div
            onClick={() => {
              close();
            }}
            className="absolute font-bold right-4 hover:cursor-pointer"
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
                  value={intern.name}
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
                  value={intern.age ? intern.age.toString() : ""}
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
                  value={intern.description}
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
                    id: intern.id,
                    name: intern.name,
                    age: intern.age,
                    description: intern.description,
                    mentor: {
                      id: intern.mentor.id,
                    },
                  });
                  editIntern(intern);
                  close();
                }}
                className="h-10 px-5 text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInternForm;
