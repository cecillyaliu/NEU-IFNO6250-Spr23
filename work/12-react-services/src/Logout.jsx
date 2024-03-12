import "./App.css";

const Logout = ({handleLogout }) => {
  return (
    <div className="logout-container">
          <form 
            onSubmit={
              (e) => {
                  e.preventDefault();
                  handleLogout();
            }
          }>
            <button className="logout-button">
              Logout
            </button>
          </form>
    </div>
  );
};

export default Logout;