(function()
{

	Circle = new Circular();

})();

function Circular()
{
	var self = this;
	var circles = {};
	var fns = {};

	this.addVector = addVector;
	this.setAddFunction = setNewAddFunction;
	this.circles = circles;

	$("[circular]").each(function(i, d)
	{
		d = $(d);

		var name = d.attr("circular"); //name the circle
		var vector = d.find("[vector]").clone(); //find the template for the clones (Jango Fett)

		if( !d.hasAttr("debug") )
			d.find("[vector]").remove();

		circles[ name ] = new CircleObject({

			"circle"	: d,
			"vector"	: vector,
			addfn		: function(){ }
		});
	});

	function addVector(vector)
	{
		var circle = circles[ vector ];

		BangBang(circle);

		circle["addfn"]();
		circle["vector"].appendTo( circle[ "circle" ] );
	}

	function setNewAddFunction( vector, fn )
	{
		circles[ vector ][ "addfn" ] = fn;
	}
}

function CircleObject(ob)
{
	var s = this;

	this.circle = ob["circle"];
	this.vector = ob["vector"];
	this.length = 0;
	this.data = [];

	this.bind = bindData;

	this.preBang = function(d){ return d; };
	this.postBang = function(d){ return d; };

	function bindData(data)
	{
		s.length = data.length;
		s.data = data;

		data.forEach(function(d, i)
		{
			var clone = s.vector.clone();
			s.circle.append( BangBang(clone, d) );
		});
	}

	function update(data)
	{
		if( data.length > s.length )
		{
			var tmp = data.slice( s.length );

			s.length = data.length;
			s.data = data;

			tmp.forEach(function(d, i)
			{
				var clone = s.vector.clone();
				s.circle.append( BangBang(clone, d) );
			});
		}
	}

	function BangBang(vector, data)
	{
		data = s.preBang(data);

		if( vector.hasAttr("circ-attr") )
		{
			var attributes = vector.attr("circ-attr");
			replaceAttributes({ "attributes": attributes, "el": vector, "data": data });
		}

		// Loop through all circular attributes and replace them with the data
		vector.find("[circ-attr]").each(function(i, d)
		{
			d = $(d);
			var attributes = d.attr("circ-attr");
			replaceAttributes({ "attributes": attributes, "el": d, "data": data });
		});

		// Loop through "circ-var" and replace their innerHTML
		vector.find("[circ-var]").each(function(i, d)
		{
			d = $(d);
			var key = d.attr("circ-var");

			d.html( d.html().replace("!!" + key + "!!", data[key]) );
		});

		s.postBang( vector );

		return vector;

	}

	function replaceAttributes( obj )
	{
		var attributes = obj["attributes"];
		var element = obj["el"];
		var data = obj["data"];

		// find all "circ-attr" and replace those attributes with the data
		attributes.split(" ").forEach(function(b, n)
		{
			var banglist = findBangs( element.attr( b ) ); //list of variables to replace

			banglist.forEach(function(c, k)
			{
				element.attr(b, element.attr( b ).replace("!!" + c + "!!", data[c]) );
			});
		});
	}

	function findBangs( string )
	{
		var l = string.length - 1;
		var bangs = [];
		var vars = [];

		for(var i = 0; i < l; i++)
		{
			if( string[i] == "!" && string[i+1] == "!" )
			{
				bangs.push( i );
			}
		}

		l = bangs.length;

		for(i = 0; i < l; i = i + 2)
		{
			vars.push( string.substr( bangs[i]+2, bangs[i+1] - bangs[i] - 2 ) );
		}

		return vars;
	}

}