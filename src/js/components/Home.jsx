import React, { useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [toDo, setToDo] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const Delete = (indexToDelete) => {
		const updatedToDo = [...toDo];
		updatedToDo.splice(indexToDelete, 1);
		setToDo(updatedToDo);
	};
	return (
		<div className="text-center container mt-5">
			<h1 className="p-4 mb-4 d-inline-flex rounded-4">To Do list</h1>
			<input
				className="form-control"
				placeholder="añadir nuevo ToDo"
				onChange={(event) => setInputValue(event.target.value)}
				onKeyDown={(event) => {
					if (event.key === "Enter" && inputValue.trim() !== "") {
						setToDo([...toDo, inputValue]);
						setInputValue("");
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
							<span className="flex-grow-1">{item}</span>
							<button
								className="btn btn-danger btn-sm"
							onClick={() => Delete(index)} >
							
								X
							</button>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default Home;