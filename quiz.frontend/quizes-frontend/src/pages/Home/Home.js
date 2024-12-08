import { Fragment, useEffect,useState } from "react"
import axios from "axios"
import { Navbar,QuizCard } from "../../component/index"
import { useAuth ,useQuiz} from "../../context"
import './Home.css'
import { useContext,} from "react"
export const Home = ()=>{
    const [categories,setCategories] = useState([])
    const {authDispatch} = useAuth()
    const {quizDispatch}=useQuiz();
    useEffect(()=>{
        (async ()=>{
            try{
          const {data :{data}} = await axios.get("http://localhost:3000/categories")
          console.log(data,'hhhhhhhhhhh')
          setCategories(data)
            }catch(err){
                console.log(err)
            }
        })()
    },[])
    
    useEffect(()=>{
        
        const token = localStorage.getItem("token")
        authDispatch({
            type:"INITIAL_STATE",
            payload:token
        })

    },[])

    
      
    return(
        <Fragment>  
        <Navbar route ="home"/>
        <main className="main d-flex wrap-gap-md align-center justify-center">
            {
                categories.map(category => <QuizCard quizCategory={category} key={category.id} />)
            }
     
    
        </main>
        </Fragment>
    )
}