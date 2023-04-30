import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Countries from "../Countries/countries";
import LibraryService from "../../repository/libraryRepository";
import Categories from "../Categories/categories";
import Authors from "../Authors/AuthorsList/authors";
import Books from "../Books/BooksList/books";
import Header from "../Header/header";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            categories: [],
            authors: [],
            books: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Route path={"/countries"} exact render={() =>
                            <Countries countries={this.state.countries}/>}/>

                        <Route  path={"/categories"} exact render={() =>
                            <Categories categories={this.state.categories}/>}/>

                        <Route  path={"/authors"} exact render={() =>
                            <Authors authors={this.state.authors}/>}/>

                        <Route  path={"/books/add"} exact render={() =>
                            <BookAdd authors={this.state.authors}
                                     categories={this.state.categories}
                                     onAddBook={this.addBook} />}/>

                        <Route  path={"/books/edit/:id"} exact render={() =>
                            <BookEdit authors={this.state.authors}
                                     categories={this.state.categories}
                                     onEditBook={this.editBook}
                                     getBook={this.getBook}
                                     book={this.state.selectedBook} />}/>

                        <Route  path={["/books", "/"]} exact render={() =>
                            <Books books={this.state.books}
                                   onDelete={this.deleteBook}
                                   onEdit={this.getBook}
                                   onMark={this.markAsTakenBook} />}/>
                        <Route exact path="/books">
                            <Redirect to={"/books"}/>
                        </Route>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadCountries();
        this.loadCategories();
        this.loadAuthors();
        this.loadBooks();
    }

    loadCountries = () => {
        LibraryService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            });
    }

    loadCategories = () => {
        LibraryService.fetchCategories()
            .then((data) =>{
                this.setState({
                    categories: data.data
                })
                }
            )
    }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) =>{
                    this.setState({
                        authors: data.data
                    })
                }
            )
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) =>{
                    this.setState({
                        books: data.data
                    })
                }
            )
    }

    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }

    addBook = (name, category, author, availableCopies) => {
        LibraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name, category, author, availableCopies) => {
        LibraryService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }
    markAsTakenBook = (id, availableCopies) => {
        LibraryService.markAsTakenBook(id)
            .then(() => {
                this.loadBooks();
            });
    }

}

export default App;
