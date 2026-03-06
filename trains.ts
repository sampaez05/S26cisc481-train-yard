type Track = number;
type Car = string
type Engine = "*"

type TrackItems = (Car | Engine)[];
type State = TrackItems[]

type Direction = "LEFT" | "RIGHT";

interface Action {
  direction: Direction;
  from: Track;
  to: Track;
}

//Yard is an adjacency list type where each track node has a list of tracks it connects to
type Yard = {
  [track: number]: Track[];
};

//example Train Yard from the assignment
const YARD_1: Yard = {
  1: [2, 3],
  2: [6],
  3: [5],
  4: [5],
  5: [6],
  6: []
};

//example Initial State from the assignment
const STATE_1: State = [
    ["*"],
    ["e"],
    [],
    ["b","c","a"],
    [],
    ["d"]
];

//example Initial State from the assignment
const STATE_1_5: State = [
    [],
    ["e"],
    ["a","*"],
    ["b","c"],
    [],
    ["d"]
];

const YARD_2: Yard = {
    1: [2,3],
    2: [4,5],
    3: [5],
    4: [6],
    5: [6,7],
    6: [8],
    7: [8],
    8: []
};

const STATE_2: State = [
    ["*","a"],
    ["b"],
    [],
    [],
    ["c"],
    [],
    ["d"],
    []
];

const STATE_2_5: State = [
    ["a"],
    ["b"],
    [],
    ["*"],
    ["c","d"],
    [],
    [],
    []
];

const YARD_3: Yard = {
    1:[2],
    2: []
};

const STATE_3: State = [
    ["a","*","b"],
    ["c", "d"]
];
const STATE_3_5: State = [
    ["a","b"],
    ["c","*","d"]
];


function checkForEngine(state:State):number{
    for (let i=0; i< state.length; i++){
        if (state[i].includes("*")){
            return i+1
        }
    }
    return -1;
}

function possibleActions(yard:Yard, state:State):Action[]{
    let actions:Action[] = [];
    const engineTrack = checkForEngine(state)
    //iterate through the yard to see each track in the yard
    for (let track in yard){
        //xTrack is the particular track we are looking at, i
        const xTrack = Number(track);
        //connections is a list of what tracks x connects to
        const connections = yard[xTrack];
        
        for (const yTrack of connections){
            //checks if the xTrack has an engine on it
            if (engineTrack==xTrack){
                //check if xTrack also has a car on it
                if (state[xTrack-1].some(item => item != '*')){
                    //actions are move the car on xTrack to the yTrack
                    actions.push({
                        direction: "RIGHT",
                        from: xTrack,
                        to: yTrack
                    })  
                }
                if (state[yTrack-1].some(item => item != '*')){
                    //actions are move the car on yTrack to xTrack
                    actions.push({
                        direction: "LEFT",
                        from: yTrack,
                        to: xTrack
                    })  
                }
            }
            //checks if the yTrack has an engine on it
            if (engineTrack==yTrack){
                //check if yTrack also has a car on it
                if (state[yTrack-1].some(item => item != '*')){
                    //actions are move the car on yTrack to xTrack 
                    actions.push({
                        direction: "LEFT",
                        from: yTrack,
                        to: xTrack
                    })  
                }
                if (state[xTrack-1].some(item => item != '*')){
                    //actions are move the car on xTrack to yTrack 
                    actions.push({
                        direction: "RIGHT",
                        from: xTrack,
                        to: yTrack
                    })  
                }
            }
        }
        
    }
    console.log ("Possible actions are", actions);
    return actions;
}

console.log("Yard 1, State 1: ")
possibleActions(YARD_1,STATE_1);
console.log("Yard 1, State 1_5: ")
possibleActions(YARD_1,STATE_1_5);

console.log("Yard 2, State 2: ")
possibleActions(YARD_2,STATE_2);
console.log("Yard 2, State 2_5: ")
possibleActions(YARD_2,STATE_2_5);

console.log("Yard 3, State 3: ")
possibleActions(YARD_3,STATE_3);
console.log("Yard 3, State 3_5: ")
possibleActions(YARD_3,STATE_3_5);