<template>
  <div id="calender-entry">
    <div class="card">
      <div class="card-header text-center">
        <h5>
          Neuer Termin für:
          <strong>{{ activeDayName }}</strong>
        </h5>
      </div>
      <div class="card-body">
        <input
          type="text"
          class="form-control"
          placeholder="Neuer Eintrag"
          v-model="events.title"
          ref="eventTitleInput"
          @keyup.enter.exact="newEvent"
        />
        <select
          class="form-select mt-2"
          v-model="events.priority"
        >
          <option value="-1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="1">Tief</option>
        </select>
        <div class="text-center mt-3">
          <span
            v-for="color in eventColors"
            :key="color"
            class="d-inline-block alert m-0 me-2 square"
            :class="eventColorClasses(color)"
            role="button"
            @click="setEventColor(color)"
          >
          </span>
        </div>
        <hr />
        <div class="d-grid gap-2">
          <button
            class="btn btn-primary"
            :class="!events.title ? 'disabled' : ''"
            @click="newEvent"
          >
            Eintragen
          </button>
          <button
            class="btn btn-danger"
            @click="emptyEvent"
          >
            Inhalt löschen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Store from "../store";
export default {
  name: "CalendarEntry",
  data() {
    return {
      eventColors: [
        "primary",
        "success",
        "info",
        "warning",
        "danger",
      ],
      events: {
        title: "",
        color: "primary",
        priority: 0,
      },
    };
  },
  mounted() {
    this.$refs.eventTitleInput.focus();
  },
  methods: {
    eventColorClasses(eventColor) {
      return [
        "alert-" + eventColor,
        this.events.color === eventColor
          ? "border border-" + this.events.color
          : "",
      ];
    },
    setEventColor(eventColor) {
      this.events.color = eventColor;
    },
    // setNewEventTitle(event) {
    //   this.events.title = event.target.value;
    //   console.log(event);
    // },
    newEvent() {
      Store.mutations.newEvent(this.activeDayName, {
        title: this.events.title,
        priority: this.events.priority,
        color: this.events.color,
      });

      this.events.title = "";
      this.events.priority = 0;
      this.events.color = "primary";
    },
    emptyEvent() {
      this.events.title = "";
      this.events.priority = 0;
      this.events.color = "primary";
    },
  },
  computed: {
    activeDayName() {
      return Store.getters.activeDay().fullName;
    },
  },
};
</script>
