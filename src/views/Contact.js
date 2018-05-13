import React from "react";
import Helmet from "react-helmet";
import { withRouteData } from "react-static";

import { createTitle } from "../utils";
import ContactForm from "../components/ContactForm";

const ContactPage = () => (
	<React.Fragment>
		<Helmet>
			<title>{createTitle("Games")}</title>
		</Helmet>

		<h1>Contact Me</h1>
		<ContactForm />
	</React.Fragment>
);

export default ContactPage;
