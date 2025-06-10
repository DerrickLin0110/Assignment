import { NavLink } from "react-router-dom";
import "./style.css";

function Genres(props) {
    return (
        <div className="genre-list">
            <h3>Genres</h3>
            {props.genre
                .filter(genre => genre.isChosen)
                .map(genre => (
                    <NavLink
                        key={genre.id}
                        to={`genres/${genre.id}`}
                        className={({ isActive }) =>
                            `genre-button${isActive ? " active" : ""}`
                        }
                    >
                        {genre.name}
                    </NavLink>
                ))}
        </div>
    );
}

export default Genres;
