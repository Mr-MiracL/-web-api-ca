import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authorContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={styles.container}>
      <h1>Welcome to Your Dashboard</h1>

      {user ? (
        <div style={styles.userInfo}>
          <p><strong>Logged in as:</strong></p>
          <p>Token: {user.token}</p>
          <button style={styles.logoutButton} onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}

      <div style={styles.dashboardContent}>
        <h2>Your Data</h2>
        <p>Here you can display dynamic data fetched from your API.</p>
        <ul>
          <li>Feature 1: View your profile.</li>
          <li>Feature 2: Access your tasks.</li>
          <li>Feature 3: Analytics and more!</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  userInfo: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  logoutButton: {
    padding: '10px 15px',
    marginTop: '10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  dashboardContent: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
};

export default Dashboard;
