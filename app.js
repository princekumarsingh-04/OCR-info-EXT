document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageInput = document.getElementById('image-input').files[0];

    if (imageInput) {
        Tesseract.recognize(
            imageInput,
            'eng',
            {
                logger: function(m) {
                    console.log(m);
                }
            }
        ).then(({ data: { text } }) => {
            // Display the result section
            document.getElementById('result').style.display = 'block';

            // Extract Name and Aadhaar Number using regex
            const nameMatch = text.match(/Name\s*:\s*([A-Za-z\s]+)/i);
            const aadhaarMatch = text.match(/\d{4}\s?\d{4}\s?\d{4}/);

            const name = nameMatch ? nameMatch[1].trim() : 'Not Found';
            const aadhaarNumber = aadhaarMatch ? aadhaarMatch[0].replace(/\s/g, '') : 'Not Found';

            // Display the extracted information
            document.getElementById('name').textContent = name;
            document.getElementById('aadhaar-number').textContent = aadhaarNumber;
        }).catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Please upload an image.');
    }
});
