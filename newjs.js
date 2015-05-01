var ref = new Firebase('https://hacker-news.firebaseio.com/v0/');
var itemref = ref.child('item');
var topstories = ref.child('topstories');
var item = "https://hacker-news.firebaseio.com/v0/item/";
var json = ".json";



var i=0;
var j=20;

function loadpage(){
	topstories.on('value', function(postSnapshot){
		var data=postSnapshot.val();
		console.log(data);
		while(data[i] && i<j){
			var postnumber=data[i];
			console.log(data[i]);
			i++;
			loaditem(postnumber);
		}
	});
}
function loaditem(num){
	console.log('loading');
	var object = itemref.child(num);
	object.once('value', function(dataSnapshot){
		var obj=dataSnapshot.val();
		console.log(obj);
		var post = $('<div class="post"></div>');
		$('<a/>').attr("href", obj.url).text(obj.title).appendTo($(post));
		$('<p/>').text(obj.by).appendTo($(post));
		$('<p/>').text(obj.score).appendTo($(post));
		$("#postdiv").append(post);
	})

}
function loadnew(){

}
function loadmore(){
	j+=20;
	loadpage();
}
loadpage();