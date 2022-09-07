const db = require("quick.db");

// call this to create a poll
// userid should be a unique id to the user,
// uniqueid should be an id for the poll itself. maybe something like the message id
const start = (userid, uniqueid) => {
  // set the button values to zero
  const btn1 = db.set(`${uniqueid}:btns:1`, 0)
  const btn2 = db.set(`${uniqueid}:btns:2`, 0)

  // set poll owner
  const vp = `${uniqueid}:vote:owner`;
  db.set(vp, userid);

  "HERE SHOWCASE A WAY FOR PEOPLE TO VOTE, DEVOTE, END + SET FUNCTIONS ACCORDINGLY"
};

// incase u want to get btn1 and btn2 values
const getbtns = () => {
  const btn1 = db.set(`${uniqueid}:btns:1`, 0)
  const btn2 = db.set(`${uniqueid}:btns:2`, 0)
  return {
    btn1, btn2
  }
}

// function to set button 1's value
const setbtn1 = (value) => {
  // code to set the value to no button
}

// function to set button 2's value
const setbtn2 = (value) => {
  // code to set the value to yes button
}

// call this if upvote is clicked
const up = (userid, uniqueid, setbtn1, setbtn2) => {
  const vp = `${uniqueid}:${userid}:vote`;

  const btn1 = db.get(`${uniqueid}:btns:1`)
  const btn2 = db.get(`${uniqueid}:btns:2`)

  // check if it was a no
  if (db.get(vp) == "no") {
    // remove the reaction from no and add it to yes
    const x = parseInt(btn2) - 1; // remove one nuber from no
    setbtn2(x); // set no to the removed number
    const x2 = parseInt(btn1) + 1; // add one number to yes
    setbtn1(x2); // set yes to the added number
    db.set(vp, "yes"); // let the database know that the user's reaction is a yes now

    // check if it was already a yes
  } else if (db.get(vp) == "yes") {
    // remove the reaction from yes
    const x = parseInt(btn1) - 1; // remove one number from yes
    setbtn1(x); // set yes to the removed number
    db.set(vp, "null"); // let the database know that the user has no reaction now

    // if there is no reaction by the user currently
  } else {
    // add a reaction to yes
    const x = parseInt(btn1) + 1; // add one number to yes
    setbtn1(x); // set yes to the added number
    db.set(vp, "yes"); /// let the database know that the user's reaction a yes now
  }
};

// call this if downvote is clicked
const down = (userid, uniqueid, setbtn1, setbtn2) => {
  const vp = `${uniqueid}:${userid}:vote`;

  const btn1 = db.get(`${uniqueid}:btns:1`)
  const btn2 = db.get(`${uniqueid}:btns:2`)

  // check if it was already no
  if (db.get(vp) == "no") {
    // remove that reaction if so
    const cnt = parseInt(btn2) - 1; // remove one number from the button
    setbtn2(cnt); // set the button to the removed number
    db.set(vp, "null"); // tell the database that the user now has no reaction

    // check if it was a yes
  } else if (db.get(vp) == "yes") {
    // remove the reaction from yes and add it to no
    const x = parseInt(btn1) - 1; // remove one number from button1
    setbtn1(x); // set button1 to the removed number
    const x2 = parseInt(btn2) + 1; // add one number from button2
    setbtn2(x2); // set button2 to the added number
    db.set(vp, "no"); // tell the database that the user's reaction is a yes

    // if there is no reaction by the user
  } else {
    // add a reaction to button2
    const x = parseInt(btn2) + 1; // add one number from button2
    setbtn2(x); // set button2 to the added number
    db.set(vp, "no"); // tell the database that the user's reaction is a no
  }
};

// call this if the poll has ended
const end = (userid, uniqueid) => {
  const btn1 = db.get(`${uniqueid}:btns:1`)
  const btn2 = db.get(`${uniqueid}:btns:2`)

  // check if the person how has ended is the owner
  const vp = `${uniqueid}:vote:owner`;
  const owner = db.get(vp);
  if (owner != userid) {
    // if not reutnr the function with an error
    return "NOT OWNER OF POLL";
  }

  // find the values of buttons in integers and do the maths to calculate who won
  const yes = parseInt(btn1);
  const no = parseInt(btn2);
  const total = yes + no;

  // find vote percentage
  const p1 = (yes / total) * 100;
  const p2 = (no / total) * 100;

  // set a color to the poll depending on win result
  var color = null;
  if (yes > no) color = "GREEN";
  else color = "RED";

  // return the values for u to have fun with :wink:
  return {
    p1,
    yes,
    p2,
    no,
    color
  };
  "HERE EDIT THE POLL MESSAGE TO THE INFO GIVEN"
};
