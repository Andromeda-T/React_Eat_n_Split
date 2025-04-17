import { useState } from "react";
import "./App.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [addFr, setAddfr] = useState(false);
  const [data, setData] = useState(initialFriends);

  function onAddFr() {
    setAddfr(!addFr);
  }

  function handleData(newFr) {
    setData((prevData) => [...prevData, newFr]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friend={data} />
        <FormAddFriend
          addFr={addFr}
          onAddFr={onAddFr}
          OnhandleData={handleData}
        />
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friend }) {
  return (
    <ul>
      {friend.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe your {friend.name} {friend.balance}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ addFr, onAddFr, OnhandleData }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(`https://i.pravatar.cc/48`);
  const id = Date.now();

  function DoSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const newFr = {
      id: Date.now(),
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    OnhandleData(newFr);
    setName("");
    setImage(`https://i.pravatar.cc/48`);
    onAddFr(false)
  }

  return addFr ? (
    <form className="form-add-friend" onSubmit={DoSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>🖼️Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button>Add</Button>
      <Button onClick={onAddFr}>Close</Button>
    </form>
  ) : (
    <Button onClick={onAddFr}>Add friend</Button>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split bill with X</h2>

      <label>💴 Bill value</label>
      <input type="text"></input>

      <label>🙍‍♂️ Your expense</label>
      <input type="text"></input>

      <label>🧑‍🤝‍🧑 X`s expense</label>
      <input type="text" disabled></input>

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X`s</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
export default App;
