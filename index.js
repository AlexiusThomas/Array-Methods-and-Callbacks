const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final

//(b) Away Team name for 2014 world cup final

//(c) Home Team goals for 2014 world cup final

//(d) Away Team goals for 2014 world cup final

//(e) Winner of 2014 world cup final */

function getSpecifics(list) {
    list.forEach(function(item){
        if (item.Year === 2014 && item.Stage === "Final"){
            let winner = item[ "Home Team Name" ];
            if(item[ "Home Team Goals" ] < item[ "Away Team Goals" ]) { // Check winner of the match
                winner = item[ "Away Team Name" ]; // Assign winner
            }

            console.log(`The Home Team for the 2014 world cup final was ${item[ "Home Team Name" ]}`);
            console.log(`The Away Team for that game was ${item[ "Away Team Name" ]}`);
            console.log(`The Home Team scored ${item[ "Home Team Goals" ]} goals, while the Away Team scored ${item[ "Away Team Goals" ]}`);
            console.log(`Therefore, The team who came out victorious was ${winner}`);
        }
    })
}

getSpecifics(fifaData);

const homeGames = fifaData.filter(function (game) {
//     return game.Stage === "Final" && game.Year === 2014;
//   });
//   const homeTeams = homeGames.map(function (game) {
//     return game["Home Team Name"];
//   });
//   console.log(homeTeams);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/


function getFinals(list) {
    let finalsData = [];
    finalsData = list.filter(function(item){
        return item.Stage === "Final";
    });

    return finalsData;
};

console.log(getFinals(fifaData));

// function getFinals(data) {
//     return data.filter((item) => {
//       return item.Stage === "Final";
//     });
//   }
  
//   console.log(getFinals(fifaData));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(callback) { // higher-order function
    let finalsData = callback(fifaData); // assign array from callback data
    let years = [];
    finalsData.forEach(function(item){
        years.push(item.Year);
    });

    return years;
};

console.log(getYears(getFinals));

// function getYears(callback) {
//     const years = callback.map(function (item) {
//       return item.Year; // another way to write it  return finalsCb.map(item=> item.year)
//     });
//     return years;
//   }
//   console.log(getYears(getFinals(fifaData)));




/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(callback) {
    const winners = callback.map(function (item) {
      if (item["Home Team Goals"] > item["Away Team Goals"]) {
        return item["Home Team Name"];
      } else {
        return item["Away Team Name"];
      }
    });
    return winners;
  }
  
  console.log(getWinners(getFinals(fifaData)));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Receive a callback function getYears from task 3
4. Receive a callback function getWinners from task 4
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */
function getWinnersByYear(cb1, cb2, data) {
    let years = cb1(getFinals(data));
    let winners = cb2(getFinals(data));
    for (let i = 0; i < years.length; i++) {
      console.log(`In ${years[i]}, ${winners[i]} won the World Cup!`);
    }
  }
  
  getWinnersByYear(getYears, getWinners, fifaData);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/
const fifaGoals = [
    { H: 1, away: 3 },
    { H: 2, A: 5 },
    { H: 6, A: 10 },
    { H: 7, A: 19 },
    { H: 1, A: 4 },
  ];

function getAverageGoals(data) {
    let total = 0;
    const HOME = "Home Team Goals";
    const AWAY = "Away Team Goals";
    for (let i = 0; i < data.length; i++) {
      total = total + data[i][HOME] + data[i][AWAY];
    }
  
    const averageGoals =
      data.reduce(function (accumulator, item) {
        return accumulator + item[HOME] + item[AWAY];
      }, 0) / data.length;
  
    console.log(averageGoals);
    //const homeAvg = totalHome / data.length;
    //const awayAvg = totalAway / data.length;
    // `Average home glas: ${homeAvg}. Average away goals: ${awayAvg}`;
  }
  getAverageGoals(fifaData);




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
