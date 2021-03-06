var listName = ['Animals','Business','Celebrities','Crime','Culture','Education','Espionage','Expeditions','Family','Fashion','Food and Fitness','Games','Health','Humor','Politics','Race','Relationships','Religion','Science','Sports','Travel'];
var newList = ["Animals", "Business Books", "Celebrities", "Crime and Punishment", "Culture", "Education", "Espionage", "Expeditions Disasters and Adventures", "Family", "Fashion Manners and Customs", "Food and Fitness", " Games and Activities", "Health", "Humor", "Hardcover Political Books", "Race and Civil Rights", "Relationships", "Religion Spirituality and Faith", "Science", "Sports", "Travel"];
$selector = $('#selector');
$bookShelf = $('.bookShelf');
$cover = $('.cover');

listName.forEach(function(el,idx){
  var $option = $('<option></option').attr('value', newList[idx]).text(el);
  $selector.append($option);
});


// API Call:

var random = Math.floor(Math.random()*20);
$('.categoryTitle').text(listName[random]);

apiRequest(newList[random]);

$selector.on('change',function(){
  $('.categoryTitle').text($selector.val());
  apiRequest($selector.val());
});


function apiRequest(selector){

  $.ajax({
     url: "http://api.nytimes.com/svc/books/v3/lists/"+selector+"?api-key=f9b634d7aa9a1179185fb61f3b0d39d2:19:49484404&update=weekly",
     method: "GET",
     dataType: 'json',
     success: function(data){
        for(var i=0; i<10; i++){
          var obj = data.results.books[i];
          var temp = new Book(obj,i);
        }
      }

     });
}

function Book(obj,i){
  this.title=obj.title;
  this.author=obj.author;
  this.book_image=obj.book_image;
  this.description=obj.description;
  this.book_review =obj.book_review_link;
  this.sunday_review= obj.sunday_review_link;

  var $cardId = $('#card'+i);
  var front=$cardId.children()[0];
  var back = $cardId.children()[1];
  
  // front
  $(front).empty();
  var $heart = $('<i class="fa fa-heart fa-2x"></i>').attr('id','heart'+i).appendTo(front);
  var $img = $('<img>').attr('src',this.book_image).appendTo(front);


  // back
  $(back).empty();
  var $title = $('<h3></h3>').text(this.title).appendTo(back);
  var $author = $('<h4></h4>').text(this.author).appendTo(back);
  var $description = $('<p></p>').text(this.description).appendTo(back);

  //get review
  var review =[this.book_review, this.sunday_review];
  if (review[0]!==""){
  //add 'review' button
    var $link = $('<a target="_blank"></a>').attr('href',this.book_review);
    var reviewBtn = $('<button>review</button>').addClass('btn-xs btn-danger').appendTo($link);
    $link.appendTo($(back));
  }
}

// Get Element from review
function getArticle(link){
  $get(link,function(doc){
    var article = doc.document;
    var a_title = article.document.getElementsByClassName('articleHeadline')[0].innerText;
  });
}


// Click Event:

$('#card0').on('click',function(e){
  $('#card0').toggleClass('flipped');
});

$('#card1').on('click',function(e){
  $('#card1').toggleClass('flipped');
});

$('#card2').on('click',function(e){
  $('#card2').toggleClass('flipped');
});

$('#card3').on('click',function(e){
  $('#card3').toggleClass('flipped');
});

$('#card4').on('click',function(e){
  $('#card4').toggleClass('flipped');
});

$('#card5').on('click',function(e){
  $('#card5').toggleClass('flipped');
});

$('#card6').on('click',function(e){
  $('#card6').toggleClass('flipped');
});

$('#card7').on('click',function(e){
  $('#card7').toggleClass('flipped');
});

$('#card8').on('click',function(e){
  $('#card8').toggleClass('flipped');
});

$('#card9').on('click',function(e){
  $('#card9').toggleClass('flipped');
});

$('#card10').on('click',function(e){
  $('#card10').toggleClass('flipped');
});

$('#card11').on('click',function(e){
  $('#card11').toggleClass('flipped');
});


//My Collection
// $collection = $('#collection_container');
// $('.fa-heart').on('click',function(e){
//   console.log(e.targrt);

// });



