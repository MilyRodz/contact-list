import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import PropTypes from "prop-types";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		showModal: false,
		contactId: ""
	});

	const onDelete = contactId => {
		setState({
			showModal: true,
			contactId
		});
	};

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					{store.contactList ? (
						<ul className="list-group pull-down" id="contact-list">
							{store.contactList.map((itemCard, index) => {
								return <ContactCard key={index} onDelete={onDelete} itemCard={itemCard} />;
							})}
						</ul>
					) : null}
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} contactId={state.contactId} />
		</div>
	);
};
