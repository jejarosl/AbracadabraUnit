import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Inventory = () => {
  const params = useParams();
  
  const URL = "https://inventura.flexibee.eu/v2/c";
  const COMPANY = "firma6";
  const Token = btoa("admin6:admin6admin6");

  const [inventory, setInventory] = useState([]);
  const [type, setType] = useState([]);

  let config = {
    headers: {
      Authorization: `Basic ${Token}`,
      Accept: "application/json",
    }
  }

  useEffect(()=> {
    axios.get(`${URL}/${COMPANY}/inventura/(sklad="code:${params.kod}")?detail=full`,config
    )
    .then((res) => {
        console.log(res.data.winstrom.inventura);
        setInventory(res.data.winstrom.inventura);
    })
    .catch((error) => {
        console.log(error)
    });
  },[]);

  return (
    <div>
        <div className='container mt-5'>
            <div className='d-flex align-items-center justify-content-between'>
                <h3>
                    Inventories
                </h3>
                <button className='btn btn-primary btn-sm bg-prim border-0' data-toggle="modal" data-target="#inventoryModal">
                    Create Inventory
                </button>
            </div>
            <table className='table table-hover table-bordered table-collapse'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>typInventury</th>
                        <th>datKonec</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody> 
                    {inventory.map((item,index) => 
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.typInventury}</td>
                            <td>{item.datKonec}</td>
                            <td>
                                <button className='btn btn-primary btn-sm bg-prim border-0'>
                                    Open Inventory
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        <div className="modal fade" id="inventoryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Přidat inventuru</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1" value={type} onChange={(e) => setType(e.target.value)}>Typ Inventury</label>
                        <input type="email" className="form-control" />
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Přidat</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Inventory