import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

const apiKey = "b66a977dae8b4b3faf624cb40e4dfabf";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
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

    // const today = new Date().toISOString().split("T")[0]; // e.g., "2025-04-10"
    // const today = "2025-04-01"; // ← CHANGE this to any valid recent date

    const offsetDays = 5;
    const today = new Date(Date.now() - offsetDays * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const url = `https://newsapi.org/v2/everything?q=tesla&from=${today}&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (!data.articles) {
        throw new Error("No articles found in response");
      }

      this.setState({
        articles: data.articles.slice(0, this.props.pageSize),
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      this.setState({ articles: [], loading: false });
    }
  };

  render() {
    return (
      <div
        className="container py-4 md:mx-auto min-h-screen text-white"
        id="News"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
