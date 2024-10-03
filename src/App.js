import { useEffect, useState, useRef } from "react"
import { findIndexInObj } from "./Common/Generic"

function App() {
  const [addFlag, setAddFlag] = useState(false)
  const [foodBill, setFoodBill] = useState([])
  const [friendSel, setFriendSel] = useState(null)

  const nameref = useRef()
  const imgref = useRef()

  console.log("App Render")

  useEffect(() => {
    setFoodBill((e) => [
      {
        id: crypto.randomUUID(),
        friendName: "Pawan",
        imgUrl: "https://i.pravatar.cc/48?u=118836",
        balance: 0,
      },
      {
        id: crypto.randomUUID(),
        friendName: "Abey Tu",
        imgUrl: "https://i.pravatar.cc/48?u=933372",
        balance: 0,
      },
      {
        id: crypto.randomUUID(),
        friendName: "Anthony",
        imgUrl: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
      },
    ])
  }, [])

  const friendSplitBills = [
    {
      personId: "",
      bills: [
        {
          friendId: "",
          description: "",
          billDate: "",
          amount: 0,
          transactionType: "",
        },
      ],
    },
  ]

  useEffect(() => {
    console.log("fRIEND sELECTION cHANGED")
    setAddFlag((e) => (e = false))
  }, [friendSel])

  const findIdInSplitBills = (id) => {
    const findIndex = findIndexInObj(friendSplitBills, "personId", id)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(nameref.current?.value, imgref.current?.value)
    setFoodBill((foodBills) => [
      ...foodBills,
      {
        id: crypto.randomUUID(),
        friendName: nameref.current?.value,
        imgUrl: imgref.current?.value,
      },
    ])
    setAddFlag((e) => (e = !e))
  }

  const handleAddNewFriend = () => {
    setAddFlag((e) => (e = !e))
    setFriendSel(null)
  }

  return (
    <div className="app">
      <div>
        <ul className="sidebar">
          {foodBill.map((f) => (
            <FriendLi
              friend={f}
              key={f.id}
              selectedFriend={friendSel}
              onSelection={setFriendSel}
            />
          ))}
        </ul>

        {addFlag ? null : (
          <button
            className="button form-add-friend"
            onClick={handleAddNewFriend}
          >
            Add Friend
          </button>
        )}
      </div>

      {addFlag && friendSel === null ? (
        <div>
          <form className="form-split-bill" onSubmit={handleFormSubmit}>
            <div>
              <label>👨‍✈️Friend name</label>
              <input type="text" ref={nameref} />
              <label>👨‍✈️ Image URL</label>
              <input type="text" ref={imgref} />
              <button className="button">Add</button>&nbsp;
              <button
                className="button"
                onClick={() => setAddFlag((e) => (e = !e))}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      ) : null}
      {friendSel !== null ? <SplitBill friend={friendSel} /> : null}
    </div>
  )
}

const FriendLi = ({ friend, selectedFriend, onSelection }) => {
  const flag = selectedFriend?.id === friend?.id
  console.log("FriendLi Render")
  return (
    <li className={flag ? "selected" : null} id={friend.id}>
      <img src={friend.imgUrl} alt="People A" />
      <h3>{friend.friendName}</h3>
      <p>You owe me $200</p>

      {flag ? (
        <button
          className="button"
          onClick={() => {
            onSelection(null)
          }}
        >
          Close
        </button>
      ) : (
        <button
          className="button"
          onClick={() => {
            onSelection((e) => (e = friend))
          }}
        >
          Select
        </button>
      )}
    </li>
  )
}

const SplitBill = ({ friend }) => {
  console.log("Split Bill Render")
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.friendName}</h2>
      <label>⚡Bill paying by</label>{" "}
      <select>
        <option>You</option>
        <option>{friend.friendName}</option>
      </select>
      <label>✨Bill Value</label>
      <input type="number" />
      <label>😢Your expense</label>
      <input type="number" />
      <button className="button">Split Bill</button>
    </form>
  )
}
export default App
