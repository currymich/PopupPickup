import React, {useEffect,useState} from "react"
import './App.css';
import axios from "axios";

const defaultValues = {
  userName: "",
  userType:""  
}

  const LoginPage = () => {
  const [users, setUsers] = useState([])
  const [inputs, setInputs] = useState(defaultValues)
  const [currentUser, setCurrentUser] = useState()
  const [isUser, setIsUser] = useState(false)

  const AppUser = ({ userName, userType }) =>
  (
          <div className="item">
              <p>{userName}</p>
              <p>{userType}</p>
          </div>

  )

  const getUsers = async () => {
    const res = await axios.get("/api/users/jsm")
    setUsers(res.data)
}

const handleSubmit = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const res = await axios.post("/api/users/jsm", inputs)
    setUsers(res.data)
    setInputs(defaultValues)

    console.log(users)
}

const handleSubmit2 = async (event) => {
  event.preventDefault()
  event.stopPropagation()

  users.map(()=>{
      if(users.userName=currentUser){
        setIsUser(true)
      }
      if(isUser==true){
        console.log("Welcome Back")
      }
      else if(isUser==false){
      console.log("Create an Account")
      }
  }
  )

}



useEffect(() => { getUsers() }, [])

    return (
      <div>
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Users</h1>

        <div className="container">
                {
                users.map(p => (
                    <AppUser
                    userName={p.userName}
                    userType={p.userType}
                    />
                ))
                }
            </div>

            <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Create Account</h1>

        <div
          className="w3-theme-d3 w3-container"
          style={{ padding: "25px", borderRadius: "25px", width:"80%", marginLeft:"10%"}}
        >
          <h4>Click here to Login</h4>

          <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="User Name"
                        value={inputs.userName}
                        onChange={e => setInputs({ ...inputs, userName: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="text"
                        placeholder="User Type"
                        value={inputs.userType}
                        onChange={e => setInputs({ ...inputs, userType: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="submit"
                        value="Submit"
                        className="w3-theme-d1 w3-btn"
                        style={{ borderRadius: "25px", width: "100%" }}
                    />
              </form>
        </div>

        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>login</h1>

        <div
          className="w3-theme-d3 w3-container"
          style={{ padding: "25px", borderRadius: "25px", width:"80%", marginLeft:"10%"}}
        >
          <h4>Click here to Login</h4>

          <form onSubmit={handleSubmit2}>

                    <input
                        type="text"
                        className="w3-input"
                        onChange={e=> setCurrentUser(e.target.value)}
                        placeholder="User Name"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="submit"
                        className="w3-theme-d1 w3-btn"
                        style={{ borderRadius: "25px", width: "100%" }}
                    />
              </form>
        </div>



      </div>
    )
}

export default LoginPage;
