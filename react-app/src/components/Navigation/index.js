import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const url = window.location.href;

	if (url === 'http://localhost:3000/') return null;

	return (
		<div>

			<ul>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
			<button onClick={e => console.log(url)}>test</button>
		</div>
	);
}

export default Navigation;
