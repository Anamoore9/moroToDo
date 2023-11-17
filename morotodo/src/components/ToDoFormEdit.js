import { useState } from "react";
import { Link, useLocation , useNavigate, useParams } from "react-router-dom";

const ToDoFormEdit = (props) => {


    const[completed,completedchange]=useState(true);

    const location = useLocation()
    const { taskText } = location.state;
    const[text,setText]=useState(taskText);

    const { id } = useParams();

    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const taskdata={text,completed};

        fetch("http://localhost:8080/tasks/" + id,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(taskdata)
        }).then((res)=>{
            alert('Saved successfully.')
            navigate('/');
        }).catch((err)=>{
            console.log(err.message)
        })

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="card" style={{"textAlign":"left"}}>
                    <div>
                        <h2>Task Edit</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label className="labelTask">Task</label>
                            <input value={text} onChange={e=>setText(e.target.value)}/>
                            <button className="btn btn-save" type="submit">Save</button>
                            <Link to="/" className="btn btn-back">Back</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ToDoFormEdit;