import classes from "./resizer.module.css";

interface Props {
    onResize: (e:React.MouseEvent) => void,
    handleMouseDown: (e:React.MouseEvent) => void,
    handleMouseUp: (e:React.MouseEvent) => void,
}

const ResizeHandlebar:React.FC<Props> = ({onResize, handleMouseDown, handleMouseUp}) => {
    return <>
        <div 
            className={classes.resizer}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={onResize}></div>
    </>
}

export default ResizeHandlebar; 