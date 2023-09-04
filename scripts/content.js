// Global initial button style done inline used to create new buttons
const INITIAL_BUTTON_STYLE = {
    fontFamily: "Arial, sans-serif",
    padding: "5px 10px",
    backgroundColor: "#ced4da",
    color: "#000000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

// Global button colour to signify the task has been completed
const COMPLETE_BUTTON_COLOUR = "#50C878";

/**
 * 
 * Takes in text and returns a button object that can be placed within HTML
 * 
 * @param {string} textContent text for the button to show
 * @returns {HTMLButtonElement} 
 */
function createButton(textContent) {
    const button = document.createElement("button");
    button.textContent = textContent;
    Object.assign(button.style, INITIAL_BUTTON_STYLE)
    return button;
}

/**
 * 
 * Takes in a list of cells and creates a copy button for 
 * each cell that copies the cell's text into the user's clipboard.
 * 
 * @param {NodeList} testCells list of cells from querySelectorAll method.
 * @param {string} standbyText text for the button to display when in standby
 * @param {string} completedText text for the button to display temporarily after successfully copying
 */
function createButtonsInCells(testCells, standbyText, completedText) {
    testCells.forEach(cell => {
        const copyButton = createButton(standbyText);

        const content = cell.textContent;

        copyButton.addEventListener("click", function(event) {
            event.preventDefault();
            copyButton.disabled = true;

            navigator.clipboard.writeText(content).then(() => {
                const originalButtonText = copyButton.textContent;
                copyButton.textContent = completedText;
                copyButton.style.backgroundColor = COMPLETE_BUTTON_COLOUR;
                setTimeout(function() {
                    copyButton.textContent = originalButtonText;
                    copyButton.style.backgroundColor = INITIAL_BUTTON_STYLE.backgroundColor;
                    copyButton.disabled = false;
                }, 800);
            }).catch(err => {
                console.error("Error copying test to clipboard:", err);
            });
        });

        const breakParagraph = document.createElement("br");

        cell.appendChild(breakParagraph);
        cell.appendChild(copyButton);
    });
}

// TODO replace Line 80 my_function() with test_calls
// TODO replace Line 83 expected_output with expected output as multiline
function pythonUnitTestText(test_calls, expected_output) {
    let code = 
        "import unittest\n" +
        "from unittest.mock import patch\n" +
        "import io\n" +
        "\n" +
        "class TestMyFunction(unittest.TestCase):\n" +
        "    def test_my_function_output(self):\n" +
        "        with patch('sys.stdout', new_callable=io.StringIO) as mock_stdout:\n" +
        "            my_function()\n" +
        "            actual_output = mock_stdout.getvalue()\n" +
        "\n" +
        "        expected_output = 'Hello, World!\n'\n" +
        "        self.assertEqual(actual_output, expected_output)\n" +
        "\n" +
        "if __name__ == '__main__':\n" +
        "    unittest.main()\n"
}

/**
 * Main function that checks if there are tables within the html that have Code Runner Examples.
 * If so, then iterate through each table and add buttons into the first column (tests)
 * and in the last column (results).
 */
function main() {
    const coderunnerTables = document.getElementsByClassName("coderunnerexamples");
    if (coderunnerTables.length > 0) {
        Array.from(coderunnerTables).forEach(coderunnerTable => {
            const testCells = coderunnerTable.querySelectorAll("tr td:first-child");
            const resultCells = coderunnerTable.querySelectorAll("tr td:last-child");

            createButtonsInCells(testCells, "Copy Test", "Test Copied!");
            createButtonsInCells(resultCells, "Copy Result", "Result Copied!");
        });
    };
}

// Run the main function.
main();