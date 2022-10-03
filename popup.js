$(document).ready(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            if (tab.url && tab.url.startsWith("https://www.zocbo.com/PDFVIEWER/WEB/viewer.asp")) {
                $("#save").prop('disabled', false);
                $("#save").click(() => {
                    chrome.tabs.sendMessage(tab.id, {text: "canvasList"}, (pages) => {
                        if (pages) {
                            console.log(pages);
                            var pdf = new jspdf.jsPDF();
                            const width = pdf.internal.pageSize.getWidth();
                            for (var idx = 0; idx < pages.length; idx++) {
                                //console.log(`Processing page ${idx+1}`);
                                const imgURL = pages[idx];
                                const imgProps = pdf.getImageProperties(imgURL);
                                const height = (imgProps.height * width) / imgProps.width;
                                pdf.addImage(imgURL, 'JPEG', 0, 0, width, height);
                                if (idx + 1 < pages.length) {
                                    pdf.addPage();
                                }
                            }
                            pdf.save('zocbo.pdf');
                        }
                    });
                });
            }
        }
    });
});
