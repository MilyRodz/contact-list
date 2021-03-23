import * as conf from "./Requests";
const getState = ({ getStore, setStore }) => {
	const contactOwner = "mily_agenda";

	return {
		store: {
			contactList: [],
			contactDetail: {},
			newContact: {}
		},
		actions: {
			getContactList: async () => {
				const response = await fetch(
					`https://assets.breatheco.de/apis/fake/contact/agenda/${contactOwner}`,
					conf.getRequest
				);
				const json = await response.json();
				setStore({ contactList: json });
			},
			getContactById: async id => {
				const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, conf.getRequest);
				const json = await response.json();
				setStore({ contactDetail: json });
			},
			addNewContact: async contact => {
				const example = conf.requestConfig("POST", JSON.stringify(contact));
				console.log(example);
				const createContactResponse = await fetch(
					`https://assets.breatheco.de/apis/fake/contact/`,
					conf.requestConfig("POST", contact)
				);
				if (createContactResponse.ok) {
					const response = await fetch(
						`https://assets.breatheco.de/apis/fake/contact/agenda/${contactOwner}`,
						conf.getRequest
					);
					const json = await response.json();
					setStore({ contactList: json });
				}
			},
			updateContact: async (id, contactToUpdate) => {
				const response = await fetch(
					`https://assets.breatheco.de/apis/fake/contact/${id}`,
					conf.requestConfig("PUT", contactToUpdate)
				);
				if (response.ok) {
					const response = await fetch(
						`https://assets.breatheco.de/apis/fake/contact/agenda/${contactOwner}`,
						conf.getRequest
					);
					const json = await response.json();
					setStore({ contactList: json });
				}
			},
			deleteContactById: async contactId => {
				const response = await fetch(
					`https://assets.breatheco.de/apis/fake/contact/${contactId}`,
					conf.deleteRequest
				);
				if (response.ok) {
					const response = await fetch(
						`https://assets.breatheco.de/apis/fake/contact/agenda/${contactOwner}`,
						conf.getRequest
					);
					const json = await response.json();
					setStore({ contactList: json });
				}
			}

			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
