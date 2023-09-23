
interface Props{
    //taskKey is just because React prefers to have a key for each element rendered in a loop
    //Not including it won't ruin my app, but will display an annoying warning when compiling in the console of the browser
    taskKey: string,
    status: boolean,
    description: string,
    //This is a function. It is defined in the parent component, triggered here, but everything happens in the parent
    changeStatus: Function,
    deleteTask: Function;
}
export default function Task(props:Props){
    return(
        <div>
            
            {/* // here, key is just an identifier that React recommends for iterable rendering */}
            <div className={props.status ? "task checked" : "task unchecked" } key={props.taskKey}>  
                <div style={{overflow: "auto"}}>
                    {
                        // first, for each key we show the task
                        props.description
                    }  
                </div>

                {/* This container is used so both elements (check mark and the x button) are together on the right
                    Without it, these elements would spread
                */}
                <div>
                    {
                        // Then, we do an if-else statement. We give the option to mark the task as uncompleted or completed
                        props.status
                        ?
                        <input type="checkbox" onClick={() => {props.changeStatus(props.taskKey, false)}} />
                        :
                        <input  type="checkbox" value="true" onClick={() => {props.changeStatus(props.taskKey, true)}}/>
                    } 
                    <button className="deleteTask" onClick={()=>{props.deleteTask(props.taskKey)}}>
                        X
                    </button>
                </div>
            </div>
        </div>
    )
}