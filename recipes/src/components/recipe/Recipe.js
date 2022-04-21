import { Outlet } from "react-router-dom";
import { MainSection } from "../Common";

const Recipe = () => {
  return (
    <MainSection>
      <Outlet />
    </MainSection>
  );
}

export default Recipe;