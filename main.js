const table = document.querySelector(".table");
const seasonMatchUrl = 'https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague'
const tableBtn = document.querySelector(".epl")
const gamesBtn = document.querySelector(".games")
const div = document.querySelector(".match")


let matchResult = 'https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague?'
let result;

// returns information about the team
const teamUrl = 'https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague/team?name=Liverpool'

// returns the table for the league
const tableUrl = "https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague/table"


function games() {

    table.style.display = 'none';
    div.style.display = 'block';
    if (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    const p = document.createElement('p')
    p.textContent = 'Lorem ipsum dolor sit amet consectetur, \
    adipisicing elit. Adipisci deleniti cupiditate fugiat quia \
    nostrum eveniet unde nemo excepturi. Fugiat architecto magni \
    vitae assumenda debitis, nobis delectus similique nostrum nam quos.'
    div.appendChild(p)
}

function eplTable() {
    
    fetch(tableUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": 'heisenbug-premier-league-live-scores-v1.p.rapidapi.com',
            "x-rapidapi-key": '47720fc3b1msh28a7aa4ced4786ap1516c7jsnfe31622b5a60'
        }
    })
    .then(function(response) {
        return response.json()})
    .then(function(data) {
        div.style.display = 'none';
        table.style.display = 'table';
        teamInfo = data['records'] 
        
        let counter = 1
        teamInfo.forEach(item => {
            list = Object.keys(item) 
            const row = document.createElement('tr')
            const position = document.createElement('td')
            position.textContent = counter
            row.appendChild(position)
            list.forEach(element => {
                const col = document.createElement('td')
                col.textContent = item[element]
                row.appendChild(col)
                
            })
            table.appendChild(row)
            counter++ 
        })

        
    })   
    .catch(err => console.error(err))

}

// tableBtn.addEventListener('click', eplTable)
gamesBtn.addEventListener('click', games)


// Create an array containing all the URLs for each match day 1 - 38
function getUrl() {
    let urlList = []
    let gameDay = 1
    while (gameDay <= 38 ){
        const matchDay = `matchday=${gameDay}&season=2021-22`
        result = matchResult
        matchResult = matchResult + matchDay
        urlList.push(matchResult)
        matchResult = result
        gameDay++
    }

    return urlList
}
  

let listOfUrl = getUrl()

// Call fetch() on every url in the list created, and store the result in 
// another list
function gettingFetch() {
    counter = 0
    promiseArray = []
    while ( counter < listOfUrl.length ) {
        promiseArray.push(fetch(listOfUrl[counter], {
            "method": "GET", 
            "headers": {
                "x-rapidapi-host": 'heisenbug-premier-league-live-scores-v1.p.rapidapi.com',
                "x-rapidapi-key": '47720fc3b1msh28a7aa4ced4786ap1516c7jsnfe31622b5a60'}
            }))
        counter++
    }

    // return promiseArray
    return promiseArray[0]
}

// firstGame is a list of promises
let firstGame = gettingFetch()
console.log(firstGame)

// for (let games = 0; games < firstGame.length; games++) {
//     console.log(firstGame[games])
//     gameDayInfo(firstGame[games], games++)
// }

function gameDayInfo(game, day) {
    // for now we are working on getting the proper data for the matchday 1.
    // call then() function on the first promise in the list 

    game.then(function(response) {
        return response.json()
    })
    .then(function(data) {
        let matchDay1 = data['matches']
        const dayDiv = document.createElement('div')
        const dayDivContent = document.createElement('p')

        dayDivContent.innerText = `Matchday ${day} of 38`
        dayDiv.appendChild(dayDivContent)
        dayDiv.style.border = '0.5px solid black'
        div.appendChild(dayDiv)

        matchDay1.forEach(obj => {
            const team1 = obj['team1']
            const team2 = obj['team2']
            const time = obj['time']
            const when = obj['when']
            const teamName1 = team1['teamName']
            const teamScore1 = team1['teamScore']
            const teamName2 = team2['teamName']
            const teamScore2 = team2['teamScore']

            // const wrapper = 
            
            displayMatches(teamName1, teamScore1, teamName2, teamScore2, time, when)
            
            // const insertWrapper = function () {
            //     const subParrent = document.createElement('div')
            //     subParrent.appendChild(wrapper)
            //     div.appendChild(subParrent)
            // }

            // insertWrapper()

        }) 
        
    })
}




function displayMatches(team1, teamScore1, team2, teamScore2, time, when) {
    // const mDay = document.createElement('div')

    const parentDiv = document.createElement('div')
    const teamOneDiv = document.createElement('div')
    const teamTwoDiv = document.createElement('div')
    const whenTimeDiv = document.createElement('div')
    
    const teamOneSpan = document.createElement('span')
    const teamOneScoreSpan = document.createElement('span')
    const teamTwoSpan = document.createElement('span')
    const teamTwoScoreSpan = document.createElement('span')

    
    const whenSpan = document.createElement('span')
    const timeSpan = document.createElement('span')

    teamOneSpan.innerText = team1
    teamOneSpan.setAttribute('class', 'matchContent')
    teamOneScoreSpan.innerText = teamScore1
    teamOneDiv.appendChild(teamOneSpan)
    teamOneDiv.appendChild(teamOneScoreSpan)
    teamOneDiv.setAttribute('class', 'matchContainer')
    parentDiv.appendChild(teamOneDiv)

    teamTwoSpan.innerText = team2
    teamTwoSpan.setAttribute('class', 'matchContent')
    teamTwoScoreSpan.innerText = teamScore2
    teamTwoDiv.appendChild(teamTwoSpan)
    teamTwoDiv.appendChild(teamTwoScoreSpan)
    teamTwoDiv.setAttribute('class', 'matchContainer')
    parentDiv.appendChild(teamTwoDiv)

    
    whenSpan.innerText = when
    whenSpan.setAttribute('class', 'matchContent')
    timeSpan.innerText = time
    
    whenTimeDiv.appendChild(whenSpan)
    
    whenTimeDiv.appendChild(timeSpan)
    whenTimeDiv.setAttribute('class', 'matchContainer')
    parentDiv.appendChild(whenTimeDiv)

    whenTimeDiv.style.fontWeight = '400'
    whenSpan.style.color = 'rgb(174, 174, 242)'
    parentDiv.setAttribute('class', 'parentDiv')
    div.appendChild(parentDiv)
    

    if (teamScore1 > teamScore2) {
        teamOneDiv.style.fontWeight = '800'
        teamTwoDiv.style.fontWeight = '100'
    } else if (teamScore2 > teamScore1) {
        teamTwoDiv.style.fontWeight = '800'
        teamOneDiv.style.fontWeight = '100'
    } else {
        teamTwoDiv.style.fontWeight = '800'
        teamOneDiv.style.fontWeight = '800'
    }

    // return mDay.appendChild(parentDiv)

}