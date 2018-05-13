import React from 'react';
import {withSiteData} from "react-static";
import styled from "styled-components";
import {breakpoints} from "../utils";

const StyledForm = styled.form`
	.row {
		>.form-label {
			padding: .8em;
			text-align: right;
		}
		>.form-input > * {
			width: 100%;
			resize: vertical;
		}
	}

	@media (${breakpoints.phone}) {
		.row > .form-label {
			text-align: left;
			padding: .2em 0;
		}
	}
`;

const ContactForm = withSiteData(({email}) => (
	<StyledForm action={`mailto:${email}`} method="get" encType="text/plain">
		<div className="row">
			<div className="col-sm-12 col-md-2 form-label">
				<label htmlFor="name">Name:</label>
			</div>
			<div className="col-sm-12 col-md-3 form-input">
				<input id="name" type="text" name="name"/>
			</div>

			<div className="col-sm-12 col-md-2 form-label">
				<label htmlFor="subject">Subject:</label>
			</div>
			<div className="col-sm-12 col-md-3 form-input">
				<input id="subject" type="text" name="subject"/>
			</div>
		</div>

		<div className="row">
			<div className="col-sm-12 col-md-2 form-label">
				<label htmlFor="comment">Comment:</label>
			</div>
			<div className="col-sm-12 col-md-8 form-input">
				<textarea id="comment" name="body" rows={8}/>
			</div>
		</div>

		<div className="row">
			<div className="col-sm-12 col-md-8 col-md-offset-2">
				<input type="reset" value="Reset"/>
				<button type="submit" className="tertiary"><i className="fa fa-envelope-o"/> Send Email</button>
			</div>
		</div>
	</StyledForm>
));

export default ContactForm;