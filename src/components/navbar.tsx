import classes from "./navbar.module.scss";

const Navbar:React.FC<{children: React.ReactNode}> = ({children}) => { 
    return <nav className={classes.navbar}>
        {children}
    </nav>
}

export default Navbar;