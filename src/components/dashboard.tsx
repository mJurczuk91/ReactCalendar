import classes from "./dashboard.module.scss";

const Dashboard:React.FC<{children: React.ReactNode}> = ({children}) => {  
    return <div className={classes.dashboard}>
        {children}
    </div>
}

export default Dashboard;