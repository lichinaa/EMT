import React from "react";
import BookTerm from "../BookTerm/bookTerm";
import ReactPaginate from "react-paginate";

class Books extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const books = this.getBooksPage(offset, nextPageOffset);

        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Author name</th>
                                <th scope={"col"}>Available copies</th>
                            </tr>
                            </thead>
                            <tbody>
                                {books}
                            </tbody>
                        </table>
                    </div>
                    <div className="col mb-3">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <a className="btn btn-block btn-dark" href="/books/add" style={{paddingLeft:585, paddingRight:581}}>Add new book</a>
                            </div>
                        </div>
                    </div>
                    <ReactPaginate              previousLabel={"back"}
                                                nextLabel={"next"}
                                                breakLabel={<a href="/#">...</a>}
                                                breakClassName={"break-me"}
                                                pageCount={pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={"pagination m-4 justify-content-center"}
                                                activeClassName={"active"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}


                    />
                </div>
            </div>
        )
    }

    handlePageClick=(data) =>{
        let selected = data.selected;
        console.log(selected)
        this.setState({
            page: selected
        })
    }

    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((term) =>{
            return (
                <BookTerm term={term}
                          onDelete={this.props.onDelete}
                          onEdit={this.props.onEdit}
                          onMark={this.props.onMark}/>
            );
        }).filter((book, index) =>{
            return index >= offset && index < nextPageOffset;
        })
    }

}

export default Books;