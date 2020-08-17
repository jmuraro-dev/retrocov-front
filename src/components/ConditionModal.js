import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import "../styles/register.css";

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
                <ModalHeader toggle={toggle}>Conditions générales <a href={"/"}>www.retrocov.ch</a></ModalHeader>
                <ModalBody>
                    <p className={"condition-p"}>
                        RetroCov est un outil informatique de collecte de données clients mit a disposition, de
                        façons gratuites ou payantes, envers des établissements soumis a collecte de données
                        clients dans la cadres des consignes de Office Fédérale de la Santé Publique Suisse.
                    </p>
                    <p className={"condition-p"}>
                        <b>Article 1.</b> RetroCov n’est en aucun responsable de l’exactitude des données renseignées
                        par les clients des établissements.
                    </p>
                    <p className={"condition-p"}>
                        <b>Article 2.</b> RetroCov remettra à l’établissement une liste en .csv des clients ayant
                        fréquenté l’établissement, sur demande de l’établissement, pour les 15 jours antérieur a
                        la demande et cela dans une limite stricte des 15 derniers jours.
                    </p>
                    <p className={"condition-p"}>
                        <b>Article 3.</b> La demande d’extraction de données usager de l’établissement doit être
                        accompagnée de la présentation de la demande émise par les administrations ayant
                        autorité dans le cadre du Covid.
                    </p>
                    <p className={"condition-p"}>
                        <b>Article 4.</b> Toutes les données antérieures à 15 jours - délai actuellement exigé par les
                        autorités en lien avec le Covid - sont automatiquement supprimées des serveurs et cela
                        sans copie de sauvegarde.
                    </p>
                    <p className={"condition-p"}>
                        <b>Article 5.</b> RetroCov héberge les données usagers et clients sur les serveurs d’infomaniak
                        et la responsabilité de RetroCov se limite à celle d’un usager usuel de services
                        d’hébergements informatiques.
                    </p>
                    Genève, le 16 aout 2020.
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={toggle}>Fermer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ConditionModal;
