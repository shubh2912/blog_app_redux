import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../App.css';
import Modal from 'react-modal';
import {
    getBlogData,
    deleteBlogData,
    addBlogdata,
    updateBlogData
} from '../Actions/action';
import { connect } from 'react-redux';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        'background-color': 'antiquewhite',
        'text-align': 'center'
    }
};

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            blogs: [],
            addModal: false,
            addBlogText: '',
            updateBlogId: 0,
            updateBlogText: '',
            updateModal: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            blogs: nextProps.blogData
        }
    }

    componentDidMount() {
        this.props.dispatch(getBlogData());
    }

    handleDetails = (event) => {
        this.props.history.push(`/details/${event.target.id}`)
    }

    handleDelete = (event) => {
        this.props.dispatch(deleteBlogData(event.target.id));
    }

    handleAdd = () => {
        this.setState({ addModal: true })
    }

    handleAddBlogText = (event) => {
        this.setState({ addBlogText: event.target.value });
    }

    handleUpdateBlogText = (event) => {
        this.setState({ updateBlogText: event.target.value });
    }

    addBlog = () => {
        const { addBlogText } = this.state;
        const addObj = {
            "blogMessage": addBlogText
        }
        this.props.dispatch(addBlogdata(addObj));
        this.setState({ addModal: false });
    }

    handleUpdate = (event) => {
        this.setState({ updateBlogId: event.target.id, updateBlogText: event.target.name, updateModal: true })
    }

    updateBlog = () => {
        const { updateBlogText, updateBlogId } = this.state;
        const updateObj = {
            "blogMessage": updateBlogText
        }
        this.props.dispatch(updateBlogData(updateObj, updateBlogId));
        this.setState({ updateModal: false });
    }

    render() {
        const { blogs, addModal, addBlogText, updateModal, updateBlogText } = this.state;
        return (
            <div>
                <table className="table table-bordered table-hover table-striped">
                    <tbody>
                        <tr>
                            <td className="table-data" colSpan="4">Blogs</td>
                        </tr>
                        <tr className="table-header">
                            <td>S.NO</td>
                            <td>Blogs</td>
                            <td>Details</td>
                            <td>Actions</td>
                        </tr>
                        {blogs.map((item, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.blogMessage}</td>
                                <td><button id={item._id} className="btn btn-warning" onClick={this.handleDetails}>Details</button></td>
                                <td><button id={item._id} name={item.blogMessage} onClick={this.handleUpdate} className="btn btn-primary btn-margin">Update</button>
                                    <button id={item._id} className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <Modal
                    isOpen={addModal}
                    style={customStyles}
                >
                    <h3>Add Blog</h3>
                    <label> Blog : </label>
                    <input type="text" value={addBlogText} onChange={this.handleAddBlogText} /><br />
                    <button className="btn btn-success" onClick={this.addBlog}>ADD</button>
                </Modal>
                <Modal
                    isOpen={updateModal}
                    style={customStyles}
                >
                    <h3>Update Blog</h3>
                    <label> Blog : </label>
                    <input type="text" value={updateBlogText} onChange={this.handleUpdateBlogText} /><br />
                    <button className="btn btn-success" onClick={this.updateBlog}>UPDATE</button>
                </Modal>
                <button className="btn btn-success" onClick={this.handleAdd}>Add Blog</button>
            </div>
        )
    }
}

Home.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = ({ blogStore }) => {
    const { blogData } = blogStore;
    return {
        blogData
    }
}

export default connect(mapStateToProps)(Home);