import { Link } from "react-router-dom";

function ErrorPage(){
    return (
        <div>
            <h1>It looks like you got lost. Fear not, just click on this link</h1>
            <Link to="/">Got to main page</Link>
        </div>
    )
}

export default ErrorPage