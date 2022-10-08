import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.marvelService.getAllCharacter()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    // Method for optimization
    // so as not to put this construction to the render()

    renderItem(arr) {
        const item = arr.map((item) => {
            let imgStyle = { 'objectFit': 'cover' }
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' }
            }
            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        //function for centr spinner
        return (
            <ul className="char__grid">
                {item}
            </ul>
        )
    }

    render() {

        const { charList, loading, error } = this.state

        const item = this.renderItem(charList)

        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error) ? item : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div >
        )
    }
}

export default CharList;