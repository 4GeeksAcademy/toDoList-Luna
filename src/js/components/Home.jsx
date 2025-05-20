import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [toDo, setToDo] = useState([]);
	const [inputValue, setInputValue] = useState("");
	function getToDos() {
		fetch("https://playground.4geeks.com/todo/users/lunab28")
			.then((response) => {
				console.log(response);
				if (response.ok == false) {
					throw new Error(`error ${response.status}:${response.statusText}`);
				}
				return response.json()
			})
			.then((data) => {
				setToDo(data.todos))
			.catch((error) => alert(error.message));
	}
	useEffect(() => { getToDos() }, [])
	function addToDo() {
		fetch("https://playground.4geeks.com/todo/users/lunab28", {
			method: "POST",
			body: JSON.stringify(bodyData),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {
				if (response.ok == false) {
					throw new Error(`error ${response.status}:${response.statusText}`);
				}
				return response.json()
			})
			.then((data) => {
				setToDo(data.todos)

			})
			.catch((error) => alert(error.message));
    }
	function Delete(index) {
        const item = toDo[index];
        fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) throw new Error(`error ${response.status}:${response.statusText}`);
                getToDos();
            })
            .catch((error) => alert(error.message));
    }
return (
	<div className="text-center container mt-5">
		<h1 className="p-4 mb-4 d-inline-flex rounded-4">To Do list</h1>
		<input
			className="form-control"
			placeholder="añadir nuevo ToDo"
			onChange={(event) => setInputValue(event.target.value)}
			onKeyDown={(event) => {
				if (event.key === "Enter" && inputValue.trim() !== "") {
					setToDo([...toDo]);
					addToDo();
				}
			}}
			value={inputValue}
		/>
		<ul className="list-group mx-5 px-5 my-3">
			{toDo.length === 0 ? (
				<li className="list-group-item d-flex justify-content-center">
					<span className="flex-grow-1">Añade un nuevo To Do :D</span>
				</li>
			) : (
				toDo.map((item, index) => (
					<li key={index} className="list-group-item d-flex justify-content-center">
						<span className="flex-grow-1">{item.label}</span>
						<button
							className="btn btn-danger btn-sm"
							onClick={() => Delete(index)} >
							X
						</button>
					</li>
				))
			)}

			<li className="card-footer text-body-secondary">
				{toDo.length} items left
			</li>
		</ul>
	</div>
);

export default Home;