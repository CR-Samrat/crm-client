import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import axiosInstance from "./../API/AxiosInstance"

const Contacts = () => {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const fetchData = async () =>{
            try {
                await axiosInstance.get("/crm/contacts")
                .then(response => {
                    console.log(response.data)
                    setContacts(response.data)})
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

  return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Contacts</h1>
            <table className="table table-striped table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts && contacts.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.username}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>
                                <Link className="btn btn-primary" to={`/home/${item.id}`}>Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Contacts