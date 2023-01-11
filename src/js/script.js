const templates = {
  bookTemplate: Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  ),
};

class BooksList {
  constructor() {
    
    this.initData();
    this.getElemnet();
    this.render();
    this.initActions();

  }
  getElemnet(){
    this.bookList = document.querySelector('.books-list');
    this.filters = [];
    this.favoriteBooks = [];
    this.nonFiction = document.querySelector('input[value=nonFiction]');
    this.adults = document.querySelector('input[value=adults]');

  }
  initData() {
    this.data = dataSource.books;
  }
  render() {
    const thisBookList = this;
    for (const book of this.data) {
      book.ratingBgc = this.determineRatingBgc(book.rating * 10);
      book.ratingWidth = book.rating * 10;
      const generatedHTML = templates.bookTemplate(book);
      const dom = utils.createDOMFromHTML(generatedHTML);
      thisBookList.bookList.appendChild(dom);
    }
  }

  initActions() {
    const thisBookList = this;

    thisBookList.bookList.addEventListener('click', function (event) {
      event.preventDefault();

      const offsetParent = event.target.offsetParent;

      if (offsetParent.classList.contains('favorite')) {
        offsetParent.classList.remove('favorite');
        thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf('favorite'), 1);
      } else {
        offsetParent.classList.add('favorite');

        thisBookList.favoriteBooks.push(offsetParent);
      }
    });

    thisBookList.nonFiction.addEventListener('change', function () {
      if (this.checked) {
        thisBookList.filters.push('nonFiction');
        thisBookList.filterBooks();
      } else {
        thisBookList.filters.splice(thisBookList.filters.indexOf('nonFiction'), 1);
        thisBookList.unfilterBooks();
      }
    });
    thisBookList.adults.addEventListener('change', function () {
      if (this.checked) {
        thisBookList.filters.push('adults');
        thisBookList.filterBooks();
      } else {
        thisBookList.filters.splice(thisBookList.filters.indexOf('adults'), 1);
        thisBookList.unfilterBooks();
      }
    });
  }

  filterBooks() {
    const thisBookList = this;
    for (const book of this.data) {
      const bookImage = document.querySelector(
        '.book__image' + '[data-id="' + book.id + '"]'
      );
      if (!book.details[thisBookList.filters]) {
        bookImage.classList.add('hidden');
      }
    }
  }
  unfilterBooks() {
    const thisBookList = this;
    for (const book of this.data) {
      const bookImage = document.querySelector(
        '.book__image' + '[data-id="' + book.id + '"]'
      );
      if (!book.details[thisBookList.filters]) {
        bookImage.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b ' + rating + '%);';
  }
}
const thisBookList = this;
console.log(thisBookList.favoriteBooks);

console.log(thisBookList.favoriteBooks);

console.log(thisBookList.filters);

const app = new BooksList();
console.log(app);