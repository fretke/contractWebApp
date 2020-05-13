import React, {useState} from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import SaveIcon from '@material-ui/icons/Save';
import ReturnDate from "./returnDate";

function Row(props){

    const [editState, setEditState] = useState(false);
    const [returnDate, setReturnDate] = useState("");

    const data = props.data;
    
    function calculateMargin(){
        const margin = 20;
        let daysPassed = dateDiffInDays(new Date(data.contractInit), new Date());
        return data.contractAmount * (margin / 100 / 30) * daysPassed;
    }

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    function dateDiffInDays(a, b) {
     // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

     return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    function updateReturnDate(date){
        setReturnDate(date);
    }

    function renderRow(){
        return(
            <tr>
                <th  scope="row">{data.contractNumber}</th>
                <td >{data.contractInit}</td>
                <td >{data.contractAmount}</td>
                <td >{data.contractEnd}</td>
                <td >{calculateMargin()}</td>
                <td >{data.contractClosed}</td>
                <td >{data.comments}</td>

                <td >
                    <IconButton onClick={() => {
                        props.delete(props.id)
                    }} aria-label="delete">
                    <DeleteIcon />
                    </IconButton>

                    <IconButton onClick={() => {
                        setEditState(true);
                    }} aria-label="delete">
                        <EditIcon />
                    </IconButton>
                   
                    
                </td>
            </tr>
        );
    }

    function renderEditable(){
        return (
            <tr className= "row-edit">
                <td  colSpan="7" >
                    <div className ="column-edit">
                        <p>Grąžinimo data: </p>
                        <ReturnDate update={updateReturnDate}/>
                        <br></br>
                        <IconButton onClick={() => {
                    props.update(props.id, returnDate);
                    setEditState(false);
                    }} aria-label="delete">
                    <SaveIcon />
                </IconButton>

                <IconButton onClick = {() => {
                        setEditState(false);
                    }}>
                        <CancelOutlinedIcon />
                </IconButton>
                    </div>
                    
                </td>
            </tr>
        );
    }


    return !editState ? renderRow() : renderEditable()
}

export default Row;