import { configureStore } from "@reduxjs/toolkit";
import activityLogModalSlice from "./features/menus/activityLogModalSlice";
import activityLogSlice from "./features/menus/activityLogSlice";
import newActivityModalSlice from "./features/menus/newActivityModalSlice";
import notificationModalSlice from "./features/menus/notificationModalSlice";
import userSettingsModalSlice from "./features/menus/userSettingsModalSlice";
import breatheSettingsSlice from "./features/tools/breatheSettingsSlice";
import cdaSlice from "./features/tools/cdaSlice";
import journalSlice from "./features/tools/journalSlice";
import phoneSlice from "./features/tools/phoneSlice";

export const store = configureStore({
  reducer: {
    cda: cdaSlice,
    journal: journalSlice,
    breatheSettings: breatheSettingsSlice,
    phone: phoneSlice,
    activityLog: activityLogSlice,
    activityLogModal: activityLogModalSlice,
    newActivityModal: newActivityModalSlice,
    notificationModal: notificationModalSlice,
    userSettingsModal: userSettingsModalSlice,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
