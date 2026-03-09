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
    ["*","a","b","c","d"],
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
    ["*","a","b","c","d"],
    [],
    [],
    []
];

//example yard 2 from the assignment
const YARD_7: Yard = {
    1:[2,5],
    2:[3,4],
    3:[],
    4:[],
    5:[]
};

//example state for yard 2 from the assignment
const STATE_7: State = [
    ["*"],
    ["d"],
    ["b"],
    ["a","e"],
    ["c"]
];
//example goal state for yard 2 from the assignment
const GOAL_STATE_7: State = [
    ["*","a","b","c","d","e"],
    [],
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

function possibleActions(yard:Yard, state:State):Action[]{
    let actions:Action[] = [];
    const engineTrack = checkForEngine(state);

    // add action to list of actions
    const addAction = (direction:Direction, from:number, to:number) => {
        //check if the action is not in the actions list already to avoid duplicates
        if (!actions.some(a => a.direction===direction && a.from===from && a.to===to)){
            //add the action to the list of actions
            actions.push({direction, from, to});
        }
    };
    //check every track in the yard 
    for (let track in yard){
        const xTrack = Number(track);
        const connections = yard[xTrack];

        //check all tracks connected to the given track
        for (const yTrack of connections){

            // if the engine is on the given track, xTrack
            if (engineTrack === xTrack){
                //check what items are on that given track
                const trackItems = state[xTrack-1];
                // if the rightmost item of the given track is a car, it can be moved right to the connecting track
                if (trackItems.some(item => item != '*')){
                    addAction("RIGHT", xTrack, yTrack);
                }
                // if the leftmost item on the connecting track is a car, it can be moved left to the given track
                if (state[yTrack-1].some(item => item != '*')){
                    addAction("LEFT", yTrack, xTrack);
                }
                // if the rightmost item of the given track is an engine, it can be moved right to the connecting track
                if (trackItems[trackItems.length-1] === "*"){
                    addAction("RIGHT", xTrack, yTrack);
                }
                // if the leftmost item on the connecting track is an engine, it can be moved left onto the given track
                if (trackItems[0] === "*"){
                    addAction("LEFT", xTrack, yTrack);
                }
            }
            // if the engine is on the connecting track, y track
            else if (engineTrack === yTrack){
                // check what items are on the connecting track
                const trackItems = state[yTrack-1];
                // if the leftmost item of the connecting track is a car, it can be moved left to the given track
                if (trackItems.some(item => item != '*')){
                    addAction("LEFT", yTrack, xTrack);
                }
                // if the rightmost item of the given track is a car, it can be moved right to the connecting track
                if (state[xTrack-1].some(item => item != '*')){
                    addAction("RIGHT", xTrack, yTrack);
                }
                // if the rightmost item of the connecting track is an engine, it can be moved right to the given track
                if (trackItems[trackItems.length-1] === "*"){
                    addAction("RIGHT", yTrack, xTrack);
                }
                // if the leftmost item of the given track is a car, it can be moved left to the connecting track
                if (trackItems[0] === "*"){
                    addAction("LEFT", yTrack, xTrack);
                }
            }
        }
    }
    return actions;
}
//Test to see if it worked:

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

//Test to see if result() worked

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

console.log("Yard 5, State 5: ")
result(possibleActions(YARD_5,STATE_5)[0],STATE_5);
console.log("Yard 6, State 6: ")
result(possibleActions(YARD_6,STATE_6)[0],STATE_6);

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
//Test to see if expand() worked

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

console.log("State 5, Yard 5: ")
expand(STATE_5,YARD_5);
console.log("State 6, Yard 6: ")
expand(STATE_6,YARD_6);


//problem 4
/**
 * The blind tree search method that I chose was depth-limited-search and iterative deepening
 * I chose this because it finds the optimal solution like breadth-first search but does not require as much memory, making it better than breadth-first search.
 * It is also better than depth-first search since it finds the optimal solution rather than just the first solution that appears in the search space. 
 */

//helper function to help build out our tree
function expandNode(node:myNode, yard:Yard):myNode[]{
    let children:myNode[] = [];
    //find all possible actions from the given state
    let actions = possibleActions(yard,node.state)
    //iterate through each possible action
    for (let action of actions){
        if (
            node.action &&
            action.from === node.action.to &&
            action.to === node.action.from
        ){
            continue;
        }
        let newState = result(action, node.state);
        children.push({
            state: newState,
            parent: node,
            action: action,
            depth: node.depth + 1
        });
    }
    //console.log("The possible states are: ", children);
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
    if (node.depth >= limit){
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
howToGetToGoal(YARD_6,STATE_6,GOAL_STATE_6);
console.log("Yard 7 - Example Yard 2");
howToGetToGoal(YARD_7,STATE_7,GOAL_STATE_7);


//problem 5
/**
 * Because there is also 1 engine in addition to the c cars, there are c+1 objects.
 * Because the order of these objects matter, there are (c+1)! orderings. 
 * For each object, there are t possible tracks the object can go on. This results in t^(c+1). This is because there are t choices of tracks that each object can go on.
 * Thus, the final equation for the total search space is (c+1)! * t^(c+1). 
 */

//Problem 6
/**
 * The type of search I am going to use is IDA*. This is because I already created an iterative deepening program so it would be easy to adjust it to apply A*.
 * It is also better to do IDA* instead of A* since it uses less memory. 
 * The heuristic I am going to apply is based on how disordered the cars are. This will be calculated by comparing pairs of adjacent trains and checking if the pairs are correct. 
 * So, h = number of misplaced cars + cars not on the goal track.  
 * For example, if the order of cars is supposed to be A B C D E but it is ordered as A C B D on the goal track and E isn't on the goal track then h = 3. 
 * This is admissable because the heuristic will not be greater than the number of changes needed since each misplaced car would need to be moved at least once. 
 * 
 * The runtime using the heuristic is much faster than compared to the uninformed search without the heuristic. Even though both using Iterative Deepening, when running the version with
 * the heuristic, the results show up in the console instantaneously whereas it would take a second when running the version withough the heuristic. 
 * With the heuristic, the number of nodes expanded is 51,216 (this was found by using a global nodesExpanded variable that was incremented after each node was expanded 
 * then logged once at the end outside of the function).
 * Without the heuristic, the number of nodes expanded is 268,750. This is 217,534 nodes more than when the heuristic is used!
 */

function heuristic(state: State, goal: State): number {
    let goalTrack = goal[0];
    let currentTrack = state[0];
    let h = 0;
    // count misplaced cars on the goal track
    for (let i = 0; i < Math.min(goalTrack.length, currentTrack.length); i++) {
        if (currentTrack[i] !== goalTrack[i]) {
            if (currentTrack[i] !== "*") {
                h++;
            }
        }
    }
    // count cars not on goal track
    for (let i = 1; i < state.length; i++) {
        h += state[i].length;
    }
    return h;
}

//function to search the tree
function AStarSearch(node:myNode, goal:State, yard:Yard, limit:number, visited:Set<string>):myNode | number | null{
    let key = JSON.stringify(node.state);
    let goalKey = JSON.stringify(goal);
    let h = heuristic(node.state,goal);
    if (visited.has(key)) {
        return null;
    }

    visited.add(key);

    let f = node.depth + h;

    if (f > limit){
        visited.delete(key);
        return f;
    }
    // if we have reached the goal state then return the node
    if (key === goalKey){
        return node;
    }
    
    let min = Infinity;
    //expand the children of the given node 
    let children = expandNode(node,yard);
    for (let child of children){
        //go down the children's subtree until the limit depth
        let result = AStarSearch(child,goal,yard,limit,visited)
        if (result !== null && typeof result != "number"){
            return result;
        }
        if (typeof result === "number" && result < min){
            min = result;
        }
    }
    visited.delete(key);
    return min;
}

function IDAstar(initial:State,goal:State,yard:Yard):myNode | null | number{
    //turn the intitial state into the root node
    let root:myNode = {
        state:initial,
        parent: null,
        action:null,
        depth:0
    };

    let limit = heuristic(initial,goal);

    //call depth limited search for a series of limits 
    while(true){
        //let visited = new Map<string,number>();
        let visited = new Set<string>();
        let result = AStarSearch(root,goal,yard,limit,visited);
        if (result === null){
            return null;
        }
        if (typeof result != "number"){
            return result
        }
        //increase the limit since result would be a number
        limit = result;
    }
    return null;
}

function howToGetToGoalIDAStar(yard:Yard,initial:State,goal:State):Action[]{
    let actions:Action[] = [];
    let goalNode = IDAstar(initial,goal,yard);
    //if unable to reach goal node, return an empty set of actions
    if (goalNode === null){
        console.log("Goal not found");
        return [];
    }
    //start at the goal node and work backwards to find path of actions
    if (typeof goalNode != "number"){
        let current:myNode | null= goalNode;
        while (current && current.action !== null){
            //put the action at the front of the action list 
            actions.unshift(current.action);
            current = current.parent;
        }
    }
    console.log("The actions to get to the goal state are: ", actions)
    return actions; 
}

console.log("Yard 4 - Example Yard 3");
howToGetToGoalIDAStar(YARD_4,STATE_4,GOAL_STATE_4);
console.log("Yard 5 - Example Yard 4");
howToGetToGoalIDAStar(YARD_5,STATE_5,GOAL_STATE_5);
console.log("Yard 6 - Example Yard 5");
howToGetToGoalIDAStar(YARD_6,STATE_6,GOAL_STATE_6);
console.log("Yard 7 - Example Yard 2");
howToGetToGoalIDAStar(YARD_7,STATE_7,GOAL_STATE_7);