import styledComponents from "styled-components";
import { MainColor } from "./Common";
import { Link } from "react-router-dom";

const Navbar = () => {
  const Nav = styledComponents.nav`
    padding: 20px;
    display: flex;
    align-items: center;
    max-width: 600px;
    margin: 0px auto;
    border-bottom: 1px solid ${MainColor};

    h1 {
      color: ${MainColor};
    }

    .links {
      margin-left: auto;
    }

    a {
      margin-left: 16px;
      text-decoration: none;
      padding: 6px;
    }

    a:hover {
      color: ${MainColor};
    }
  `

  return (
    <Nav>
      <h1>TK Recipes</h1>
      <div className="links">
        <Link to="/recipes">Home</Link>
        <Link to="/recipes/new">New Recipe</Link>
      </div>
    </Nav>
   );
}

export default Navbar;