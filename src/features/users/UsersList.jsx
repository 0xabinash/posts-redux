import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice"
import { NavLink } from "react-router-dom";

const UsersList = () =>{

  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user)=>{
    return(
      <li key={user.id}>
        <NavLink to={`/user/${user.id}`}>{user.name}</NavLink>
      </li>
    )
  })

  return(
    <section>
      <h2>Users</h2>
      {renderedUsers}
    </section>
  )
};

export default UsersList;