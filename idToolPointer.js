$.fn.drawPointer = function(ui, evt, p, stopped, clicked) {
	$(".jquery-line").remove();
	//$("." + p.defaults.className).remove();
	//$("defs").remove();

	var x = evt.clientX, y = evt.clientY, point = {x: x, y: y},
		draggable = (ui.helper == undefined) ? ui : ui.helper,
		off = (draggable.offset.left == undefined) ? draggable.offset() : draggable.position,
		nx1 = off.left,
		ny1 = off.top,
		nx2 = nx1 + draggable.outerWidth(),
		ny2 = ny1 + draggable.outerHeight(),
		maxX1 = Math.max(x, nx1),
		minX2 = Math.min(x, nx2),
		maxY1 = Math.max(y, ny1),
		minY2 = Math.min(y, ny2),
		intersectX = minX2 >= maxX1,
		intersectY = minY2 >= maxY1,
		from = {x:x, y:y},
		to = {
			x: intersectX ? x : nx2 < x ? nx2 : nx1,
			y: intersectY ? y : ny2 < y ? ny2 : ny1
		};

	//if ((parseInt(GUIPopup.posLeft) == parseInt(off.left)) && (parseInt(GUIPopup.posTop) == parseInt(off.top))) {
	//	console.log("exiting");
	//	return;
	//}

	var line = $.line(from, to),
		w = draggable.outerWidth(),
		h = draggable.outerHeight(),
		o = {"left": off.left + w/2, "top": off.top + h/2},
		pos = "",
		d = getRotationDegrees(line);

	//console.log(x, y);
	//console.log(o.top + ";" + o.left);
	//console.log("inside " + parseInt(off.left) + ";" + parseInt(off.top));

	if ((y > o.top - draggable.height()/4) && (y < o.top + draggable.height()/4)) {
		pos = "m";
	} else {
		if (y < o.top) {
			pos = pos + "b";
		} else {
			pos = pos + "t";
		}
	}

	if ((x > o.left - w/4) && (x < o.left + w/4)) {
		pos = "m";
		pos = (y < o.top) ? pos + "b" : pos + "t";
	} else {
		pos = (x > o.left) ? pos + "l" : pos + "r";
	}

	switch (pos) {

	    case "ml": // middle left

	    	x1 = off.left + w - 10;
	    	y1 = off.top + h/2 - 15;
	    	x2 = off.left + w - 10;
	    	y2 = off.top + h/2 + 15;
	        break;

	    case "tl": // top left
	    	switch (true) {
	    		case (d <= 180):
	    			x1 = off.left + w - 10;
	    			y1 = off.top + h - 30;
	    			x2 = off.left + w - 10;
	    			y2 = off.top + h;
	    			break;
	    		case (d > 180 && d < 230):
	    			x1 = off.left + w - 20;
    				y1 = off.top + h - 5;
    				x2 = off.left + w;
    				y2 = off.top + h - 30;
	    			break;
	    		case (d >= 230 && d < 270):
	    			x1 = off.left + w - 30;
    				y1 = off.top + h - 10;
    				x2 = off.left + w;
    				y2 = off.top + h - 10;
	    			break;
	    		case (d === 270):
	    			x1 = off.left + w - 30;
    				y1 = off.top + h - 10;
    				x2 = off.left + w;
    				y2 = off.top + h - 10;
	    			break;
	    	}
	        break;

	    case "mt": // middle top
	    	x1 = off.left + w/2 - 15;
	    	y1 = off.top + h - 10;
	    	x2 = off.left + w/2 + 15;
	    	y2 = off.top + h - 10;
	        break;

	    case "tr": // top right
	    	switch (true) {
	    		case (d > 270 && d < 320):
	    			x1 = off.left + 10;
	    			y1 = off.top + h - 35;
	    			x2 = off.left + 30;
	    			y2 = off.top + h - 10;
	    			break;
	    		case (d === 0 || d > 320):
	    			x1 = off.left + 10;
	    			y1 = off.top + h - 30;
	    			x2 = off.left + 20;
	    			y2 = off.top + h;
	    			break;
	    		case (d === 270):
	    			x1 = off.left;
	    			y1 = off.top + h - 10;
	    			x2 = off.left + 30;
	    			y2 = off.top + h - 10;
	    	}
	        break;

	    case "mr": // middle right
	    	x1 = off.left + 10;
	    	y1 = off.top + h/2 - 15;
	    	x2 = off.left + 10;
	    	y2 = off.top + h/2 + 15;
	        break;

	    case "br": // bottom right
	    	switch (true) {
	    		case (d <= 60):
	    			x1 = off.left + 20;
	    			y1 = off.top;
	    			x2 = off.left + 10;
	    			y2 = off.top + 30;
	    			break;
	    		case (d > 60 && d < 90):
	    			x1 = off.left;
	    			y1 = off.top + 10;
	    			x2 = off.left + 30;
	    			y2 = off.top + 10;
	    			break;
	    		case (d === 90):
	    			x1 = off.left + 5;
	    			y1 = off.top + 10;
	    			x2 = off.left + 30;
	    			y2 = off.top + 10;
	    			break;
	    	}
	        break;

	    case "mb": // middle bottom
	    	x1 = off.left + w/2 - 15;
	    	y1 = off.top + 10;
	    	x2 = off.left  + w/2 + 15;
	    	y2 = off.top + 10;
	        break;

	    case "bl": // bottom left
	    	switch (true) {
	    		case (d >= 90 && d < 120):
	    			x1 = off.left + w;
	    			y1 = off.top + 10;
	    			x2 = off.left + w - 30;
	    			y2 = off.top + 10;
	    			break;
	    		case (d >= 120 && d < 135):
	    			x1 = off.left + w;
					y1 = off.top + 10;
					x2 = off.left + w - 30;
	    			y2 = off.top + 10;
	    			break;
	    		case (d >= 135 && d < 180):
	    			x1 = off.left + w - 10;
					y1 = off.top + 40;
					x2 = off.left + w - 20;
	    			y2 = off.top + 10;
	    			break;
	    		case (d === 180):
	    			x1 = off.left + w - 20;
	    			y1 = off.top;
	    			x2 = off.left + w - 10;
	    			y2 = off.top + 30;
	    			break;
	    	}
	        break;

	}

	var points = from.x + "," + from.y + " " +
		(x1) + "," + (y1) + " " +
		(x2) + "," + (y2) + " " +
		from.x + "," + from.y;

	var svg = d3.select('#id-window-pointer');

	if (clicked || stopped) {

		var svgWidth = Math.max(from.x, x1, x2) - Math.min(from.x, x1, x2),
			svgHeight = Math.max(from.y, y1, y2) - Math.min(from.y, y1, y2),
			svgLeft = 0,
			svgTop = 0;

		if (stopped) {
			svgLeft = $(".idtool-pointer").offset().left;
			svgTop = $(".idtool-pointer").offset().top;
		}

		if (clicked) {
			if (pos === "ml" || pos === "tl" || pos === "bl") {
				svgLeft = x - svgWidth/2 - 20; svgTop = y - svgHeight/2;
				if (svgLeft === 0) svgLeft = x - svgWidth;
				if (svgTop === 0) svgTop = y - svgHeight;
			} else {
				svgLeft = x; svgTop = y - 15;
			}
		}

		svg.attr("width", svgWidth)
			.attr("height", svgHeight)
			.attr("style", "top: " + svgTop + "px; left: " + svgLeft + "px; width: " + svgWidth + "px; height: " + svgHeight + "px; z-index: 19;");

		points = (from.x - svgLeft) + "," + (from.y - svgTop) + " " +
			(x1 - svgLeft) + "," + (y1 - svgTop) + " " +
			(x2 - svgLeft) + "," + (y2 - svgTop) + " " +
			(from.x - svgLeft) + "," + (from.y - svgTop);

	} else {
		svg.attr("width", "100%")
		.attr("height", "100%")
		.attr("style", "position:absolute; top: 0; left: 0; z-index: 19;");
	}

	/*
	var defs = svg.append("defs");

	var filter = defs.append("filter")
	    .attr("id", "drop-shadow")
	    .attr("height", "200%")
		.attr("width", "200%");

	filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 2);

	filter.append("feOffset")
    .attr("dx", 0)
    .attr("dy", 2)
    .attr("result", "offsetBlur");

	var comptransf = filter.append("feComponentTransfer");

	comptransf.append("feFuncA")
		.attr("type", "linear")
		.attr("slope", .2);

	var feMerge = filter.append("feMerge");

	feMerge.append("feMergeNode");
	feMerge.append("feMergeNode")
	    .attr("in", "SourceGraphic");
	*/

	d3.select(".idtool-pointer").attr("points", points);
	/*
	var poly = svg.append("polygon")
		.attr("class", p.defaults.className)
		.attr("points", points)
		.attr("stroke", p.defaults.stroke)
		.attr("fill", p.defaults.fill);
		//.style("filter", "url(#drop-shadow)");
	*/

};

function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
	    obj.css("-moz-transform")    ||
	    obj.css("-ms-transform")     ||
	    obj.css("-o-transform")      ||
	    obj.css("transform");
    if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else {
		var angle = 0;
	}
    return (angle < 0) ? angle + 360 : angle;
}
