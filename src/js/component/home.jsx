import React from "react";
import {useState, useEffect, useRef} from "react"

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([])
	const [input, setInput] = useState("")
	const inputRef = useRef()

	async function createUser(){
		try{
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/altacios', {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
				  "Content-Type": "application/json"
				}
			  })
			console.log(response)
			console.log(response.ok); // Will be true if the response is successful
			console.log(response.status); // The status code=200 or code=400 etc.
			const data = await response.json()
			console.log(data); 
			if(!response.ok){
				throw new Error(data.msg)
			}
		}
		catch(error){
			console.error(error)
		}
		console.log("createUser function ran")
	}

	async function putTodos(){
		try{
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/altacios', {
				method: "PUT",
				body: JSON.stringify(todos),
				headers: {
				  "Content-Type": "application/json"
				}
			  })
			console.log(response)
			console.log(response.ok); // Will be true if the response is successful
			console.log(response.status); // The status code=200 or code=400 etc.
			const data = await response.json()
			console.log(data); 
			if(!response.ok){
				throw new Error(data.msg)
			}
		}
		catch(error){
			console.error(error)
		}
	}

	async function getTodos(){
		try{
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/altacios')
			console.log(response)
			console.log(response.ok); // Will be true if the response is successful
			console.log(response.status); // The status code=200 or code=400 etc.
			const data = await response.json()
			console.log(data); 
			if(!response.ok){
				throw new Error(data.msg)
			}
			//first GET, will initiate the state default value
			setTodos(data)
		}
		catch(error){
			console.error(error)
		}
		console.log("getfunction ran, this also setsTodos")
	}

	async function deleteUser(){
		try{
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/altacios', {
				method: "DELETE"
			  })
			console.log(response)
			console.log(response.ok); // Will be true if the response is successful
			console.log(response.status); // The status code=200 or code=400 etc.
			const data = await response.json()
			console.log(data); 
			if(!response.ok){
				throw new Error(data.msg)
			}
		}
		catch(error){
			console.error(error)
		}
		console.log("deleteUser function ran")
	}

	function addTodo(){
		//create new
		if(/^\s*$/.test(input) === false){
			let newTodo = {
				done: false,
				label: input
			}
			//modify todos
			setTodos(prevTodos => {
				return [newTodo, ...prevTodos]
			})
			//clear input field
			setInput("")
		}
	}

	function handleSubmit(e){
		e.preventDefault()
		addTodo()
	}

	function completeTodo(index, checkedValue){
		setTodos(prevTodos => {
			return prevTodos.map((prevTodo, ind) => {
				return ind === index ? {...prevTodo, done: checkedValue} : prevTodo
			})
		})
	}

	function deleteTodo(index){
		setTodos(prevTodos => {
			return prevTodos.filter((prevTodo, ind) => {
				return ind !== index
			})
		})
	}

	 async function handleRemoveAll() {
	 	try {
	 		console.log("remove all");
	 		await deleteUser(); // Wait for deleteUser to complete
	 		await createUser(); // Wait for createUser to complete
	 		await getTodos();   // Wait for getTodos to complete
	 	} catch (error) {
	 		console.error(error);
	 	}
	 }

	useEffect(() => {
		inputRef.current.focus()
		createUser()
		//GET inicial, this also sets
		getTodos()
	},[])

	useEffect(() => {
		//will avoid running on the initial when the array = []
		if(todos.length >= 1){
			console.log("ran use effect with put")
			putTodos()
		}
	},[todos])

	return (
		<>
			<form className="new-item-form" onSubmit={(handleSubmit)}>
				<div className="form-row">
					<label className="header">New item:</label>
					<input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)}></input>
				</div>
				<button className="btn-wan btn btn-form">Submit</button>
				<button className="btn-wan btn btn-danger" onClick={handleRemoveAll}>Delete all</button>
			</form>


			<h1 className="header header2">Todo List:</h1>
			<ul className="list">
				{todos.length === 1 && "Nothing to do... please do something with your life... Enroll in 4geeks at least..."}
				{
				todos.map((todo, index) => {

					if(todo.label === "example task"){
						return null
					}
					return(
						
						<li key={index} className="itemWrapper">
							<label htmlFor="check" className={todo.done ? "done" : ""}>
								<input checked={todo.done} id="check" type="checkbox" onChange={(event) => {completeTodo(index, event.target.checked)}}></input>
								{todo.label}
							</label>
							<div className="item-controls">
								<button className="btn btn-danger" onClick={() => deleteTodo(index)}>delete</button>
							</div>
						</li>
					)
				})
			}
			</ul>
		</>
	);
};

export default Home;
