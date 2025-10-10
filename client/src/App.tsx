import { useNotifications } from "./useNotifications";

interface Notification {
  id: string;
  message: string;
  isRead: boolean;
}

function App() {
  const notifications = useNotifications();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Notifications ({notifications.length})</h1>
        <div className="notification-list">
          {notifications.map((notif: Notification) => (
            <div key={notif.id} className="notification-item">
              {notif.message}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
