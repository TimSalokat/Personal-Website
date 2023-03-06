
<script>

    export let isChecked;

    export let handle_change = (value) => {
        // isChecked = value;
    }

</script>

<label class="switch">
    <input 
        type="checkbox"
        on:change={(e)=> handle_change(e.target.checked)}
        checked={isChecked}>
    <span class="slider"></span>
</label>

<style>
/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 2.8em;
  height: 1.5em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--gray1);
  border: 1px solid var(--gray5);
  transition: .4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1em;
  width: 1em;
  border-radius: 20px;
  left: 0.2em;
  bottom: 0.2em;
  background-color: var(--gray7);
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--accent);
  border: 1px solid var(--accent);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--accent);
}

input:checked + .slider:before {
  transform: translateX(1.35em);
  background-color: #fff;
}

</style>