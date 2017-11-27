  /***** START BOILERPLATE CODE: Load client library, authorize user. *****/

    // Global variables for GoogleAuth object, auth status. 
    let GoogleAuth;

    /** 
     * Load the API's client and auth2 modules. 
     * Call the initClient function after the modules load. 
     */
    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    function initClient() {
        // Initialize the gapi.client object, which app uses to make API requests. 
        // Get API key and client ID from API Console. 
        // 'scope' field specifies space-delimited list of access scopes 

        gapi.client.init({
            'clientId': '86224178673-uo3jg0philg6dos738n4512nbongfjp8.apps.googleusercontent.com',
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
            'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner',
            // "redirect_uris":["http://localhost"],
        }).then(function() {
            GoogleAuth = gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes. 
            GoogleAuth.isSignedIn.listen(updateSigninStatus);

            // Handle initial sign-in state. (Determine if user is already signed in.) 
            setSigninStatus();

            // Call handleAuthClick function when user clicks on "Authorize" button. 
            let authorizeButton = document.getElementById("execute-request-button");
            authorizeButton.onclick = () => handleAuthClick(event);
        });
    }

    function handleAuthClick(event) {
        // Sign user in after click on auth button. 
        GoogleAuth.signIn();
    }

    function setSigninStatus() {
        var user = GoogleAuth.currentUser.get();
        isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
        // Toggle button text and displayed statement based on current auth status. 
    }

    function updateSigninStatus(isSignedIn) {
        setSigninStatus();
    }

    function createResource(properties) {
        var resource = {};
        var normalizedProps = properties;
        for (var p in properties) {
            var value = properties[p];
            if (p && p.substr(-2, 2) == '[]') {
                var adjustedName = p.replace('[]', '');
                if (value) {
                    normalizedProps[adjustedName] = value.split(',');
                }
                delete normalizedProps[p];
            }
        }
        for (var p in normalizedProps) {
            // Leave properties that don't have values out of inserted resource. 
            if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
                var propArray = p.split('.');
                var ref = resource;
                for (var pa = 0; pa < propArray.length; pa++) {
                    var key = propArray[pa];
                    if (pa == propArray.length - 1) {
                        ref[key] = normalizedProps[p];
                    } else {
                        ref = ref[key] = ref[key] || {};
                    }
                }
            };
        }
        return resource;
    }

    function removeEmptyParams(params) {
        for (var p in params) {
            if (!params[p] || params[p] == 'undefined') {
                delete params[p];
            }
        }
        return params;
    }

    function executeRequest(request, callback) {
        request.execute(function(response) {
            console.log(response);

            if (callback) {
                callback(response);
            }
        });
    }

    function buildApiRequest(requestMethod, path, params, properties, callback) {
        params = removeEmptyParams(params);
        var request;
        if (properties) {
            var resource = createResource(properties);
            request = gapi.client.request({
                'body': resource,
                'method': requestMethod,
                'path': path,
                'params': params
            });
        } else {
            request = gapi.client.request({
                'method': requestMethod,
                'path': path,
                'params': params
            });
        }
        executeRequest(request, callback);
    }

    /***** END BOILERPLATE CODE *****/