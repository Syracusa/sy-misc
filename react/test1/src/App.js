import './App.css';

import React from "react"

let gameState = {
  turn: 1
}

class PlayerScoreSheet extends React.Component {
  render() {
    return (
      <>
        <div> Test scoresheet </div>
        <table>
          <thead>
            <tr>
              <th colspan="2"> Your Name </th>
            </tr>
            <tr>
              <th>Tactic</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> For of a kind  </td>
              <td> test body 2 </td>
            </tr>
            <tr>
              <td> test body 3 </td>
              <td> test body 4 </td>
            </tr>
          </tbody>
        
        </table>

      </>


    );
  }
}

function Board(){
  return (
    <></>
  );
}

function App() {
  return (
    <div className="App">
      Turn : Player  {gameState.turn}
      
      <PlayerScoreSheet></PlayerScoreSheet>
      <PlayerScoreSheet></PlayerScoreSheet>
    </div>
  );
}

export default App;
