import { useState, useEffect } from "react";
import { API_URL } from "../../config/api";
import axios from "axios";
import AddInternForm from "./AddInternForm";
import EditInternForm from "./EditInternForm";
import NavBar from "../NavBar";
import { Mentor } from "../Mentor/MentorLayout";

export type Intern = {
  id: number;
  name: string;
  age: number;
  description: string;
  mentor: { id: number };
  project: [];
};

const InternLayout = () => {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [internBeEdited, setInternBeEdited] = useState<Intern>({} as Intern);
  const [isOpen, setIsOpen] = useState(false);
  const [mentors, setMentors] = useState<Mentor[]>([]);

  const getMentors = async () => {
    try {
      const res = await axios.get(`${API_URL}/mentor`);
      setMentors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getInterns = async () => {
    try {
      const res = await axios.get(`${API_URL}/intern`);
      setInterns(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getInterns();
    getMentors();
  }, []);

  const close = () => {
    setIsOpen(false);
  };
  const editIntern = async (id: number) => {
    try {
      const res = await axios.get(`${API_URL}/intern/${id}`);
      setIsOpen(true);
      setInternBeEdited(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteIntern = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/intern/${id}`);
      getInterns();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative">
      <NavBar />
      <div className=" ">
        <AddInternForm mentors={mentors} />
        {isOpen ? (
          <EditInternForm
            getInterns={getInterns}
            mentors={mentors}
            close={close}
            internBeEdit={internBeEdited}
          />
        ) : null}
        <div className="mx-auto">
          <table className="table-auto mx-10 mt-5">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interns
                .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
                .map((intern) => {
                  return [
                    <tr key={intern.id}>
                      <td className="border px-4 py-2">{intern.name}</td>
                      <td className="border px-4 py-2">{intern.age}</td>
                      <td className="border px-4 py-2">{intern.description}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => editIntern(intern.id)}
                          className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteIntern(intern.id)}
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

export default InternLayout;
