$(function() {
    $(function defaultSearch(params){
      var searchValue = $('#query').val();
      var params = {
        part: 'snippet',
        key: 'AIzaSyCjyPXRl8Wn8HYwwJIyvmJlX8OPL6-PcP4',
        q: searchValue,
        maxResults: 10
      };
      url = 'https://www.googleapis.com/youtube/v3/search';

      $.getJSON(url, params, function(data){
        console.log(data);
        $('li').remove();
        showResults(data);
      });

      $('#nextBtn').click(function(nextPageToken) {
        showResults(nextPageToken);
      });

      $('#search_value').submit(function(event) {
        event.preventDefault();
        defaultSearch();
      });
    });
  });

  function showResults(data) {
    var output;
    var iframe;
    var vidPlayLink;
    for (var i = 0; i < data.items.length; i++) {
      var vidTitle = data.items[i].snippet.title;
      var vidThumb = data.items[i].snippet.thumbnails.medium.url;

      var link = '<p><a href ="#"><img src='+ vidThumb +'></a></p><p>'+vidTitle+'</p>';
      output = '<li>'+link+'</li>';
      $('#search_results ul').append(output);
    };

    $('li').click(function(event) {
      var vidID = data.items[$(this).index()].id.videoId;
      vidPlayLink = 'https://www.youtube.com/embed/'+vidID;
      $('#iframe_container').html('<iframe src="'+vidPlayLink+'" frameborder="0" allowfullscreen></iframe>');
      event.preventDefault();
    });
  }
