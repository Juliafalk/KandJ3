# KandJ3

### Click on the picture to see a video about this repository:
[![Video of the project](https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F704115945_1280x720.webp&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png)](https://vimeo.com/272539603)

## Background

This iOS application has been developed between March and May 2018 by three engineering students at Uppsala University during the course *Independent Project in Sociotechnical Systems Engineering - IT Systems*. The three students formed team J3 and the process resulted in runRouter, an application which gives the user the possibility of creating a route with a wanted distance. runRouter will save information about the routes along with information about the user's run and give the user the option to run that specific route again in the future. runRouter is based on inspiration from other exercise application, but offers an extension of functionality with its ability to let the user specify the wanted distance beforehand, instead of only measuring it during the user's run.

### Why is the name LastTry?

Sometimes things do not turn out as you wished, that was the case in the beginning of this project. After a lot of problems in the beginning, with re-start of project, it literally felt like this was the last try. So, when one of the members of the team once again had to do a new project, it decided that this was literally the last try and named the test project to LastTry. Luckily or unluckily, everything worked well that time, and to avoid any more restarting, the name had to be LastTry. We are sorry for the inconsistent choice of name, and hope this does not means problem for anyone. 

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

If you have a MacOS computer, the first step is to install Xcode, which is founded in AppStore. This take around 30 minutes, so please be patience. 

Also, to be able to simulate the application it requires that you have a software that makes it possible to run npm install, for example [NodeJS](https://nodejs.org/en/).

Thereafter, navigate to the map/file/place where you want the project to be stored . When these step is done, the project can be clone or downloaded. Run the following commands in the terminal window. 

1. *Clone the project*

  ```git clone https://github.com/Juliafalk/KandJ3.git```

2. *Install the necessary package/extensions/APIs for the project. Make sure that you are in the correct folder i.e. the KandJ3 folder*.

  ```npm install```

3. *Start the simulations. Make sure that you are in the correct folder i.e. the KandJ3 folder*

  ```react-native run-ios```

Then, wait a couple of minutes for the simulator to starts, first time it can take around five minutes. 

When the simulator has started correctly, all is done and you are ready to explore the application, hope you enjoy it as much as we do!

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
[<img src="https://avatars3.githubusercontent.com/u/34298655?s=460&v=4" width="100px;"/><br /><sub><b>Julia Gardholm</b></sub>](https://github.com/gardholm) | [<img src="https://avatars3.githubusercontent.com/u/34298599?s=400&u=1520b5e4082aafa5564697de5ae9245ca540691a&v=4" width="100px;"/><br /><sub><b>Jenny Lindgren](https://github.com/jennyliindgren)</b></sub> | [<img src="https://avatars2.githubusercontent.com/u/34298514?s=460&v=4" width="100px;"/><br /><sub><b>Julia Falk</b></sub>](https://github.com/Juliafalk) |
| :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

