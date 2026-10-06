function openMenu() {
    document.body.classList += " menu--open";
}

function closeMenu() {
    document.body.classList.remove('menu--open');
}

async function renderBooks(filter) {

    const featuredBooksWrapper = document.querySelector("#featured-books");
    const popularBooksWrapper = document.querySelector("#popular-books");

    const books = await getBooks();

    // Separate the books into their two sections
    const featuredBooks = books.filter(book => book.featured);
    const popularBooks = books.filter(book => !book.featured);

    // Sort each section
    function sortBooks(books) {
        if (filter === "LOW_TO_HIGH") {
            books.sort((a, b) =>
                (a.salePrice || a.originalPrice) -
                (b.salePrice || b.originalPrice)
            );
        }
        else if (filter === "HIGH_TO_LOW") {
            books.sort((a, b) =>
                (b.salePrice || b.originalPrice) -
                (a.salePrice || a.originalPrice)
            );
        }
        else if (filter === "RATING") {
            books.sort((a, b) => b.rating - a.rating);
        }
    }

    sortBooks(featuredBooks);
    sortBooks(popularBooks);

    // Create HTML
    function generateBookHTML(book) {
        return `
            <div class="book">
                <figure class="book__img--wrapper">
                    <img
                        class="book__img"
                        src="${book.url}"
                        alt=""
                    />
                </figure>

                <div class="book__title">
                    ${book.title}
                </div>

                <div class="book__ratings">
                    ${ratingHTML(book.rating)}
                </div>

                <div class="book__price">
                    ${priceHTML(book.originalPrice, book.salePrice)}
                </div>
            </div>
        `;
    }

    // Put ONLY featured books in Featured
    featuredBooksWrapper.innerHTML =
        featuredBooks.map(generateBookHTML).join("");

    // Put ONLY popular books in Popular
    popularBooksWrapper.innerHTML =
        popularBooks.map(generateBookHTML).join("");
}

function priceHTML(originalPrice, salePrice) {
    if (!salePrice) {
        return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span>`;
    } 
    else {
        return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span>
            <span class="book__price--sale">$${salePrice.toFixed(2)}</span>`;
    }
}

function ratingHTML(rating) {
    let ratingHTML = "";

    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
        ratingHTML += '<i class="fa-solid fa-star"></i>';
    }

    if (rating % 1 !== 0) {
        ratingHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
    }

    return ratingHTML;
}

function filterBooks(event) {
    (event.target.value);
}
  renderBooks('LOW_TO_HIGH');
    const filter = document.querySelector("#filter");

    filter.addEventListener("change", (event) => {
        renderBooks(event.target.value);
    });

renderBooks("LOW_TO_HIGH");

function getBooks() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Cracking the Coding Interview",
                    url: "./assets/crack the coding interview.png",
                    originalPrice: 49.95,
                    salePrice: 14.95,
                    rating: 4.5,
                    featured: true
                },

                {
                    id: 2,
                    title: "Atomic Habits",
                    url: "./assets/atomic habits.jpg",
                    originalPrice: 39,
                    salePrice: null,
                    rating: 5,
                    featured: true
                },

                {
                    id: 3,
                    title: "Can't Hurt Me",
                    url: "./assets/david goggins.jpeg",
                    originalPrice: 29,
                    salePrice: 12,
                    rating: 5,
                    featured: true
                },

                {
                    id: 4,
                    title: "Deep Work",
                    url: "./assets/deep work.jpeg",
                    originalPrice: 44,
                    salePrice: 19,
                    rating: 4.5,
                    featured: true
                },

                { 
                    id: 5, 
                    title: "The 10X Rule", 
                    url: "./assets/book-1.jpeg", 
                    originalPrice: 32, 
                    salePrice: 17, 
                    rating: 4, 
                    featured: false 
                }, 
                
                { 
                    id: 6, 
                    title: "Be Obsessed or Be Average", 
                    url: "./assets/book-2.jpeg", 
                    originalPrice: 39.99, 
                    salePrice: 16.99, 
                    rating: 4.5, 
                    featured: false 
                }, 
                
                { 
                    id: 7, 
                    title: "Rich Dad Poor Dad", 
                    url: "./assets/book-3.jpeg", 
                    originalPrice: 29.99, 
                    salePrice: 12.99, 
                    rating: 4.5, 
                    featured: false 
                }, 
                
                { 
                    id: 8, 
                    title: "Cashflow Quadrant", 
                    url: "./assets/book-4.jpeg", 
                    originalPrice: 44.99, 
                    salePrice: 19.99, 
                    rating: 4, 
                    featured: false 
                }, 
                
                { 
                    id: 9, 
                    title: "The 48 Laws of Power", 
                    url: "./assets/book-5.jpeg", 
                    originalPrice: 34.99, 
                    salePrice: 15.99, 
                    rating: 4.5, 
                    featured: false 
                }, 
                
                { 
                    id: 10, 
                    title: "The 5 Second Rule", 
                    url: "./assets/book-6.jpeg", 
                    originalPrice: 27.99, 
                    salePrice: 11.99, 
                    rating: 4, 
                    featured: false 
                }, 
                
                { 
                    id: 11, 
                    title: "Mastery", 
                    url: "./assets/book-8.jpeg", 
                    originalPrice: 42.99, 
                    salePrice: 18.99, 
                    rating: 5, 
                    featured: false 
                }
            ]);
        }, 1000);
    });
}
