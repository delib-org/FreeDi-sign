import { logOut } from "../../../controllers/db/authCont";

const Page404 = () => {
    return (
        <div className="page404">
            <h1>404</h1>
            <p>Oops! Page not found.</p>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button onClick={logOut}>Go to Home</button>
        </div>
    );
};

export default Page404;