const STYLE_TO_COPY = [
    "padding", "height", "font-size",
    "border-radius", "font-family", "line-height",
    "text-decoration"
];

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

$(document).ready(() => {
    const payment_anchor = $("#payment");
    const btn = $("<a></a>").html("<span><strong>PDF로 다운로드</strong></span>");
    btn.attr("href", "#");
    const styles = payment_anchor.css(STYLE_TO_COPY);
    $.each(styles, (prop, value) => {
        btn.css(prop, value);
    });
    btn.css("background-color", "#C7F2A4");
    btn.css("color", "black");
    btn.css("margin-left", "10px");
    btn.click(async () => {
        const container = document.getElementById("viewerContainer");
        const org_scr = container.scrollTop;
        var scroll = 0;
        for (scroll = 0; scroll <= container.scrollHeight; scroll += 1000) {
            container.scrollTop = scroll;
            if (scroll + 1000 <= container.scrollHeight) {
                await sleep(500);
            }
        }
        container.scrollTop = org_scr;
        const pages = document.getElementsByTagName("canvas");
        var pdf = new jspdf.jsPDF();
        const width = pdf.internal.pageSize.getWidth();
        for (var idx = 0; idx < pages.length; idx++) {
            console.log(`Processing page ${idx+1}`);
            const page = pages[idx];
            const imgURL = page.toDataURL("application/pdf")
            const imgProps = pdf.getImageProperties(imgURL);
            const height = (imgProps.height * width) / imgProps.width;
            pdf.addImage(imgURL, 'JPEG', 0, 0, width, height);
            if (idx + 1 < pages.length) {
                pdf.addPage();
            }
        }
        pdf.save('zocbo.pdf');
    });
    payment_anchor.after(btn);
});
