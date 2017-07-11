import React from 'react';
import classNames from 'classnames';

const Card = ({header, children, className, ...props}) => (
	<div className={classNames('card fluid responsive-padding')}>
		{header}
		{header && <hr/>}
		{children}
	</div>
);

export default Card;
