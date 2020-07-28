import React from 'react';
import Slider from "react-slick";
import {StyledImg, VideoCardGroupContainer, VideoCardList, Title, ExtraLink, VideoCardContainer } from "./styledImg"

class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            page: 1
          };

          this.loadNextPage = this.loadNextPage.bind(this);
    }

    componentDidMount() {
        let page = this.state.page;
        let items = this.state.items;
        fetch(`https://api.lomadee.com/v3/155001196902309c5f761/offer/_bestsellers?page=${page}&size=10&sourceId=35802480&sort=bestsellers`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: items.concat(result.offers)
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

      render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          var settings = {
            dots: false,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };
          return (
              <div>
                <Slider {...settings}>
              {items.map(item => (
                <div key={item.id}>
                    <a href={item.link}>
                    <VideoCardContainer
                        url={item.thumbnail}
                        href={item.link}
                        target="_blank"
                        style={{ borderColor: 'red' }}
                        title={item.name}
                      >
                        <p>{item.name}</p>
                      </VideoCardContainer>
                    </a>
                </div>
              ))}
              </Slider>
            {/* <button onClick={this.loadNextPage}>Next</button> */}
            </div>
          );
        }
      }

      loadNextPage() {
        let page = this.state.page
        let curPage = page
        curPage = curPage+1
        console.log(curPage)
        this.setState({
            page: curPage
        })
        this.componentDidMount();
        this.render();
      }
}

export default Offers;