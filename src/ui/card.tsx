import classes from "./card.module.scss";

const Card:React.FC<{children: React.ReactNode}> = ({children}) => {
    return <div className={classes.card}>
        {children}
    </div>
}