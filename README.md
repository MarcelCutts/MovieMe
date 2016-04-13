# MovieMe

You want to see a movie, but you don't feel like picking which one?

No longer a problem with *MovieMe*.

Skip the time wasted b pouring through reviews and bickering with friends. MovieMe gives you the best movie in theatres right now. Go see it.

Seen it already? No worries, just swipe left and go for the next one down the entertainment stack.

## Getting it up and running

This is a pretty basic React-Native application (as basic as those can be), so there aren't too many dark spells.

For Mac, targeting iOS

1. Follow the steps outlined in the 'Requirements' ['Requirements'](http://facebook.github.io/react-native/releases/0.21/docs/getting-started.html) section.
2. Run `npm install -g react-native-cli`.
4. Run `npm install` in the project root.
5. Set up the config file (see below).
6. Start the code and simulator simply with `react-native run-ios` in the project root.

For Mac/Linux, targeting Android

1. Follow the steps outlined in the 'Requirements' ['Requirements'](http://facebook.github.io/react-native/releases/0.21/docs/getting-started.html) section, or get those packages via your equivilant local package manager.
2. Run `npm install -g react-native-cli`
3. Run `npm install` in the project root.
4. Set up the config file (see below).
5. Ensure you have suitable Android SDKs installed. I suggest just installing Android Studio and using its interfaces, as it'll be likely yo'll be using it for tweaking regardless.
6. Ensure you have an Android device in [`developer mode`](http://developer.android.com/tools/device.html) mode plugged in, or a emulated device running. For emulation, I suggest [GenyMotion](https://www.genymotion.com/)
7. Start the code and run it on the first virtual or real device with `react-native run-android`.
8. _Hardware device only_ :: Close your auto-opening app, run `adb reverse tcp:8081 tcp:8081` on the computer's terminal to hook up passing JS bundles to the physical device. Re-open app, enjoy functioning React-Native on your device.


### Configuration

The application expects a file named `config.js` to be available in the root directory. Currently, this is being used to handle URL endpoints and keys to external services. Ideally some of this would be in Environment Variables, but I haven't quite gotten this to work in React Native yet.

The structure of file you need to supply follows the following format

```javascript
export default config = {
  RT_API_KEY: '<Your Rotten Tomatoes API key>',
  RT_API_URL: 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json',
  PAGE_SIZE: 25,
  MDB_API_KEY: '<Your TheMovieDB API key'>,
}

```

The MDB key is optional, but will give you access to some lovely higher-res movie posters.


## Doesn't this seem like that one FB tutorial?

While working on another React-Native app, I had a look at a tutorial provided by FaceBook. It's a simple list-view of movies in cinemas right now, as given by Rotten Tomatoes, with each row representing a movie.

This is a toy application is designed to teach the user to become familiar with mobile UI widgets and asynchronous data fetching - but I feel it's **so close** to actually being genuinely useful.


## What's next?

To make this into a quality app that focuses on doing one thing great, it needs to

+ Have an exceptionally clean and focused interface
+ Provide informative and flattering UI widgets to push current top-of-the-pile film

As an extension of the core concept it should

+ Only present films showing in your local area
+ Provide times and routing to your film destination
