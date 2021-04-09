/* Section 3 of Platinum Life Assessments. Author: Amith Philip*/

// Import the puppeteer library to help WebScrape
const puppeteer = require ('puppeteer');

// Start an asynchronous headless browser session
puppeteer.launch().then (async browser => {
    // Wait for the headless browser to open a new page.
    const page = await browser.newPage();
    // Load up the URL to webscrape, any TakeALot link will work
    await page.goto('https://www.takealot.com/russell-hobbs-2200w-crease-control-iron/PLID34147865');
    // Wait for the drop-down menu to load
    await page.waitForSelector('.plusminus');
    // Simulate a click to expand the drop-down menu
    await page.click('.plusminus')

    // Evaluate the page and assign to a variable
    let priceInformation = await page.evaluate(() => {

        // Declare variables of interest for immediate item and house the appropriate information within.
        let priceOfItem = document.querySelector('.currency-module_currency_29IIm')
        let avail = document.querySelector('.stock-availability-status')
        let sellInfo = document.querySelector('.seller-information ')

        // Declare and store variables for first available other offer if available.
        let priceOfItem2 = document.querySelector('.swiper-slide:nth-child(1) > '
                                                    + '.buying-choice-list-item > .grid-x >'
                                                    + ' .cell > .currency');
        let avail2 = document.querySelector('.swiper-slide:nth-child(1) > '
                                                            + '.buying-choice-list-item > .grid-x > .cell >'
                                                            + '.buying-choice-list-item-module_choice-text_YOl2M >'
                                                            + ' .grid-x > .cell > span');
        let sellInfo2 = document.querySelector('.swiper-slide:nth-child(1) > .buying-choice-list-item >'
                                                    + ' .grid-x > .cell > .seller-information ');

        // Remove whitespace from both sides of a string
        function stripString(rawString) {
            return rawString.trim();
        }

        // Declare an object storing all information, removing leading and trailing whitespaces
        let productInfo = {
            Price: priceOfItem ? stripString(stripString(priceOfItem.textContent)) : null,
            Availability : avail ? stripString(stripString(avail.textContent)) : null,
            Seller: sellInfo ? stripString(stripString(sellInfo.textContent)) : null,

            Price_Next: priceOfItem2 ? stripString(stripString(priceOfItem2.textContent)) : null,
            Availability_Next: avail2 ? stripString(stripString(avail2.textContent)) : null,
            Seller_Next: sellInfo2 ? stripString(stripString(sellInfo2.textContent)) : null
        };

        // Return information of the product
        return productInfo;
    });

    // Output all information to local terminal window/console
    console.log(priceInformation);

    // Good practice details closing the session after completing the WebScrape Process
    await browser.close();

});



