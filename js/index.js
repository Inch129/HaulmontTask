    var nextPage = null;
    var prevPage = null;

    let nextButton = document.getElementById("next-page-button");
    nextButton.onclick = () => {
        let params = {
            'maxResults': '5',
            'part': 'snippet',
            'q': 'spring mvc',
            'type': ''
        };

        if (nextPage) {
            params.pageToken = nextPage;
        }

        buildApiRequest('GET',
            '/youtube/v3/search',
            params,
            null,
            function(response) {
                root.innerHTML = "";
                for (var item of response.items) {
                    root.innerHTML += '<h1>' + item.snippet.title + '</h1>';
                }

                nextPage = response.nextPageToken;
            });
    };