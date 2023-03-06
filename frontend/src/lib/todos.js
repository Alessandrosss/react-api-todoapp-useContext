async function fetchTodos(){
  const rawResponse = await fetch("http://localhost:3000/api/todos");
  const result = await rawResponse.json();
  return result;
}

async function createTodo(content){
  const body = {content};
  const rawResponse = await fetch("http://localhost:3000/api/todos", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type" : "application/json"
    }
  })
  const response = await rawResponse.json();
  return response;
}

async function updateTodo(_id, content){
  
  const body = {content}
  const rawRasponse = await fetch(`http://localhost:3000/api/todos/${_id}`, {
    method : "put",
    body: JSON.stringify(body),
    headers : { "Content-Type" : "application/json" }
  })
  const result= await rawRasponse.json()
  console.log({result});
  return result;

}

async function deleteTodo(_id){
  const rawResponse = await fetch(`http://localhost:3000/api/todos/${_id}`,{
    method: "delete",
    headers: { "Content-Type":"application/json" }
  })
  const result= await rawResponse.json()
  return result;
}

export const todos = { fetchTodos, createTodo, updateTodo, deleteTodo };
