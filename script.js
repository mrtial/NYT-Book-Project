var listName = ['Animals','Business','Celebrities','Crime','Culture','Education','Espionage','Expeditions','Family','Fashion','Food and Fitness','Games','Health','Humor','Politics','Race','Relationships','Religion','Science','Sports','Travel'];
var newList = ["Animals", "Business Books", "Celebrities", "Crime and Punishment", "Culture", "Education", "Espionage", "Expeditions Disasters and Adventures", " Family", " Fashion Manners and Customs", " Food and Fitness", " Games and Activities", " Health", " Humor", " Hardcover Political Books", " Race and Civil Rights", " Relationships", " Religion Spirituality and Faith", " Science", " Sports", "Travel"];
$selector = $('#selector');
$bookShelf = $('.bookShelf');
$cover = $('.cover');

listName.forEach(function(el,idx){
  var $option = $('<option></option').attr('value', newList[idx]).text(el);
  $selector.append($option);
});


// API Call:
apiRequest("Animals");

$selector.on('change',function(){
  apiRequest($selector.val());
});


function apiRequest(selector){
  $.ajax({
     url: "http://api.nytimes.com/svc/books/v3/lists/"+selector+"?api-key=f9b634d7aa9a1179185fb61f3b0d39d2:19:49484404&update=monthly",
     method: "GET",
     dataType: 'json',
     success: function(data){
        $('#coverflow').children().remove();
        for(var i=0; i<10; i++){
          var obj = data.results.books[i];
          var temp = new Book(obj,$('#coverflow'),i);
        }
      }
     });
}

function Book(obj, $parent,i){
  this.title=obj.title;
  this.author=obj.author;
  this.book_image=obj.book_image;
  this.description=obj.description;

  var $bookcase = $('<div></div>').attr('id','case'+i);

  var $book =$('<div></div>').addClass('book').attr('id','b'+i);
  var $front = $('<div></div>').addClass('front');
  var $back = $('<div></div>').addClass('back','flipped');

  var $img = $('<img>').attr('src', this.book_image).addClass('cover');
  $front.append($img);

  var $title = $('<h3></h3>').text(this.title).appendTo($back);
  var $author = $('<h4></h4>').text(this.author).appendTo($back);
  var $description = $('<p></p>').text(this.description).appendTo($back);
  
  $book.append($front).appendTo($bookcase);
  $book.append($back).appendTo($bookcase);
  $parent.append($bookcase);

  $('#case'+i).on('click',function(e){
    $('#case'+i).toggleClass('flipped');
    // $('.book>.front').toggleClass('flipped');
    // $('.book>.back').toggleClass('flipped');
  });

}

// Click Event:

$('#card').on('click',function(e){
  $('#card').toggleClass('flipped');
});



