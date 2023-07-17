import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import axios from "axios";
import AddMentorForm from "./AddMentorForm";
import EditMentorForm from "./EditMentorForm";
import { Intern } from "../Intern/InternLayout";
import NavBar from "../NavBar";

export type Mentor = {
  id: number;
  name: string;
  age: number;
  description: string;
  interns: Intern[];
};

const MentorLayout = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [mentorBeEdited, setMentorBeEdited] = useState<Mentor>({} as Mentor);
  const [isOpen, setIsOpen] = useState(false);

  const getMentors = async () => {
    try {
      const res = await axios.get(`${API_URL}/mentor`);
      console.log(res);
      setMentors(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMentors();
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
  };

  const editMentor = async (id: number) => {
    try {
      const res = await axios.get(`${API_URL}/mentor/${id}`);
      setIsOpen(true);
      setMentorBeEdited(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMentor = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/mentor/${id}`);
      getMentors();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative">
      <NavBar />
      <div className="">
        <AddMentorForm />
        {isOpen ? (
          <EditMentorForm getMentors={getMentors} close={close} mentorBeEdit={mentorBeEdited} />
        ) : null}
        <div className="">
          <div className="flex absolute"></div>
          <table className="table-auto mx-10 mt-5">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">List Intern</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mentors
                .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
                .map((Mentor) => {
                  return [
                    <tr key={Mentor.id}>
                      <td className="border px-4 py-2">{Mentor.name}</td>
                      <td className="border px-4 py-2">{Mentor.age}</td>
                      <td className="border px-4 py-2">{Mentor.description}</td>
                      <td className="border px-4 py-2">
                        <ul className="list-disc">
                          {Mentor.interns.length > 0 ? (
                            Mentor.interns.map((intern) => (
                              <li className="list-none" key={intern.id}>
                                {intern.name}
                              </li>
                            ))
                          ) : (
                            <>Not have intern</>
                          )}
                        </ul>
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => editMentor(Mentor.id)}
                          className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMentor(Mentor.id)}
                          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>,
                  ];
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MentorLayout;
