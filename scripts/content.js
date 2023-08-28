const coderunnerTables = document.getElementsByClassName("coderunnerexamples");

if (coderunnerTables.length > 0) {
    Array.from(coderunnerTables).forEach(coderunnerTable => {
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy Test";

        copyButton.addEventListener("click", function() {
            const content = coderunnerTable.outerHTML;

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

        coderunnerTable.parentNode.insertBefore(copyButton, coderunnerTable.nextSibling);
    });
}