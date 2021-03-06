import React, { PureComponent, Fragment } from 'react'
import instagramMediaParser from '../helpers/instagramMediaParser'

class InstagramMedia extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      post: {},
      error: false,
      loading: true,
    }
  }

  async componentDidMount() {
    try {
      const post = await instagramMediaParser({ uri: this.props.uri })
      
      this.setState({ post, loading: false })
    } catch (err) {
      console.error(err)

      this.setState({ error: true, loading: false })
    }
  }

  getPostData() {
    return this.state
  }

  render() {
    const { post, error, loading } = this.state
    const {
      renderItem = () => null,
      renderMediaList = (mediaList = null) => mediaList,
      renderError = () => null,
      renderLoading = () => null,
      uri
    } = this.props

    if (loading) {
      return renderLoading()
    }

    if (error) {
      return renderError(uri)
    }

    if (post.type === 'multiple') {
      return renderMediaList(
        post
          .media
          .map(media => renderItem(media))
      )
    }

    return renderItem(post.media[0])
  }
}

export default InstagramMedia