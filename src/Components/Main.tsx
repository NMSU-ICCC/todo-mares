import { useState } from "react"
import Task from "./Task";




interface Dictionary{
    [Key: string]: {
        description : string,
        status: boolean
    }
}
export default function Main(){
    
    //This is a useState variable that updates the interface when modified
    //However, it is a pointer, son when you want to modify it, make a deep-clone of it first!!!!!
    const [tasks, setTasks ] = useState<Dictionary>({});
    const [error, setError ] = useState<string>("");

    //This function is called by the user when the button is clicked
    function addTask(){
        // Store the value of the input, into the variable tasks
        let inputHTMLElement  = document.querySelector("#taskInput") as HTMLInputElement;
        //Validating
        if (inputHTMLElement.value.length == 0){
            setError("Invalid task");
            return;
        }
        //cleaning error if valid
        setError("");

        //Now lets add the new task
        //First we create an id for the task in the format 'task_Number'
        let taskName = "task_" + Number(Object.keys(tasks).length)
        //Then we just add the task and its content
        tasks[taskName] = 
        {
            "description": inputHTMLElement.value, 
            "status": false
        };
        
        //Then, we can set its value, by passing a deep clone
        //Since we are only storing a pointer, passing the variable would keep the same pointer
        //A deep clone returns a new pointer. 
        //{...tasks} is a shorthand from Js to do a for loop
        setTasks({...tasks});

        //Finally, we can clean in input value for new tasks
        inputHTMLElement.value = ""
    }

    function changeStatus(key:string, status:boolean){
        tasks[key]["status"] = status;
        setTasks({...tasks})
    }
    function deleteTask(key:string){
        let temp = tasks;
        delete temp[key];
        setTasks({...temp})
    }



    return( 
        <div className="mainContainer">
            <h1 className="Title">
                Keep track of your tasks
            </h1>


            {/* This section just shows the input and add task button */}
            <div>
                {/* This is an input. Its value is retrieved when the button is clicked using Js */}
                <input className="taskInput" id="taskInput" >
                </input>

                {/* When clicked, the function addTask is executed */}
                <button className="taskButton" onClick={() => {
                    addTask()
                }}>
                    Add Task
                </button>
            </div>


            {/* This line shows an error when the input is empty
                Its value has to be set an unset dinamically. When empty, it is invisible
            */}
            <label className="errorMessage">{error}</label>



            {/* This section renders the list of tasks */}
            <div className="taskContainer" >
                {   
                    // This map is just a for loop over the elements (keys) of the tasks dictionary
                    Object.keys(tasks).map( (taskKey:string ) => {
                        return( 
                            // we have used {...tasksp[taskKey]} before. It just creates a deep close, so I am passing the properties 1 by 1
                            //It is similar to doing a for loop, so this is equivalent to doing:
                            //<Task description:{tasks[taskKey]["description"]} status={tasks[taskKey]["status"]} taskKey = {taskKey}/>
                            //
                            //taskKey is just because React prefers to have a key for each element rendered in a loop
                            //Not including it won't ruin my app, but will display an annoying warning when compiling in the console of the browser
                            //
                            //I am also passing functions as parameters. They are called callback. DO NOT ADD PARENTHESIS HERE!!!!
                            //Nothing special here. I just call them in my component and the will be trigger here, because here they are defined
                            <Task {...tasks[taskKey]} taskKey = {taskKey} changeStatus={changeStatus} deleteTask={deleteTask}/>
                        )
                    })
                }
            </div>
            {
                //This is a variant of the if-else for only 'if'
                Object.keys(tasks).length 
                ?
                    <button className="cleanTasksButton" onClick={()=>{setTasks({})}}>
                    Clean tasks
                    </button>
                :
                null
            }
        </div>
    )
}