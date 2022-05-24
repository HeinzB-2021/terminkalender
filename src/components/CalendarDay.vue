<template>
  <div class="card border-start" :class="cardClass">
    <div
      class="card-header text-center"
      :class="cardHeaderClass"
      role="button"
      @click="changeActiveDay()"
    >
      <strong>{{ day.fullName }}</strong>
    </div>
    <div class="card-body">
      <div id="calendar-day">
        <!-- Anfang: Template für die Calendar-Event-Component -->
        <calendar-event
          v-for="event in day.events"
          :key="event.title"
          :event="event"
          :day="day"
        >
          <template v-slot:eventPriority="slotProps"
            ><strong>Priorität:</strong>
            {{ slotProps.priorityText }}</template
          >
          <template v-slot="slotProps">{{
            slotProps.event.title
          }}</template>
        </calendar-event>
      </div>
    </div>
    <!-- Ende: Template für die Calendar-Event-Component -->
  </div>
</template>
<script>
import CalendarEvent from "@/components/CalendarEvent";
import Store from "../store";
export default {
  name: "CalendarDay",
  components: {
    CalendarEvent,
  },
  props: {
    day: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cardClass() {
      return this.day.id === Store.getters.activeDay().id
        ? "border-primary"
        : "";
    },
    cardHeaderClass() {
      return this.day.id === Store.getters.activeDay().id
        ? ["bg-primary", "text-white"]
        : "";
    },
  },
  methods: {
    changeActiveDay() {
      Store.mutations.changeActive(this.day.id);
      console.log(this.day.id);
    },
  },
};
</script>
