(function() {

  // delcaring variables
  var searchContainer = document.querySelector('.search-container');
  var search = document.querySelector('.search');
  var results = document.querySelector('.tracks');
  var musicLink = document.querySelector('.mp3');
  var userSearch = '';
  var headers = {};
  var url = 'https://api.soundcloud.com/tracks/?client_id=' + TOKEN + '&q=';

  try {
      headers['Authorization'] = 'token ' + TOKEN;
    } catch (e) {
    }


  searchContainer.addEventListener('submit', function(event) {
    event.preventDefault();
    userSearch = search.value;
    userSearchStr = userSearch.toString();
    console.log('Artist: ', userSearchStr);
    url = url + userSearchStr;






    fetch(url).then(function(response) {
               console.log(url);
               response.json().then(function(data) {
                 console.log(data);
                   while(results.firstChild) {
                       results.removeChild(results.firstChild);
                   }






      for(var i = 0; i < data.length; i++) {
        var loopData = data[i];



        var audioLink = document.createElement('a');
        audioLink.setAttribute('class', 'result')
        audioLink.setAttribute('href', '#');
        results.appendChild(audioLink);
        audioLink.addEventListener('click', function(event) {
          musicLink.setAttribute('src', loopData.stream_url + '?client_id=' + TOKEN );
          console.log(musicLink);
          console.log('$ curl "http://api.soundcloud.com/tracks/13158665?client_id=YOUR_CLIENT_ID"');
          console.log('not picking up the right streamurl andddddd not playing the wrong one');
        });




        var albumCover = document.createElement('div');
        albumCover.setAttribute('class', 'artwork');
        albumCover.innerHTML = '<img src="' + loopData.artwork_url + '">';
        audioLink.appendChild(albumCover);




        var songTitle = document.createElement('p');
        songTitle.setAttribute('class', 'song-title');
        songTitle.textContent = loopData.title;
        audioLink.appendChild(songTitle);


      }



      });

    });

    function fetchStream(url) {
      fetch(url).then(function(result) {
        console.log(result);


        audioPlayer.src = '';
        audioPlayer.src = result.url;
        audioPlayer.play();

  });
}




}());
}());
