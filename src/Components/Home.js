import React from 'react';
import axios from 'axios';
import '../App.css';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'bisque',
        textAlign: 'center'
    }
};


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            blogs: [],
            addModal: false,
            addBlogText: '',
            updateBlogText: '',
            updateBlogId: 0,
            updateModal: false
        }
    }

    componentDidMount() {
        axios(`http://localhost:8082/blog/getblogs`)
            .then(res => this.setState({ blogs: res.data.blog }))
            .catch(err => console.log(err))
    }

    handleDetails = (event) => {
        this.props.history.push(`/details/${event.target.id}`);
    }

    handleDeleteBlog = (event) => {
        axios({
            url: `http://localhost:8082/blog/deleteblog/${event.target.id}`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => axios(`http://localhost:8082/blog/getblogs`)
                .then(res => this.setState({ blogs: res.data.blog }))
                .catch(err => console.log(err)))
            .catch(err => console.log(err))
    }

    handleAddBlog = () => {
        this.setState({ addModal: true });
    }

    handleChangeAddBlogText = (event) => {
        this.setState({ addBlogText: event.target.value })
    }

    handleAdd = () => {
        const { addBlogText } = this.state;
        const addObj = {
            "blogMessage": addBlogText
        }
        axios({
            url: `http://localhost:8082/blog/addblog`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: addObj
        }).then(response => axios(`http://localhost:8082/blog/getblogs`)
            .then(res => this.setState({ blogs: res.data.blog, addModal: false }))
            .catch(err => console.log(err)))
            .catch(err => console.log(err))
    }

    handleUpdateBlog = (event) => {
        this.setState({ updateBlogId: event.target.id, updateBlogText: event.target.name, updateModal: true })
    }

    handleChangeUpdateBlogText = (event) => {
        this.setState({ updateBlogText: event.target.value })
    }

    handleUpdate = () => {
        const { updateBlogText, updateBlogId } = this.state;
        const updateObj = {
            "blogMessage": updateBlogText
        }
        axios({
            url: `http://localhost:8082/blog/updateblog/${updateBlogId}`,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: updateObj
        }).then(response => axios(`http://localhost:8082/blog/getblogs`)
            .then(res => this.setState({ blogs: res.data.blog, updateModal: false }))
            .catch(err => console.log(err)))
            .catch(err => console.log(err))
    }

    handleUpdateCancel = () => {
        this.setState({ updateModal: false })
    }

    handleAddCancel = () => {
        this.setState({ addBlogText: '', addModal: false })
    }

    render() {
        const { blogs, addModal, addBlogText, updateModal, updateBlogText } = this.state;
        return (
            <div>
                <table className="table table-bordered table-hover table-striped">
                    <tbody>
                        <tr>
                            <td className="header" colSpan="4">
                                Blog's
                            </td>
                        </tr>
                        <tr className="sub-header">
                            <td>S.No</td>
                            <td>Blog</td>
                            <td>Details</td>
                            <td>Actions</td>
                        </tr>
                        {blogs.map((item, index) => {
                            return <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.blogMessage}</td>
                                <td><button id={item._id} className="btn btn-info" onClick={this.handleDetails}>Details</button></td>
                                <td><button id={item._id} name={item.blogMessage} className="btn btn-warning button-margin" onClick={this.handleUpdateBlog}>Update</button>
                                    <button id={item._id} className="btn btn-danger button-margin" onClick={this.handleDeleteBlog}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <button className="btn btn-success button-margin" onClick={this.handleAddBlog}>Add Blog</button>
                <Modal
                    isOpen={addModal}
                    style={customStyles}
                >
                    <h3>Add Blog</h3>
                    <label>Blog : </label>
                    <input type="text" value={addBlogText} onChange={this.handleChangeAddBlogText} />
                    <button className="btn btn-success button-margin" onClick={this.handleAdd}>Add</button>
                    <button className="btn btn-danger button-margin" onClick={this.handleAddCancel}>Cancel</button>
                </Modal>
                <Modal
                    isOpen={updateModal}
                    style={customStyles}
                >
                    <h3>Update Blog</h3>
                    <label>Blog : </label>
                    <input type="text" value={updateBlogText} onChange={this.handleChangeUpdateBlogText} />
                    <button className="btn btn-success button-margin" onClick={this.handleUpdate}>Update</button>
                    <button className="btn btn-danger button-margin" onClick={this.handleUpdateCancel}>Cancel</button>
                </Modal>
            </div>
        )
    }
}

export default Home;
