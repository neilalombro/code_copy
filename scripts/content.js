const coderunnerTables = document.getElementsByClassName("coderunnerexamples");

if (coderunnerTables.length > 0) {
    Array.from(coderunnerTables).forEach(coderunnerTable => {
        const testCells = coderunnerTable.querySelectorAll("tr td:first-child");

        testCells.forEach(cell => {
            const copyButton = document.createElement("button");
            copyButton.textContent = "Copy Test";

            const content = cell.textContent;

            copyButton.addEventListener("click", function(event) {
                event.preventDefault();

                navigator.clipboard.writeText(content).then(() => {
                    const originalButtonText = copyButton.textContent;
                    copyButton.textContent = "Test Copied!";
                    setTimeout(function() {
                        copyButton.textContent = originalButtonText;
                    }, 3000);
                }).catch(err => {
                    console.error("Error copying test to clipboard:", err);
                });
            });

            const breakParagraph = document.createElement("br");
            
            cell.appendChild(breakParagraph);
            cell.appendChild(copyButton);
        });
    });
}