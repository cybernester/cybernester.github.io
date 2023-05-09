function setPdfViewerHeight() {
    const pdfViewer = document.getElementById('pdfViewer');
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    pdfViewer.style.height = `${viewportHeight * 0.9}px`;
}

// Call the function initially and on window resize
setPdfViewerHeight();
window.addEventListener('resize', setPdfViewerHeight);

const toggleButton = document.getElementById('mobile-toggle');
const pdfWindow = document.getElementById('pdf-window');
var mobileState = false;

const mobileViewer = `<iframe id="pdfViewer" src="./js/pdfjs-3.5.141/web/viewer.html?file=/../pdfs/UMMA.pdf" frameborder="0" width="100%" height="auto"></iframe>`;
const desktopViewer = `<embed id="pdfViewer" src="./pds/UMMA.pdf" frameborder="0" width="100%" height="auto" type="application/pdf">`;

toggleButton.addEventListener('click', function() {
    mobileState = !mobileState;
    if (mobileState){
        toggleButton.innerText = "Desktop Viewer";
        pdfWindow.innerHTML = mobileViewer;
    } else {
        toggleButton.innerText = "Mobile Viewer";
        pdfWindow.innerHTML = desktopViewer; 
    }
    setPdfViewerHeight();
});
  
