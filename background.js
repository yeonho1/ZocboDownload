/*const contextMenuItem = {
    "id": "zocboPdfDownload",
    "title": "족보 PDF 다운로드",
    "contexts": ["all"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
    if (clickData.menuItemId === "zocboPdfDownload") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const tab = tabs[0];
            if (tab.url && tab.url.startsWith("https://www.zocbo.com/PDFVIEWER/WEB/viewer.asp")) {
                chrome.tabs.sendMessage(tab.id, {text: "canvasList"}, (pages) => {
                    var pdf = new jsPDF();
                    for (var idx = 0; idx < pages.length; idx++) {
                        console.log(`Processing page ${idx+1}`);
                        const page = pages[idx];
                        const imgURL = page.toDataURL("application/pdf");
                        const imgProps = pdf.getImageProperties(imgURL);
                        const height = (imgProps.height * width) / imgProps.width;
                        pdf.addImage(imgURL, 'JPEG', 0, 0, width, height);
                        if (idx + 1 < pages.length) {
                            pdf.addPage();
                        }
                    }
                    pdf.save('jokbo.pdf');
                })
            } else {
                alert('족보닷컴 뷰어 페이지가 아닙니다.')
            }
        });
    }
});*/
