
import './App.css'
const Showitem = ({ taskname, description, status, handleDelete, handleEdit }) => {
    return (
        <div className='task-item'>
            <h3>Taskname: {taskname}</h3>
            <h3>Description: {description}</h3>
            <h3>Status: {status}</h3>
            <button onClick={() => handleDelete(taskname)}>Delete</button>
            <button onClick={() => handleEdit(taskname)}>Edit</button>
        </div>
    );
}

export default Showitem;
