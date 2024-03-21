import React, { useEffect } from 'react';
import { Header } from '../Header';
import { Container } from '../Container';
import { SideBar } from '../SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelect } from '@nextui-org/react';
import { useAppSelector } from '../../hooks';
import { selectIsAuthenticated, selectUser } from '../../../features/user/userSlice';

export const Layout = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated)
	const user = useAppSelector(selectUser);
	const navigate = useNavigate();

	useEffect(() => {
		if(!isAuthenticated) {
			navigate('/auth');
		}
	}, []);

	return (
		<>
			<Header />

			<Container>
				<div className="flex-2 p-4">
					<SideBar />
				</div>

				<div className="flex-1 p-4">
					<Outlet />
				</div>
			</Container>
		</>
	);
};
