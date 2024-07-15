import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../API/AxiosInstance';

const Contact = () => {

  const {id} = useParams();
  const [contact, setContact] = useState({})
  const [edit, setEdit] = useState(false)
  const [todo_id, setTodoId] = useState(0)
  const [todo, setTodo] = useState({
    description: "",
    enable : true,
  })

  useEffect(() => {

    const fetchData = async() =>{
      try {
        await axiosInstance.get(`/crm/contacts/${id}`)
        .then(response => {
          setContact(response.data)
        })
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  },[id])

  const handleChange = (event) => {

    setTodo({
      ...todo,
      [event.target.name] : event.target.value,
    })
  }

  const handleSubmit = async(event) => {
    event.preventDefault();

    if(edit) {

      console.log(todo, todo_id)

      try {
        await axiosInstance.post(`/todo/${id}/edit/${todo_id}`,todo,{
          headers: {'Content-Type' : 'application/json'}
        }).then(response => {
          setContact(response.data)
        })
      } catch (error) {
        console.error(error)
      }

      setTodo({
        description : "",
        enable : true
      })
      setEdit(false)

    }else{

      try {
        await axiosInstance.post(`/todo/${id}/add`,todo,{
          headers: {'Content-Type' : 'application/json'}
        }).then(response => {
          console.log(response.data)
          if(response.status === 201) {
            setContact(response.data)
            setTodo({
              description : "",
              enable : true
            })
          }
        })
      } catch (error) {
        if(error.response.status === 400) {
          alert(error.response.data)
        }else{
          console.log(error)
        }
      }

    }

    
  }

  const handleCompleteTodo = async(todoId) =>{
    try {
      await axiosInstance.get(`/todo/${id}/toggle/${todoId}`)
      .then(response => {
        setContact(response.data)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteTodo = async(todoId) =>{
    try {
      await axiosInstance.get(`/todo/${id}/delete/${todoId}`)
      .then(response => {
        setContact(response.data)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = (extTodo) =>{
    setEdit(true)
    setTodoId(extTodo.id)
    setTodo({
      ...todo,
      description : extTodo.description,
      enable : extTodo.enable
    })
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title">{contact.username}</h3>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <h5 className="card-subtitle mb-2 text-muted">
              {contact.firstName} {contact.lastName}
            </h5>
            <p className="card-text">{contact.email}</p>
          </div>
          <hr/>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="input-group">
              <input 
                type="text" 
                id="todoForm"
                className="form-control" 
                name="description" 
                value={todo.description}
                placeholder="Add a new task..." 
                onChange={(e) => handleChange(e)}
              />
              <div className="input-group-append mx-3">
                <button type="submit" className="btn btn-primary">Add Task</button>
              </div>
            </div>
          </form>

          <h4 className="my-3">Pending Tasks</h4>
          <table className="table table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col">SL No</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {contact.todos && contact.todos.map((todo, index) => (
                todo.enable ?
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td onClick={()=>handleEdit(todo)} style={{cursor : 'pointer'}}>{todo.description}</td>
                  <td className='d-flex justify-content-evenly'>
                    <button className="btn btn-success btn-sm" onClick={()=>{handleCompleteTodo(todo.id)}}>Done</button>
                    <button className="btn btn-danger btn-sm" onClick={()=>{handleDeleteTodo(todo.id)}}>Discard</button>
                  </td>
                </tr> : ""
              ))}
            </tbody>
          </table>

          <h4 className="my-3">Completed Tasks</h4>
          <table className="table table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col">SL No</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {contact.todos && contact.todos.map((todo, index) => (
                todo.enable ? "":
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{todo.description}</td>
                  <td className='d-flex justify-content-evenly'>
                    <button className="btn btn-warning btn-sm" onClick={()=>{handleCompleteTodo(todo.id)}}>Undone</button>
                    <button className="btn btn-danger btn-sm" onClick={()=>{handleDeleteTodo(todo.id)}}>Discard</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Contact