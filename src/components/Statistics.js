import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Statistics = () => {
  const URL = "https://inventura.flexibee.eu/v2/c";
  const COMPANY = "firma6";
  const Token = btoa("admin6:admin6admin6")
  const [warehouse, setWarehouse] = useState([]);
  let config = {
    headers: {
      Authorization: `Basic ${Token}`,
      Accept: "application/json",
    }
  }

  useEffect(()=> {
    axios.get(`${URL}/${COMPANY}/sklad?detail=full`,config
    )
    .then((res) => {
        setWarehouse(res.data.winstrom.sklad);
    })
    .catch((error) => {
        console.log(error)
    });
  },[]);
  return (
    <div>
        <div className='container mt-5'>
            <h3>
                Warehouses
            </h3>
            <table className='table table-hover table-bordered table-collapse'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Kod</th>
                        <th>Nazev</th>
    
                        <th></th>
                    </tr>
                </thead>
                <tbody> 
                    {warehouse.map((item,index) => 
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.kod}</td>
                            <td>{item.nazev}</td>
                            <td>
                                <Link to={`inventories/${item.kod}`}>
                                  <button className='btn btn-primary btn-sm bg-prim border-0'>
                                    View Inventories
                                </button>  
                                </Link>
                                
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Statistics