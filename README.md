# MovieMe

You want to see a movie, it tells you which one.

Feel like going to see a movie, but don't want to spend your time pouring through reviews or bickering with friends? No problem, MovieMe gives you the best movie in theatres right now. Go see it.

Seen it already? No worries, just swipe and go for the next one down the entertainment stack.

## Getting it up and running

This is a pretty basic React-Native application (as basic as those can be), so there aren't too many dark spells.

For Mac, targeting iOS

1. Follow the steps outlined in the 'Requirements' ['Requirements'](http://facebook.github.io/react-native/releases/0.21/docs/getting-started.html) section.
2. Run `npm install -g react-native-cli`
4. Run `npm install` in the project root.
3. Start the code and simulator simply with `react-native run-ios` in the project root.

For Mac/Linux, targeting Android

1. Follow the steps outlined in the 'Requirements' ['Requirements'](http://facebook.github.io/react-native/releases/0.21/docs/getting-started.html) section, or get those packages via your equivilant local package manager.
2. Run `npm install -g react-native-cli`
3. Run `npm install` in the project root.
4. Ensure you have suitable Android SDKs installed. I suggest just installing Android Studio and using its interfaces, as it'll be likely yo'll be using it for tweaking regardless.
5. Ensure you have an Android device in `development mode` mode plugged in, or a emulated device running. For emulation, I suggest [GenyMotion](https://www.genymotion.com/)
6. Start the code and run it on the first virtual or real device with `react-native run-android`.
7. _Hardware device only_ :: Close your auto-opening app, run `adb reverse tcp:8081 tcp:8081` on the computer's terminal to hook up passing JS bundles to the physical device. Re-open app, enjoy functioning React-Native on your device.



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
