import "./auth.css"
import { useAuth } from "../../context"
import { loginHandler } from "../../services/auth-service"
import { useNavigate } from "react-router-dom"
export const Login = ()=>{
    const navigate = useNavigate();
    const {username,password,authDispatch} = useAuth()
    console.log({username,password})
    const handleUserNameChange=(e)=>{
        authDispatch({
            type:"USERNAME",
            payload:e.target.value
        })

    }
    const handlePasswordChange=(e)=>{
        authDispatch({
            type:"PASSWORD",
            payload:e.target.value
        })

    }
    
    const handleLoginClick=(e)=>{
        e.preventDefault();
        const token = loginHandler(username,password);
        if(token){
            navigate("/")
        }
        authDispatch({
            type:"TOKEN",
            payload:token
        })
        authDispatch({
            type:"CLEAR_CREDENTIALS"
        })
    }
    const handleTestCrendentialsClick=async(e)=>{
        e.preventDefault();
     const token =await loginHandler("bhatt","hb2904");
     if(token){
        navigate("/")
     }
    }
    return(
        <div className="d-grid">
            <div className="login-auth d-flex direction-column justify-center">
                <h2 className="auth-title">Login</h2>
                <form onClick={handleLoginClick}>
                    <div className="form-container">
                        <label className="form-label">Username</label>
                        <input className="form-input lh-ls" placeholder="harshitabhatt" onChange={handleUserNameChange} />
                    </div>
                    <div className="form-container">
                        <label className="form-label">Password</label>
                        <input className="form-input lh-ls" placeholder="*************" onChange={handlePasswordChange}/>
                    </div>
                    <div className="cta">
                        <button className="button login-btn btn-margin cursor sign-up-btn">Login</button>
                    </div>
                    <button className="button login-btn btn-margin cursor sign-up-btn" onClick={handleTestCrendentialsClick}>
                    Login with Test Crendentials
                    </button>

                </form>
            </div>
        </div>
    )
}