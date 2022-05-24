<template>
  <div id="calendar-event">
    <div class="alert text-center" :class="alertColor">
      <template v-if="!event.edit">
        <div>
          <slot
            name="eventPriority"
            :priorityText="priorityText"
            ><strong>{{ priorityText }}</strong></slot
          >
        </div>

        <div>
          <slot :event="event"
            ><p>{{ event.title }}</p></slot
          >
        </div>
        <div>
          <i class="me-2" role="button" @click="editEvent()"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              /></svg
          ></i>
          <i role="button" @click="deleteEvent()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </i>
        </div>
      </template>
      <!-- Edit-Template -->
      <template v-else>
        <input
          type="text"
          class="form-control"
          ref="titleInput"
          :placeholder="event.title"
          @input="setNewEventTitle($event)"
        />
        <select
          class="form-select mt-2"
          v-model="newEventPriority"
        >
          <option value="-1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="1">Tief</option>
        </select>
        <hr />
        <i role="button" @click="updateEvent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
            />
            <path
              d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"
            />
          </svg>
        </i>
      </template>
    </div>
  </div>
</template>
<script>
import Store from "../store";
export default {
  name: "CalendarEvent",
  data() {
    return {
      newEventTitle: "",
      newEventPriority: this.event.priority,
    };
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
    day: Object,
  },
  computed: {
    priorityText() {
      return this.event.priority === -1
        ? "Hoch"
        : this.event.priority === 1
        ? "Niedrig"
        : this.event.priority === 0
        ? "Mittel"
        : "Keine Priorität";
    },
    alertColor() {
      return "alert-" + this.event.color;
    },
  },
  methods: {
    editEvent() {
      //template refs

      Store.mutations.editEvent(
        this.day.id,
        this.event.title
      );
      this.$nextTick(() => {
        this.$refs.titleInput.focus();
      });
    },
    setNewEventTitle(event) {
      this.newEventTitle = event.target.value;
      console.log(event);
    },
    updateEvent() {
      Store.mutations.updateEvent(
        this.day.id,
        this.event.title,
        {
          title: this.newEventTitle,
          priority: this.newEventPriority,
        }
      );
    },
    deleteEvent() {
      Store.mutations.deleteEvent(
        this.day.id,
        this.event.title
      );
    },
  },
};
</script>
