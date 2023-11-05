import classes from "./resize-handlebar.module.css";
import { resizeDirection } from "./todo";

interface Props {
    resizeDirection: resizeDirection,
    handleMouseDown: (e:React.MouseEvent, direction: resizeDirection) => void,
}

const ResizeHandlebar:React.FC<Props> = ({resizeDirection, handleMouseDown}) => {
    return <>
        <div
            className={classes.resizer}
            onMouseDown={(e:React.MouseEvent) => {
                e.stopPropagation();
                e.preventDefault();
                handleMouseDown(e, resizeDirection);
            }}
            >
        </div>
    </>
}

export default ResizeHandlebar; 