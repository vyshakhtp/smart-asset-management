import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import './Inventory.css';
import ReusableTable from '../component/ReusableTable';
import { fetchInventory,deleteInventory,addInventory, updateInventory } from '../store/InventorySlice';
import { Button, Form, Modal } from 'react-bootstrap';

function Inventory() {

  const dispatch = useDispatch();
  const inventoryList = useSelector((state) =>state.inventory.items);
  const loading = useSelector((state) => state.inventory.loading);
  const error = useSelector((state) => state.inventory.error);

  const[editId,setEditId] = useState(null);
  const[showModel,setShowModel] = useState(false);
  const[itemType,setItemType] = useState("");
  const[quantity,setQuantity] = useState("");
  const[threshold,setThreshold] = useState("");

  useEffect(()=>{
    dispatch(fetchInventory());
  },[dispatch]);

  const columns = [
    { key: "id", label: "Id" },
    { key: "item_type", label: "Item Type" },
    { key: "quantity", label: "Quantity" },
    { key: "threshold", label: "Threshold" },
    { key: "status", label: "Status" ,
      render: (item)=>(
        item.quantity<=item.threshold ? "Low Stock" : "Available"
      )
    },
    {
        key: "action",
        label: "Action",
        render: (item) => (
            <>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => editInventory(item)}
                >
                    Edit
                </Button>

                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>handleDelete(item.id)}
                >
                    Delete
                </Button>
            </>
        )
    }
  ];

  const addInventoryItem=()=>{
    setEditId(null);
    setItemType("");
    setThreshold("");
    setQuantity("");
    setShowModel(true);
  }

  const editInventory = (item) =>{
    setEditId(item.id);
    setItemType(item.item_type);
    setQuantity(item.quantity);
    setThreshold(item.threshold);
    setShowModel(true);
  }

  const handleDelete = (id) =>{
      dispatch(deleteInventory(id));
  }

  const closeModel=()=>{
    setShowModel(false);
    setEditId("");
    setItemType("");
    setQuantity("");
    setThreshold("");
    
  }

  const saveInventory = () =>{
    const inventoryData = {
      itemType : itemType,
      quantity : Number(quantity),
      threshold : Number(threshold)
    };
    if(editId===null){
        dispatch(addInventory(inventoryData));
    }
    else{
        dispatch(updateInventory({id:editId,...inventoryData}));
    }
    closeModel();
  }
if(loading){
  return(
    <div className="inventory">
      <div className="inventory-header">
          <div>
              <h1>Inventory</h1>
              <p>Loading...s</p>
          </div>
      </div>
    </div>
  )
  }
  
  return (
    <div className="inventory">
      <div className="inventory-header">
          <div>
              <h1>Inventory</h1>
              <p>Manage and track inventory items</p>
          </div>
          <Button variant='primary' onClick={addInventoryItem}>
                    ADD
          </Button>
      </div>
      {error && (

        <p className="text-danger">

          {typeof error === 'string'
            ? error
            : error.detail || 'Failed to fetch inventory'}

        </p>

      )}
      <ReusableTable 
       columns={columns}
       data = {inventoryList} />

       <Modal show={showModel} onHide={closeModel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editId === null ? "Add Inventory" : "Update Inventory"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
                <Form.Label>
                  Item Type
                </Form.Label>
                <Form.Control type="text" placeholder="Item type" value={itemType} onChange={(e) =>setItemType(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                  Quantity
                </Form.Label>
                <Form.Control type="number" placeholder="Quantity" value={quantity} onChange={(e) =>setQuantity(parseInt(e.target.value,10))} />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                  Threshold
                </Form.Label>
                <Form.Control type="number" placeholder="Threshold" value={threshold} onChange={(e) =>setThreshold(parseInt(e.target.value,10))} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModel}>
            Cancel
          </Button>
          <Button variant='primary' onClick={saveInventory}>
            {editId===null ? "Save" :"Update"}
          </Button>
        </Modal.Footer>
      </Modal>
  
    </div>
  )
}

export default Inventory
