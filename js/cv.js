function setPdfViewerHeight() {
    const pdfViewer = document.getElementById('pdfViewer');
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    pdfViewer.style.height = `${viewportHeight * 0.9}px`;
}

// Call the function initially and on window resize
setPdfViewerHeight();
window.addEventListener('resize', setPdfViewerHeight);

