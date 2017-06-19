function getToken() {
    return new Promise(function(resolve, reject) {
        var manifest = chrome.runtime.getManifest();

        var clientId = encodeURIComponent(manifest.oauth2.client_id);
        var scopes = encodeURIComponent(manifest.oauth2.scopes.join(' '));
        var redirectUri = encodeURIComponent('https://' + chrome.runtime.id + '.chromiumapp.org');

        var url = 'https://accounts.google.com/o/oauth2/auth' +
            '?client_id=' + clientId +
            '&response_type=id_token' +
            '&access_type=offline' +
            '&redirect_uri=' + redirectUri +
            '&scope=' + scopes;

        return resolve(url);

        chrome.identity.launchWebAuthFlow(
            {
                'url': url,
                'interactive':true
            },
            function(redirectedTo) {
                if (chrome.runtime.lastError) {
                    // Example: Authorization page could not be loaded.
                    reject(chrome.runtime.lastError.message);
                }
                else {
                    var response = redirectedTo.split('#', 2)[1];

                    // Example: id_token=<YOUR_BELOVED_ID_TOKEN>&authuser=0&hd=<SOME.DOMAIN.PL>&session_state=<SESSION_SATE>&prompt=<PROMPT>
                    resolve(response);
                }
            }
        );
    });
}
