<template>
  <div id="calender-week">
    <div class="card-group">
      <!-- Anfang: Template für die Calendar-Day-Component -->
      <calendar-day
        v-for="day in calendarWeekData"
        :key="day.id"
        :day="day"
      ></calendar-day>
      <!-- Ende: Template für die Calendar-Day-Component -->
    </div>
  </div>
</template>
<script>
import CalendarDay from "@/components/CalendarDay";
import Store from "../store";
export default {
  name: "CalendarWeek",
  components: {
    CalendarDay,
  },
  data() {
    return {
      calendarWeekData: Store.state.calendarWeekData,
    };
  },
};
</script>
<style scoped></style>
