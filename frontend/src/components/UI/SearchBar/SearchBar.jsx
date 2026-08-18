import "./SearchBar.css";

function SearchBar({

    placeholder,

    value,

    onChange

}){

    return(

        <div className="search-bar">

            <input

            type="text"

            placeholder={placeholder}

            value={value}

            onChange={onChange}

            />

        </div>

    )

}

export default SearchBar;