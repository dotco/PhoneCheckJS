# PhoneCheckJS

Why?
----
The internet's got a lot of forms used to get data from users. Sometimes it's helpful to ensure that the data being submitted is legitimate.

<http://pop.co>, a product of <http://go.co>, required a useful validation helper for mobile number entry since we were leveraging text messages to handle user validation.

PhoneCheckJS is the result of wanting to refactor and abstract away the main functionality that was initially implemented on <http://pop.co> homepage to collect user telephone numbers.
How?
----
To use PhoneCheckJS, you will need to have at least two elements in your markup:
* Country Field/List (&lt;input&gt; or &lt;select&gt;)
* * Phone Number Field (&lt;input&gt;)

After including the following depencies and PhoneCheckJS:
```
<script type="text/javascript" src="js/PhoneFormat.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/PhoneCheck.js"></script>
```

All you need to do is call the PhoneCheck constructor, passing in two jQuery objects, the first representing the phone number field to validate and country code field: 

```
<script type="text/javascript">
	new PhoneCheck($('input'), $('select'));
</script>
```

Credits
----
PhoneCheckJS has two depencies:
* [jQuery](http://jquery.com)
* <https://code.google.com/p/libphonenumber/> (from Google) 

Disclaimer
----
PhoneCheckJS does not have 100% support for every country listed in the demo country selector. For countries that the libphonenumber library does not support, PhoneCheckJS will default to allowing any numeric entry as valid so as to reduce false negatives.

Culprit (Creator)
----
This (hopefully) helpful package was put together by [@mrdazm](http://twitter.com/mrdazm) and is made available as-is and completely open for your own adaptations.

Follow [@thePOPguys](http://pop.co) and [@dotco](http://go.co)!
