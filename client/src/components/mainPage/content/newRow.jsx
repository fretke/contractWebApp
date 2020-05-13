import React, {useState} from "react"
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';

import DatePicker from "./datePicker";

function getCurrentDate(date){
    let currentDate = date.getFullYear() + "-";
    const month = date.getMonth() + 1;
    const day = date.getDate()
    if (month < 10){
        currentDate = currentDate.concat("0" + month + "-");
    } else {
        currentDate = currentDate.concat(month + "-");
    }
    if (day < 10){
        currentDate = currentDate.concat("0" + day);
    } else {
        currentDate = currentDate.concat(day);
    }

    return currentDate;
}

function NewRow(props){

    const [entry, setEntry] = useState({
            contractNumber: "LT123",
            contractInit: getCurrentDate(new Date()),
            contractAmount: "",
            contractEnd: getCurrentDate(new Date()),
            currentMargin: "",
            contractClosed: "",
            comments: ""
    });

    function saveEntry (){
        props.add(entry)
    }

    function updateEntry(event){
        const {name, value} = event.target;

        setEntry(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function updateDateEntry(entry){
        const {name, value} = entry;
        //  console.log(name + " " + value);

        setEntry(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (

    <div className= "container-fluid newRow-form">

        
        <div className="container">
            
            <div className="row">
                <div className="col-3 newRow-fields">
                    <input autoComplete="off" onChange={updateEntry} placeholder="Sutarties nr.:" className="form-control" type="text" name="contractNumber" value={entry.contractNumber}></input>
                </div>

                <div className="col-3 newRow-fields">
                    <DatePicker name="contractInit" update={updateDateEntry}/>
                    {/* <input onChange={updateEntry} type="text" className="form-control" name="contractInit" value={entry.contractInit}></input> */}
                </div>

                <div className="col-3 newRow-fields">
                    <input autoComplete="off" onChange={updateEntry} placeholder="sutarties suma .: " type="text" className="form-control" name="contractAmount" value={entry.contractAmount}></input>
                </div>

                <div className="col-3 newRow-fields">
                    <DatePicker name="contractEnd" update={updateDateEntry}/>
                </div>

                {/* <div className="col-2">
                    <input onChange={updateEntry} type="text"  name="currentMargin" value={entry.currentMargin}></input>
                </div>

                <div className="col-2">
                    <input onChange={updateEntry} type="text"  name="contractClosed" value={entry.contractClosed}></input>
                </div> */}

                <div className="col-12 newRow-fields">
                    <input autoComplete="off" onChange={updateEntry} placeholder="Komentarai" type="text" className="form-control" name="comments" value={entry.comments}></input>
                </div>

            </div>
            <div className="addButton-align">
                <IconButton onClick={saveEntry} aria-label="delete">
                    <SaveIcon />
                </IconButton>
            </div>
            
        </div>
    </div>

    );
}

export default NewRow;