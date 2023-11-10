import classes from "./resize-handlebar.module.css";


interface Props {
    handleStartResizing: (e:React.MouseEvent) => void,
}

const ResizeHandlebar:React.FC<Props> = ({handleStartResizing}) => {
    return <>
        <div
            className={classes.resizer}
            draggable
            onDragStart={(e:React.DragEvent) => {
                e.stopPropagation();
                handleStartResizing(e);
            }}
            >
        </div>
    </>
}

export default ResizeHandlebar; 