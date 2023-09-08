import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { enableMapSet } from "immer";

enableMapSet();

/*=================SID Start =================== */
const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  })
		: compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

function configureStore(preloadedState) {
	let store = createStore(persistedReducer, preloadedState, enhancer);
	let persistor = persistStore(store);
	return { store, persistor };
}
/* ============== END ======================== */

const MapTransform = createTransform(
	// transform state on its way to being serialized and persisted.
	(inboundState) => {
		// convert mySet to an Array.
		return {
			...inboundState,
			chatLog: Object.fromEntries(inboundState.chatLog),
		};
	},
	// transform state being rehydrated
	(outboundState) => {
		// convert mySet back to a Set.
		return { ...outboundState, mySet: new Map(outboundState.chatLog) };
	},
	// define which reducers this transform gets called for.
	{ whitelist: ["chats"] }
);
const persistConfig = {
	key: "root",
	whitelist: ["chats"],
	storage,
	transforms: [MapTransform],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const { store, persistor } = configureStore();

export default store;
export { persistor };
