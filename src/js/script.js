const templates = {
  bookTemplate: Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  ),
};
const bookList = document.querySelector('.books-list');
const filters = [];
const favoriteBooks = [];
const nonFiction = document.querySelector('input[value=nonFiction]');
const adults = document.querySelector('input[value=adults]');
class BooksList {
  constructor() {
    this.initData();
    this.render();
    this.initActions();
  }
  initData() {
    this.data = dataSource.books;
  }
  render() {
    for (const book of this.data) {
      book.ratingBgc = this.determineRatingBgc(book.rating * 10);
      book.ratingWidth = book.rating * 10;
      const generatedHTML = templates.bookTemplate(book);
      const dom = utils.createDOMFromHTML(generatedHTML);
      bookList.appendChild(dom);
    }
  }

  initActions() {
    const thisBookList = this;

    bookList.addEventListener('click', function (event) {
      event.preventDefault();

      const offsetParent = event.target.offsetParent;

      if (offsetParent.classList.contains('favorite')) {
        offsetParent.classList.remove('favorite');
        favoriteBooks.splice(favoriteBooks.indexOf('favorite'), 1);
      } else {
        offsetParent.classList.add('favorite');

        favoriteBooks.push(offsetParent);
      }
    });

    nonFiction.addEventListener('change', function () {
      if (this.checked) {
        filters.push('nonFiction');
        thisBookList.filterBooks();
      } else {
        filters.splice(filters.indexOf('nonFiction'), 1);
        thisBookList.unfilterBooks();
      }
    });
    adults.addEventListener('change', function () {
      if (this.checked) {
        filters.push('adults');
        thisBookList.filterBooks();
      } else {
        filters.splice(filters.indexOf('adults'), 1);
        thisBookList.unfilterBooks();
      }
    });
  }

  filterBooks() {
    for (const book of this.data) {
      const bookImage = document.querySelector(
        '.book__image' + '[data-id="' + book.id + '"]'
      );
      if (!book.details[filters]) {
        bookImage.classList.add('hidden');
      }
    }
  }
  unfilterBooks() {
    for (const book of this.data) {
      const bookImage = document.querySelector(
        '.book__image' + '[data-id="' + book.id + '"]'
      );
      if (!book.details[filters]) {
        bookImage.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b ' + rating + '%);';
  }
}

console.log(favoriteBooks);

console.log(favoriteBooks);

console.log(filters);

const app = new BooksList();
console.log(app);