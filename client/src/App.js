import React, { useState, useEffect } from 'react';
import './App.scss';
import Box from '@material-ui/core/Box';

// COMPONENTS
import TabBar from './TabBar';
import NavBar from './NavBar';
import Active from './components/active/Active';
import Contacts from './components/contacts/Contacts';
import Dashboard from './components/dashboard/Dashboard';
import History from './components/history/History';

//Custom hooks
import { useSocket } from './hooks/useSocket'

export default function App() {
  // const LOGIN = 'LOGIN';
  const loggedIn = true;//Change this :)
  const DASHBOARD = 'DASHBOARD';
  const HISTORY = 'HISTORY';
  const CONTACTS = 'CONTACTS';
  const ACTIVE = 'ACTIVE';

  const { socket, socketOpen } = useSocket();
  const [mode, setMode] = useState(DASHBOARD);

  useEffect(() => {
    if (socketOpen) {
      //Define socket events here, modify the state as needed
      socket.on(
        'msg', data => {
          console.log(data);
        });
    }
  }, [socket, socketOpen]);

  //top nav
  //login page if not logged in
  //dashboard if logged in

  if (loggedIn) {
    return (
      //If logged in show dashboard
      <Box>
        <NavBar />
        {mode === DASHBOARD && <Dashboard socket={socket} socketOpen={socketOpen} />}
        {mode === HISTORY && <History socket={socket} socketOpen={socketOpen} />}
        {mode === CONTACTS && <Contacts socket={socket} socketOpen={socketOpen} />}
        {mode === ACTIVE && <Active socket={socket} socketOpen={socketOpen} />}
        <TabBar mode={mode} setMode={setMode} />
      </Box >

    );
  } else {
    return (
      <h1> Replace with login page </h1>
    );

  }
}
