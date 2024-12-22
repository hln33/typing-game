import { Component } from "solid-js";

const TimeSelect: Component = () => {
  return (
    <section>
      <label for="time-select">Choose a time limit:</label>
      <select
        id="time-select"
        class="text-black"
        name="time-limits"
      >
        <option value={15}>15</option>
        <option value={30}>30</option>
        <option value={45}>45</option>
        <option value={60}>60</option>
      </select>
    </section>
  );
};

export default TimeSelect;
