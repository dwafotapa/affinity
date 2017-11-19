# Affinity
Affinity is a dating app built with React and Node.js that enables you to filter your matches.

## Getting Started

### Server side

Once you cloned the repository, you need to install the npm packages first:
```sh
cd server/
yarn
```

Then start the server:
```sh
yarn start
```

Then open [http://localhost:5000/api/](http://localhost:5000/api/) to check that your server is running. You should see this json:
```sh
{"it":"works"}
```

To run the tests:
```sh
yarn test
```

### Client side

Install the npm packages first:
```sh
cd ../ui/
yarn
```

Then start your server:
```sh
yarn start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.

To run the tests (make sure the server is off first): 
```sh
yarn test
```

## Technologies

### Server side

My preferred choice for creating a RESTful API was Node.js with Express, Mocha and Chai. Writing my tests with Mocha and Chai TDD-style was very pleasant. The chainable functions and the versatile style of Chai (expect, should or assert) made it nice and easy to write readable tests. I liked the simplicity of Express as well. Express is very powerful and enabled me to quickly setup a server with middleware functions and error handling. 

### Client side

I have used create-react-app and ejected from the default configuration to bootstrap the UI. React with Jest, Enzyme, Webpack, Sass and CSS-modules are the toolchain I've chosen to build the frontend. Webpack's hot reloading was a blessing when working on the frontend bits and I have liked the simplicity of CSS-modules and the object-oriented structure of Sass. I have built my app using pure functions with immutable JavaScript to have more robust code and prevent side effects. Also I have tried not to use too many npm packages to show my knowledge of ES6 (no lodash for example).

## Difficulties

The difficulties I have encountered were mainly on the frontend with setup up the tests and some of the technologies I had never used before. Unfortunately I didn't apply TDD on the client side as I was discovering lots of new tools like Redux, React-Router, CSS modules or Sass and all my efforts were focused on making them all work together. In the end, I have managed to write some good tests for action creators, reducers, selectors and presentational components.

Implementing the reusable Slider event handlers was a challenge as some of the Sliders have one or two handles and some of the Sliders have open bounds or don't. I used this React component [https://github.com/davidchin/react-input-range](https://github.com/davidchin/react-input-range) and found a bug because my Slider component was making multiple ajax requests when I drag-and-dropped it. The fix was to read the docs (rtfm...), discover there was OnChange and OnChangeComplete callbacks and use the local state to store the values of the changing filters with OnChange. Then on releasing the handle with OnChangeComplete, I compare it to the redux state and trigger an ajax request if they are different.

## Improvements

The app and server is running well overall.

A list of improvements I have thought of:
- a new search input filter that searches a set of details (name and city) of each match.
- matches should appear as you scroll down when there are more than 10.
- the reset button shouldn't send an ajax request when the filters are already in their default state.
- the look & feel and responsive design of the app could be improved.

## Wrapping up

I didn't know much about Node.js before starting this project and I have found it to be very lightweight and powerful. Learning new technologies like Node.js, CSS modules, Sass and so on was very rewarding and this project definitely made me more confident with testing in general.

Thank you for reading.