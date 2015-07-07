  //Zeshan B 
  //June, 29 2015


  var jaudioget = {
                audioitems:{}
            };

jQuery("#mainpage").on("pageinit", function(event) {
    
                var jsonaudiorequest = $.getJSON("https://www.googleapis.com/storage/v1/b/q-reading/o", function() {

                    console.log("yes, got data!");

                    jaudioget = jsonaudiorequest;
                    jaudioget.audioitems = jsonaudiorequest.responseJSON.items;

                    updateAudioListView(jaudioget);

                });
    
});

     //jaudioget.responseJSON.items[0].mediaLink);

function updateAudioListView(jaudioget) {
       $.each(jaudioget.audioitems, function(audioDownload, value) {

             console.log("Got Media links, Yay!");

             var NextVerse = audioDownload;
             NextVerse = NextVerse + 1;

             var NextVerseTxt = "Next Verse";

             if (jaudioget.audioitems.length == NextVerse) {
                NextVerseTxt = " "
             }
                        

             $("#theAudioList").append("<li><a href=\"#" + NextVerse + "\" data-src=\""+ value.mediaLink +"\"  class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\" data-transition=\"fade\"> audio " + value.name + "</a></li>");
                        
             //value.mediaLink 
                        
        });
                    
       
    //refresh list tag in dom
    $("#theAudioList").listview("refresh");
                    
         //load audio file media on audio tag
         audiojs.events.ready(function() {
            
         var a1 = audiojs.createAll({
          trackEnded: function() {
            $(".playing a").removeClass("ui-btn-active");
            var next = $('ul li.playing').next();
            if (!next.length) next = $('ul li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            $(".playing a").addClass("ui-btn-active");
            audio.play();
          }
        });
        
        //Load in the first track
        var audio = a1[0];
            first = $('ul a').attr('data-src');
        $('ul li').first().addClass('playing');
        audio.load(first);

        //Load in a track on click
        $('ul li').click(function(e) {
          e.preventDefault();
          $(this).addClass('playing').siblings().removeClass('playing');
          audio.load($('a', this).attr('data-src'));
          audio.play();
        }); 
    
        
     });//close audiojs events ready         

                
}//close function updateAudioListView