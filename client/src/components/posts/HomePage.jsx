import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { fetchPosts } from "../../store/actions/posts";

const HomeWrapper = styled.div`
  width: 90%;
  margin: 1.5rem auto;

  h1 {
    text-align: center;
    font-family: "Montserrat", sans-serif;
  }

  .posts {
    display: flex;
    flex-wrap: wrap;
  }
`;

const StyledPost = styled.div`
  width: 30%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  margin: 10px;
  background: white;
  -webkit-box-shadow: 10px 10px 22px -15px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 10px 10px 22px -15px rgba(0, 0, 0, 0.24);
  box-shadow: 10px 10px 22px -15px rgba(0, 0, 0, 0.24);

  .banner {
    width: 100%;
    height: 300px;
    position: relative;
    img {
      width: 100%;
    }

    .like-icon {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      color: white;
      font-weight: bold;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .info {
    padding: 0.8rem 0rem 0rem 0rem;
    h2 {
      margin: 5px;
      color: #555;
      font-family: "Montserrat", sans-serif;
    }
    .details {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      font-size: 1.2rem;

      .ratings {
        display: "flex";
        align-items: center;
      }
    }
  }
`;

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    const { posts } = this.props;

    if (!posts) {
      return (
        <HomeWrapper>
          <h1>No posts yet!</h1>
        </HomeWrapper>
      );
    }
    return (
      <HomeWrapper>
        <h1>Recent Posts</h1>
        <div className="posts">
          {posts.map(post => (
            <StyledPost key={post.id}>
              <div className="banner">
                <IoIosHeartEmpty size={30} className="like-icon" />
                <img src={post.image} alt={post.title} />
              </div>
              <div className="info">
                <h2>{post.title}</h2>
                <div className="details">
                  <div>
                    <span>
                      <i>By</i> {post.username}
                    </span>
                  </div>
                  <div className="ratings">
                    <span>
                      &nbsp;
                      <b>{post.likes}</b>&nbsp; likes
                    </span>
                  </div>
                </div>
              </div>
            </StyledPost>
          ))}
        </div>
      </HomeWrapper>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(HomePage);
