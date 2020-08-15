import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {deleteRestaurantById} from "../api/Restaurant";

const ConditionModal = (props) => {
    const {
        className,
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const deleteRestaurant = () => {
        deleteRestaurantById(props.restaurantId)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
    }

    return (
        <div style={{display: "inline-block"}}>
            <p>Veuillez lire et accepter les <a href={"#"} onClick={toggle}>conditions générales</a></p>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Conditions générales</ModalHeader>
                <ModalBody>
                    Voici les conditions générales d'utilisation de RetroCov
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={toggle}>Fermer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ConditionModal;
