import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const Modal = props => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		//initialize state here
	});

	const handleClickDelete = contactId => {
		// LLAMAR AL STORE ACTION QUE ELIMINE O FILTRE POR EL ID SELECCIONADO.
		actions.deleteContactById(contactId);
		props.onClose();
;	};

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<p>Warning: unknown consequences after this point... Kidding!</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary">
							Oh no!
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
							onClick={() => handleClickDelete(props.contactId)}>
							Do it!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	contactId: PropTypes.string
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null,
	contactId: "",
	history: null
};
