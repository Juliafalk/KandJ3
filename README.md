# runRouter [repo KandJ3]

### A video about this repository
[![Video of the project](https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F704115945_1280x720.webp&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png)](https://vimeo.com/272539603)

## Background

This iOS application has been developed between March and May 2018 by three engineering students at Uppsala University during the course *Independent Project in Sociotechnical Systems Engineering - IT Systems*. The three students formed team J3 and the process resulted in runRouter, an application which gives the user the possibility of creating a route with a wanted distance. runRouter will save information about the routes, along with information about the user's run and give the user the option to run a specific route again in the future. runRouter is based on inspiration from other exercise applications, but offers an extension of functionality with its ability to let the user specify the wanted distance beforehand, instead of only measuring it during the user's run.

### Why are the project files named LastTry?

Sometimes things do not turn out as you wished, that was the case in the beginning of this project. After a lot of problems in the beginning, with a lot of re-starting of the project, it literally felt like this was the last try. So, when one of the members of the team once again had to create a new project, the project name fell on LastTry. Luckily or unluckily, everything worked out well this time and to avoid any more restarting, the name remained LastTry.

## Development tools

*The application is developed with the help of following tools and software*

- ReactJS
- React Native
- Redux
- Firebase
- Google Maps API
- NativeBase.io

## System overview

The necessary code is located in the **src** folder, which contains the folders **actions, components, reducers** and the files **App.js** and **Router.js**. **App.js** is the main file that returns **Router.js**, which contains all of the application's different pages. The pages are built with a lot of different components that are located in the folder **components**. Redux has been used to be able to have a scalable structure for the application. For this, the application contains a few different actions and reducers which are located in the folders with the corresponding names. Both folders contains an **index.js** file to ease the importation of the reducers and actions into the files where they are necessary.

## How to start the simulation: 

Firstly, it is only possible to simulate the application on a MacOS computer. This cause Xcode is required for simulation. Xcode is a software developed by Apple and works both as code editor and as a way for simulating for a certain iOS device. 

If you have a MacOS computer, the first step is to install Xcode, which is founded in AppStore. This can take about 30 minutes, be patient. 

Also, to be able to simulate the application, it requires you to have a software that makes it possible to run npm install, for example [NodeJS](https://nodejs.org/en/).

Run the following commands in the terminal window. 

1. *Navigate to the folder where you want to store the project*

  ```cd [folder name]```

2. *Clone the project*

  ```git clone https://github.com/Juliafalk/KandJ3.git```

3. *Install the necessary package/extensions/APIs for the project. Make sure that you are in the correct folder i.e. the KandJ3 folder*.

  ```npm install```

4. *Start the simulation. Make sure that you are in the correct folder i.e. the KandJ3 folder*

  ```react-native run-ios```

Then, wait a couple of minutes for the simulator to starts, first time it can take a few minutes. 

When the simulator has started correctly you are ready to explore the application, hope you enjoy it as much as we do!

## The Development Team: J3

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
[<img src="https://avatars3.githubusercontent.com/u/34298655?s=460&v=4" width="100px;"/><br /><sub><b>Julia Gardholm</b></sub>](https://github.com/gardholm) | [<img src="https://avatars3.githubusercontent.com/u/34298599?s=400&u=1520b5e4082aafa5564697de5ae9245ca540691a&v=4" width="100px;"/><br /><sub><b>Jenny Lindgren](https://github.com/jennyliindgren)</b></sub> | [<img src="https://avatars2.githubusercontent.com/u/34298514?s=460&v=4" width="100px;"/><br /><sub><b>Julia Falk</b></sub>](https://github.com/Juliafalk) |
| :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

