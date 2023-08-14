const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('project');

const pdfFolder = "./pdfs";
const jsonFile = "./pdfs.json";

const projectTitle = document.getElementById('project-title');
const pdfPlace = document.getElementById('pdf-place');

function setPdfViewerHeight() {
    const pdfViewer = document.getElementById('pdfViewer');
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    pdfViewer.style.height = `${viewportHeight * 0.9}px`;
}

fetch(jsonFile)
    .then(response => response.json())
    .then(files => {
        var file;
        for (let i = 0; i < files.length; i++) {
            if (files[i].name == (title + ".pdf")) {
                file = files[i];
                break;
            }
            file = "CV";
        }
        if (file.name == (title + ".pdf")) {
            //const fileTitle = file.name.substring(0, file.name.length - 4);
            let txtFile;
            if (title == "Secure Software Development" || title == "Honours Project") { //Change as the project descriptions add on
                txtFile = `${pdfFolder}/${title}.txt`;
            } else {
                txtFile = `${pdfFolder}/test.txt`;
            }
            //const txtFile = `${pdfFolder}/${title}.txt`;
            //const txtFile = `${pdfFolder}/test.txt`;
            //const fileLink = encodeURIComponent(fileTitle);
            projectTitle.innerText = title;
            fetch(txtFile)
                .then(response => response.text())
                .then(cardText => {
                    pdfPlace.innerHTML += `
                        <div class="col-12 mb-12" data-aos="fade-in" data-aos-duration="1000" data-aos-delay=200 data-aos-offset="100">
                            <div class="card">
                                <div class="card-body">
                                    <p class="details-text mb-0">${cardText}</p>
                                    <div class="d-flex justify-content-center">
                                        <a class="btn btn-outline-secondary" href="./pdfs/${encodeURIComponent(title)}.pdf" role="button">Download</a>
                                    </div>
                                </div>
                                <iframe id="pdfViewer" src="./js/pdfjs-3.5.141/web/viewer.html?file=/../pdfs/${encodeURIComponent(title)}.pdf" frameborder="0" width="100%" height="auto"></iframe>
                            </div>
                        </div>
                    `;
                    setPdfViewerHeight();
                    window.addEventListener('resize', setPdfViewerHeight);
                })
                .catch(error => {
                    console.error(`Error fetching text file for ${file.name}:`, error);
                });

        } else {
            projectTitle.innerText = "Project Not Found, But here is my CV!";
            pdfPlace.innerHTML += `
                <div class="col-12 mb-12" data-aos="fade-in" data-aos-duration="2000" data-aos-delay=200 data-aos-offset="100">
                    <div class="card">
                        <div class="card-body d-flex justify-content-center">
                            <a class="btn btn-outline-secondary" href="./pdfs/CV-Mykola-Nesterenko.pdf" role="button">Download</a>
                        </div>
                        <iframe id="pdfViewer" src="./js/pdfjs-3.5.141/web/viewer.html?file=/../pdfs/CV-Mykola-Nesterenko.pdf" frameborder="0" width="100%" height="auto"></iframe>
                    </div>
                </div>
            `;
            setPdfViewerHeight();
            window.addEventListener('resize', setPdfViewerHeight);
        }
    })
    .catch(error => {
        console.error("Error fetching PDF files:", error);
    });


