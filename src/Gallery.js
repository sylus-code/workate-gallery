import React, {Component} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class Gallery extends Component {

    state = {
        data: null
    };

    componentDidMount() {
        const url = 'https://picsum.photos/v2/list';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState((prevState) => {
                    return prevState.data = data
                });
            })
    }

    setdata() {
        let images = [];
        if (this.state.data !== null) {

            images = this.state.data.map((el, index) => {
                return <div key={index} className="img-box">
                    <img src={el.download_url} alt={el.author}/>
                </div>
            });
            return images;
        } else {
            return images.concat(<div key="0"> Ups! data jest nullem :(</div>)
        }
    };

    render() {
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: {max: 4000, min: 3000},
                items: 5
            },
            desktop: {
                breakpoint: {max: 3000, min: 1024},
                items: 3
            },
            tablet: {
                breakpoint: {max: 1024, min: 464},
                items: 2
            },
            mobile: {
                breakpoint: {max: 464, min: 0},
                items: 1
            }
        };
        return (
            <div className="center">
                <Carousel
                    swipeable={false}
                    draggable={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    slidesToSlide={3}
                >
                    {this.setdata()}</Carousel>
            </div>
        );
    }
}

export default Gallery;