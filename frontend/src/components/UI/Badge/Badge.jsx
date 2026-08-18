import "./Badge.css";

function Badge({

    text,

    type

}){

    return(

        <span className={`badge ${type}`}>

            {text}

        </span>

    )

}

export default Badge;