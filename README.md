# Screen Reader Messaging
The Screen Reader Messaging (SRM) library provides a straightforward means of passing a message to screen readers and other assistive technologies via a visually hidden live region. For further details and an example usage, please refer to the [demo page](https://metageeky.github.io/screen-reader-messaging/).


## Usage

The SRM library consists of a single JavaScript library found in the `/dist/` folder. Download that file and place it an location accessible to your website. Load the script file as usual for a web page:

```
<script src="sr-messaging.js"></script>
```

Upon page load, the SRM library will be available for use:
```
let srm = ScreenReaderMessenger.getMessenger();
srm.say('Hello World!');
```

You can also chain the methods together:
```
ScreenReaderMessenger.getMessenger().say('Polly want a cracker');
```

## Notes
* Any and all messages should be short and concise so that they can be read within a window of time. The default duration for this window is 5 seconds. 
* This duration is controlled in `sr-messaging.js` via `	ERASE_DELAY` variable, currently set to 5000 milliseconds (5 seconds). After that indicated time, the last message stored in the page until is removed. Some screen readers, if the voice rate is set to a slow pace, may not finish pronouncing the message within this timeframe. If such issues persist, increase the delay.
* This library should only be used for informing of minor events to screen readers, such as a table being resorted or multiple disclosure panels being opened or closed en masse. It is NOT for reporting critical events such as alerts. 
* As a rule of thumb, no messaging is necessary for interactions that leave some evidence of happening. For example, opening or closing a disclosure that sets aria-expanded does not need additional messaging. 
* Do not send too many messages. If multiple messages are triggered at the same time, they will interfere and overwrite each other. This was a deliberate design choice to deter spamming screen reader users.

## License
This code is released under the [Mozilla Public License Version 2.0](https://www.mozilla.org/en-US/MPL/2.0/).
