import { Link } from "react-router-dom";
import styles from "./nav-bar.module.css";
import { ROUTES } from "shared/core/routes";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link to={ROUTES.STANDARD}>Standard</Link>
      <Link to={ROUTES.HAMSTER}>Hamster</Link>
      <Link to={ROUTES.COMLINK}>Comlink</Link>
    </div>
  );
};

export default Navbar;
