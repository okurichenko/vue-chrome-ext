function getToken() {
    return new Promise(function(resolve) {
        // return chrome.identity.getAuthToken({
        //     interactive: true
        // }, function(token) {
        //     return chrome.identity.getProfileUserInfo(function(response) {
        //         return resolve(response);
        //     })
        // });
        return chrome.identity.launchWebAuthFlow({interactive: true}, function (data) {
            return resolve(data);
        });
    });
}
