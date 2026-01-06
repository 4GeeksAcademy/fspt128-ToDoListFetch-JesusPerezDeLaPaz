import React from "react";
import { useState, useEffect } from "react"
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";


const Home = () => {
	const [tareas, setTareas] = useState([])
	const [tarea, setTarea] = useState("")
	const API_URL = "https://playground.4geeks.com/todo/";
	const USUARIO = "Jesus"
	// const [ToDo, setToDo] = useState()
	// const [ToDos, setToDos] = useState([{
	// 	label: "",
	// 	is_done: false
	// }])

	const getUser = async () => {
		const response = await fetch(`${API_URL}users/${USUARIO}`)
		console.log(response);
		if (!response.ok) {
			console.log("crear usuario");
			createUser()
			return
		}
		const data = await response.json()
		console.log(data);
		setTareas(data.todos)
		console.log();

	}

	const createUser = async () => {
		const response = await fetch(`${API_URL}users/${USUARIO}`, {
			method: "POST"

		})
		if (response.ok) {
			getUser()
		}
	}


	const createToDo = async () => {
		const response = await fetch(`${API_URL}todos/${USUARIO}`, {
			method: "POST",
			body: JSON.stringify({
				"label": tarea,
				"is_done": false
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		if (response.ok) {
			getUser()
			return
		}
		console.log(response);

	}

	const deleteTarea = async (id) => {
		const response = await fetch(`${API_URL}todos/${id}`, {
			method: "DELETE"
		}

		)
		if (response.ok) {
			getUser()
			return
		}
	}

	useEffect(() => {
		getUser()
	}, [])


	const handlerChange = (e) => {
		setTarea(e.target.value)


	}

	const handlerClick = (e) => {
		if (tarea.trim() == "") {
			alert("Ingresa una tarea")
			return
		}
		createToDo()
		setTarea("")

	}

	const handlerEnter = (e) => {
		if (e.key === "Enter") {
			if (tarea.trim() == "") {
				alert("Ingresa una tarea")
				return
			}
			createToDo()
			setTarea("")
		}

	}

	const handlerDelete = (id) => {

		deleteTarea(id)
	}




	return (
		<div className="container text-center">
			<div className="card m-auto mt-5 w-75">
				<div className="card-header">
					<h1 className="card-title">Lista de tareas.</h1>

				</div>
				<div className="card-body d-flex justify-content-center">
					<div className="input-group mb-3 mt-2 w-75">
						<input type="text"
							className="form-control"
							value={tarea}
							onChange={handlerChange}
							onKeyUp={handlerEnter}
							aria-label="Pendiente"
							aria-describedby="button-addon2" />
						<button
							className="btn btn-outline-secondary"
							type="button"
							id="button-addon2"
							onClick={handlerClick}
						>Agregar
						</button>
					</div>

				</div>

				<div className="card-footer">
					<p className="card-text">{
						tareas.length === 0 ?
							"No hay tareas pendientes."
							: tareas.length === 1 ?
								tareas.length + " tarea pendiente."
								: tareas.length + " tareas pendientes."
					}
					</p>
				</div>
				<ul className="list-group list-group-flush">
					{tareas.map((tarea, index) => {
						return (
							<li key={tarea.id} className="list-group-item lista card-text justify-content-between d-flex">
								<h4 className="tarea card-text">{tarea.label}</h4>
								<p className="eliminar" onClick={() => handlerDelete(tarea.id)}><i className="fa-solid fa-trash-can"></i></p>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	);
};
export default Home;