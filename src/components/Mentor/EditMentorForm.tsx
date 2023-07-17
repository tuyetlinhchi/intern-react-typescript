import { useState } from "react";
import { API_URL } from "../../config/api";
import axios from "axios";
import { Mentor } from "./MentorLayout";
import { Intern } from "../Intern/InternLayout";

type Props = {
  getMentors(): void;
  close(): void;
  mentorBeEdit?: Mentor;
};

const EditMentorForm: React.FC<Props> = (props) => {
  const { getMentors, close, mentorBeEdit } = props;
  const [mentor, setMentor] = useState({
    id: mentorBeEdit ? mentorBeEdit.id : 0,
    name: mentorBeEdit ? mentorBeEdit.name : "",
    age: mentorBeEdit ? mentorBeEdit.age : 0,
    description: mentorBeEdit ? mentorBeEdit.description : "",
    interns: mentorBeEdit ? mentorBeEdit.interns : [],
  });

  const editMentor = async (mentor: {
    id: number;
    name: string;
    age: number;
    description: string;
    interns: Intern[];
  }) => {
    try {
      await axios.put(`${API_URL}/mentor/${mentor.id}`, mentor);
      getMentors();
    } catch (err) {
      console.log(err);
    }
  };

  const onMentorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMentor({ ...mentor, [e.target.name]: e.target.value });
  };
  return (
    <div className="">
      <div
        className={`  top-40  w-1/2 bottom-0 translate-x-1/2 flex flex-col text-center justify-center  border-slate-400 z-10 `}
      >
        <div className="absolute top-10 w-full p-6 m-auto border-4 bg-gray-200 rounded-md shadow-xl lg:max-w-xl">
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
                  onChange={onMentorChange}
                  placeholder="Mentor name"
                  value={mentor.name}
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
                  value={mentor.age ? mentor.age.toString() : ""}
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
                  value={mentor.description}
                />
              </label>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                onClick={() => {
                  setMentor({
                    id: mentor.id,
                    name: mentor.name,
                    age: mentor.age,
                    description: mentor.description,
                    interns: mentor.interns,
                  });
                  editMentor(mentor);
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

export default EditMentorForm;
