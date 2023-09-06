import React, { useEffect, useState } from "react";
import { Route, Switch, Router, useParams } from "react-router-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.min.css";
import "./Main.css";
import { ToastContainer } from "react-toastify";
import store from "../../State/configureStore";
import Spinner from "../Spinner";
import history from "../../Services/History";
import HomeContainer from "../../Containers/HomeContainer";
import ReactGA from "react-ga";
import NonConversationalLoader from "../NonConversationalLoader";
import ErrorPageContainer from "../../Containers/ErrorPageContainer";
import Error404 from "../ErrorPages/Error404";
import ProtectedRoute from "../ProtectedRoute";
import Loadable from "react-loadable";
import { setSignupPath } from "../../Services/StorageService";
import {
	VIKAND_PROD_URL,
	VIKAND_HEALTH_PROD_URL,
	THURAYA_T2M_PROD_URL,
	ONSHIP_PROD_URL,
	STATIONSATCOM_PROD_URL,
	VIKAND_CONNECT_PROD_URL,
} from "../../Utils/Constants";
import { updateManifestFile } from "../../Utils/Helpers";

const breakpoints = {
	mobile: 320,
	mobileLandscape: 480,
	tablet: 768,
	tabletLandscape: 1024,
	desktop: 1200,
	desktopLarge: 1500,
	desktopWide: 1920,
};

const LoginPage = Loadable({
	loader: () => import("../Home/LoginPage"),
	loading: Spinner,
	delay: 500,
});

const OtpPage = Loadable({
	loader: () => import("../Home/OtpPage"),
	loading: Spinner,
	delay: 500,
});
const QRCodePage = Loadable({
	loader: () => import("../Home/QRCodePage"),
	loading: Spinner,
	delay: 500,
});
const PingStatusPage = Loadable({
	loader: () => import("../Home/PingStatusPage"),
	loading: Spinner,
	delay: 500,
});

const SignupView = Loadable({
	loader: () => import("../Signup/SignupView"),
	loading: Spinner,
	delay: 500,
});

const OnShipSignInView = Loadable({
	loader: () => import("../Signup/OnShipSignInView"),
	loading: Spinner,
	delay: 500,
});

const SattracklandSigninView = Loadable({
	loader: () => import("../Signup/SattracklandSigninView"),
	loading: Spinner,
	delay: 500,
});

const SendCodeAgain = Loadable({
	loader: () => import("../Signup/SendCodeAgain"),
	loading: Spinner,
	delay: 500,
});

const ResetPassword = Loadable({
	loader: () => import("../ResetPassword/ResetPassword"),
	loading: Spinner,
	delay: 500,
});

const ResetConfirmPassword = Loadable({
	loader: () => import("../ResetPassword/ResetConfirmPassword"),
	loading: Spinner,
	delay: 500,
});

const UserVerificationView = Loadable({
	loader: () => import("../Signup/UserVerificationView"),
	loading: Spinner,
	delay: 500,
});

const LinkableMessage = Loadable({
	loader: () => import("../Links/LinkableMessage"),
	loading: Spinner,
	delay: 500,
});

const App = Loadable({
	loader: () => import("../App/App"),
	loading: Spinner,
	delay: 500,
});

const JitsiCall = Loadable({
	loader: () => import("../Home/JitsiCall"),
	loading: Spinner,
	delay: 500,
});

if (window?.location?.pathname) {
	const pathArray = [
		"/login",
		"/thuraya",
		"/vikand",
		"/vikandconnect",
		"/intelli4desks",
		"/voyagervoice",
		"/stationsatcom",
		"/sigma",
		"/onship",
		"/onelearn",
		"/sattrackland",
	];
	if (window.location.pathname === "/") {
		setSignupPath("/login");
	} else {
		let pathIndex;
		pathIndex = pathArray.findIndex(
			(elem) => elem === window.location.pathname
		);
		if (pathIndex !== -1) {
			setSignupPath(window.location.pathname);
		}
	}
}

if (window.location.hostname.search("frontm.ai") !== -1) {
	ReactGA.initialize("UA-37782731-6");
	history.listen((location) => {
		ReactGA.pageview(location.pathname + location.search);
	});
}

const Main = () => {
	const [showToast, setShowToast] = useState(false);
	// const test = useParams();

	useEffect(() => {
		window.onload = () => {
			navigator.serviceWorker.ready.then(() => {
				setShowToast(true);
			});
		};
	}, []);

	useEffect(() => {
		if (
			[
				VIKAND_PROD_URL,
				VIKAND_HEALTH_PROD_URL,
				VIKAND_CONNECT_PROD_URL,
				"stage2.frontm.com",
			].includes(window.location.hostname)
		) {
			updateManifestFile("./vikand-manifest.json");
		} else if (
			[THURAYA_T2M_PROD_URL, "stage3.frontm.com"].includes(
				window.location.hostname
			)
		) {
			updateManifestFile("./thuraya-sattrack-manifest.json");
		} else if ([ONSHIP_PROD_URL].includes(window.location.hostname)) {
			updateManifestFile("./onship-manifest.json");
		} else if (
			["stage6.frontm.com", STATIONSATCOM_PROD_URL].includes(
				window.location.hostname
			)
		) {
			updateManifestFile("./stationSatcom-manifest.json");
		} else if (
			["onecare.frontm.com", "onecaresolutions.app"].includes(
				window.location.hostname
			)
		) {
			updateManifestFile("./oneCare-manifest.json");
		} else {
			updateManifestFile();
		}
	}, [window.location.hostname]);
	// console.log("window.location.hostname test", test);
	return (
		<>
			{/* <Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				open={showToast}
				autoHideDuration={6000}
				onClose={() => setShowToast(false)}
				message="App is ready for offline use"
			/> */}
			<Provider store={store}>
				<Router history={history}>
					<div className="App-wrapper">
						<Switch>
							<Route exact path="/login" component={LoginPage} />
							<Route exact path="/jitsi" component={JitsiCall} />
							<Route exact path="/status" component={PingStatusPage} />
							<Route exact path="/otp" component={OtpPage} />
							<Route exact path="/qrcode" component={QRCodePage} />
							<Route exact path="/qrcode" component={QRCodePage} />
							<ProtectedRoute
								exact
								path="/login/:destination"
								component={LoginPage}
							/>
							<ProtectedRoute exact path="/signup" component={SignupView} />
							<ProtectedRoute
								exact
								path="/voyagervoice"
								component={SignupView}
							/>
							<ProtectedRoute exact path="/vikand" component={SignupView} />
							<ProtectedRoute
								exact
								path="/onship"
								component={OnShipSignInView}
							/>
							<ProtectedRoute
								exact
								path="/onship/signup"
								component={SignupView}
							/>
							<ProtectedRoute
								exact
								path="/onelearn"
								component={SignupView}
							/>
							<ProtectedRoute
								exact
								path="/sattrackland"
								component={SattracklandSigninView}
							/>
							<ProtectedRoute
								exact
								path="/sattrackland/signup"
								component={SignupView}
							/>
							<ProtectedRoute
								exact
								path="/vikandconnect"
								component={HomeContainer}
							/>
							<ProtectedRoute
								exact
								path="/intelli4desks"
								component={SignupView}
							/>
							<ProtectedRoute exact path="/thuraya" component={SignupView} />
							<ProtectedRoute
								exact
								path="/stationsatcom"
								component={SignupView}
							/>
							<ProtectedRoute exact path="/sigma" component={SignupView} />
							<ProtectedRoute exact path="/onecare" component={SignupView} />
							<ProtectedRoute
								exact
								path="/resetPassword"
								component={ResetPassword}
							/>
							<ProtectedRoute
								exact
								path="/:domainName/resetPassword"
								component={ResetPassword}
							/>
							<ProtectedRoute
								exact
								path="/sendcode"
								component={SendCodeAgain}
							/>
							<ProtectedRoute
								exact
								path="/resetConfirmPassword"
								component={ResetConfirmPassword}
							/>
							<ProtectedRoute
								exact
								path="/verify"
								component={UserVerificationView}
							/>
							<Route
								exact
								path="/messages/:type/:botId"
								component={LinkableMessage}
							/>
							<Route
								exact
								path="/messages/:type/:botId/r/:message"
								component={LinkableMessage}
							/>
							<Route
								exact
								path="/messages/:type/:botId/s/:message"
								component={LinkableMessage}
							/>
							<Route path="/app" component={App} />
							<Route exact path="/" component={HomeContainer} />

							<Route path="/*" component={Error404} />
						</Switch>
						<ToastContainer />
						<Spinner />
						<NonConversationalLoader />
						<ErrorPageContainer />
					</div>
				</Router>
			</Provider>
		</>
	);
};

export default Main;
