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
  const [selectedFriend, setSelectedFriends] = useState(null);

  function onAddFr() {
    setAddfr(!addFr);
  }

  function handleData(newFr) {
    setData((prevData) => [...prevData, newFr]);
  }
  function handleSelection(friend) {
    // setSelectedFriends(selectedFriend ? null : friend)
    setSelectedFriends((cur) => (cur?.id === friend.id ? null : friend));
    setAddfr(false);
  }

  function handleSplitFriend(value) {

    console.log(value)
    setData((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriends(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friend={data}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        <FormAddFriend
          addFr={addFr}
          onAddFr={onAddFr}
          OnhandleData={handleData}
        />
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          handleSplitFriend={handleSplitFriend}
        />
      )}
    </div>
  );
}

function FriendsList({ friend, onSelection, selectedFriend }) {
  return (
    <ul>
      {friend.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isFriend = selectedFriend?.id === friend.id;
  return (
    <li className={isFriend ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isFriend ? "Close" : "Select"}
      </Button>
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
    onAddFr(false);
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

function FormSplitBill({ selectedFriend, handleSplitFriend }) {
  const [bill, setBill] = useState("");
  const [yourB, setYourB] = useState("");
  const paidByFriend = bill ? bill - yourB : "";
  const [whPay, setWhPay] = useState("user");

  function setSubmit(e) {
    e.preventDefault();
    if (!bill || !yourB) return;
    handleSplitFriend(whPay === "user" ? paidByFriend : -yourB);
  }

  return (
    <form className="form-split-bill" onSubmit={setSubmit}>
      <h2>Split bill with {selectedFriend.name}</h2>

      <label>💴 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🙍‍♂️ Your expense</label>
      <input
        value={yourB}
        onChange={(e) =>
          setYourB(
            Number(e.target.value) > bill ? yourB : Number(e.target.value)
          )
        }
        type="text"
      ></input>

      <label>🧑‍🤝‍🧑 {selectedFriend.name} expense</label>
      <input type="text" disabled value={paidByFriend}></input>

      <label>🤑 Who is paying the bill</label>
      <select value={whPay} onChange={(e) => setWhPay(Number(e.target.value))}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
export default App;
