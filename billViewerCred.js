let accessKey = Keychain.get("billViewerAccessKey")
let secret = Keychain.get("billViewerSecret")
let present = Keychain.contains("billViewerAccessKey") && Keychain.contains("billViewerSecret")
let cred = {
    accessKey, 
    secret,
    present 
}

module.exports = cred