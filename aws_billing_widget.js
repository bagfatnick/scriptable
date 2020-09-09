let cred = importModule('billViewerCred')

// let fm = FileManager.local()
// const etagPath = fm.joinPath(fm.documentsDirectory(), `feedbin-widget-etag-${Device.name()}.txt`)
// const itemPath = fm.joinPath(fm.documentsDirectory(), `feedbin-widget-item-${Device.name()}.json`)

// const authHeader = btoa(Keychain.get("feedbin-auth"))
// let headers = {"base": {"Authorization": `Basic ${authHeader}`}}
// headers["unread_entries"] = Object.assign({}, headers["base"])
// if (fm.fileExists(etagPath)) {
//     headers["unread_entries"]["If-None-Match"] = fm.readString(etagPath)
// }

let item = {}

try {
    item = await loadItem()
} catch {
    // item = JSON.parse(fm.readString(itemPath))
    // item.author += item.author != "" ? " — Cached" : "Cached"
}

let widget = createWidget(item)
widget.presentMedium()

if (config.runsInWidget) {
    Script.setWidget(widget)
    Script.complete()
}

function createWidget(item) {
  const textColor = new Color("#ffffff")
  let gradient = new LinearGradient()
  gradient.colors = [new Color("#1c1c1e"), new Color("#0c0c0e")]
  gradient.locations = [0.5, 1]

  let w = new ListWidget()
  w.backgroundGradient = gradient
  w.setPadding(10, 20, 10, 20)
  
  let dataTxt = w.addText(item.data)
  dataTxt.applyBodyTextStyling()  
//   let titleTxt = w.addText(item.title)
//   titleTxt.applyHeadlineTextStyling()
//   titleTxt.textColor = textColor
//   titleTxt.lineLimit = 2

//   w.addSpacer(7)
  
//   let authorTxt = w.addText(item.author)
//   authorTxt.applyBodyTextStyling()
//   authorTxt.textColor = textColor
//   authorTxt.textOpacity = 0.8
//   authorTxt.textSize = 12

//   w.addSpacer(7)
  
//   let summaryTxt = w.addText(item.summary)
//   summaryTxt.applySubheadlineTextStyling()
//   summaryTxt.textColor = textColor
//   summaryTxt.textOpacity = 0.8
//   summaryTxt.lineLimit = 2

//   w.url = item.url
  
  return w
}
  
async function loadItem() {
    if (!cred.present) {
        item.data = "Missing Credentials"
        return
    }

    item.data = "Credentials present"
}

