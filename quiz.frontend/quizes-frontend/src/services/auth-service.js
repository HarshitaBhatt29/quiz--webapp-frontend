import axios from "axios";



export const loginHandler = async (username, password) => {
  console.log("Username:", username);
  console.log("Password:", password);

  try {
    const
     {data:{token},
     status,
  }
      = await axios.post("http://localhost:3000/auth/login",{
        username,password
    },  { headers: { "Content-Type": "application/json" } }
  );
    console.log(token)
    await localStorage.setItem("autharization",token);
     if(status===200){

        return token;
        
     }  
     else{
     
     console.log('error , not able to get the data')}
    
}catch(err){
    console.log(err)
}
};
