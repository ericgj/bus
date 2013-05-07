
# Bus

  A simple, declarative event bus for typical cases.
  
  AKA a fluid DSL on top of Emitter.

## Installation

    $ component install ericgj/bus

## Example

```javascript
  var bus = require('bus')();

  var mainPanel = MainPanel('#main');
  var sidePanel = SidePanel('#sidebar');
  var filterPanel = FilterPanel('#filter');

  logFilterEvent = function(param) {
    console.log('filter: %s', param);
  }

  /**
   *  Route 'select' events from the filterPanel to
   *  mainPanel.applyFilter and sidePanel.setFilter,
   *  and to two custom handlers
   */
  bus.route().from(filterPanel, 'select')
     .to( mainPanel, 'applyFilter' )
     .to( sidePanel, 'setFilter' )
     .handle( logFilterEvent )
     .handle( function(param) { /* some callback */ } );

  /**
   *  Or, define routes in reverse direction. Here
   *  events from sidePanel and mainPanel are routed
   *  to filterPanel.clearFilter.
   */
  bus.route().to(filterPanel, 'clearFilter')
     .from( sidePanel, 'reset' )
     .from( mainPanel, 'clear' );

  /**
   *  You can define different routes in a single call
   *  using route(), aliased as reset()
   */
  bus.route()
       .from(x,'event')
         .to(y1,'method')
         .to(y2,'method')
     .reset()
       .to(z,'method')
         .from(w1,'event')
         .from(w2,'event');

```

## API

### Bus#from(source, event)

Set the current source. If a receiver has been set, then bind the event to it.

### Bus#to(receiver, method)

Set the current receiver. If a source has been set, then bind its event to 
the receiver.

### Bus#handle(fn)

Set the current receiver to an arbitrary function rather than object + method.

### Bus#route or #reset

Reset the current source and receiver, to define a new route.
   
## Note

There are no hard dependencies, any `emitter`-ish object (with `.on`) will work
as a source.

The DSL does not currently control unbinding events (`.off`), so if you want 
that, manage it in your sources, or send me a pull request for 
`bus.off().to().from()`  :wink:

## License

  MIT
