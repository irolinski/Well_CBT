import { configureStore } from "@reduxjs/toolkit";
import activityLogModalSlice from "./features/menus/activityLogModalSlice";
import activityLogSlice from "./features/menus/activityLogSlice";
import editProfileModalSlice from "./features/menus/editProfileModalSlice";
import navigateSettingsModalSlice from "./features/menus/navigateSettingsModalSlice";
import newActivityModalSlice from "./features/menus/newActivityModalSlice";
import notificationModalSlice from "./features/menus/notificationModalSlice";
import breatheSettingsSlice from "./features/tools/breatheSettingsSlice";
import cdaSlice from "./features/tools/cdaSlice";
import groundYourselfSlice from "./features/tools/groundYourselfSlice";
import journalSlice from "./features/tools/journalSlice";
import phoneSlice from "./features/tools/phoneSlice";

export const store = configureStore({
  reducer: {
    cda: cdaSlice,
    journal: journalSlice,
    ground_yourself: groundYourselfSlice,
    breatheSettings: breatheSettingsSlice,
    phone: phoneSlice,
    activityLog: activityLogSlice,
    activityLogModal: activityLogModalSlice,
    newActivityModal: newActivityModalSlice,
    notificationModal: notificationModalSlice,
    navigateSettingsModal: navigateSettingsModalSlice,
    editProfileModal: editProfileModalSlice,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
