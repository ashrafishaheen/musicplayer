
 var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon
var Playingnumber = 0;
var shuffle=0;
var equal = 0;

$('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {        //input should be more than 2 char.
            $('#animation').addClass('animated bounceOutLeft');
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');   
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
  
  

//  objects starts from here
var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
       'image': 'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image': 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image': 'song4.jpg'
    }]
    //objects ends here
function fancyTimeFormat(time) // it converts seconds into hours and minutes.
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}



$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});
$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});


    function toggleSong() {
var song = document.querySelector('audio'); 
if(song.paused == true) {
console.log('Playing');
$('.play-icon').removeClass('fa-play').addClass('fa-pause'); //if song is playing remove play icon and add pause icon.
song.play();
}
else {
console.log('Pausing');
$('.play-icon').removeClass('fa-pause').addClass('fa-play'); //if song is paused remove pause icon and add play icon.
song.pause();
}
} 

    $('.play-icon').on('click', function() { //call toggleSong Function when play icon is clicked
        toggleSong();
    });
   $('body').on('keypress',function(event) {
    var target = event.target;

    if (event.keyCode == 32 && target.tagName !='INPUT')
    {
        toggleSong();
    }
});
  


    function updateCurrentTime() {
    var song = document.querySelector('audio');
    var currentTime = Math.floor(song.currentTime); //current time of song is stored in variable currentTime
    currentTime = fancyTimeFormat(currentTime); //current time of song will be converted into minutes which is fancyTimeFormat will be called
    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration) //duration will be converted into minutes.
    $('.time-elapsed').text(currentTime); //will show how much song has been played
    $('.song-duration').text(duration);
}
        function changeCurrentSongDetails(songObj) {
    $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}
function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}
function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}
        
            
            
            
            function addSongNameClickEvent(songObj,position) {
                var songName = songObj.fileName; // New Variable 
                var id = '#song' + position;
            $(id).click(function() {
            var audio = document.querySelector('audio');
            var currentSong = audio.src; //src of audio is stored in var currentSong
            if(currentSong.search(songName) != -1)  //will search for songName attr and call toggleSong function.
            {
            toggleSong();
            }
            else {
            audio.src = songName;
            toggleSong();
            changeCurrentSongDetails(songObj); // Function Call
            }
            });
            }

            function updateTimer(){
var song = document.querySelector('audio');
var ct =song.currentTime; 
var td =song.duration;
var percentage = (ct/td)*100; // %age of current and song duration
$(".progress-filled").css('width',percentage+"%");  



}



$(".player-progress").click(function(event) {
    var $this = $(this);

    // to get part of width of progress bar clicked
    var widthclicked = event.pageX - $this.offset().left;
    var totalWidth = $this.width(); // can also be cached somewhere in the app if it doesn't change

    // do calculation of the seconds clicked
    var calc = (widthclicked / totalWidth) * 100 ; // get the percent of bar clicked and multiply in by the duration


var song = document.querySelector('audio');
song.currentTime = (song.duration*calc)/100;

updateTimer();



});
             $('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;

        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber+1;
        console.log('else if');
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
});

             function changeSong() //we have made a machine jispe 2 buttons diye hai songName and position ke liye
{
var music =  songs[Playingnumber].fileName;
var song = document.querySelector("audio");
song.src = music;
toggleSong();
changeCurrentSongDetails(songs[Playingnumber])
}

$(".fa-step-forward").click(function(){

if(Playingnumber == songs.length-1){
console.log("one");
Playingnumber = 0;
changeSong();



}

else {
console.log("two");
console.log(Playingnumber);
  Playingnumber++;
changeSong();
}




})




$(".fa-step-backward").click(function(){

if(Playingnumber == 0){
console.log("one");
Playingnumber = (songs.length-1);
changeSong();




}

else {
console.log("two");
console.log(Playingnumber);
  Playingnumber--;
changeSong();
}




})
            
                      
            window.onload = function() {
               
            updateCurrentTime(); 
            setInterval(function() {
            updateCurrentTime();
            },1000);
           
               setInterval(function() {
        updateTimer();
    }, 1000);
 

                 
                 for(var i =0; i < songs.length;i++) { 
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1);
        changeCurrentSongDetails(songs[0]);

    }$('#songs').DataTable({
        paging: false
    });     




    

                }
$(".fa-bar-chart").click(function(){

$(this).toggleClass("active");
if(equal==0)
{

equal=1;

$("svg").css("display","inline-block");
$(".content").css("display","none");
$(".contain").css("display","inline-block");
$(".contain").css("background","black");


}
else{
equal=0;
$("svg").css("display","none");
$(".content").css("display","inline-block");
$(".contain").css("display","none");




}







});

      
