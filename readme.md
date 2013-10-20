Circular.js
==========

Front-end JavaScript framework for dynamic HTML. Used for creating components from JavaScript arrays. Inspired by AngularJS.

How to Use
----------

 - `circular="name"`  : Defines the parent circle
 - `vector`           : Defines the template for the clones -- a la Jango Fett
 - `circ-var="var"`   : Define an element that has a variable inside it
 - `circ-attr="attr"` : Defines an element that has an attribute with a variable, and which attribute it is
 - `!!variable!!`     : Replaces `variable` with `Object["variable"]`

Example
-------

Define the data as an array of objects

    var Array = [
      {"FriendName": "Papagiorgio", "FriendID": 23521},
      {"FriendName": "Luke Skywalker", "FriendID": 92749},
      {"FriendName": "Doc Brown", "FriendID": 71152}
    ];
    
    
Bind the data to the `friends` circle

    Circular.circles["friends"].bind( Array );
    
Now create your HTML

    <section id="friends-list" circular="friends">
      <div class="friend" vector>
        <img class="friend-img" circ-attr="src" src="/static/image/!!FriendID!!">
        <h1 circ-var="FriendName">Name: !!FriendName!!</h1>
      </div>
    </section>
