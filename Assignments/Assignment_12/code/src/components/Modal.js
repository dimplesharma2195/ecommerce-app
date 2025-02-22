import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const PurchaseMessageModal = () => {
  const {
    showPurchaseMessage,
    purchaseMessage,
    closePurchaseMessage,
  } = useContext(CartContext);

  return (
    <Modal show={showPurchaseMessage} onHide={closePurchaseMessage} centered>
      <Modal.Header closeButton>
        <Modal.Title>Purchase Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{purchaseMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closePurchaseMessage}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseMessageModal;
