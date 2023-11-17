import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ToDoForm = () => {

    const[text,textchange]=useState("");
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
        e.preventDefault();
        const taskdata={text};


        fetch("http://localhost:8080/tasks",{
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
        <div>
            <form onSubmit={handlesubmit}>
                <div className="card" style={{"textAlign":"left"}}>
                    <div>
                        <h2>Create your new task</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input required value={text} onMouseDown={e=>valchange(true)} onChange={e=>textchange(e.target.value)}></input>
                                    {text.length==0 && validation && <span className="text-danger"></span>}
                                    <button className="btn btn-success" type="submit">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ToDoForm;