import {useQuiz} from "../../context"
import {Navbar} from "../../component"
import {Fragment} from "react"
export const Result = ()=>{
    const {score} = useQuiz()
return(
     <Fragment>
        <Navbar route ="result" />
        <main>
            <h2>Result page</h2>
            <div>
                <span>your score is { score }  </span>
            </div>
        </main>
     </Fragment>
)
}