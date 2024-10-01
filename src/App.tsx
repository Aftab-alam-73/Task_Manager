import { useState } from "react";

type TaskType = {
  id: number;
  status: string;
  title: string;
};
const App = () => {
  const DONE = "done";
  const TODO = "todo";
  const DOING = "doing";
  const [data, setData] = useState<TaskType[]>([]);
  const [task, setTask] = useState<TaskType | null>(null);
  const [form, setFrom] = useState<string>("");

  const handleClick = () => {
    if (!form) return;
    const newTask = {
      id: Date.now(),
      status: TODO,
      title: form,
    };
    setData([...data, newTask]);
    setFrom("");
  };
  const handleDrag = (task: TaskType) => {
    setTask(task);
  };
  const handleDragOver=(status:string)=>{
    const newData=data.map((t:TaskType)=>{
      if(t.id==task?.id){
        t.status=status;
      }
      return t;
    })
    setData(newData);
    setTask(null);
  }
  const handledelete=(id:number)=>{
   const newData=data.filter((t:TaskType)=>{
    if(t.id!=id)return t;
   })
   setData(newData);
  }
  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-start">
      <div>
        <h1 className="text-5xl font-bold">Task Manager</h1>
        <h2 className="text-lg font-medium">
          A simple task management application
        </h2>
      </div>
      <div>
        <input
          value={form}
          onChange={(e) => setFrom(e.target.value)}
          className="px-5 py-2 rounded-2xl border-solid border-black border-2 mr-3"
          type="text"
          placeholder="Type..."
        />
        <button
          onClick={handleClick}
          className="px-5 py-2 bg-blue-500 text-white rounded-2xl"
        >
          Add
        </button>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-5 w-[200px]"
        onDragOver={() =>handleDragOver("todo")}
        >
          <h1 className="bg-green-400 px-7 py-3 text-center">Todo</h1>
          {
           data.length>0 && data.map((task:TaskType)=>{
           if(task.status==TODO) return <div
            className="flex justify-between w-[200px] bg-gray-300 p-2 cursor-grab "
            draggable
            key={task.id}
            onDrag={()=>handleDrag(task)}
          >
            <h2>{task.title}</h2>
            <div className="space-x-6">
              <span className="hover:rounded-full hover:bg-pink-500 hover:p-1 cursor-pointer">
                🖊️
              </span>
              <span onClick={()=>handledelete(task.id)} className="hover:rounded-full hover:bg-pink-500 hover:p-1 cursor-pointer">
                🗑️
              </span>
            </div>
          </div>
           }) }
        </div>
        <div className="flex flex-col gap-5 w-[200px]"
        onDragOver={() =>handleDragOver("doing")}
        >
          <h1 className="bg-blue-400 px-7 py-3 text-center">Doing</h1>
          {
           data.length>0 && data.map((task:TaskType)=>{
           if(task.status==DOING ) return <div
            className="flex justify-between w-[200px] bg-gray-300 p-2 cursor-grab "
            draggable
            onDrag={()=>handleDrag(task)}
            key={task.id}
          >
            <h2>{task.title}</h2>
            <div className="space-x-6">
              <span className="hover:rounded-full hover:bg-pink-500 hover:p-1 cursor-pointer">
                🖊️
              </span>
              <span onClick={()=>handledelete(task.id)} className="hover:rounded-full hover:bg-pink-500 hover:p-1 cursor-pointer">
                🗑️
              </span>
            </div>
          </div>
           }) }
        </div>
        <div
          className="flex flex-col gap-5 w-[200px]"
          onDragOver={() =>handleDragOver("done")}
        >
          <h1 className="bg-yellow-400 px-7 py-3 text-center">Done</h1>
          {
           data.length>0 && data.map((task:TaskType)=>{
           if(task.status==DONE) return <div
            className="flex justify-between w-[200px] bg-gray-300 p-2 cursor-grab "
            draggable
            key={task.id}
            onDrag={()=>handleDrag(task)}
          >
            <h2>{task.title}</h2>
            <div className="space-x-6">
              <span className="hover:rounded-full hover:bg-pink-500 hover:p-1 cursor-pointer">
                🖊️
              </span>
              <span onClick={()=>handledelete(task.id)} className="hover:rounded-full hover:bg-pink-500 hover:p-1 cursor-pointer">
                🗑️
              </span>
            </div>
          </div>
           }) }
        </div>
      </div>
    </div>
  );
};

export default App;
