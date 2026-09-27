import React, { useEffect, useState } from 'react'
import { Button, Form,Modal} from 'react-bootstrap';
import './Ticket.css';
import ReusableTable from '../component/ReusableTable';
import { useSelector,useDispatch } from 'react-redux';
import { fetchTicket,addTicket,updateTicket,deleteTicket } from '../store/TicketSlice';
import { fetchAssets } from '../store/AssetSlice';

function Ticket() {
  const [assetId, setAssetId] = useState('');
  const [issue, setIssue] = useState('');
  const [status, setStatus] = useState('Pending');
  const tickets = useSelector((state)=>state.tickets.items);
  const assets = useSelector((state)=>state.assets.items);
  const loading = useSelector((state)=>state.tickets.loading);
  const error = useSelector((state)=>state.tickets.error);
  const dispatch = useDispatch();
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const columns = [
        { key: "id", label: "ID" },
        { key: "asset", label: "Asset" },
        { key: "issue", label: "Issue" },
        { key: "status", label: "status" },
        {
            key: 'action',
            label: 'Action',
            render: (ticket) => (
                <>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => editTicket(ticket)}>
                        Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(ticket.id)}>
                        Delete
                    </Button>
                </>
            )
        }
    ];

    useEffect(() => {
        dispatch(fetchAssets());
        dispatch(fetchTicket());
    }, [dispatch]);
    const editTicket = (ticket) => {
        setEditingTicketId(ticket.id);
        setAssetId(ticket.asset);
        setIssue(ticket.issue);
        setStatus(ticket.status);
        setShowModal(true);
    };
     const handleDelete = (id) => {
            dispatch(deleteTicket(id));
    };
    const saveTicket = () => {
        const ticketData = {
            asset: Number(assetId),
            issue: issue,
            status: status,
        };
        if (editingTicketId === null) {
            dispatch(
                addTicket(ticketData)
            );
        }
        else {
            dispatch(
                updateTicket({
                    id: editingTicketId,
                    ...ticketData
                })
            );
        }
        closeModal();
    };

  const createNewTicket = () => {
        setEditingTicketId(null);
        setAssetId('');
        setIssue('');
        setStatus('Pending');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingTicketId(null);
        setAssetId('');
        setIssue('');
        setStatus('Pending');
    };

    if (loading) {
        return (
            <div className="ticket">
                <div className="ticket-header">
                    <h1>Tickets</h1>
                    <p>
                        Loading tickets...
                    </p>
                </div>
            </div>
        );
    }
  return (
    <div className="ticket">
            <div className="ticket-header">
                <div>
                    <h1>Create Ticket</h1>
                    <p>Report an issue with an asset</p>
                </div>
                <Button variant="primary"  onClick={createNewTicket}>
                    Create Ticket
                </Button>
            </div>
            {error && (
                <p className="text-danger">
                    {typeof error === 'string'? error: error.detail ||'Failed to fetch tickets'}
                </p>
            )}
            {tickets.length > 0 && (
                <div className="ticket-list">
                    <h2>Created Tickets</h2>
                    <ReusableTable 
                    columns = {columns}
                    data = {tickets}
                    />
                </div>
            )}
            <div className="">
                <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingTicketId === null ? 'Create Ticket' : 'Edit Ticket'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Asset
                            </Form.Label>
                            <Form.Select value={assetId} onChange={(e) => setAssetId(e.target.value) }>
                                <option value="">
                                    Select an asset
                                </option>
                                {assets.map((asset) => (
                                    <option key={asset.id} value={asset.id} >
                                        {asset.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Issue
                            </Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Describe the issue" value={issue} onChange={(e) => setIssue(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Status
                            </Form.Label>
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value) }>
                                <option value="Pending">
                                    Pending
                                </option>
                                <option value="In Progress">
                                    In Progress
                                </option>
                                <option value="Resolved">
                                    Resolved
                                </option>
                                <option value="Closed">
                                    Closed
                                </option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveTicket}>
                        {editingTicketId === null ? 'Create Ticket' : 'Update Ticket'}
                    </Button>
                </Modal.Footer>
            </Modal>  
        </div>
    </div>
  )
}

export default Ticket;
