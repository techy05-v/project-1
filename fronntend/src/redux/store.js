import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userSlice from './slice/UserSlice'
import adminSlice from './slice/AdminSlice'
import categorySlice from '../redux/slice/Category.jsx'
import sidebarSlice  from "../redux/slice/sidebarSlice.jsx"
import productSlice from  "../redux/slice/ProductSlice.jsx"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"user",
		"admin",
    ]
};

const rootReducer = combineReducers({
    user:userSlice,
    admin:adminSlice,
    sidebar: sidebarSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

const persistor = persistStore(store);

export { store, persistor };
