import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [toDo, setToDo] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [editIndex, setEditIndex] = useState(null);
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
				setToDo(data.todos);
			})
			.catch((error) => alert(error.message));
	}
	function createUser() {
    fetch("https://playground.4geeks.com/todo/users/lunab28", {
        method: "POST",
        body: JSON.stringify({ username: "lunab28" }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        getToDos() 
    })
    .catch((error) => alert(error.message));
}
	useEffect(() => {createUser()}, [])
	function addToDo() {
		let bodyData = {
			"label": inputValue,
			"is_done": false
		};
		fetch("https://playground.4geeks.com/todo/todos/lunab28", {
			method: "POST",
			body: JSON.stringify(bodyData),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {

				return response.json()
			})
			.then((data) => {
				getToDos();
				setInputValue("");
			})
			.catch(() => { });
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
	function updateToDo(index) {
		const item = toDo[index];
		fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
			method: "PUT",
			body: JSON.stringify({ ...item, is_done: !item.is_done }),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {
				if (!response.ok) throw new Error(`error ${response.status}:${response.statusText}`);
				getToDos();
			})
			.catch((error) => alert(error.message));
	}
	function editToDo(index) {
		const item = toDo[index];
		fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
			method: "PUT",
			body: JSON.stringify({ ...item, label: inputValue }),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {
				if (!response.ok) throw new Error(`error ${response.status}:${response.statusText}`);
				getToDos();
				setInputValue("");
				setEditIndex(null);
			})
			.catch((error) => alert(error.message));
	}

	return (
		<div className="text-center container mt-5">
			<h1 className="p-4 mb-4 d-inline-flex rounded-4">To Do list</h1>
			<input
				className="form-control"
				placeholder={editIndex !== null ? "Editar ToDo" : "Añadir nuevo ToDo"}
				onChange={(event) => setInputValue(event.target.value)}
				onKeyDown={(event) => {
					if (event.key === "Enter" && inputValue.trim() !== "") {
						if (editIndex !== null) {
							editToDo(editIndex);
						} else {
							addToDo();
						}
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
						<li key={index} className="list-group-item d-flex justify-content-center" id={item.is_done ? "done" : "undone"}>
							<span className="flex-grow-1">{item.label}</span>
							<button
								className="btn btn-warning btn-sm mx-1"
								onClick={() => {
									setInputValue(item.label);
									setEditIndex(index);
								}} >
								✎
							</button>
							<button
								className="btn btn-warning btn-sm mx-1"
								id={item.is_done ? "btn-done" : "btn-undone"}
								onClick={() => updateToDo(index)} >
								{item.is_done ? "◉" : "𐤏"}
							</button>

							<button
								className="btn btn-danger btn-sm mx-1"
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
}
export default Home;