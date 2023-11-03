import classes from "./resize-handlebar.module.css";

interface Props {
    handleMouseDown: (e:React.MouseEvent) => void,
}

const ResizeHandlebar:React.FC<Props> = ({handleMouseDown}) => {
    return <>
        <div 
            className={classes.resizer}
            onMouseDown={handleMouseDown}>
        </div>
    </>
}

export default ResizeHandlebar; 