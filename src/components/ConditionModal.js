import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const ConditionModal = (props) => {
    const {
        className,
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

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
