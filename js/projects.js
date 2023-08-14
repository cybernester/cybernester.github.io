
fetch("./pdfs/Honours Project.txt")
  .then(response => response.text())
  .then(data => {
    document.getElementById("honours-text").textContent = data;
  })
  .catch(error => {
    console.error("Error fetching text file for Honours Project.txt:", error);
  });


const pdfFolder = "./pdfs";
const jsonFile = "./pdfs.json";

fetch(jsonFile)
  .then(response => response.json())
  .then(files => {
    const pdfCardsContainer = document.getElementById("pdf-cards-container");
    const cardPromises = files.map((file, index) => {
      if (file.name.endsWith(".pdf") && file.name.substring(0, file.name.length - 4) != "Honours Project") {
        const fileTitle = file.name.substring(0, file.name.length - 4);

        let txtFile;
        if (index < 1) { //Change as the project descriptions add on
          txtFile = `${pdfFolder}/${fileTitle}.txt`;
        } else {
          txtFile = `${pdfFolder}/test.txt`;
        }

        const imgFile = `${pdfFolder}/${fileTitle}.jpg`
        const fileLink = encodeURIComponent(fileTitle);

        return fetch(txtFile)
          .then(response => response.text())
          .then(cardText => {
            let truncatedText = cardText.substring(0, 110);
            truncatedText = truncatedText.substring(0, Math.min(truncatedText.length, truncatedText.lastIndexOf(" "))) + (cardText.length > 110 ? '...' : '');
            const card = `
              <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay=200 data-aos-offset="100">
                <div class="card">
                  <img src="${imgFile}" alt="${fileLink}" class="card-img-top" loading="lazy">
                  <div class="card-body">
                    <h3 class="card-title">${fileTitle}</h3>
                    <p class="card-text">${truncatedText}</p>
                    <a href=./projectdetails.html?project=${fileLink} class="btn btn-dark">Learn More</a>
                  </div>
                </div>
              </div>
            `;
            return card;
          })
          .catch(error => {
            console.error(`Error fetching text file for ${file.name}:`, error);
          });
      }
      return null;
    });

    Promise.all(cardPromises)
      .then(cards => {
        cards.forEach(card => {
          if (card) {
            pdfCardsContainer.innerHTML += card;
          }
        });
      })
      .catch(error => {
        console.error("Error processing cards:", error);
      });
  })
  .catch(error => {
    console.error("Error fetching PDF files:", error);
  });
