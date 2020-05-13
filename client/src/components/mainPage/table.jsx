import React, { useState, useEffect } from "react"
import data from "../../ClientData/data"
import Row from "./content/row"
import NewRow from "./content/newRow"

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';



function Table (props){
    
    const [clientData, setClientData] = useState([]);
    
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        console.log("fetching data....");        
        fetchData();
        
    }, [])

    function changeState(){
        
        setIsEditable((prev) => {
            return !prev;
        })
    }

    function addInvoice(entry){
        console.log("Entry received " + entry);
        
        setClientData(prev => {
            return [...prev, entry]
        });
        changeState();

        fetch("http://localhost:5000/data/"+ props.name, {
            method: "post",
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
        }).then(res => {
            console.log(res.text());
        }).catch(err => {
            console.log(err);
        });

    }

    function deleteInvoice(id){
        console.log(id);
        setClientData(prev => {
            return prev.filter((data) => {
                return data.contractNumber !== id
            });
        })

        fetch("http://localhost:5000/deleteInvoice/" + props.name + "/" + id, {
            method: "delete"
        })
        .then( (res) => {
            console.log(res.text());
        })
        .catch((err) => {
            console.log(err);
            
        });
    }

    function updateInvoice(id, date){
        console.log("contract Number " + id + " new Date " + date);
        setClientData(prev => {
            return prev.filter( (invoice) => {
                if (invoice.contractNumber === id){
                    invoice.contractClosed = date;
                    return invoice;
                } else {
                    return invoice;
                }
            });
        });

        const updateDate = {
            companyName: props.name,
            contractNumber: id,
            closingDate: date
        }

        fetch("http://localhost:5000/update", {
            method: "post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              
            body: JSON.stringify(updateDate)
        });
    }

    function fetchData(){
        fetch("http://localhost:5000/" + props.name)
        .then(res => {
            return res.json();
        })
        .then(incomingData => {
             setClientData((prev) => {
                 return [...prev, ...incomingData.data]
                });
                
                
        })
        .catch(err => {
            console.log(err);
        });
    }

    function scrollAction(){
       const element = document.querySelector(".content-table");
       const scrollHeight = element.scrollHeight;
       const scrollTop = element.scrollTop;

       if (scrollTop + 301 > scrollHeight){
           fetchData();
       }       
    }


    
    return (
        <div>

            <div className="addButton-align" >
                <IconButton onClick={changeState} aria-label="delete">
                    <AddIcon />
                </IconButton>
            </div>

           
            {isEditable && <NewRow  add={addInvoice}/>}
        <div onScroll={scrollAction} className="content-table table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-bordered table-striped mb-0">
                <thead>
                    <tr>
                        <th scope="col">Sutarties Nr.:</th>
                        <th scope="col">Pradžia</th>
                        <th scope="col">Suma, EUR</th>
                        <th scope="col">Pabaiga</th>
                        <th scope="col">Palūkanos</th>
                        <th scope="col">Grąžinimo data</th>
                        <th scope="col">Pastabos</th>
                    </tr>
                </thead>
                <tbody>

                    {clientData.map((dataSet) => {
                        return <Row update={updateInvoice} delete={deleteInvoice} id={dataSet.contractNumber} data={dataSet}/>
                    })}
                   
                    
                  
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default Table;