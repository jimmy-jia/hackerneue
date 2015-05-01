var ref = new Firebase('https://hacker-news.firebaseio.com/v0/');
var itemref = ref.child('item');
var topstories = ref.child('topstories');
var item = "https://hacker-news.firebaseio.com/v0/item/";
var newstories = ref.child('newstories');
var orig = "https://news.ycombinator.com/item?id=";


var i=0;
var j=20;
var postnum=1;
function loadpage(){
	topstories.on('value', function(postSnapshot){
		var data=postSnapshot.val();
		while(data[i] && i<j){
			var postnumber=data[i];
			loaditem(postnumber);
			i++;
		}
	});
}
function loadnew(){
	newstories.on('value', function(postSnapshot){
		var data=postSnapshot.val();
		while(data[i] && i<j){
			var postnumber=data[i];
			loaditem(postnumber);
			i++;
		}
	})
}
function loaditem(num){
	var object = itemref.child(num);
	object.once('value', function(dataSnapshot){
		var obj=dataSnapshot.val();
		var post = $('<div class="post"></div>');
		$('<p/>').text(postnum).appendTo($(post));
		$('<a/>').attr("href", obj.url).text(obj.title).appendTo($(post));
		$('<p/>').text("+"+obj.score+" points").appendTo($(post));
		$('<p/>').text("Posted by "+obj.by).appendTo($(post));
		$('<a/>').attr("href", orig+obj.id).text(obj.descendants+" comments").appendTo($(post));
		$("#postdiv").append(post);
		postnum++;
	})
}
function loadMore(){
	j+=20;
	loadpage();
}