const phantom = require('phantom');
const puppeteer = require('puppeteer');



const create_pdf = async (output_folder, output_filename) => {
    const file_path = `${output_folder}/${output_filename}.pdf`;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:3000', {waitUntil: 'networkidle2'});
        await page.pdf({path: file_path});
        await browser.close();
};

module.exports =
    {
        create_pdf: create_pdf
    };



