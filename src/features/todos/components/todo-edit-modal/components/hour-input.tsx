import { addXStepsToTimestamp, createIntervalTimestamps, padWithZeros } from "../../../../calendar/utils/date-utils";
import { useContext, useState } from "react";
import HourList from "./hour-list";
import { EditedTodoContext } from "../../../../calendar/components/calendar-todos-manager";
import { changeTodoStartDateKeepDuration } from "../../../store/todo-slice";

interface Props {
    type: 'dateStart' | 'dateEnd',
}

const HourInput: React.FC<Props> = ({ type }) => {
    console.log('HourInput evaluated');

    const { editedTodo, updateEditedTodo } = useContext(EditedTodoContext);
    const [showHourList, setShowHourList] = useState<boolean>(false);
    const pickableHoursList = type === 'dateStart' ?
        createIntervalTimestamps(editedTodo[type]) :
        createIntervalTimestamps(editedTodo[type], new Date(addXStepsToTimestamp(editedTodo.dateStart.getTime(), 1)));
        

    const inputProps = {
        type: 'text',
        value: `${padWithZeros(editedTodo[type].getHours())} : ${padWithZeros(editedTodo[type].getMinutes())}`,
        onFocus: (e: React.FocusEvent) => {
            setShowHourList(true);
        },
        readOnly: true,
    }

    const setPickedHour = (pickedHour: Date) => {
        /*         const errors = await helper.setValue(pickedHour, true);
                if (errors && name in errors) {
                    return;
                } */
        switch (type){
            case 'dateStart': {
                const newTodo = changeTodoStartDateKeepDuration(editedTodo, pickedHour)
                updateEditedTodo({
                    ...newTodo
                })
            } break;
            case 'dateEnd': {
                updateEditedTodo({
                    ...editedTodo,
                    dateEnd: pickedHour,
                })
            }
        }
        setShowHourList(false);
    }

    return <>
        <label style={{ display: 'flex', width: 'fit-content' }}>
            <input {...inputProps} />
        </label>
        {showHourList && <div style={{ position: 'absolute', left: '150px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', height: '150px', overflowY: 'scroll', }}>
            <HourList hourList={pickableHoursList} setPickedHour={setPickedHour} />
        </div>}
    </>
}

export default HourInput;
