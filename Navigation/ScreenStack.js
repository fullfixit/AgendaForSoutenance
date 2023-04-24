import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Evenement from "../Screen/Evenement";
import HomeScreen from "../Screen/HomeScreen";
import ToDoList from "../Screen/ToDoList";

const Screen = {
    HomeScreen:{
        screen:HomeScreen
    },
    ToDoList:{
        screen:ToDoList
    },
    Evenement:{
        screen:Evenement 
    }
}

const ScreenStack = createStackNavigator(Screen, {
    defaultNavigationOptions:{
        headerStyle: {
            height: 40
        }
    }
});

export default createAppContainer(ScreenStack);