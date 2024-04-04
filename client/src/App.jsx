import React, { useEffect, useState } from "react"
import axios from "axios"

const App = () => {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)

  useEffect(() => {
    axios
      .get("http://localhost:5000/getUsers")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err))
  }, [])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`
    return (
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fullName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Logic for pagination
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto">
      {/* SEARCH */}
      <div className="text-center mb-4 mt-4">
        <input
          type="text"
          placeholder="Search by username or name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border w-60 border-gray-300 rounded-md focus:outline-none focus:border-blue-700"
        />
      </div>
      <table className="table-auto border-collapse border border-gray-800 w-full">
        {/* HEAD */}
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Gender</th>
          </tr>
        </thead>
        {/* BODY */}
        <tbody>
          {currentRecords.map((user, index) => (
            <tr key={index} className="bg-gray-200">
              <td className="border text-center px-4 py-2">{user.user_id}</td>
              <td className="border text-center px-4 py-2">{user.username}</td>
              <td className="border text-center px-4 py-2">
                {user.first_name}
              </td>
              <td className="border text-center px-4 py-2">{user.last_name}</td>
              <td className="border text-center px-4 py-2">{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* PAGINATION */}
      <div className="flex justify-center mt-4 mb-4">
        {[
          ...Array(Math.ceil(filteredUsers.length / recordsPerPage)).keys(),
        ].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none ${
              currentPage === number + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
