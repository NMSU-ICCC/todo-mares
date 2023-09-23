import { useState } from "react"




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

    //This function is called by the user when the button is clicked
    function addTask(){
        // Store the value of the input, into the variable tasks
        let inputValue  = document.querySelector("#taskInput") as HTMLInputElement;

        //Now lets add the new task========================
        //First we create an id for the task in the format 'task_Number'
        let taskName = "task_" + Number(Object.keys(tasks).length)
        //Then we just add the task and its content
        tasks[taskName] = 
        {
            "description": inputValue.value, 
            "status": false
        };
        
        //Finally, we can set its value, by passing a deep clone
        //Since we are only storing a pointer, passing the variable would keep the same pointer
        //A deep clone returns a new pointer. 
        //{...tasks} is a shorthand from Js to do a for loop
        setTasks({...tasks});
    }

    //Homework
    function updateTask(key:string, status:boolean){
        tasks[key]["status"] = status;
        setTasks({...tasks})
    }
    return( 
        <div className="mainContainer">
            <h1 className="Title">Todo APP!!!</h1>




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



            {/* This section renders the list of tasks */}
            <div >
                            {/* A div with three classes: task, checked and red */}
                            <div className="task checked red">
                            </div>
                {   
                    // This map is just a for loop over the elements (keys) of the tasks dictionary
                    Object.keys(tasks).map( (taskKey:string ) => {
                        return( 



                            // here, key is just an identifier that React recommends for iterable rendering
                            <div className={tasks[taskKey]["status"] ? "task checked" : "task unchecked" } key={taskKey}>  
                                <div style={{overflow: "auto"}}>
                                    {
                                        // first, for each key we show the task
                                        tasks[taskKey]["description"]
                                    }  
                                </div>

                                <div>
                                    {
                                        // Then, we do an if-else statement. We give the option to mark the task as uncompleted or completed
                                        tasks[taskKey]["status"]
                                        ?
                                        <input type="checkbox" onClick={() => {updateTask(taskKey, false)}} />
                                        :
                                        <input  type="checkbox" value="true" onClick={() => {updateTask(taskKey, true)}}/>
                                    } 

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}