const phantom = require('phantom');


const create_pdf = (output_folder, output_filename) => {
    const file_path = `${output_folder}/${output_filename}.pdf`;
    var sitepage = null;
    var phInstance = null;
    phantom.create()
        .then(function (instance) {
            phInstance = instance;
            return instance.createPage();
        })
        .then(function (page) {
            sitepage = page;
            return page.open('http://localhost:3000/');
        })
        .then(function (status) {
            console.log(status);
            return sitepage.property('content');
        })
        .then(function (content) {
            sitepage.render(file_path);
            sitepage.paperSize = {
                format: 'A4',
                orientation: 'portrait',
                margin: '1cm'
            };

            sitepage.close();
        })
        .catch(function (error) {
            console.log(error);
            phInstance.exit();
        });
};

module.exports =
    {
        create_pdf: create_pdf
    };



