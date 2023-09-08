import React, { useEffect, useState } from "react";
import MapSettingsPanel from "./MapSettingsPanel";
import { sendAMessage } from "../../../../State/actions/chats";
import { MessageTypeConstants } from "../../../../Services/Message";
import { useDispatch, useSelector } from "react-redux";

function MapSettingsButton({
	setMapTypeCallback,
	overlayVal,
	isDownloading,
	setOverlayValCallBack,
	mapContainer,
	mapType,
	currentUserDomain,
	weatherChecked,
	setWeatherChecked,
	addAllWeatherLayers,
	removeAllWeatherLayers,
	setImgOverlayShudOpen,
	conversation,
	mapRef,
	user,
	currentBotId,
	parentTabId,
	options,
	state,
	setState,
	limitedSettingsCntrl,
	mainMenuToggle,
	setMainMenuToggle
}) {
	const nonConversationalObj = useSelector(
		(state) => state?.v2?.NonConversational
	);
	const dispatch = useDispatch();
	const conversationId = nonConversationalObj?.conversationId;
	const components = nonConversationalObj[conversationId]?.components;
	const [menuComponent, setMenuComponent] = useState(
		() => components?.filter((component) => component.messageType === "menu")[0]
	);
	useEffect(() => {
		function clickAwayHandler(e) {
			if (
				(!document
					?.getElementsByClassName("map-settings-panel")[0]
					?.contains(e.target) &&
					document.getElementsByClassName("map-settings-panel")[0]) ||
				document
					?.getElementsByClassName("settings-btn-icon")[0]
					?.contains(e.target)
			) {
				toggleMenu();
			}
			if (limitedSettingsCntrl) {
				const mapSettingsPanel =
					document.getElementsByClassName("map-settings-panel")[0];
				mapSettingsPanel && (mapSettingsPanel.style.maxHeight = "25vh");
			}
		}
		window.addEventListener("click", clickAwayHandler);
		return () => window.removeEventListener("click", clickAwayHandler);
	}, []);

	const toggleMenu = () => {
		setMainMenuToggle((mainMenuToggle) => !mainMenuToggle);
	};

	const sendMenuMessage = (e, menuItem, controlOptions) => {
		e.preventDefault();

		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_MENU_RESPONSE;
		responseChat.message = {
			controlId: controlOptions.controlId,
			selectedEntry: menuItem.id,
		};
		dispatch(sendAMessage(responseChat, true));
	};

	return (
		<div className="settings-btn-ctrl">
			<div className="settings-btn-icon"></div>

			{mainMenuToggle && (
				<MapSettingsPanel
					depthLevel={0}
					controlOptions={menuComponent?.message?.options}
					config={menuComponent?.message?.menuEntries}
					sendMenuMessage={sendMenuMessage}
					setMapTypeCallback={setMapTypeCallback}
					overlayVal={overlayVal}
					isDownloading={isDownloading}
					mapContainer={mapContainer}
					setOverlayValCallBack={setOverlayValCallBack}
					mapType={mapType}
					currentUserDomain={currentUserDomain}
					weatherChecked={weatherChecked}
					setWeatherChecked={setWeatherChecked}
					addAllWeatherLayers={addAllWeatherLayers}
					removeAllWeatherLayers={removeAllWeatherLayers}
					setImgOverlayShudOpen={setImgOverlayShudOpen}
					conversation={conversation}
					mapRef={mapRef}
					user={user}
					currentBotId={currentBotId}
					options={options}
					state={state}
					setState={setState}
					parentTabId={parentTabId}
					limitedSettingsCntrl={limitedSettingsCntrl}
				/>
			)}
		</div>
	);
}

export default React.memo(MapSettingsButton);
