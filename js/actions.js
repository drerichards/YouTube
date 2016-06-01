$(function() {
  $('#search_value').submit(function(event) {
    event.preventDefault();
    $('li').remove('');
    var searchValue = $('#query').val();
    getResults(searchValue);
  });

  (function getResults(searchValue) {
    $.getJSON('https://www.googleapis.com/youtube/v3/search',{
        part: 'snippet',
        key: 'AIzaSyCjyPXRl8Wn8HYwwJIyvmJlX8OPL6-PcP4',
        maxResults: 10,
        type: 'video',
        q: searchValue},
        function(results){
          $.each(results.items, function(i, data){
            console.log(data);
            showResults(data);
          });
        }
    )
  });

  function showResults(data) {
    var output;
    var vidPlayLink;
    $.each(data, function(index, value) {
      var vidTitle = data.snippet.title;
      var vidID = data.id.videoId;
      var vidThumb = data.snippet.thumbnails.medium.url;

      vidPlayLink = 'https://www.youtube.com/watch?v='+vidID;


      var link = '<p><a href ="' + vidPlayLink + '"><img src='+ vidThumb +'></a></p><p>'+vidTitle+'</p>';
      output = '<li>'+link+'</li>';
    });
    $('#search_results ul').append(output);
  }
});
