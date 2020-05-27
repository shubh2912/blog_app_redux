import React from 'react';
import axios from 'axios';
import '../App.css';


class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            blog: {}
        }
    }

    componentDidMount() {
        axios(`http://localhost:8082/blog/getblog/${this.props.match.params.blogId}`)
            .then(res => this.setState({ blog: res.data.blog }))
            .catch(err => console.log(err))
    }

    handleBack = () => {
        this.props.history.push("/");
    }

    render() {
        const { blog } = this.state;
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
                        </tr>
                        <tr>
                            <td>{blog._id}</td>
                            <td>{blog.blogMessage}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-warning button-margin" onClick={this.handleBack}>Back</button>
            </div >
        )
    }
}

export default Details;
