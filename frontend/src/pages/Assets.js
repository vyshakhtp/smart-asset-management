import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAsset, updateAsset,fetchAssets } from '../store/AssetSlice';
import { Button, Form, Modal } from 'react-bootstrap';
import './Assets.css';
import ReusableTable from '../component/ReusableTable';

function Assets() {
  const assetlist = useSelector((state) => state.assets.items);
  const loading = useSelector((state)=> state.assets.loading);
  const error = useSelector((state) => state.assets.error);
  const [showModel,setShowModel] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAssets());
  },[dispatch]);

  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Asset Name" },
    { key: "type", label: "Type" },
    { key: "serial_number", label: "Serial No." },
    { key: "status", label: "Status" },
    { key: "purchase_date", label: "Purchase Date" },
    {
        key: "action",
        label: "Action",
        render: (asset) => (
            <Button
                variant="outline-primary"
                size="sm"
                onClick={() => editAsset(asset)}
            >
                Edit
            </Button>
        )
    }
  ];

  const closeModel = () =>{
    setShowModel(false);
  }
  const[assetName,setAssetName] = useState("");
  const[type,setType] = useState("");
  const[serialNo,setSerialNo] = useState("");
  const[status,setStatus] = useState("");
  const[purchaseDate,setPurchaseDate] = useState("");

  const editAsset = (asset) => {

        setEditingAssetId(asset.id);
        setAssetName(asset.name);
        setType(asset.type);
        setSerialNo(asset.serial_number);
        setStatus(asset.status);
        setPurchaseDate(asset.purchase_date);
        setShowModel(true);
    };
  
  const addNewAsset = () => {

    setAssetName("");
    setType("");
    setSerialNo("");
    setStatus("");
    setPurchaseDate("");
    setEditingAssetId(null);
    setShowModel(true);
  };

  const saveAsset=()=>{
    if (editingAssetId === null){
      const newAsset= {
        name : assetName,
        type: type,
        serialNumber: serialNo,
        status: status,
        purchaseDate: purchaseDate
      }
      dispatch(addAsset(newAsset));
    }
    else {

      const updatedAsset = {
        id : editingAssetId,
        name : assetName,
        type : type,
        serialNumber : serialNo,
        status : status,
        purchaseDate : purchaseDate
      };
      dispatch(updateAsset(updatedAsset));
        }
    setAssetName("");
    setType("");
    setSerialNo("");
    setStatus("");
    setPurchaseDate("");
    setShowModel(false);
    setEditingAssetId(null);
  }

  if (loading) {
        return (
            <div className="assets">
                <h1>Assets</h1>
                <p>Loading assets...</p>
            </div>
        );
    }
  return (
    <div className="assets">
      
      <div className='asset-header'>
        <div>
          <h1>Assets</h1>
        <p>Manage and track all company assets</p>
        </div>
        <Button variant='primary' onClick={addNewAsset}>
          Add Asset
        </Button>

        {error && (
                <p className="text-danger">
                    {typeof error === 'string'
                        ? error
                        : 'Something went wrong'}
                </p>
            )}
      </div>
      <ReusableTable
          columns={columns}
          data={assetlist}
      />
      <Modal show={showModel} onHide={closeModel}>
        <Modal.Header closeButton>
          <h1>{editingAssetId === null ? "Add Asset" : "Edit Asset"}</h1>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Asset Name</Form.Label>
              <Form.Control
              type="text"
              placeholder="assetname"
              value={assetName}
              onChange={(e)=>setAssetName(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Type</Form.Label>
              <Form.Control
              type="text"
              placeholder="type"
              value={type}
              onChange={(e)=>setType(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Serial No</Form.Label>
              <Form.Control
              type="text"
              placeholder="serial number"
              value={serialNo}
              onChange={(e)=>setSerialNo(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Status</Form.Label>
              <Form.Select
             
              value={status}
              onChange={(e)=>setStatus(e.target.value)} >
                <option value="">
                  Select status
                </option>
                <option value="Available">
                  Available
                </option>
                <option value="Assigned">
                  Assigned
                </option>
                <option value="Under Repair">
                    Under Repair
                </option>

                <option value="Retired">
                    Retired
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control
              type="date"
              value={purchaseDate}
              onChange={(e)=>setPurchaseDate(e.target.value)} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModel}>
            Cancel
          </Button>
          <Button variant='primary' onClick={saveAsset}>{editingAssetId === null ? "Save" : "Update"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Assets
