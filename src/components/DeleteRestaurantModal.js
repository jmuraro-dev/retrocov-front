import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {deleteRestaurantById} from "../api/Restaurant";

const DeleteRestaurantModal = (props) => {
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
        <div>
            <Button variant="outline-danger" size={"sm"}
                    onClick={toggle}>
                Supprimer
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Supprimer restaurant</ModalHeader>
                <ModalBody>
                    Voulez-vous vraiment supprimer ce restaurant ?
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger"
                            onClick={deleteRestaurant}>Valider
                    </Button>
                    {' '}
                    <Button variant="secondary" onClick={toggle}>Annuler</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default DeleteRestaurantModal;
