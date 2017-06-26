(function() {


const TOKEN = '8538a1744a7fdaa59981232897501e04';

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
        var myanchor = document.createElement('a');
        myanchor.setAttribute('href', loopData.stream_url + '?client_id=' + TOKEN);

        var albumCover = document.createElement('div');
        albumCover.setAttribute('class', 'artwork');
        if(loopData.artwork_url !== null) {
            albumCover.innerHTML = '<img src="' + loopData.artwork_url + '">';
        } else {
            albumCover.innerHTML = '<img src="Soundcloud-logo.png">';
        }
        myanchor.appendChild(albumCover);

        var songTitle = document.createElement('p');
        songTitle.setAttribute('class', 'song-title');
        songTitle.textContent = loopData.title;
        myanchor.appendChild(songTitle);

        myanchor.addEventListener('click', function(event){
          event.preventDefault();
          musicLink.setAttribute('src', this.href);
        });

        results.appendChild(myanchor);
      }
      });

    });

    userSearch = ' ';
    url = 'https://api.soundcloud.com/tracks/?client_id=' + TOKEN + '&q=';

  });




}());
// function fetchStream(url) {
//   fetch(url).then(function(result) {
//     console.log(result);
//
//
//     audioPlayer.src = '';
//     audioPlayer.src = result.url;
//     audioPlayer.play();
//
// });
// }
