import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

const apiKey = "b66a977dae8b4b3faf624cb40e4dfabf";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6, // Fetch 6 articles
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    this.setState({ loading: true });
    const url = `
https://newsapi.org/v2/everything?q=tesla&from=2025-03-09&sortBy=publishedAt&apiKey=b66a977dae8b4b3faf624cb40e4dfabf`;
    const res = await fetch(url);
    const data = await res.json();
    this.setState({
      articles: data.articles.slice(0, this.props.pageSize), // limit to 6
      loading: false,
    });
  };

  render() {
    return (
      <div
        className="container py-4 md:mx-auto min-h-screen text-white"
        id="News"
      >
        {/* <h1 className="text-center mb-4">Top Headlines</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {this.state.articles.map((article) => (
            <div className="flex justify-center items-center" key={article.url}>
              <NewsItem
                title={article.title ? article.title.slice(0, 50) : ""}
                description={
                  article.description ? article.description.slice(0, 100) : ""
                }
                imageUrl={article.urlToImage}
                newsUrl={article.url}
                author={article.author}
                date={article.publishedAt}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default News;
