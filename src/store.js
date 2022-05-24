import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";

const state = reactive({
  calendarWeekData,
});

const getters = {
  activeDay: () =>
    state.calendarWeekData.find((day) => day.active),
};

const mutations = {
  editEvent(dayId, title) {
    state.calendarWeekData.map((dayObj) => {
      dayObj.events.map((event) => (event.edit = false));
    });
    console.log(dayId, title);
    let dayObj = state.calendarWeekData.find(
      (day) => day.id === dayId
    );
    let eventObj = dayObj.events.find(
      (event) => event.title === title
    );
    eventObj.edit = true;
  },
  updateEvent(dayId, oldTitle, payload) {
    let newTitle = payload.title;
    let newPriority = payload.priority;
    console.log(newPriority);
    newTitle = newTitle !== "" ? newTitle : oldTitle;
    let dayObj = state.calendarWeekData.find(
      (day) => day.id === dayId
    );
    let eventObj = dayObj.events.find(
      (event) => event.title === oldTitle
    );
    eventObj.title = newTitle;
    // newPriority von String in number ändern
    eventObj.priority = newPriority * 1;
    eventObj.edit = false;
  },
  deleteEvent(dayId, title) {
    let dayObj = state.calendarWeekData.find(
      (day) => day.id === dayId
    );
    let eventIndex = dayObj.events.findIndex(
      (event) => event.title === title
    );
    console.log(eventIndex);
    dayObj.events.splice(eventIndex, 1);
  },
  changeActive(dayId) {
    state.calendarWeekData.map((dayObj) => {
      dayObj.id === dayId
        ? (dayObj.active = true)
        : (dayObj.active = false);
      //dayObj.active = false;
    });
    //console.log(dayObj);
    //     let dayActive = state.calendarWeekData.find(
    //       (day) => day.id === dayId
    //     );

    //     dayActive.active = true;
  },
  newEvent(name, data) {
    let dayObj = state.calendarWeekData.find(
      (day) => day.fullName === name
    );
    dayObj.events.push({
      title: data.title,
      color: data.color,
      priority: data.priority * 1,
      edit: false,
    });
    console.log(dayObj, data);
  },
};

export default {
  state: readonly(state),
  getters,
  mutations,
};
