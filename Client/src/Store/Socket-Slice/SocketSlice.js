// src/store/attendanceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendees: [],
  eventId: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendees: (state, action) => {
      state.attendees = action.payload.attendees;
      state.eventId = action.payload.eventId;
    },
    addAttendee: (state, action) => {
      state.attendees.push(action.payload);
    },
    removeAttendee: (state, action) => {
      state.attendees = state.attendees.filter(
        (attendee) => attendee.userId !== action.payload.userId
      );
    },
  },
});

export const { setAttendees, addAttendee, removeAttendee } = attendanceSlice.actions;

export default attendanceSlice.reducer;
