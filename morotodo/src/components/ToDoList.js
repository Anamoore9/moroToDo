import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToDoForm from './ToDoForm';

const ToDoList = () => {
    const [taskdata, setTaskData] = useState(null);
    const [displayCompleted, setDisplayCompleted] = useState(false);

    const handleChange = () => {
        setDisplayCompleted(!displayCompleted);
    };

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8080/tasks/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const ChangeComplete = (item) => {
        var myStatus = item.completed ? "incomplete" : "complete";

            if (window.confirm('Do you want to mark as ' + myStatus + '?')) {
                fetch("http://localhost:8080/tasks/" + item.id + "/" + myStatus, {
                    method: "POST"
                }).then((res) => {
                    alert('Changed successfully.')
                }).catch((err) => {
                    console.log(err.message)
                })
            }
    }

    useEffect(() => {
        var customCheckbox = displayCompleted ? "/completed" : "";
            fetch("http://localhost:8080/tasks" + customCheckbox).then((res) => {
                return res.json();
            }).then((resp) => {
                setTaskData(resp);
            }).catch((err) => {
                console.log(err.message);
            })
    }, [displayCompleted,taskdata])

    return (
        <div className="container">
            <div>
                <div className="card-title">
                    <h2>Task Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <ToDoForm></ToDoForm>
                    </div>
                    <label className="checkBox">
                        <input className="checkBoxInput" type="checkbox"
                               checked={displayCompleted}
                               onChange={handleChange} />
                        Display only completed
                    </label>
                    <table id="tasks">
                        <thead>
                        <tr>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taskdata &&
                            taskdata.map(item => (
                                <tr key={item.id}>
                                    <td>{item.text}</td>
                                    <td>{(item.completed)? "Complete":"Incomplete"}</td>
                                    <td><Link to={"/toDo/Edit/" + item.id} state={{ taskText: item.text }} className="btn btn-success"><button>Edit</button></Link>
                                        <button onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</button>
                                        <button onClick={() => { ChangeComplete(item) }} className="btn btn-danger">Change state</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;