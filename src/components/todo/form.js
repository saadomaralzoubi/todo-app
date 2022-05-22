import useForm from "../../hooks/form.js";
import { useContext } from "react";
import { Button, Card, Elevation, Switch } from "@blueprintjs/core";
import { SettingContext } from "../../context/context";
import { v4 as uuid } from "uuid";
export default function Form() {
  const states = useContext(SettingContext);

  let stringfiedData;
  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    states.setList([...states.list, item]);
    stringfiedData = JSON.stringify([...states.list, item]);
    localStorage.setItem("list", stringfiedData);
  }
  function itemPerPages(e) {
    states.setItemPerPages(e.target.value);
  }
  function showComleteToggle() {
    states.setShowComplete(!states.showComplete);
  }
  const { handleChange, handleSubmit } = useForm(addItem);

  return (
    <form onSubmit={handleSubmit}>
      <Card
        className="card-submit"
        elevation={Elevation.TWO}
        style={{ marginRight: "20px" }}
      >
        <h4>Add To Do Item</h4>

        <label>
          <p>To Do Item:</p>
          <input
            onChange={handleChange}
            name="text"
            type="text"
            placeholder="Item Details"
          />
        </label>
        <hr />
        <label>
          <p>Assigned To:</p>
          <input
            onChange={handleChange}
            name="assignee"
            type="text"
            placeholder="Assignee Name"
          />
        </label>
        <hr />
        <label>
          <p>Difficulty:</p>
          <input
            onChange={handleChange}
            defaultValue={3}
            type="range"
            min={1}
            max={5}
            name="difficulty"
          />
        </label>
        <hr />
        <label>
          <p>items per page:</p>
          <input
            onChange={itemPerPages}
            defaultValue={3}
            type="range"
            min={1}
            max={5}
            name="items per page"
          />
        </label>
        <hr />
        <Switch
          checked={states.showComplete}
          label="show completed items"
          onChange={showComleteToggle}
        />
        <hr />
        <label>
          <Button type="submit">Add Item</Button>
        </label>
      </Card>
    </form>
  );
}
