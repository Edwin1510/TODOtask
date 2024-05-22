
import { useState } from "react";
import Showitem from "./Showitem";

function App() {
    const initialstate = {
        taskname: "",
        description: "",
        status: "NOTCOMPLETED"
    };

    const [formdata, setformdata] = useState(initialstate);
    const [postdata, setpostdata] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskname, setCurrentTaskname] = useState("");
    const [filter, setFilter] = useState("ALL");

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formdata.taskname.trim() === "" || formdata.description.trim() === "") {
          alert("Please fill in all fields");
          return;
      }
      if (isEditing) {
          setpostdata(postdata.map((p) => 
              p.taskname === currentTaskname ? formdata : p
          ));
          setIsEditing(false);
          setCurrentTaskname("");
      } else {
          setpostdata([...postdata, formdata]);
      }
      setformdata(initialstate);
  };

 

    const handleDelete = (taskname) => {
        setpostdata(postdata.filter((p) => p.taskname !== taskname));
    };

    const handleEdit = (taskname) => {
        const taskToEdit = postdata.find((p) => p.taskname === taskname);
        setformdata(taskToEdit);
        setIsEditing(true);
        setCurrentTaskname(taskname);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredData = postdata.filter((task) => {
        if (filter === "ALL") return true;
        if (filter === "COMPLETED") return task.status === "COMPLETED";
        if (filter === "NOTCOMPLETED") return task.status === "NOTCOMPLETED";
        return true;
    });

    return (
        < >
        <div className="app-container">

        <form onSubmit={handleSubmit}>
                <label htmlFor="taskname">Taskname</label>
                <input
                    id="taskname"
                    value={formdata.taskname}
                    type="text"
                    name="taskname"
                    onChange={handleChange}
                />
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    value={formdata.description}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    name="status"
                    value={formdata.status}
                    onChange={handleChange}
                >
                    <option value="NOTCOMPLETED">NOTCOMPLETED</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
                <input type="submit" value={isEditing ? "Update Task" : "Add Task"} />
            </form>
        </div>
            
          
        <div className="filter-container">

        <label htmlFor="filter">Filter by status:</label>
            <select id="filter" value={filter} onChange={handleFilterChange}>
                <option value="ALL">All</option>
                <option value="COMPLETED">Completed</option>
                <option value="NOTCOMPLETED">Not Completed</option>
            </select>
          
        </div>
           

           <div className="box">
           {filteredData.map((p) => (
                <Showitem
                    {...p}
                    key={p.taskname}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            ))}
           </div>
        </>
    );
}

export default App;
