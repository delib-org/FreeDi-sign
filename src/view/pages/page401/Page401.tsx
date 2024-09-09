import "./page401.scss";
import { useNavigate } from "react-router";



const Page401 = () => {
	const navigate = useNavigate();


	function handleGoHome() {
	
		navigate("/");
	}

	return (
		<div className="page401">
			<h1>Checking for authorization</h1>
			<p className="page401__stamp">
                From the Institute for Deliberative Democracy
			</p>
			<button className="page401__btn" onClick={handleGoHome}>
                Go to Homepage
			</button>
		</div>
	);
};

export default Page401;
