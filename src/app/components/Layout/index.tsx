import React from 'react';
import { Header } from '../Header';
import { Container } from '../Container';
import { SideBar } from '../SideBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
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
