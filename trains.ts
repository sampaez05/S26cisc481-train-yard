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

interface myNode {
    state: State,
    parent: myNode | null,
    action: Action | null,
    depth: number
}

//Yard is an adjacency list type where each track node has a list of tracks it connects to
type Yard = {
  [track: number]: Track[];
};

//example Train Yard 1 from the assignment
const YARD_1: Yard = {
  1: [2, 3],
  2: [6],
  3: [5],
  4: [5],
  5: [6],
  6: []
};

//example Initial State 1 from the assignment
const STATE_1: State = [
    ["*"],
    ["e"],
    [],
    ["b","c","a"],
    [],
    ["d"]
];

//example Initial State I made up
const STATE_1_5: State = [
    [],
    ["e"],
    ["a","*"],
    ["b","c"],
    [],
    ["d"]
];

//example yard I made up
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

//example state I made up
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

//example state I made up
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

//example yard from the actions part of the assignmen
const YARD_3: Yard = {
    1:[2],
    2: []
};
//example Initial State from the actions part of the assignment
const STATE_3: State = [
    ["a","*","b"],
    ["c", "d"]
];
//example state I made up
const STATE_3_5: State = [
    ["a","b"],
    ["c","*","d"]
];

//example yard 3 from the assignment
const YARD_4: Yard = {
    1:[2,3],
    2:[],
    3:[]
};

//example state for yard 3 from the assignment
const STATE_4: State = [
    ["*"],
    ["a"],
    ["b"]
];
//example goal state for yard 3 from the assignment
const GOAL_STATE_4: State = [
    ["*","a","b"],
    [],
    []
]

//example yard 4 from the assignment
const YARD_5: Yard = {
    1:[2,3,4],
    2:[],
    3:[],
    4:[]
};

//example state for yard 4 from the assignment
const STATE_5: State = [
    ["*"],
    ["a"],
    ["b","c"],
    ["d"]
];
//example goal state for yard 4 from the assignment
const GOAL_STATE_5: State = [
    ["*","b","c","d"],
    [],
    [],
    []
];

//example yard 5 from the assignment
const YARD_6: Yard = {
    1:[2,3,4],
    2:[],
    3:[],
    4:[]
};

//example state for yard 5 from the assignment
const STATE_6: State = [
    ["*"],
    ["a"],
    ["c","b"],
    ["d"]
];
//example goal state for yard 5 from the assignment
const GOAL_STATE_6: State = [
    ["*","b","c","d"],
    [],
    [],
    []
];


function checkForEngine(state:State):number{
    for (let i=0; i< state.length; i++){
        if (state[i].includes("*")){
            return i+1
        }
    }
    return -1;
}


//problem 1
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
    //console.log ("Possible actions are", actions);
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

//problem 2
function result(action:Action, state:State):State{
    //copy the state so it can be modified without changing the original
    let newState:State = state.map(track => [...track]);;
    let direction = action.direction; //direction as string type
    let from = action.from; //from track as number
    let to = action.to; //destination track as number
    //fix indexing 
    let fromTrack = newState[from - 1];
    let toTrack = newState[to - 1];
    //find index of the engine
    const engineTrack = checkForEngine(state);
    const engineIndex = newState[engineTrack - 1].indexOf("*");
    if (direction == "LEFT"){
        // remove leftmost car from the start of the from track
        let movedCar = fromTrack.shift();
        if (movedCar !== undefined) {
            //put moved card at the end of the destination track
            toTrack.push(movedCar);
        }
    }
    if (direction == "RIGHT") {
        let movedCar;
        //check if last element is not an engine (ie. check if rightmost object is a car)
        if (fromTrack[fromTrack.length - 1] !== "*") {
            //remove the car from the end of the from track
            movedCar = fromTrack.pop();
            if (movedCar !== undefined) {
                //insert the car at the front of the destination track
                toTrack.unshift(movedCar);
            }
        }
        //if last element is an engine 
        else{
            //remove the second to last item (which would be the rightmost car) from the from track 
            movedCar = fromTrack.splice(fromTrack.length - 2,1)[0];
            if (movedCar !== undefined) {
                //insert the car at the front of the destination track
                toTrack.unshift(movedCar);
            }
        }
    }
    //console.log ("The resulting state is ", newState);
    return newState;
}

console.log("Yard 1, State 1: ")
result(possibleActions(YARD_1,STATE_1)[0],STATE_1);
console.log("Yard 1, State 1_5: ")
result(possibleActions(YARD_1,STATE_1_5)[0],STATE_1_5);

console.log("Yard 2, State 2: ")
result(possibleActions(YARD_2,STATE_2)[0],STATE_2);
console.log("Yard 2, State 2_5: ")
result(possibleActions(YARD_2,STATE_2_5)[0],STATE_2_5);

console.log("Yard 3, State 3: ")
result(possibleActions(YARD_3,STATE_3)[0],STATE_3);
console.log("Yard 3, State 3_5: ")
result(possibleActions(YARD_3,STATE_3_5)[0],STATE_3_5);

//problem 3 
function expand(state:State, yard:Yard):State[]{
    let states:State[] = [];
    //find all possible actions from the given state
    let actions = possibleActions(yard,state)
    for (let action of actions){
        //find all resulting states of each possible action
        states.push(result(action,state));
    }
    //console.log("The possible states are: ", states);
    return states;
}

console.log("State 1, Yard 1: ")
expand(STATE_1,YARD_1);
console.log("State 1_5, Yard 1: ")
expand(STATE_1_5,YARD_1);

console.log("State 2, Yard 2: ")
expand(STATE_2,YARD_2);
console.log("State 2_5, Yard 2: ")
expand(STATE_2_5,YARD_2);

console.log("State 3, Yard 3: ")
expand(STATE_3,YARD_3);
console.log("State 3_5, Yard 3: ")
expand(STATE_3_5,YARD_3);

//problem 4

//helper function to help build out our tree
function expandNode(node:myNode, yard:Yard):myNode[]{
    let children:myNode[] = [];
    //find all possible actions from the given state
    let actions = possibleActions(yard,node.state)
    //iterate through each possible action
    for (let action of actions){
        let newState = result(action,node.state)
        //find all resulting states of each possible action
        children.push({
            state: newState,
            parent: node,
            action: action,
            depth: node.depth+1
        });
    }
    console.log("The possible states are: ", children);
    return children;
}

//function to search the tree
function depthLimitedSearch(node:myNode, goal:State, yard:Yard, limit:number, visited:Map<string, number>):myNode | null{
    let key = JSON.stringify(node.state);
    let goalKey = JSON.stringify(goal);

    let prevDepth = visited.get(key);

    if (prevDepth !== undefined && prevDepth <= node.depth){
        return null;
    }

    visited.set(key, node.depth);
    // if we have reached the goal state then return the node
    if (key === goalKey){
        return node;
    }
    //stop searching once we reach the limit
    if (node.depth === limit){
        return null;
    }
    //expand the children of the given node 
    let children = expandNode(node,yard);
    for (let child of children){
        //go down the children's subtree until the limit depth
        let result = depthLimitedSearch(child,goal,yard,limit,visited)
        if (result !== null){
            return result;
        }
    }
    return null;
}

function iterativeDeepeningSeatch(initial:State,goal:State,yard:Yard):myNode | null{
    //turn the intitial state into the root node
    let root:myNode = {
        state:initial,
        parent: null,
        action:null,
        depth:0
    };
    //call depth limited search for a series of limits 
    for (let depth=0;depth<50;depth++){
        let visited = new Map<string,number>();
        let result = depthLimitedSearch(root,goal,yard,depth,visited)
        if (result !== null){
            return result;
        }
    }
    return null;
}

function howToGetToGoal(yard:Yard,initial:State,goal:State):Action[]{
    let actions:Action[] = [];
    let goalNode = iterativeDeepeningSeatch(initial,goal,yard);
    //if unable to reach goal node, return an empty set of actions
    if (goalNode === null){
        console.log("Goal not found");
        return [];
    }
    //start at the goal node and work backwards to find path of actions
    let current:myNode | null= goalNode;
    while (current && current.action !== null){
        //put the action at the front of the action list 
        actions.unshift(current.action);
        current = current.parent;
    }
    console.log("The actions to get to the goal state are: ", actions)
    return actions; 
}

console.log("Yard 4 - Example Yard 3");
howToGetToGoal(YARD_4,STATE_4,GOAL_STATE_4);
console.log("Yard 5 - Example Yard 4");
howToGetToGoal(YARD_5,STATE_5,GOAL_STATE_5);
console.log("Yard 6 - Example Yard 5");
howToGetToGoal(YARD_6,STATE_5,GOAL_STATE_6);